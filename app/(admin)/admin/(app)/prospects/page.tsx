import Link from "next/link";
import { and, asc, count, desc, eq, gte, ilike, inArray, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { PROSPECT_STATUSES, prospectContacts, prospectEvents, prospects, type ProspectStatus } from "@/lib/db/schema";
import { requireStaff } from "@/lib/auth/session";
import { can } from "@/lib/auth/perms";
import { Badge, Card, Empty, Field, Flash, Input, PageHeader, Select, Stat, SubmitButton, Table, Td, Textarea, Th } from "@/components/admin/ui";
import { addProspectAction, importConnectionsAction, importContactsAction, seedAction } from "@/lib/erp/prospect-actions";
import { basisLabel, dailyCap, outreachEnabled, sentToday, statusLabel } from "@/lib/prospects/engine";

export const metadata = { title: "الاستقطاب الصادر" };
export const dynamic = "force-dynamic";

const PAGE = 100;
const daysAgo = (n: number) => new Date(Date.now() - n * 864e5);
const tone: Record<ProspectStatus, "blue" | "gray" | "gold" | "green" | "red"> = { new: "blue", researching: "gray", contacted: "gold", replied: "green", meeting: "green", client: "green", declined: "red" };
const LISTS: Record<string, string> = { "khobar-dammam": "الخبر والدمام", riyadh: "الرياض", imported: "مستوردة" };

export default async function ProspectsPage({ searchParams }: { searchParams: Promise<{ list?: string; status?: string; q?: string; p?: string; tier?: string; ok?: string; error?: string }> }) {
  const user = await requireStaff("clients:read");
  const sp = await searchParams;
  const w = can(user.role, "clients:write");
  const d = await db();

  const list = sp.list && LISTS[sp.list] ? sp.list : undefined;
  const status = (PROSPECT_STATUSES as readonly string[]).includes(sp.status ?? "") ? (sp.status as ProspectStatus) : undefined;
  const tier = ["1", "2", "3"].includes(sp.tier ?? "") ? Number(sp.tier) : undefined;
  const q = (sp.q ?? "").trim().slice(0, 60);
  const page = Math.max(1, Number(sp.p) || 1);
  const where = and(list ? eq(prospects.list, list) : undefined, status ? eq(prospects.status, status) : undefined, tier ? eq(prospects.tier, tier) : undefined, q ? ilike(prospects.name, `%${q.replace(/[%_]/g, "")}%`) : undefined);

  const [{ total }] = await d.select({ total: count() }).from(prospects);
  const [{ khobar }] = await d.select({ khobar: count() }).from(prospects).where(eq(prospects.list, "khobar-dammam"));
  const [{ shown }] = await d.select({ shown: count() }).from(prospects).where(where);
  const [{ contacted }] = await d.select({ contacted: count() }).from(prospects).where(inArray(prospects.status, ["contacted", "replied", "meeting", "client"]));
  const [{ replied }] = await d.select({ replied: count() }).from(prospects).where(inArray(prospects.status, ["replied", "meeting", "client"]));
  const [{ queue }] = await d
    .select({ queue: count() })
    .from(prospectContacts)
    .where(and(eq(prospectContacts.emailOn, true), sql`${prospectContacts.email} is not null`, eq(prospectContacts.replied, false), eq(prospectContacts.bounced, false), eq(prospectContacts.unsubscribed, false), sql`${prospectContacts.emailStep} < 3`));
  const [{ weekSent }] = await d.select({ weekSent: count() }).from(prospectEvents).where(and(eq(prospectEvents.kind, "email_sent"), gte(prospectEvents.createdAt, daysAgo(7))));
  const sent = await sentToday();
  const on = outreachEnabled();

  const rows = await d
    .select({
      p: prospects,
      contacts: sql<number>`count(${prospectContacts.id})::int`,
      emailed: sql<number>`count(*) filter (where ${prospectContacts.emailStep} > 0)::int`,
      auto: sql<number>`count(*) filter (where ${prospectContacts.emailOn} and ${prospectContacts.email} is not null and not ${prospectContacts.unsubscribed} and not ${prospectContacts.bounced} and not ${prospectContacts.replied})::int`,
    })
    .from(prospects)
    .leftJoin(prospectContacts, eq(prospectContacts.prospectId, prospects.id))
    .where(where)
    .groupBy(prospects.id)
    .orderBy(desc(prospects.priority), sql`${prospects.tier} asc nulls last`, asc(prospects.rank), asc(prospects.name))
    .limit(PAGE)
    .offset((page - 1) * PAGE);

  const url = (o: Record<string, string | number | undefined>) => {
    const m = { list, status, tier, q: q || undefined, ...o };
    const s = Object.entries(m).filter(([, v]) => v !== undefined && v !== "").map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`).join("&");
    return `/admin/prospects${s ? `?${s}` : ""}`;
  };
  const chip = (a: boolean) => `rounded-xl px-4 py-2 text-sm font-semibold ${a ? "bg-[#12233a] text-white" : "border border-[#e3ddcb] bg-white"}`;

  return (
    <>
      <PageHeader
        title="الاستقطاب الصادر"
        sub="قواعد المنشآت المستهدفة، وبريد مجدول من ثلاث رسائل، وطابور لينكدان اليدوي. القرار والردود للمحامي"
        actions={<Link href="/admin/prospects/linkedin" className="rounded-xl bg-[#12233a] px-4 py-2 text-sm font-semibold text-white">طابور لينكدان</Link>}
      />
      <Flash error={sp.error} ok={sp.ok} />

      <div className={`mb-6 rounded-2xl border px-5 py-4 text-sm ${on ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-amber-200 bg-amber-50 text-amber-900"}`}>
        {on ? (
          <>الإرسال الآلي <b>مفعّل</b>: يُرسل يوميًا الساعة 10 صباحًا (الأحد–الخميس) بسقف {dailyCap()} رسالة. أُرسل اليوم {sent}.</>
        ) : (
          <>الإرسال الآلي <b>متوقف</b>: لن يُرسل شيء حتى تضع <code dir="ltr">OUTREACH_ENABLED=1</code> في بيئة Vercel. اضغط «رسالة تجريبية» في أي جهة اتصال لترى الرسالة في بريدك أولًا.</>
        )}
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="المنشآت في القاعدة" value={total.toLocaleString("en")} />
        <Stat label="في طابور الإرسال" value={queue.toLocaleString("en")} hint="جهات بريدها مفعّل ولم تكتمل رسائلها" />
        <Stat label="رسائل آخر 7 أيام" value={weekSent} />
        <Stat label="تواصلنا / ردّت" value={`${contacted} / ${replied}`} tone={replied ? "good" : "default"} />
      </div>

      {w && (
        <Card title="إضافة بيانات" className="mb-6">
          <div className="grid gap-4 lg:grid-cols-2">
            {khobar === 0 && (
              <form action={seedAction} className="rounded-2xl border border-[#d0a751]/50 bg-[#faf7ef] p-4 lg:col-span-2">
                <p className="mb-3 text-sm">قائمة الخبر والدمام لم تُحمَّل بعد. حمّل قائمة «شركات الخبر والدمام» (250 منشأة، والمظلَّلة بالأخضر مميّزة بأولوية).</p>
                <SubmitButton pendingText="جارٍ التحميل…">تحميل القائمة</SubmitButton>
              </form>
            )}
            <details className="rounded-2xl border border-[#e3ddcb] p-4">
              <summary className="cursor-pointer text-sm font-bold">استيراد جهات اتصال (CSV)</summary>
              <form action={importContactsAction} className="mt-4 grid gap-3">
                <p className="text-xs text-ink-soft/80">أعمدة السطر الأول: <b>company</b> أو «المنشأة»، ثم name/الاسم وtitle/المسمى وemail/البريد وlinkedin/الرابط وphone/الجوال.</p>
                <Field label="الملف"><input type="file" name="file" accept=".csv,text/csv" className="text-sm" /></Field>
                <Field label="أو الصق المحتوى"><Textarea name="csv" rows={3} dir="ltr" /></Field>
                <Field label="كيف وصلنا إلى هؤلاء؟">
                  <Select name="basis" defaultValue="own_relationship">{Object.entries(basisLabel).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</Select>
                </Field>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="create" /> أنشئ منشأة جديدة عند عدم وجود مطابق</label>
                <SubmitButton pendingText="جارٍ الاستيراد…">استيراد</SubmitButton>
              </form>
            </details>
            <details className="rounded-2xl border border-[#e3ddcb] p-4">
              <summary className="cursor-pointer text-sm font-bold">استيراد اتصالات لينكدان (Connections.csv)</summary>
              <form action={importConnectionsAction} className="mt-4 grid gap-3">
                <p className="text-xs leading-7 text-ink-soft/80">من لينكدان: الإعدادات ← خصوصية البيانات ← «الحصول على نسخة من بياناتك» ← Connections. يصلك الملف على بريدك. يُطابَق اسم الشركة مع قاعدتنا وتدخل الجهات المطابقة طابور المراسلة اليدوي.</p>
                <Field label="Connections.csv"><input type="file" name="file" accept=".csv,text/csv" className="text-sm" /></Field>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="create" /> أنشئ منشآت جديدة لغير المطابق</label>
                <SubmitButton pendingText="جارٍ الاستيراد…">استيراد</SubmitButton>
              </form>
            </details>
            <details className="rounded-2xl border border-[#e3ddcb] p-4">
              <summary className="cursor-pointer text-sm font-bold">إضافة منشأة</summary>
              <form action={addProspectAction} className="mt-4 grid gap-3">
                <Field label="اسم المنشأة"><Input name="name" required /></Field>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="priority" /> أولوية</label>
                <SubmitButton>إضافة</SubmitButton>
              </form>
            </details>
          </div>
        </Card>
      )}

      <form className="mb-4 flex flex-wrap items-end gap-3" action="/admin/prospects">
        {list && <input type="hidden" name="list" value={list} />}
        {status && <input type="hidden" name="status" value={status} />}
        {tier && <input type="hidden" name="tier" value={tier} />}
        <div className="min-w-[14rem] flex-1"><Input name="q" defaultValue={q} placeholder="ابحث باسم المنشأة" /></div>
        <SubmitButton pendingText="بحث…">بحث</SubmitButton>
      </form>
      <div className="mb-3 flex flex-wrap gap-2">
        <Link href={url({ list: undefined, p: undefined })} className={chip(!list)}>كل القوائم</Link>
        {Object.entries(LISTS).map(([k, v]) => <Link key={k} href={url({ list: k, p: undefined })} className={chip(list === k)}>{v}</Link>)}
        <span className="mx-1 w-px bg-[#e3ddcb]" />
        {[1, 2, 3].map((t) => <Link key={t} href={url({ tier: tier === t ? undefined : t, p: undefined })} className={chip(tier === t)}>مرتبة {t}</Link>)}
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        <Link href={url({ status: undefined, p: undefined })} className={chip(!status)}>كل الحالات</Link>
        {PROSPECT_STATUSES.map((s) => <Link key={s} href={url({ status: s, p: undefined })} className={chip(status === s)}>{statusLabel[s]}</Link>)}
      </div>

      <Card>
        {rows.length === 0 ? (
          <Empty>لا نتائج.</Empty>
        ) : (
          <>
            <Table>
              <thead><tr><Th>المنشأة</Th><Th>القطاع</Th><Th>المرتبة</Th><Th>جهات الاتصال</Th><Th>في الطابور</Th><Th>أُرسل لها</Th><Th>الحالة</Th></tr></thead>
              <tbody>
                {rows.map(({ p, contacts, emailed, auto }) => (
                  <tr key={p.id} className="hover:bg-[#faf7ef]">
                    <Td>
                      <Link href={`/admin/prospects/${p.id}`} className="font-bold text-ink hover:underline">{p.name}</Link>
                      {p.priority && <span className="ms-2"><Badge tone="gold">أولوية</Badge></span>}
                      <span className="block text-xs text-ink-soft/80">{LISTS[p.list] ?? p.list}{p.rank ? ` · رقم ${p.rank}` : ""}</span>
                    </Td>
                    <Td className="max-w-[12rem] truncate">{p.sector ?? "—"}</Td>
                    <Td>{p.tier ?? "—"}</Td>
                    <Td>{contacts}</Td>
                    <Td>{auto}</Td>
                    <Td>{emailed}</Td>
                    <Td><Badge tone={tone[p.status]}>{statusLabel[p.status]}</Badge></Td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-ink-soft/80">{shown.toLocaleString("en")} نتيجة · صفحة {page}</span>
              <span className="flex gap-2">
                {page > 1 && <Link href={url({ p: page - 1 })} className={chip(false)}>السابق</Link>}
                {page * PAGE < shown && <Link href={url({ p: page + 1 })} className={chip(false)}>التالي</Link>}
              </span>
            </div>
          </>
        )}
      </Card>
    </>
  );
}
