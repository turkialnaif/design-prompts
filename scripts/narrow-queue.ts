/**
 * يضيّق طابور الإرسال الآلي إلى المنشآت المتوسطة الخاصة، بإيقاف (لا حذف) جهات الاتصال الجديدة التي لم تُراسَل بعد ولا تطابق الشروط.
 * الإيقاف يعني emailOn=false وهو قابل للعكس من اللوحة؛ لا يُحذف شيء ولا تُلمس الجهات التي بدأت رسائلها.
 *
 * يبقى في الطابور من لم يُراسَل بعد إذا تحققت كل الشروط:
 *   1) ليست من المرتبة 1 (الشركات الكبرى المدرجة وذات الإدارات القانونية القوية، وعلامة الأولوية).
 *   2) قطاعها ليس التمويل والتأمين والاستثمار ولا الطاقة والمرافق ولا «أنشطة شركات أخرى» (غير محدد).
 *   3) نطاق البريد هو نطاق موقع المنشأة نفسه (العنوان يخص المنشأة لا طرفًا آخر).
 *
 *   DATABASE_URL=… npx tsx scripts/narrow-queue.ts /tmp/queue-paused.csv --dry
 *   DATABASE_URL=… npx tsx scripts/narrow-queue.ts /tmp/queue-paused.csv --yes
 */
import { writeFileSync } from "node:fs";
import { and, eq, inArray } from "drizzle-orm";
import { db } from "../lib/db";
import { prospectContacts, prospects } from "../lib/db/schema";
import { domainOf } from "../lib/prospects/hygiene";

const out = process.argv[2];
const dry = process.argv.includes("--dry");
const yes = process.argv.includes("--yes");
const EXCLUDED_SECTORS = ["التمويل والتأمين والاستثمار", "الطاقة والمرافق", "أنشطة شركات أخرى"];

const siteHost = (w: string | null) => {
  try {
    return w ? new URL(w.startsWith("http") ? w : `https://${w}`).hostname.replace(/^www\./, "").toLowerCase() : "";
  } catch {
    return "";
  }
};

async function main() {
  if (!out) throw new Error("usage: tsx scripts/narrow-queue.ts <paused.csv> [--dry] [--yes]");
  if (!dry && !yes) throw new Error("Re-run with --dry or --yes.");
  const d = await db();
  const rows = await d
    .select({ c: prospectContacts, p: prospects })
    .from(prospectContacts)
    .innerJoin(prospects, eq(prospectContacts.prospectId, prospects.id))
    .where(and(eq(prospectContacts.emailOn, true), eq(prospectContacts.replied, false), eq(prospectContacts.bounced, false), eq(prospectContacts.unsubscribed, false), eq(prospectContacts.emailStep, 0)));
  const reason = new Map<string, string>();
  for (const r of rows) {
    if (!r.c.email) continue;
    if (r.p.tier === 1 || r.p.priority) reason.set(r.c.id, "tier1_large");
    else if (EXCLUDED_SECTORS.includes(r.p.sector ?? "")) reason.set(r.c.id, "sector");
    else {
      const h = siteHost(r.p.website);
      if (!h || !domainOf(r.c.email).endsWith(h)) reason.set(r.c.id, "domain_not_company");
    }
  }
  const paused = rows.filter((r) => reason.has(r.c.id));
  const kept = rows.filter((r) => r.c.email && !reason.has(r.c.id));
  const tally: Record<string, number> = {};
  paused.forEach((r) => (tally[reason.get(r.c.id)!] = (tally[reason.get(r.c.id)!] ?? 0) + 1));
  console.log("new contacts in queue:", rows.length, "| to pause:", paused.length, JSON.stringify(tally), "| remain:", kept.length);
  const bySector: Record<string, number> = {};
  kept.forEach((r) => (bySector[r.p.sector ?? "?"] = (bySector[r.p.sector ?? "?"] ?? 0) + 1));
  console.log("remaining by sector:", JSON.stringify(Object.entries(bySector).sort((a, b) => b[1] - a[1])));
  const csv = ["reason,company,sector,tier,email_domain", ...paused.map((r) => [reason.get(r.c.id), r.p.name, r.p.sector ?? "", r.p.tier ?? "", domainOf(r.c.email ?? "")].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))].join("\n");
  writeFileSync(out, "﻿" + csv);
  console.log("list written:", out);
  if (dry) return process.exit(0);
  const ids = paused.map((r) => r.c.id);
  for (let i = 0; i < ids.length; i += 500) await d.update(prospectContacts).set({ emailOn: false }).where(inArray(prospectContacts.id, ids.slice(i, i + 500)));
  console.log("paused (emailOn=false):", ids.length);
  process.exit(0);
}
main();
