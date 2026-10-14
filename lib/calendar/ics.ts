import "server-only";
import { randomBytes } from "node:crypto";
import { and, asc, eq, gte, lt, ne, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { events, matters, settings, tasks, users } from "@/lib/db/schema";
import { matterScope } from "@/lib/erp/queries";
import { eventKindLabel } from "@/lib/erp/labels";
import { SITE } from "@/lib/leads/emails";

const key = (userId: string) => `ical:${userId}`;

/** رابط الاشتراك الخاص بكل مستخدم: رمز عشوائي طويل، يُجدَّد بنقرة فيبطل القديم. */
export async function feedToken(userId: string, rotate = false): Promise<string> {
  const d = await db();
  if (!rotate) {
    const [row] = await d.select().from(settings).where(eq(settings.key, key(userId))).limit(1);
    const t = (row?.value as { token?: string } | undefined)?.token;
    if (t) return t;
  }
  const token = randomBytes(24).toString("base64url");
  await d.insert(settings).values({ key: key(userId), value: { token } }).onConflictDoUpdate({ target: settings.key, set: { value: { token } } });
  return token;
}

export const feedUrl = (token: string) => `${SITE}/api/calendar/${token}.ics`;

export async function userByToken(token: string) {
  if (!/^[A-Za-z0-9_-]{20,64}$/.test(token)) return null;
  const d = await db();
  const [row] = await d.select().from(settings).where(and(sql`${settings.key} like 'ical:%'`, sql`${settings.value}->>'token' = ${token}`)).limit(1);
  if (!row) return null;
  const [u] = await d.select().from(users).where(and(eq(users.id, row.key.slice(5)), eq(users.isActive, true))).limit(1);
  return u ?? null;
}

const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/;/g, "\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const day = (s: string) => s.replace(/-/g, "");

/** طيّ الأسطر عند 75 بايتًا (RFC 5545) دون قطع حرف عربي من منتصفه. */
function fold(line: string): string {
  const out: string[] = [];
  let cur = "";
  let bytes = 0;
  for (const ch of line) {
    const n = Buffer.byteLength(ch);
    if (bytes + n > (out.length ? 74 : 75)) { out.push(cur); cur = ""; bytes = 0; }
    cur += ch;
    bytes += n;
  }
  out.push(cur);
  return out.join("\r\n ");
}

export async function buildIcs(user: typeof users.$inferSelect): Promise<string> {
  const d = await db();
  const scope = await matterScope(user);
  const from = new Date(Date.now() - 60 * 864e5);
  const to = new Date(Date.now() + 400 * 864e5);
  const rows = await d
    .select({ e: events, m: matters })
    .from(events)
    .leftJoin(matters, eq(events.matterId, matters.id))
    .where(and(eq(events.source, "site"), gte(events.startsAt, from), lt(events.startsAt, to), scope ? sql`(${events.matterId} is null or ${scope})` : undefined))
    .orderBy(asc(events.startsAt))
    .limit(2000);
  const due = await d
    .select({ t: tasks, m: matters })
    .from(tasks)
    .leftJoin(matters, eq(tasks.matterId, matters.id))
    .where(and(eq(tasks.assigneeId, user.id), ne(tasks.status, "done"), sql`${tasks.dueOn} is not null`))
    .limit(500);

  const L: string[] = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//TAAP//Office Calendar//AR", "CALSCALE:GREGORIAN", "METHOD:PUBLISH", `X-WR-CALNAME:${esc("تركي النايف وشركاؤه · الجلسات والمواعيد")}`, "X-WR-TIMEZONE:Asia/Riyadh", "REFRESH-INTERVAL;VALUE=DURATION:PT1H", "X-PUBLISHED-TTL:PT1H"];
  const now = stamp(new Date());

  for (const { e, m } of rows) {
    const end = e.endsAt ?? new Date(e.startsAt.getTime() + 3600e3);
    const state = e.status === "postponed" ? "مؤجلة · " : e.status === "done" ? "منتهية · " : "";
    const desc = [m ? `الملف: ${m.number} · ${m.title}` : null, e.notes, m ? `${SITE}/admin/matters/${m.id}` : `${SITE}/admin/calendar`].filter(Boolean).join("\n");
    L.push("BEGIN:VEVENT", `UID:${e.id}@taap.sa`, `DTSTAMP:${now}`, `DTSTART:${stamp(e.startsAt)}`, `DTEND:${stamp(end)}`, `SUMMARY:${esc(`${state}${eventKindLabel[e.kind]}: ${e.title}`)}`, `DESCRIPTION:${esc(desc)}`);
    if (e.location) L.push(`LOCATION:${esc(e.location)}`);
    L.push(`STATUS:${e.status === "cancelled" ? "CANCELLED" : "CONFIRMED"}`, "TRANSP:OPAQUE");
    if (e.status === "scheduled") {
      if (e.remindDaysBefore > 0) L.push("BEGIN:VALARM", "ACTION:DISPLAY", `DESCRIPTION:${esc(e.title)}`, `TRIGGER:-P${e.remindDaysBefore}D`, "END:VALARM");
      L.push("BEGIN:VALARM", "ACTION:DISPLAY", `DESCRIPTION:${esc(e.title)}`, "TRIGGER:-PT1H", "END:VALARM");
    }
    L.push("END:VEVENT");
  }
  for (const { t, m } of due) {
    const next = new Date(`${t.dueOn}T00:00:00Z`);
    next.setUTCDate(next.getUTCDate() + 1);
    L.push("BEGIN:VEVENT", `UID:task-${t.id}@taap.sa`, `DTSTAMP:${now}`, `DTSTART;VALUE=DATE:${day(t.dueOn!)}`, `DTEND;VALUE=DATE:${day(next.toISOString().slice(0, 10))}`, `SUMMARY:${esc(`مهمة: ${t.title}`)}`, `DESCRIPTION:${esc([m ? `الملف: ${m.number} · ${m.title}` : null, `${SITE}/admin/tasks`].filter(Boolean).join("\n"))}`, "TRANSP:TRANSPARENT", "END:VEVENT");
  }
  L.push("END:VCALENDAR");
  return L.map(fold).join("\r\n") + "\r\n";
}
