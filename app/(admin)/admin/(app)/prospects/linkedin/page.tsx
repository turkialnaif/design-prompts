import Link from "next/link";
import { and, asc, desc, eq, inArray, isNotNull, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { prospectContacts, prospects } from "@/lib/db/schema";
import { requireStaff } from "@/lib/auth/session";
import { can } from "@/lib/auth/perms";
import { Badge, Card, Empty, Flash, PageHeader, Stat } from "@/components/admin/ui";
import CopyButton from "@/components/admin/CopyButton";
import { linkedinAction } from "@/lib/erp/prospect-actions";
import { linkedinFollowup, linkedinNote, peopleSearchUrl, regionOf } from "@/lib/prospects/copy";

export const metadata = { title: "طابور لينكدان" };
export const dynamic = "force-dynamic";

const DAILY = 15;

function Btn({ id, state, label, note, tone = "border-[#e3ddcb]" }: { id: string; state: string; label: string; note?: string; tone?: string }) {
  return (
    <form action={linkedinAction}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="state" value={state} />
      {note && <input type="hidden" name="note" value={note} />}
      <button className={`rounded-xl border px-4 py-2 text-sm font-bold ${tone}`}>{label}</button>
    </form>
  );
}

export default async function LinkedinQueue({ searchParams }: { searchParams: Promise<{ ok?: string; error?: string }> }) {
  const user = await requireStaff("clients:read");
  const sp = await searchParams;
  const w = can(user.role, "clients:write");
  const d = await db();

  const todo = await d
    .select({ c: prospectContacts, p: prospects })
    .from(prospectContacts)
    .innerJoin(prospects, eq(prospectContacts.prospectId, prospects.id))
    .where(and(isNotNull(prospectContacts.linkedinUrl), inArray(prospectContacts.linkedin, ["queued", "none"]), eq(prospectContacts.replied, false)))
    .orderBy(desc(prospects.priority), sql`${prospects.tier} asc nulls last`, asc(prospectContacts.createdAt))
    .limit(DAILY);
  const accepted = await d
    .select({ c: prospectContacts, p: prospects })
    .from(prospectContacts)
    .innerJoin(prospects, eq(prospectContacts.prospectId, prospects.id))
    .where(eq(prospectContacts.linkedin, "connected"))
    .orderBy(asc(prospectContacts.linkedinAt))
    .limit(30);
  const waiting = await d.select({ n: sql<number>`count(*)::int` }).from(prospectContacts).where(eq(prospectContacts.linkedin, "sent"));
  const noContact = await d
    .select({ p: prospects, n: sql<number>`count(${prospectContacts.id})::int` })
    .from(prospects)
    .leftJoin(prospectContacts, eq(prospectContacts.prospectId, prospects.id))
    .where(inArray(prospects.status, ["new", "researching"]))
    .groupBy(prospects.id)
    .having(sql`count(${prospectContacts.id}) = 0`)
    .orderBy(desc(prospects.priority), sql`${prospects.tier} asc nulls last`, asc(prospects.rank))
    .limit(12);

  return (
    <>
      <PageHeader
        title="طابور لينكدان"
        sub="مذكرة جاهزة لكل شخص، وأنت من يفتح الملف ويضغط إرسال. لا آلية تدخل حسابك."
        actions={<Link href="/admin/prospects" className="rounded-xl border border-[#e3ddcb] bg-white px-4 py-2 text-sm font-semibold">قاعدة المنشآت</Link>}
      />
      <Flash error={sp.error} ok={sp.ok} />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Stat label="دعوات اليوم المقترحة" value={todo.length} hint={`الحد الآمن نحو ${DAILY} يوميًا و100 أسبوعيًا`} />
        <Stat label="دعوات أُرسلت وتنتظر" value={waiting[0]?.n ?? 0} />
        <Stat label="قبلت وتنتظر رسالة" value={accepted.length} tone={accepted.length ? "good" : "default"} />
      </div>

      <Card title="أرسل اليوم" className="mb-6">
        {todo.length === 0 ? (
          <Empty>الطابور فارغ. استورد اتصالاتك من صفحة القاعدة (Connections.csv)، أو أضف روابط أشخاص من صفحة أي منشأة.</Empty>
        ) : (
          <ul className="space-y-4">
            {todo.map(({ c, p }) => {
              const note = c.linkedinNote || linkedinNote(c, p.name, regionOf(p.list));
              return (
                <li key={c.id} className="rounded-2xl border border-[#e3ddcb] p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span><b>{c.fullName || "بلا اسم"}</b><span className="text-sm text-ink-soft/80"> · {c.title ?? "—"} · <Link href={`/admin/prospects/${p.id}`} className="underline">{p.name}</Link></span></span>
                    {p.priority && <Badge tone="gold">أولوية</Badge>}
                  </div>
                  <p className="mt-3 rounded-xl bg-[#faf7ef] px-4 py-3 text-sm leading-8">{note}</p>
                  <p className="mt-1 text-xs text-ink-soft/70">{note.length}/300 حرفًا</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <CopyButton text={note} label="انسخ المذكرة" />
                    <a href={c.linkedinUrl!} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-[#0a66c2] px-4 py-2 text-sm font-bold text-white">افتح الملف</a>
                    {w && <Btn id={c.id} state="sent" note={note} label="أرسلتُ الدعوة" tone="border-emerald-300 text-emerald-800" />}
                    {w && <Btn id={c.id} state="skipped" label="تخطّي" />}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Card>

      {accepted.length > 0 && (
        <Card title="قبلوا الدعوة: أرسل المتابعة" className="mb-6">
          <ul className="space-y-4">
            {accepted.map(({ c, p }) => {
              const msg = linkedinFollowup(c, p.name);
              return (
                <li key={c.id} className="rounded-2xl border border-[#e3ddcb] p-4">
                  <b>{c.fullName}</b><span className="text-sm text-ink-soft/80"> · {p.name}</span>
                  <p className="mt-3 rounded-xl bg-[#faf7ef] px-4 py-3 text-sm leading-8">{msg}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <CopyButton text={msg} label="انسخ الرسالة" />
                    <a href={c.linkedinUrl!} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-[#0a66c2] px-4 py-2 text-sm font-bold text-white">افتح المحادثة</a>
                    {w && <Btn id={c.id} state="replied" label="ردّ" tone="border-emerald-300 text-emerald-800" />}
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
      )}

      <Card title="منشآت أولى بلا جهة اتصال">
        {noContact.length === 0 ? <Empty>كل المنشآت الأولى لها جهات اتصال.</Empty> : (
          <ul className="divide-y divide-[#f0ebdc]">
            {noContact.map(({ p }) => (
              <li key={p.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
                <Link href={`/admin/prospects/${p.id}`} className="font-bold hover:underline">{p.name}</Link>
                <a href={peopleSearchUrl(p.name)} target="_blank" rel="noopener noreferrer" className="font-bold text-[#0a66c2] underline">ابحث عن المسؤول القانوني</a>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-3 text-xs leading-7 text-ink-soft/80">الرابط يفتح بحث لينكدان في متصفحك أنت. تختار الشخص المناسب وتنسخ رابط ملفه إلى صفحة المنشأة، فيدخل الطابور بمذكرته.</p>
      </Card>
    </>
  );
}
