"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { messages } from "@/lib/db/schema";
import { requireClient, requireStaff } from "@/lib/auth/session";
import { canSeeMatter } from "@/lib/erp/queries";
import { audit } from "@/lib/audit";
import { matters } from "@/lib/db/schema";

export async function staffSendMessageAction(formData: FormData) {
  const user = await requireStaff("matters:read");
  const matterId = String(formData.get("matterId"));
  if (!(await canSeeMatter(user, matterId))) return;
  const body = String(formData.get("body") ?? "").trim();
  if (!body || body.length > 4000) return;
  const d = await db();
  await d.insert(messages).values({ matterId, fromKind: "staff", fromId: user.id, body });
  await audit({ id: user.id, name: user.fullName }, "message_sent", "matter", matterId);
  revalidatePath(`/admin/matters/${matterId}`);
}

export async function clientSendMessageAction(formData: FormData) {
  const cu = await requireClient();
  const matterId = String(formData.get("matterId"));
  const d = await db();
  const [m] = await d.select({ clientId: matters.clientId }).from(matters).where(eq(matters.id, matterId)).limit(1);
  if (!m || m.clientId !== cu.clientId) return;
  const body = String(formData.get("body") ?? "").trim();
  if (!body || body.length > 4000) return;
  await d.insert(messages).values({ matterId, fromKind: "client", fromId: cu.id, body });
  await audit({ id: cu.id, name: cu.fullName, kind: "client" }, "client_message_sent", "matter", matterId);
  revalidatePath(`/portal/matters/${matterId}`);
}
