"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db";
import { ROLES, users, type Role } from "@/lib/db/schema";
import { hashPassword, randomToken } from "@/lib/auth/crypto";
import { requireStaff } from "@/lib/auth/session";
import { audit } from "@/lib/audit";

function tempPassword() {
  return `${randomToken(6)}-${Math.floor(1000 + Math.random() * 9000)}Aa`;
}

const createSchema = z.object({
  username: z.string().trim().toLowerCase().regex(/^[a-z0-9._-]{3,32}$/, "اسم المستخدم: ٣–٣٢ حرفًا لاتينيًا أو أرقامًا"),
  fullName: z.string().trim().min(3, "أدخل الاسم الكامل"),
  role: z.enum(ROLES),
  email: z.string().trim().email("بريد غير صالح").optional().or(z.literal("")),
  hourlyRate: z.string().optional(),
  barNumber: z.string().optional(),
});

export type UserFormState = { error?: string; created?: { username: string; password: string } } | null;

export async function createUserAction(_prev: UserFormState, formData: FormData): Promise<UserFormState> {
  const actor = await requireStaff("users:manage");
  const parsed = createSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "بيانات غير صالحة" };
  const v = parsed.data;
  const d = await db();
  const [exists] = await d.select({ id: users.id }).from(users).where(eq(users.username, v.username)).limit(1);
  if (exists) return { error: "اسم المستخدم مستخدم من قبل." };
  const password = tempPassword();
  const [row] = await d
    .insert(users)
    .values({
      username: v.username,
      fullName: v.fullName,
      role: v.role,
      email: v.email || null,
      hourlyRate: v.hourlyRate || null,
      barNumber: v.barNumber || null,
      passwordHash: await hashPassword(password),
      mustChangePassword: true,
    })
    .returning({ id: users.id });
  await audit({ id: actor.id, name: actor.fullName }, "user_created", "user", row.id, { username: v.username, role: v.role });
  revalidatePath("/admin/users");
  return { created: { username: v.username, password } };
}

export async function resetPasswordAction(_prev: UserFormState, formData: FormData): Promise<UserFormState> {
  const actor = await requireStaff("users:manage");
  const id = String(formData.get("id"));
  const d = await db();
  const [u] = await d.select().from(users).where(eq(users.id, id)).limit(1);
  if (!u) return { error: "المستخدم غير موجود." };
  const password = tempPassword();
  await d.update(users).set({ passwordHash: await hashPassword(password), mustChangePassword: true, failedLogins: 0, lockedUntil: null }).where(eq(users.id, id));
  await audit({ id: actor.id, name: actor.fullName }, "password_reset", "user", id);
  revalidatePath("/admin/users");
  return { created: { username: u.username, password } };
}

export async function updateUserAction(formData: FormData) {
  const actor = await requireStaff("users:manage");
  const id = String(formData.get("id"));
  const intent = String(formData.get("intent"));
  const d = await db();
  const [u] = await d.select().from(users).where(eq(users.id, id)).limit(1);
  if (!u) return;
  if (u.id === actor.id && (intent === "deactivate" || intent === "role")) return;
  if (intent === "deactivate") await d.update(users).set({ isActive: false }).where(eq(users.id, id));
  if (intent === "activate") await d.update(users).set({ isActive: true }).where(eq(users.id, id));
  if (intent === "unlock") await d.update(users).set({ failedLogins: 0, lockedUntil: null }).where(eq(users.id, id));
  if (intent === "reset2fa") await d.update(users).set({ totpEnabled: false, totpSecret: null }).where(eq(users.id, id));
  if (intent === "role") {
    const role = String(formData.get("role")) as Role;
    if (ROLES.includes(role)) await d.update(users).set({ role }).where(eq(users.id, id));
  }
  await audit({ id: actor.id, name: actor.fullName }, `user_${intent}`, "user", id);
  revalidatePath("/admin/users");
}
