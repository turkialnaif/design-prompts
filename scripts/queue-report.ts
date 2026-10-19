/**
 * تقرير للقراءة فقط عن طابور الإرسال الآلي (جهات emailOn ولم تكتمل رسائلها ولم ترتدّ ولم توقف ولم تردّ).
 * لا يكتب شيئًا في القاعدة ولا يطبع عناوين البريد كاملة.
 *   DATABASE_URL=… npx tsx scripts/queue-report.ts
 */
import { and, eq, lt } from "drizzle-orm";
import { db } from "../lib/db";
import { prospectContacts, prospects } from "../lib/db/schema";
import { domainOf } from "../lib/prospects/hygiene";

const tally = (rows: string[]) => Object.entries(rows.reduce<Record<string, number>>((m, k) => ((m[k] = (m[k] ?? 0) + 1), m), {})).sort((a, b) => b[1] - a[1]);

async function main() {
  const d = await db();
  const rows = await d
    .select({ c: prospectContacts, p: prospects })
    .from(prospectContacts)
    .innerJoin(prospects, eq(prospectContacts.prospectId, prospects.id))
    .where(and(eq(prospectContacts.emailOn, true), eq(prospectContacts.replied, false), eq(prospectContacts.bounced, false), eq(prospectContacts.unsubscribed, false), lt(prospectContacts.emailStep, 3)));
  const q = rows.filter((r) => r.c.email);
  console.log("queue:", q.length, "| step0 (new):", q.filter((r) => r.c.emailStep === 0).length, "| mid-sequence:", q.filter((r) => r.c.emailStep > 0).length);
  const dom = (e: string) => {
    const x = domainOf(e);
    return x.endsWith(".sa") ? ".sa" : x.endsWith(".com") ? ".com" : "." + (x.split(".").pop() ?? "?");
  };
  const wd = (r: (typeof q)[number]) => {
    try {
      return r.p.website ? new URL(r.p.website.startsWith("http") ? r.p.website : `https://${r.p.website}`).hostname.replace(/^www\./, "") : "";
    } catch {
      return "";
    }
  };
  const same = (r: (typeof q)[number]) => (wd(r) && domainOf(r.c.email!).endsWith(wd(r)) ? "same-as-website" : wd(r) ? "different-from-website" : "no-website");
  console.log("by tier:", JSON.stringify(tally(q.map((r) => String(r.p.tier ?? "null")))));
  console.log("by rank:", JSON.stringify(tally(q.map((r) => String(r.p.rank ?? "null")))));
  console.log("by priority flag:", JSON.stringify(tally(q.map((r) => String(r.p.priority)))));
  console.log("by tld:", JSON.stringify(tally(q.map((r) => dom(r.c.email!)))));
  console.log("by channel:", JSON.stringify(tally(q.map((r) => r.c.channel))));
  console.log("has full name:", JSON.stringify(tally(q.map((r) => (r.c.fullName ? "yes" : "no")))));
  console.log("email domain vs website:", JSON.stringify(tally(q.map(same))));
  console.log("by list:", JSON.stringify(tally(q.map((r) => r.p.list))));
  console.log("top sectors:", JSON.stringify(tally(q.map((r) => r.p.sector ?? "?")).slice(0, 12)));
  console.log("size notes (top):", JSON.stringify(tally(q.map((r) => (r.p.sizeNote ?? "").slice(0, 40))).slice(0, 8)));
  const sample = q.slice(0, 12).map((r) => `${r.p.name} | tier ${r.p.tier} | ${r.p.sector} | ${r.c.channel} | ${dom(r.c.email!)}`);
  console.log("sample:\n" + sample.join("\n"));
  process.exit(0);
}
main();
