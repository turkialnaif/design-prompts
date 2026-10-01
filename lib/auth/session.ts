import "server-only";
import { cache } from "react";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { and, eq, gt } from "drizzle-orm";
import { db } from "@/lib/db";
import { clientUsers, sessions, users } from "@/lib/db/schema";
import { randomToken, sha256 } from "@/lib/auth/crypto";
import { can, type Cap } from "@/lib/auth/perms";

const isProd = process.env.NODE_ENV === "production" && !process.env.ALLOW_LOCAL_DB;
const COOKIES = {
  staff: isProd ? "__Host-tnz_staff" : "tnz_staff",
  client: isProd ? "__Host-tnz_client" : "tnz_client",
} as const;

const TTL_MS = 12 * 60 * 60 * 1000;

export type Kind = "staff" | "client";

export async function requestMeta() {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? h.get("x-real-ip") ?? "unknown";
  return { ip, userAgent: (h.get("user-agent") ?? "").slice(0, 200) };
}

export async function createSession(kind: Kind, subjectId: string) {
  const token = randomToken();
  const { ip, userAgent } = await requestMeta();
  const expiresAt = new Date(Date.now() + TTL_MS);
  const d = await db();
  await d.insert(sessions).values({ tokenHash: sha256(token), kind, subjectId, expiresAt, ip, userAgent });
  const store = await cookies();
  store.set(COOKIES[kind], token, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function destroySession(kind: Kind) {
  const store = await cookies();
  const token = store.get(COOKIES[kind])?.value;
  if (token) {
    const d = await db();
    await d.delete(sessions).where(eq(sessions.tokenHash, sha256(token)));
  }
  store.delete(COOKIES[kind]);
}

async function resolve(kind: Kind) {
  const store = await cookies();
  const token = store.get(COOKIES[kind])?.value;
  if (!token) return null;
  const d = await db();
  const [row] = await d
    .select()
    .from(sessions)
    .where(and(eq(sessions.tokenHash, sha256(token)), eq(sessions.kind, kind), gt(sessions.expiresAt, new Date())))
    .limit(1);
  return row ?? null;
}

export const getStaff = cache(async () => {
  const s = await resolve("staff");
  if (!s) return null;
  const d = await db();
  const [user] = await d.select().from(users).where(and(eq(users.id, s.subjectId), eq(users.isActive, true))).limit(1);
  return user ?? null;
});

export const getClientUser = cache(async () => {
  const s = await resolve("client");
  if (!s) return null;
  const d = await db();
  const [user] = await d
    .select()
    .from(clientUsers)
    .where(and(eq(clientUsers.id, s.subjectId), eq(clientUsers.isActive, true)))
    .limit(1);
  return user ?? null;
});

export type Staff = NonNullable<Awaited<ReturnType<typeof getStaff>>>;

/** للاستخدام داخل الصفحات والإجراءات: يعيد المستخدم أو يحوّل إلى الدخول. */
export async function requireStaff(cap?: Cap): Promise<Staff> {
  const user = await getStaff();
  if (!user) redirect("/admin/login");
  if (cap && !can(user.role, cap)) redirect("/admin?denied=1");
  return user;
}

export async function requireClient() {
  const user = await getClientUser();
  if (!user) redirect("/portal/login");
  return user;
}
