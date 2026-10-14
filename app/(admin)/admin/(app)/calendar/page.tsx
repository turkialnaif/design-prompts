import Link from "next/link";
import { and, asc, eq, gte, lt, ne, or, sql } from "drizzle-orm";
import { after } from "next/server";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { db } from "@/lib/db";
import { events, matters, users } from "@/lib/db/schema";
import { requireStaff } from "@/lib/auth/session";
import { can } from "@/lib/auth/perms";
import { matterScope } from "@/lib/erp/queries";
import { Card, Field, Flash, Input, PageHeader, SubmitButton } from "@/components/admin/ui";
import { EventForm, EventList } from "@/components/admin/work";
import { eventKindLabel } from "@/lib/erp/labels";
import CopyButton from "@/components/admin/CopyButton";
import { feedToken, feedUrl } from "@/lib/calendar/ics";
import { connectOutlookAction, disconnectOutlookAction, rotateFeedAction, syncOutlookAction } from "@/lib/erp/calendar-actions";
import { getOutlook, isStale, syncOutlook } from "@/lib/calendar/outlook";

export const metadata = { title: "الجلسات والتقويم" };

const DAYS = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
const MONTHS = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];

export default async function CalendarPage({ searchParams }: { searchParams: Promise<{ m?: string; ok?: string; error?: string }> }) {
  const user = await requireStaff("matters:read");
  const sp = await searchParams;
  const now = new Date();
  const match = /^(\d{4})-(\d{2})$/.exec(sp.m ?? "");
  const year = match ? Number(match[1]) : now.getFullYear();
  const month = match ? Number(match[2]) - 1 : now.getMonth();
  const start = new Date(Date.UTC(year, month, 1));
  const end = new Date(Date.UTC(year, month + 1, 1));
  const prev = new Date(Date.UTC(year, month - 1, 1));
  const next = new Date(Date.UTC(year, month + 1, 1));
  const key = (d: Date) => `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;

  const d = await db();
  const outlook = await getOutlook();
  if (isStale(outlook)) after(() => void syncOutlook().catch(() => null));
  const scope = await matterScope(user);
  const rows = await d
    .select({ e: events, m: matters, assignee: users.fullName })
    .from(events)
    .leftJoin(matters, eq(events.matterId, matters.id))
    .leftJoin(users, eq(events.assigneeId, users.id))
    .where(and(gte(events.startsAt, start), lt(events.startsAt, end), scope ? sql`(${events.matterId} is null or ${scope})` : undefined, or(ne(events.source, "outlook"), eq(events.assigneeId, user.id))))
    .orderBy(asc(events.startsAt));
  const people = await d.select({ id: users.id, fullName: users.fullName }).from(users).where(eq(users.isActive, true));
  const feed = feedUrl(await feedToken(user.id));

  const byDay = new Map<number, typeof rows>();
  for (const r of rows) {
    const day = new Date(r.e.startsAt.getTime() + 3 * 3600e3).getUTCDate();
    byDay.set(day, [...(byDay.get(day) ?? []), r]);
  }
  const firstDow = start.getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const cells: (number | null)[] = [...Array(firstDow).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  while (cells.length % 7) cells.push(null);
  const todayDay = now.getFullYear() === year && now.getMonth() === month ? now.getDate() : -1;

  return (
    <>
      <PageHeader
        title="الجلسات والتقويم"
        sub={`${MONTHS[month]} ${year} · ${rows.length} موعد`}
        actions={
          <>
            <Link href={`/admin/calendar?m=${key(prev)}`} className="rounded-xl border border-[#e3ddcb] bg-white p-2"><ChevronRight className="h-5 w-5" /></Link>
            <Link href="/admin/calendar" className="rounded-xl border border-[#e3ddcb] bg-white px-4 py-2 text-sm font-semibold">اليوم</Link>
            <Link href={`/admin/calendar?m=${key(next)}`} className="rounded-xl border border-[#e3ddcb] bg-white p-2"><ChevronLeft className="h-5 w-5" /></Link>
          </>
        }
      />

      <Flash error={sp.error} ok={sp.ok} />

      <Card className="mb-6 overflow-x-auto">
        <div className="grid min-w-[42rem] grid-cols-7 gap-px overflow-hidden rounded-xl border border-[#e3ddcb] bg-[#e3ddcb] text-xs">
          {DAYS.map((n) => <div key={n} className="bg-[#faf7ef] py-2 text-center font-bold text-ink-soft/80">{n}</div>)}
          {cells.map((day, i) => (
            <div key={i} className={`min-h-24 bg-white p-1.5 ${day === todayDay ? "ring-2 ring-inset ring-[#d0a751]" : ""}`}>
              {day && (
                <>
                  <p className={`mb-1 font-bold ${day === todayDay ? "text-[#a9843c]" : "text-ink-soft/80"}`}>{day}</p>
                  <div className="space-y-1">
                    {(byDay.get(day) ?? []).slice(0, 3).map(({ e, m }) => (
                      <Link
                        key={e.id}
                        href={m ? `/admin/matters/${m.id}?tab=events` : "/admin/calendar"}
                        className={`block truncate rounded-md px-1.5 py-0.5 text-[11px] font-semibold ${e.kind === "hearing" ? "bg-[#12233a] text-white" : e.kind === "deadline" ? "bg-red-100 text-red-800" : "bg-[#d0a751]/25 text-[#7a5a14]"} ${e.status !== "scheduled" ? "opacity-50 line-through" : ""}`}
                        title={`${eventKindLabel[e.kind]}: ${e.title}`}
                      >
                        {e.title}
                      </Link>
                    ))}
                    {(byDay.get(day)?.length ?? 0) > 3 && <p className="text-[10px] text-ink-soft/80">+{(byDay.get(day)?.length ?? 0) - 3} أخرى</p>}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card title="مواعيد الشهر" className="xl:col-span-2">
          <EventList items={rows.map(({ e, m, assignee }) => ({ e, assignee, matterLabel: m ? `${m.number} · ${m.title}` : null }))} showMatter />
        </Card>
        <div className="space-y-6">
          {can(user.role, "events:write") && <Card title="إضافة موعد"><EventForm people={people} /></Card>}
          {can(user.role, "events:write") && (
            <Card title="استيراد من Outlook">
              {outlook ? (
                <>
                  <p className="text-sm leading-7">تقويم Outlook <b>مربوط</b>. تظهر مواعيده هنا لك وحدك، ولا تصل إلى بقية الفريق ولا إلى العملاء.</p>
                  <p className="mt-2 text-xs text-ink-soft/80">{outlook.lastSyncAt ? `آخر مزامنة: ${new Date(outlook.lastSyncAt).toLocaleString("ar-SA", { timeZone: "Asia/Riyadh" })} · ${outlook.lastCount ?? 0} موعدًا` : "لم تتم مزامنة بعد"}</p>
                  {outlook.lastError && <p className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-800">{outlook.lastError}</p>}
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <form action={syncOutlookAction}><SubmitButton pendingText="جارٍ المزامنة…">زامن الآن</SubmitButton></form>
                    <form action={disconnectOutlookAction} className="flex items-center gap-2 text-xs">
                      <label className="flex items-center gap-1"><input type="checkbox" name="purge" defaultChecked /> احذف المستورد</label>
                      <button className="font-bold text-red-700 underline">فصل</button>
                    </form>
                  </div>
                </>
              ) : (
                <>
                  <ol className="mb-3 list-decimal space-y-1 ps-5 text-xs leading-6 text-ink-soft/90">
                    <li>في Outlook على الويب: الإعدادات (⚙) ← التقويم ← التقويمات المشتركة.</li>
                    <li>تحت «نشر تقويم» اختر التقويم والصلاحية «يمكنه عرض كل التفاصيل» ثم انشر.</li>
                    <li>انسخ رابط <b dir="ltr">ICS</b> والصقه هنا.</li>
                  </ol>
                  <form action={connectOutlookAction} className="grid gap-3">
                    <Field label="رابط ICS"><Input name="url" dir="ltr" placeholder="https://outlook.office365.com/owa/calendar/…/calendar.ics" required /></Field>
                    <SubmitButton pendingText="جارٍ الربط…">اربط واستورد</SubmitButton>
                  </form>
                  <p className="mt-3 text-xs leading-6 text-ink-soft/80">قراءة فقط: ما في Outlook يظهر هنا، ولا يُكتب شيء في Outlook. يتجدد كل ساعة تقريبًا عند فتح هذه الصفحة، وعند التذكيرات اليومية.</p>
                </>
              )}
            </Card>
          )}
          <Card title="إرسال تقويم الموقع إلى Outlook">
            <p className="text-sm leading-7 text-ink-soft/90">اشتراك يعرض جلساتك ومواعيدك ومهامك المستحقة في Outlook على الجوال والويب والحاسوب، مع تنبيه قبل الجلسة بساعة وقبلها بعدد الأيام المحدد. يتحدّث تلقائيًا كل ساعة تقريبًا.</p>
            <p className="mt-3 break-all rounded-xl bg-[#faf7ef] px-3 py-2 text-xs" dir="ltr">{feed}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <CopyButton text={feed} label="انسخ الرابط" />
              <a href={feed.replace(/^https:/, "webcal:")} className="rounded-xl bg-[#0a66c2] px-4 py-2 text-sm font-bold text-white">افتح في Outlook</a>
            </div>
            <ol className="mt-4 list-decimal space-y-1 ps-5 text-xs leading-6 text-ink-soft/90">
              <li>في Outlook على الويب: التقويم ← إضافة تقويم ← الاشتراك من الويب.</li>
              <li>الصق الرابط وسمِّ التقويم «الجلسات والمواعيد» ثم استيراد.</li>
              <li>على الجوال يظهر تلقائيًا بعد دقائق إن كان الحساب نفسه.</li>
            </ol>
            <p className="mt-3 text-xs leading-6 text-ink-soft/80">الرابط سرّي: من يملكه يرى مواعيدك. لا تشاركه. وإن تسرّب فجدّده.</p>
            <form action={rotateFeedAction} className="mt-2"><button className="text-xs font-bold text-red-700 underline">جدّد الرابط وأبطل القديم</button></form>
          </Card>
        </div>
      </div>
    </>
  );
}
