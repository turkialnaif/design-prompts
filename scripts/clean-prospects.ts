/**
 * ينظّف جهات الاتصال: يحذف المرتدّة، وصناديق الأقسام، والنطاقات غير السعودية، والنطاقات بلا خادم بريد.
 *   npx tsx scripts/clean-prospects.ts /tmp/backup.csv --dry
 *   DATABASE_URL=… npx tsx scripts/clean-prospects.ts /tmp/backup.csv --yes
 * يكتب نسخة CSV كاملة بما سيُحذف قبل الحذف. لا يلمس المنشآت ولا من أوقف الرسائل (يبقى سجل الإيقاف).
 */
import { writeFileSync } from "node:fs";
import { and, eq, inArray, isNotNull } from "drizzle-orm";
import { db } from "../lib/db";
import { prospectContacts, prospects } from "../lib/db/schema";
import { domainOf, hasMailServer, isDeptMailbox, isForeignCountryDomain } from "../lib/prospects/hygiene";

const out = process.argv[2];
const dry = process.argv.includes("--dry");
const yes = process.argv.includes("--yes");

async function pool<T, R>(items: T[], n: number, fn: (x: T) => Promise<R>): Promise<R[]> {
  const res: R[] = new Array(items.length);
  let i = 0;
  await Promise.all(Array.from({ length: n }, async () => { while (i < items.length) { const k = i++; res[k] = await fn(items[k]); } }));
  return res;
}

async function main() {
  if (!out) throw new Error("usage: tsx scripts/clean-prospects.ts <backup.csv> [--dry] [--yes]");
  if (process.env.DATABASE_URL && !dry && !yes) throw new Error("This targets a real database. Re-run with --yes to write.");
  const d = await db();
  const rows = await d.select({ c: prospectContacts, name: prospects.name }).from(prospectContacts).innerJoin(prospects, eq(prospectContacts.prospectId, prospects.id)).where(and(isNotNull(prospectContacts.email), eq(prospectContacts.unsubscribed, false)));
  const reason = new Map<string, string>();
  const rest: typeof rows = [];
  for (const r of rows) {
    const e = r.c.email!;
    if (r.c.bounced) reason.set(r.c.id, "bounced");
    else if (isForeignCountryDomain(e)) reason.set(r.c.id, "foreign");
    else if (isDeptMailbox(e)) reason.set(r.c.id, "dept");
    else rest.push(r);
  }
  const domains = [...new Set(rest.map((r) => domainOf(r.c.email!)))];
  console.log("contacts", rows.length, "| domains to check", domains.length);
  const ok = new Map<string, boolean>();
  await pool(domains, 30, async (dm) => void ok.set(dm, await hasMailServer(dm)));
  for (const r of rest) if (!ok.get(domainOf(r.c.email!))) reason.set(r.c.id, "no_mail_server");

  const doomed = rows.filter((r) => reason.has(r.c.id));
  const tally: Record<string, number> = {};
  doomed.forEach((r) => (tally[reason.get(r.c.id)!] = (tally[reason.get(r.c.id)!] ?? 0) + 1));
  console.log("to remove:", doomed.length, JSON.stringify(tally));
  const byChannel: Record<string, number> = {};
  doomed.forEach((r) => (byChannel[r.c.channel] = (byChannel[r.c.channel] ?? 0) + 1));
  console.log("by channel:", JSON.stringify(byChannel), "| were in the automatic queue:", doomed.filter((r) => r.c.emailOn && r.c.emailStep === 0).length, "| already emailed:", doomed.filter((r) => r.c.emailStep > 0).length);
  const noMx = doomed.filter((r) => reason.get(r.c.id) === "no_mail_server").slice(0, 8).map((r) => domainOf(r.c.email!));
  console.log("sample dead domains:", noMx.join(", "));

  const csv = ["reason,company,email,full_name,title,channel,email_step,created_at", ...doomed.map((r) => [reason.get(r.c.id), r.name, r.c.email, r.c.fullName ?? "", r.c.title ?? "", r.c.channel, r.c.emailStep, r.c.createdAt.toISOString()].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))].join("\n");
  writeFileSync(out, "﻿" + csv);
  console.log("backup written:", out);
  if (dry) return;
  const ids = doomed.map((r) => r.c.id);
  for (let i = 0; i < ids.length; i += 500) await d.delete(prospectContacts).where(inArray(prospectContacts.id, ids.slice(i, i + 500)));
  console.log("deleted", ids.length);
  process.exit(0);
}
main().catch((e) => { console.error(e); process.exit(1); });
