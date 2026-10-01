import { and, eq, gte, isNull, lte, ne, or, sql } from "drizzle-orm";
import { Resend } from "resend";
import { db } from "@/lib/db";
import { events, matters, tasks, users } from "@/lib/db/schema";
import { getFirmSettings } from "@/lib/erp/settings";

export const dynamic = "force-dynamic";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) return new Response("Unauthorized", { status: 401 });
  const key = process.env.RESEND_API_KEY;
  if (!key) return Response.json({ ok: false, error: "no email key" }, { status: 500 });
  const resend = new Resend(key);
  const firm = await getFirmSettings();
  const d = await db();
  const now = new Date();
  const horizon = new Date(now.getTime() + 30 * 864e5);

  const upcoming = await d
    .select({ e: events, m: matters, u: users })
    .from(events)
    .leftJoin(matters, eq(events.matterId, matters.id))
    .innerJoin(users, eq(events.assigneeId, users.id))
    .where(and(eq(events.status, "scheduled"), gte(events.startsAt, now), lte(events.startsAt, horizon), or(isNull(events.lastRemindedAt), sql`${events.lastRemindedAt} < ${events.startsAt} - make_interval(days => ${events.remindDaysBefore})`)));

  let sent = 0;
  for (const { e, m, u } of upcoming) {
    const daysLeft = (e.startsAt.getTime() - now.getTime()) / 864e5;
    if (daysLeft > e.remindDaysBefore || !u.email) continue;
    const when = new Intl.DateTimeFormat("ar-SA-u-nu-latn-ca-gregory", { dateStyle: "full", timeStyle: "short", timeZone: "Asia/Riyadh" }).format(e.startsAt);
    const { error } = await resend.emails.send({
      from: `${firm.remindEmailFrom} <onboarding@resend.dev>`,
      to: u.email,
      subject: `تذكير: ${e.title}`,
      html: `<div dir="rtl" style="font-family:Arial,sans-serif;line-height:1.9"><p>${esc(u.fullName)}،</p><p>تذكير بموعد قادم: <strong>${esc(e.title)}</strong></p><p>الموعد: ${esc(when)}</p>${e.location ? `<p>المكان: ${esc(e.location)}</p>` : ""}${m ? `<p>القضية: ${esc(m.number)} — ${esc(m.title)}</p>` : ""}</div>`,
    });
    if (!error) {
      await d.update(events).set({ lastRemindedAt: now }).where(eq(events.id, e.id));
      sent++;
    }
  }

  const tomorrow = new Date(now.getTime() + 864e5).toISOString().slice(0, 10);
  const dueTasks = await d
    .select({ t: tasks, u: users })
    .from(tasks)
    .innerJoin(users, eq(tasks.assigneeId, users.id))
    .where(and(ne(tasks.status, "done"), lte(tasks.dueOn, tomorrow)));
  const byUser = new Map<string, { email: string | null; name: string; items: string[] }>();
  for (const { t, u } of dueTasks) {
    const g = byUser.get(u.id) ?? { email: u.email, name: u.fullName, items: [] };
    g.items.push(`${t.title}${t.dueOn ? ` (${t.dueOn})` : ""}`);
    byUser.set(u.id, g);
  }
  for (const g of byUser.values()) {
    if (!g.email) continue;
    const { error } = await resend.emails.send({
      from: `${firm.remindEmailFrom} <onboarding@resend.dev>`,
      to: g.email,
      subject: "مهام مستحقة أو متأخرة",
      html: `<div dir="rtl" style="font-family:Arial,sans-serif;line-height:1.9"><p>${esc(g.name)}، لديك مهام تستحق اليوم أو الغد أو متأخرة:</p><ul>${g.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>`,
    });
    if (!error) sent++;
  }
  return Response.json({ ok: true, sent });
}
