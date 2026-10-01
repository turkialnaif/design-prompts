import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { documents } from "@/lib/db/schema";
import { getStaff } from "@/lib/auth/session";
import { can } from "@/lib/auth/perms";
import { deriveKey } from "@/lib/auth/crypto";
import { canSeeMatter } from "@/lib/erp/queries";
import { presignGet } from "@/lib/erp/storage";
import { audit } from "@/lib/audit";

/** For direct-upload documents: a short-lived download URL plus the per-document key. The browser fetches and decrypts. */
export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const user = await getStaff();
  if (!user || !can(user.role, "docs:read")) return new Response("Unauthorized", { status: 401 });
  const { id } = await ctx.params;
  const d = await db();
  const [doc] = await d.select().from(documents).where(eq(documents.id, id)).limit(1);
  if (!doc || doc.storageKind !== "s3e") return new Response("Not found", { status: 404 });
  if (doc.matterId && !(await canSeeMatter(user, doc.matterId))) return new Response("Forbidden", { status: 403 });
  await audit({ id: user.id, name: user.fullName }, "document_viewed", "document", id, { name: doc.name, direct: true });
  return Response.json(
    { url: await presignGet(doc.storageKey), key: deriveKey(`doc:${doc.id}`).toString("base64"), name: doc.name, mime: doc.mimeType },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
