/**
 * يدرج سجل القضايا المدقَّق (JSON مولَّد من ملف ناجز) في النظام: موكّلون، ملفات، أطراف، جلسات، وملاحظات تدقيق.
 *   npx tsx scripts/import-cases.ts /tmp/casesimport/cases.json --dry
 *   DATABASE_URL=… npx tsx scripts/import-cases.ts /tmp/casesimport/cases.json --yes
 * آمن لإعادة التشغيل: يطابق القضية برقمها، والموكل بهويته، والجلسة بعنوانها وموعدها. لا يمسّ ملفًا موجودًا إلا بإضافة جلساته وملاحظاته.
 * ملف البيانات سري (هويات وأطراف) ولا يُحفظ في المستودع.
 */
import { readFileSync } from "node:fs";
import { and, eq, like, sql } from "drizzle-orm";
import { db } from "../lib/db";
import { auditLog, clientContacts, clients, events, matterNotes, matterParties, matterTeam, matters, users } from "../lib/db/schema";

type Session = { seq: number; kind: string; hijri: string; date: string; time: string | null; status: string; court: string; circuit: string; mode: string };
type Case = {
  no: string; hijri: string; opened: string; type: string; role: string; statusText: string; court: string; circuit: string;
  subject: string; requests: string; basis: string; sessions: Session[]; audit: string[];
  meta: null | {
    client: { name: string; type: "individual" | "company" | "institution"; identifier: string | null; notes: string | null };
    area: string; claim: number | null; contact?: { name: string; title: string; note: string };
    opp: [string, string, string | null, string][];
  };
};

const file = process.argv[2];
const dry = process.argv.includes("--dry");
const yes = process.argv.includes("--yes");
const clean = (s: string) => s.replace(/\s+/g, " ").trim();

