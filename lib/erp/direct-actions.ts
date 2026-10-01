"use server";

import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { documents, matters } from "@/lib/db/schema";
import { requireStaff } from "@/lib/auth/session";
import { deriveKey, hmac } from "@/lib/auth/crypto";
import { canSeeMatter } from "@/lib/erp/queries";
import { directUploadEnabled, headSize, presignPut, storeDelete } from "@/lib/erp/storage";
import { audit } from "@/lib/audit";
import { DIRECT_MAX_BYTES, DIRECT_OVERHEAD } from "@/lib/erp/direct-config";

/** Large files go browser → bucket. The browser encrypts (AES-256-GCM) before sending, so the bucket only ever holds ciphertext. */
const OVERHEAD = DIRECT_OVERHEAD;
const ALLOWED = /^(application\/pdf|image\/(png|jpe?g|webp)|application\/(msword|vnd\.openxmlformats-officedocument\.[a-z.]+|vnd\.ms-excel)|text\/plain)$/;

type Init = { matterId?: string | null; clientId?: string | null; name: string; mimeType: string; size: number };
export type InitResult = { ok: true; docId: string; url: string; key: string; token: string } | { ok: false; error: string };

const sign = (docId: string, matterId: string, clientId: string, userId: string, size: number, exp: number) =>
  hmac(`direct-upload|${docId}|${matterId}|${clientId}|${userId}|${size}|${exp}`);

export async function initDirectUploadAction(input: Init): Promise<InitResult> {
  const user = await requireStaff("docs:write");
  if (!directUploadEnabled()) return { ok: false, error: "الرفع المباشر غير مفعّل." };
  const matterId = input.matterId || "";
  const clientId = input.clientId || "";
  if (matterId && !(await canSeeMatter(user, matterId))) return { ok: false, error: "لا صلاحية على هذه القضية." };
  const size = Math.floor(Number(input.size));
  if (!Number.isFinite(size) || size <= 0) return { ok: false, error: "ملف فارغ." };
  if (size > DIRECT_MAX_BYTES) return { ok: false, error: "الحد الأقصى 100 ميغابايت." };
  if (!ALLOWED.test(input.mimeType)) return { ok: false, error: "نوع الملف غير مسموح." };

  const docId = randomUUID();
  const exp = Date.now() + 15 * 60 * 1000;
  const url = await presignPut(`docs/${docId}.bin`, size + OVERHEAD);
  return {
    ok: true,
    docId,
    url,
    key: deriveKey(`doc:${docId}`).toString("base64"),
    token: `${exp}.${sign(docId, matterId, clientId, user.id, size, exp)}`,
  };
}

type Fin = { docId: string; token: string; matterId?: string | null; clientId?: string | null; name: string; mimeType: string; size: number; category: string; sharedWithClient: boolean };

export async function finalizeDirectUploadAction(input: Fin): Promise<{ ok: boolean; error?: string }> {
  const user = await requireStaff("docs:write");
  const matterId = input.matterId || "";
  const clientId = input.clientId || "";
  const size = Math.floor(Number(input.size));
  const [expStr, mac] = String(input.token).split(".");
  const exp = Number(expStr);
  if (!exp || Date.now() > exp + 30 * 60 * 1000 || mac !== sign(input.docId, matterId, clientId, user.id, size, exp)) return { ok: false, error: "رمز الرفع غير صالح أو منتهٍ." };
  if (matterId && !(await canSeeMatter(user, matterId))) return { ok: false, error: "لا صلاحية على هذه القضية." };
  if (!ALLOWED.test(input.mimeType)) return { ok: false, error: "نوع الملف غير مسموح." };

  const key = `docs/${input.docId}.bin`;
  const stored = await headSize(key);
  if (stored !== size + OVERHEAD) {
    await storeDelete("s3e", key);
    return { ok: false, error: "لم يكتمل الرفع، أعد المحاولة." };
  }

  const d = await db();
  let cid: string | null = clientId || null;
  if (matterId && !cid) {
    const [m] = await d.select({ clientId: matters.clientId }).from(matters).where(eq(matters.id, matterId)).limit(1);
    cid = m?.clientId ?? null;
  }
  await d.insert(documents).values({
    id: input.docId,
    matterId: matterId || null,
    clientId: cid,
    name: input.name.trim().slice(0, 200) || "مستند",
    category: input.category || "general",
    mimeType: input.mimeType,
    size,
    storageKind: "s3e",
    storageKey: key,
    sharedWithClient: !!input.sharedWithClient,
    uploadedBy: user.id,
  });
  await audit({ id: user.id, name: user.fullName }, "document_uploaded", "document", input.docId, { name: input.name, size, direct: true });
  revalidatePath("/admin/documents");
  if (matterId) revalidatePath(`/admin/matters/${matterId}`);
  return { ok: true };
}
