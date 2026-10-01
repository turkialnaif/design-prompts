"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { and, count, eq, gt } from "drizzle-orm";
import { db } from "@/lib/db";
import { auditLog, users } from "@/lib/db/schema";
import { hashPassword, hmac, passwordProblems, verifyPassword, encryptText, decryptText } from "@/lib/auth/crypto";
import { createSession, destroySession, getStaff, requestMeta } from "@/lib/auth/session";
import { generateTotpSecret, verifyTotp } from "@/lib/auth/totp";
import { audit } from "@/lib/audit";

export type LoginState = { error?: string; step?: "2fa" } | null;

const PENDING = "tnz_2fa";
const MAX_FAILS = 5;
const LOCK_MS = 15 * 60 * 1000;
const DUMMY_HASH = "scrypt$16384$8$1$AAAAAAAAAAAAAAAAAAAAAA==$AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==";

async function ipBlocked(ip: string) {
  const d = await db();
  const since = new Date(Date.now() - 10 * 60 * 1000);
  const [row] = await d
    .select({ n: count() })
    .from(auditLog)
    .where(and(eq(auditLog.action, "login_failed"), eq(auditLog.ip, ip), gt(auditLog.createdAt, since)));
  return (row?.n ?? 0) >= 20;
}

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const username = String(formData.get("username") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!username || !password) return { error: "أدخل اسم المستخدم وكلمة المرور." };

  const { ip } = await requestMeta();
  if (await ipBlocked(ip)) return { error: "محاولات كثيرة. حاول لاحقًا." };

  const d = await db();
  const [user] = await d.select().from(users).where(eq(users.username, username)).limit(1);

  if (user?.lockedUntil && user.lockedUntil > new Date()) {
    await verifyPassword(password, DUMMY_HASH);
    return { error: "الحساب مقفل مؤقتًا بسبب محاولات فاشلة. حاول بعد قليل." };
  }

  const ok = await verifyPassword(password, user?.passwordHash ?? DUMMY_HASH);
  if (!user || !ok || !user.isActive) {
    if (user) {
      const fails = user.failedLogins + 1;
      await d
        .update(users)
        .set({ failedLogins: fails, lockedUntil: fails >= MAX_FAILS ? new Date(Date.now() + LOCK_MS) : user.lockedUntil })
        .where(eq(users.id, user.id));
    }
    await audit(null, "login_failed", "user", undefined, { username });
    return { error: "بيانات الدخول غير صحيحة." };
  }

  if (user.totpEnabled) {
    const payload = Buffer.from(JSON.stringify({ u: user.id, e: Date.now() + 5 * 60 * 1000 })).toString("base64url");
    (await cookies()).set(PENDING, `${payload}.${hmac(payload)}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" && !process.env.ALLOW_LOCAL_DB,
      sameSite: "lax",
      path: "/",
      maxAge: 300,
    });
    return { step: "2fa" };
  }

  await finishLogin(user.id, user.fullName);
  redirect("/admin");
}

async function finishLogin(userId: string, name: string) {
  const d = await db();
  await d.update(users).set({ failedLogins: 0, lockedUntil: null, lastLoginAt: new Date() }).where(eq(users.id, userId));
  await createSession("staff", userId);
  await audit({ id: userId, name }, "login", "user", userId);
}

export async function verify2faAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const code = String(formData.get("code") ?? "");
  const store = await cookies();
  const raw = store.get(PENDING)?.value;
  if (!raw) return { error: "انتهت المهلة. أعد تسجيل الدخول." };
  const [payload, sig] = raw.split(".");
  if (!payload || !sig || hmac(payload) !== sig) return { error: "طلب غير صالح." };
  const { u, e } = JSON.parse(Buffer.from(payload, "base64url").toString()) as { u: string; e: number };
  if (Date.now() > e) return { error: "انتهت المهلة. أعد تسجيل الدخول." };

  const d = await db();
  const [user] = await d.select().from(users).where(eq(users.id, u)).limit(1);
  if (!user?.totpSecret || !user.isActive) return { error: "طلب غير صالح." };

  if (!verifyTotp(decryptText(user.totpSecret), code)) {
    await audit({ id: user.id, name: user.fullName }, "login_failed", "user", user.id, { step: "2fa" });
    return { step: "2fa", error: "الرمز غير صحيح." };
  }
  store.delete(PENDING);
  await finishLogin(user.id, user.fullName);
  redirect("/admin");
}

export async function logoutAction() {
  const user = await getStaff();
  if (user) await audit({ id: user.id, name: user.fullName }, "logout", "user", user.id);
  await destroySession("staff");
  redirect("/admin/login");
}

export async function changePasswordAction(_prev: { error?: string; ok?: boolean } | null, formData: FormData) {
  const user = await getStaff();
  if (!user) redirect("/admin/login");
  const current = String(formData.get("current") ?? "");
  const next = String(formData.get("next") ?? "");
  const confirm = String(formData.get("confirm") ?? "");
  if (!(await verifyPassword(current, user.passwordHash))) return { error: "كلمة المرور الحالية غير صحيحة." };
  if (next !== confirm) return { error: "كلمتا المرور غير متطابقتين." };
  const problem = passwordProblems(next);
  if (problem) return { error: problem };
  if (next === current) return { error: "اختر كلمة مرور مختلفة عن الحالية." };
  const d = await db();
  await d.update(users).set({ passwordHash: await hashPassword(next), mustChangePassword: false }).where(eq(users.id, user.id));
  await audit({ id: user.id, name: user.fullName }, "password_changed", "user", user.id);
  return { ok: true };
}

export async function beginTotpSetup() {
  const user = await getStaff();
  if (!user) redirect("/admin/login");
  const secret = generateTotpSecret();
  const d = await db();
  await d.update(users).set({ totpSecret: encryptText(secret), totpEnabled: false }).where(eq(users.id, user.id));
  redirect("/admin/account?setup=1");
}

export async function confirmTotpAction(_prev: { error?: string; ok?: boolean } | null, formData: FormData) {
  const user = await getStaff();
  if (!user?.totpSecret) redirect("/admin/login");
  if (!verifyTotp(decryptText(user.totpSecret), String(formData.get("code") ?? ""))) return { error: "الرمز غير صحيح." };
  const d = await db();
  await d.update(users).set({ totpEnabled: true }).where(eq(users.id, user.id));
  await audit({ id: user.id, name: user.fullName }, "2fa_enabled", "user", user.id);
  return { ok: true };
}

export async function disableTotp() {
  const user = await getStaff();
  if (!user) redirect("/admin/login");
  const d = await db();
  await d.update(users).set({ totpSecret: null, totpEnabled: false }).where(eq(users.id, user.id));
  await audit({ id: user.id, name: user.fullName }, "2fa_disabled", "user", user.id);
  redirect("/admin/account");
}