async function main() {
  if (!file) throw new Error("usage: tsx scripts/import-cases.ts <cases.json> [--dry] [--yes]");
  const cases = Object.values(JSON.parse(readFileSync(file, "utf8")) as Record<string, Case>).sort((a, b) => a.opened.localeCompare(b.opened));
  console.log("cases", cases.length, "sessions", cases.reduce((n, c) => n + c.sessions.length, 0));
  if (dry) return;
  if (process.env.DATABASE_URL && !yes) throw new Error("This targets a real database. Re-run with --yes to write.");

  const d = await db();
  const [me] = await d.select().from(users).where(eq(users.username, process.env.IMPORT_USER || "turki")).limit(1);
  if (!me) throw new Error("import user not found");
  const year = new Date().getFullYear();
  const [{ n: count0 }] = await d.select({ n: sql<number>`count(*)::int` }).from(matters).where(like(matters.number, `${year}-%`));
  let seq = count0;
  const out = { clients: 0, matters: 0, parties: 0, events: 0, eventsUpdated: 0, notes: 0 };

  for (const c of cases) {
    let [m] = await d.select().from(matters).where(eq(matters.courtCaseNumber, c.no)).limit(1);
    const isNew = !m;

    if (!m) {
      const meta = c.meta;
      if (!meta) {
        console.log("skipped (not in system and no client metadata):", c.no);
        continue;
      }
      let [cl] = meta.client.identifier ? await d.select().from(clients).where(eq(clients.identifier, meta.client.identifier)).limit(1) : [];
      if (!cl) {
        [cl] = await d.insert(clients).values({ type: meta.client.type, name: meta.client.name, identifier: meta.client.identifier, notes: [meta.client.notes, "أُدرج من سجل القضايا (ناجز). البيانات ناقصة: الجوال والبريد والعنوان بانتظار الاستكمال."].filter(Boolean).join("\n"), createdBy: me.id }).returning();
        out.clients++;
      }
      if (meta.contact) {
        const [has] = await d.select().from(clientContacts).where(and(eq(clientContacts.clientId, cl.id), eq(clientContacts.name, meta.contact.name))).limit(1);
        if (!has) await d.insert(clientContacts).values({ clientId: cl.id, name: meta.contact.name, title: `${meta.contact.title} · ${meta.contact.note}` });
      }
      seq++;
      const number = `${year}-${String(seq).padStart(4, "0")}`;
      const last = c.sessions.at(-1);
      const final = /نهائي/.test(c.statusText) && !/غير نهائي/.test(c.statusText);
      const court = [last?.court || c.court, last?.circuit || c.circuit].filter(Boolean).join(" — ") || null;
      [m] = await d
        .insert(matters)
        .values({
          number, title: `${c.type} — ${meta.client.name}`, clientId: cl.id, practiceArea: meta.area, matterType: c.type, court, courtCaseNumber: c.no,
          status: final ? "closed" : "open", stage: `الدرجة الأولى — ${c.statusText}`, openedOn: c.opened, claimValue: meta.claim === null ? null : String(meta.claim),
          description: clean(c.subject), responsibleId: me.id, createdBy: me.id,
        })
        .returning();
      out.matters++;
      await d.insert(matterTeam).values({ matterId: m.id, userId: me.id, role: "lead" }).onConflictDoNothing();
      for (const [role, name, ident, notes] of meta.opp) {
        await d.insert(matterParties).values({ matterId: m.id, role: role as "opposing", name, identifier: ident, notes });
        out.parties++;
      }
      const note = async (body: string) => {
        await d.insert(matterNotes).values({ matterId: m.id, userId: me.id, kind: "system", body, visibleToClient: false });
        out.notes++;
      };
      await note(`أُدرجت من سجل القضايا (ناجز) برقم القضية ${c.no} وتاريخها ${c.hijri} هـ. صفة المكتب في السجل: ${c.role}.`);
      if (c.requests) await note(`طلبات المدعي (نص المصدر):\n${clean(c.requests)}`);
      if (c.basis) await note(`أسانيد الدعوى (نص المصدر):\n${clean(c.basis)}`);
    }

    if (c.audit.length) {
      const body = `ملاحظات التدقيق (سجل 2026/10/14):\n${c.audit.map((a, i) => `${i + 1}. ${a}`).join("\n")}`;
      const [has] = await d.select({ id: matterNotes.id }).from(matterNotes).where(and(eq(matterNotes.matterId, m.id), like(matterNotes.body, "ملاحظات التدقيق (سجل 2026/10/14)%"))).limit(1);
      if (!has) {
        await d.insert(matterNotes).values({ matterId: m.id, userId: me.id, kind: "note", body, visibleToClient: false });
        out.notes++;
      }
    }

    for (const s of c.sessions) {
      const time = s.time ?? "08:00";
      const startsAt = new Date(`${s.date}T${time}:00+03:00`);
      const title = `${s.kind} — قضية ${c.no}`;
      const status = s.status === "جديدة" ? "scheduled" : "done";
      const notes = [`المحكمة: ${s.court}`, `الدائرة: ${s.circuit}`, `حالة الجلسة في السجل: ${s.status}`, `طريقة الانعقاد: ${s.mode}`, `الموعد الهجري: ${s.hijri}`, s.time ? null : "الوقت غير مدوّن في المصدر (08:00 افتراضي)"].filter(Boolean).join("\n");
      const location = [s.mode, s.court].filter(Boolean).join(" · ");
      const [byKey] = await d.select().from(events).where(and(eq(events.title, title), eq(events.startsAt, startsAt))).limit(1);
      // موعد أُدخل يدويًا للجلسة نفسها (عنوان عام «جلسة» وتوقيت منزاح): نصحّحه بدل أن نكرره
      const [manual] = byKey ? [] : await d.select().from(events).where(and(eq(events.matterId, m.id), eq(events.title, "جلسة"), sql`(${events.startsAt} at time zone 'Asia/Riyadh')::date = ${s.date}::date`)).limit(1);
      const hit = byKey ?? manual;
      if (hit) {
        await d.update(events).set({ matterId: m.id, title, startsAt, kind: "hearing", location, status: hit.status === "postponed" || hit.status === "cancelled" ? hit.status : status, notes: hit.notes?.includes(notes) ? hit.notes : [hit.notes, notes].filter(Boolean).join("\n---\n") }).where(eq(events.id, hit.id));
        out.eventsUpdated++;
      } else {
        await d.insert(events).values({ matterId: m.id, kind: "hearing", title, startsAt, location, status, notes, assigneeId: me.id, createdBy: me.id, remindDaysBefore: 2, visibleToClient: false });
        out.events++;
      }
    }
    console.log(isNew ? "created" : "existing", c.no, m.number);
  }
  await d.insert(auditLog).values({ actorKind: "staff", actorId: me.id, actorName: me.fullName, action: "cases_imported", entityType: "matter", meta: out });
  console.log(JSON.stringify(out));
  process.exit(0);
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
