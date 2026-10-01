"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db";
import { clientContacts, clientUsers, clients } from "@/lib/db/schema";
import { hashPassword, randomToken } from "@/lib/auth/crypto";
import { requireStaff } from "@/lib/auth/session";
import { audit } from "@/lib/audit";

const schema = z.object({
  type: z.enum(["individual", "company", "institution"]),
  name: z.string().trim().min(2, "أدخل اسم العميل"),
  identifier: z.string().trim().optional(),
  email: z.string().trim().email("بريد غير صالح").optional().or(z.literal("")),
  phone: z.string().trim().optional(),
  city: z.string().trim().optional(),
  address: z.string().trim().optional(),
  notes: z.string().trim().optional(),
});

const nul = (s?: string) => (s && s.length ? s : null);

export async function createClientAction(formData: FormData) {
  const user = await requireStaff("clients:write");
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect(`/admin/clients/new?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "بيانات غير صالحة")}`);
  const v = parsed.data;
  const d = await db();
  const [row] = await d
    .insert(clients)
    .values({ type: v.type, name: v.name, identifier: nul(v.identifier), email: nul(v.email), phone: nul(v.phone), city: nul(v.city), address: nul(v.address), notes: nul(v.notes), createdBy: user.id })
    .returning({ id: clients.id });
  await audit({ id: user.id, name: user.fullName }, "client_created", "client", row.id, { name: v.name });
  revalidatePath("/admin/clients");
  redirect(`/admin/clients/${row.id}`);
}

export async function updateClientAction(formData: FormData) {
  const user = await requireStaff("clients:write");
  const id = String(formData.get("id"));
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect(`/admin/clients/${id}?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "بيانات غير صالحة")}`);
  const v = parsed.data;
  const d = await db();
  await d
    .update(clients)
    .set({ type: v.type, name: v.name, identifier: nul(v.identifier), email: nul(v.email), phone: nul(v.phone), city: nul(v.city), address: nul(v.address), notes: nul(v.notes) })
    .where(eq(clients.id, id));
  await audit({ id: user.id, name: user.fullName }, "client_updated", "client", id);
  revalidatePath(`/admin/clients/${id}`);
  redirect(`/admin/clients/${id}?ok=${encodeURIComponent("تم حفظ بيانات العميل")}`);
}

export async function toggleArchiveClient(formData: FormData) {
  const user = await requireStaff("clients:write");
  const id = String(formData.get("id"));
  const d = await db();
  const [c] = await d.select().from(clients).where(eq(clients.id, id)).limit(1);
  if (!c) return;
  await d.update(clients).set({ archived: !c.archived }).where(eq(clients.id, id));
  await audit({ id: user.id, name: user.fullName }, c.archived ? "client_restored" : "client_archived", "client", id);
  revalidatePath(`/admin/clients/${id}`);
}

export async function addContactAction(formData: FormData) {
  const user = await requireStaff("clients:write");
  const clientId = String(formData.get("clientId"));
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;
  const d = await db();
  await d.insert(clientContacts).values({
    clientId,
    name,
    title: nul(String(formData.get("title") ?? "").trim()),
    email: nul(String(formData.get("email") ?? "").trim()),
    phone: nul(String(formData.get("phone") ?? "").trim()),
  });
  await audit({ id: user.id, name: user.fullName }, "contact_added", "client", clientId);
  revalidatePath(`/admin/clients/${clientId}`);
}

export async function deleteContactAction(formData: FormData) {
  await requireStaff("clients:write");
  const id = String(formData.get("id"));
  const clientId = String(formData.get("clientId"));
  const d = await db();
  await d.delete(clientContacts).where(eq(clientContacts.id, id));
  revalidatePath(`/admin/clients/${clientId}`);
}

export type PortalState = { error?: string; created?: { username: string; password: string } } | null;

export async function createPortalUserAction(_prev: PortalState, formData: FormData): Promise<PortalState> {
  const user = await requireStaff("portal:manage");
  const clientId = String(formData.get("clientId"));
  const username = String(formData.get("username") ?? "").trim().toLowerCase();
  const fullName = String(formData.get("fullName") ?? "").trim();
  if (!/^[a-z0-9._-]{3,32}$/.test(username)) return { error: "اسم المستخدم: ٣–٣٢ حرفًا لاتينيًا أو أرقامًا." };
  if (fullName.length < 3) return { error: "أدخل اسم من سيدخل البوابة." };
  const d = await db();
  const [exists] = await d.select({ id: clientUsers.id }).from(clientUsers).where(eq(clientUsers.username, username)).limit(1);
  if (exists) return { error: "اسم المستخدم مستخدم من قبل." };
  const password = `${randomToken(6)}-${Math.floor(1000 + Math.random() * 9000)}Aa`;
  await d.insert(clientUsers).values({
    clientId,
    username,
    fullName,
    email: nul(String(formData.get("email") ?? "").trim()),
    passwordHash: await hashPassword(password),
    mustChangePassword: true,
  });
  await audit({ id: user.id, name: user.fullName }, "portal_user_created", "client", clientId, { username });
  revalidatePath(`/admin/clients/${clientId}`);
  return { created: { username, password } };
}

export async function togglePortalUser(formData: FormData) {
  const user = await requireStaff("portal:manage");
  const id = String(formData.get("id"));
  const clientId = String(formData.get("clientId"));
  const d = await db();
  const [u] = await d.select().from(clientUsers).where(eq(clientUsers.id, id)).limit(1);
  if (!u) return;
  await d.update(clientUsers).set({ isActive: !u.isActive, failedLogins: 0, lockedUntil: null }).where(eq(clientUsers.id, id));
  await audit({ id: user.id, name: user.fullName }, u.isActive ? "portal_user_disabled" : "portal_user_enabled", "client", clientId);
  revalidatePath(`/admin/clients/${clientId}`);
}
