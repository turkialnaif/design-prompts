"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { clientUsers } from "@/lib/db/schema";
import { hashPassword, passwordProblems, verifyPassword } from "@/lib/auth/crypto";
import { createSession, destroySession, getClientUser, requestMeta } from "@/lib/auth/session";
import { audit } from "@/lib/audit";

const DUMMY = "scrypt$16384$8$1$AAAAAAAAAAAAAAAAAAAAAA==$AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==";

export type PortalLoginState = { error?: string } | null;

export async function portalLoginAction(_prev: PortalLoginState, formData: FormData): Promise<PortalLoginState> {
  const username = String(formData.get("username") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!username || !password) return { error: "أدخل اسم المستخدم وكلمة المرور." };
  await requestMeta();
  const d = await db();
  const [u] = await d.select().from(clientUsers).where(eq(clientUsers.username, username)).limit(1);
  if (u?.lockedUntil && u.lockedUntil > new Date()) {
    await verifyPassword(password, DUMMY);
    return { error: "الحساب مقفل مؤقتًا. حاول بعد قليل." };
  }
  const ok = await verifyPassword(password, u?.passwordHash ?? DUMMY);
  if (!u || !ok || !u.isActive) {
    if (u) {
      const fails = u.failedLogins + 1;
      await d.update(clientUsers).set({ failedLogins: fails, lockedUntil: fails >= 5 ? new Date(Date.now() + 15 * 60 * 1000) : u.lockedUntil }).where(eq(clientUsers.id, u.id));
    }
    await audit({ kind: "client" }, "login_failed", "client_user", undefined, { username });
    return { error: "بيانات الدخول غير صحيحة." };
  }
  await d.update(clientUsers).set({ failedLogins: 0, lockedUntil: null, lastLoginAt: new Date() }).where(eq(clientUsers.id, u.id));
  await createSession("client", u.id);
  await audit({ id: u.id, name: u.fullName, kind: "client" }, "login", "client_user", u.id);
  redirect(u.mustChangePassword ? "/portal/account" : "/portal");
}

export async function portalLogoutAction() {
  await destroySession("client");
  redirect("/portal/login");
}

export async function portalChangePasswordAction(_prev: { error?: string; ok?: boolean } | null, formData: FormData) {
  const u = await getClientUser();
  if (!u) redirect("/portal/login");
  const current = String(formData.get("current") ?? "");
  const next = String(formData.get("next") ?? "");
  if (!(await verifyPassword(current, u.passwordHash))) return { error: "كلمة المرور الحالية غير صحيحة." };
  if (next !== String(formData.get("confirm") ?? "")) return { error: "كلمتا المرور غير متطابقتين." };
  const problem = passwordProblems(next);
  if (problem) return { error: problem };
  const d = await db();
  await d.update(clientUsers).set({ passwordHash: await hashPassword(next), mustChangePassword: false }).where(eq(clientUsers.id, u.id));
  await audit({ id: u.id, name: u.fullName, kind: "client" }, "password_changed", "client_user", u.id);
  return { ok: true };
}
