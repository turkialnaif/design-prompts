/**
 * يستورد ملف «شركات الرياض» (بعد تحويله بـ scripts/xlsx-to-csv.py) إلى قاعدة الاستقطاب.
 *   npx tsx scripts/import-prospects.ts /tmp/riyadh.csv --dry     ← يعرض الأرقام فقط
 *   DATABASE_URL=… npx tsx scripts/import-prospects.ts /tmp/riyadh.csv --yes
 * الاستيراد واسع ولا يفعّل الإرسال الآلي إلا لشريحة ضيقة: مرتبة 1 أو 2، بريد باسم شخص أو وظيفي،
 * ليس بريدًا شخصيًا (gmail…)، وليس مشتركًا بين شركات. الباقي يبقى قاعدة بحث ومتابعة يدوية.
 */
import { readFileSync } from "node:fs";
import { eq } from "drizzle-orm";
import { db } from "../lib/db";
import { prospectContacts, prospects, suppressions } from "../lib/db/schema";
import { nameKey } from "../lib/prospects/companies";
import { parseCsv } from "../lib/prospects/csv";
import { isDeptMailbox, isForeignCountryDomain } from "../lib/prospects/hygiene";

const file = process.argv[2];
const dry = process.argv.includes("--dry");
const yes = process.argv.includes("--yes");
const LIST = "riyadh";

const FREE = /@(gmail|googlemail|hotmail|yahoo|outlook|live|icloud|msn|aol|proton(mail)?)\./i;
const GENERIC = /^(info|contact|contactus|sales|admin|hr|support|office|mail|hello|enquiries|inquiries|marketing|customerservice|care)@/i;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function channelOf(email: string, type: string): string {
  if (FREE.test(email)) return "free";
  if (isForeignCountryDomain(email)) return "foreign";
  if (isDeptMailbox(email)) return "generic";
  if (/مستثمر|مساهم/.test(type)) return "ir";
  if (GENERIC.test(email) || /عام/.test(type)) return "generic";
  if (/وظيفي|قانوني|التزام/.test(type)) return "role";
  return "named";
}

async function main() {
  if (!file) {
    console.error("usage: tsx scripts/import-prospects.ts <csv> [--dry] [--yes]");
    process.exit(1);
  }
  const rows = parseCsv(readFileSync(file, "utf8"));
  const head = rows[0];
  const ix = Object.fromEntries(head.map((h, i) => [h, i])) as Record<string, number>;
  const g = (r: string[], k: string) => (r[ix[k]] ?? "").trim();
  const data = rows.slice(1).filter((r) => g(r, "name"));

  // البريد المشترك بين أكثر من شركة (فروع أو بيانات غير دقيقة) لا يدخل الإرسال الآلي
  const owners = new Map<string, Set<string>>();
  for (const r of data) {
    const e = g(r, "email").toLowerCase();
    if (!EMAIL.test(e)) continue;
    (owners.get(e) ?? owners.set(e, new Set()).get(e)!).add(nameKey(g(r, "name")));
  }

  const plan = data.map((r) => {
    const email = g(r, "email").toLowerCase();
    const ok = EMAIL.test(email);
    const tier = Number(g(r, "tier").charAt(0)) || 3;
    let channel = ok ? channelOf(email, g(r, "email_type")) : "none";
    if (ok && (owners.get(email)?.size ?? 0) > 1) channel = "shared";
    const auto = ok && tier <= 2 && (channel === "named" || channel === "role");
    return { r, email: ok ? email : null, tier, channel, auto };
  });

  const by = (f: (p: (typeof plan)[number]) => string) => plan.reduce<Record<string, number>>((a, p) => ((a[f(p)] = (a[f(p)] ?? 0) + 1), a), {});
  console.log("rows", data.length);
  console.log("tiers", by((p) => String(p.tier)));
  console.log("channels", by((p) => p.channel));
  console.log("auto-email eligible", plan.filter((p) => p.auto).length);
  if (dry) return;
  if (process.env.DATABASE_URL && !yes) {
    console.error("This targets a real database. Re-run with --yes to write.");
    process.exit(1);
  }

  const d = await db();
  const keyed = new Map<string, (typeof plan)[number]>();
  for (const p of plan) {
    const k = nameKey(g(p.r, "name")) || g(p.r, "name").toLowerCase();
    if (!keyed.has(k) || p.tier < keyed.get(k)!.tier) keyed.set(k, p);
  }
  const companies = [...keyed.entries()].map(([k, p]) => ({
    list: LIST,
    name: g(p.r, "name"),
    nameKey: k,
    priority: p.tier === 1,
    tier: p.tier,
    sector: g(p.r, "sector") || null,
    phone: g(p.r, "phone") || null,
    website: g(p.r, "website") || null,
    sourceUrl: g(p.r, "source") || null,
    sizeNote: [g(p.r, "size"), g(p.r, "size_evidence")].filter((x) => x && x !== "غير متحقق").join(" — ") || (g(p.r, "size") ? "الحجم غير متحقق" : null),
    notes: [g(p.r, "role") && `الجهة المقترحة: ${g(p.r, "role")}`, g(p.r, "services") && `الخدمات المقترحة: ${g(p.r, "services")}`, g(p.r, "address") && `العنوان: ${g(p.r, "address")}`].filter(Boolean).join("\n") || null,
  }));
  for (let i = 0; i < companies.length; i += 400) await d.insert(prospects).values(companies.slice(i, i + 400)).onConflictDoNothing();
  const idByKey = new Map((await d.select({ id: prospects.id, k: prospects.nameKey }).from(prospects).where(eq(prospects.list, LIST))).map((x) => [x.k, x.id]));

  const sup = new Set((await d.select({ e: suppressions.email }).from(suppressions)).map((s) => s.e));
  const have = new Set((await d.select({ e: prospectContacts.email }).from(prospectContacts)).map((c) => c.e).filter(Boolean) as string[]);
  const contacts: (typeof prospectContacts.$inferInsert)[] = [];
  for (const p of plan) {
    if (!p.email || have.has(p.email)) continue;
    const pid = idByKey.get(nameKey(g(p.r, "name")) || g(p.r, "name").toLowerCase());
    if (!pid) continue;
    have.add(p.email);
    const suppressed = sup.has(p.email);
    contacts.push({ prospectId: pid, email: p.email, phone: g(p.r, "phone") || null, basis: "public_site", channel: p.channel, emailOn: p.auto && !suppressed, unsubscribed: suppressed });
  }
  for (let i = 0; i < contacts.length; i += 500) await d.insert(prospectContacts).values(contacts.slice(i, i + 500));
  console.log(`imported ${companies.length} companies, ${contacts.length} contacts, ${contacts.filter((c) => c.emailOn).length} in the automatic sequence`);
  process.exit(0);
}
main();
