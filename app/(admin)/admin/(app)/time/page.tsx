import Link from "next/link";
import { and, desc, eq, gte, sql } from "drizzle-orm";
import { Square } from "lucide-react";
import { db } from "@/lib/db";
import { activeTimers, matters, timeEntries, users } from "@/lib/db/schema";
import { requireStaff } from "@/lib/auth/session";
import { matterScope } from "@/lib/erp/queries";
import { Badge, Card, Empty, Field, Input, PageHeader, Select, Stat, SubmitButton, Table, Td, Th, fmtDate, fmtDateTime, hours, money } from "@/components/admin/ui";
import { addTimeAction, startTimerAction, stopTimerAction } from "@/lib/erp/work-actions";

export const metadata = { title: "الوقت والمصروفات" };

export default async function TimePage({ searchParams }: { searchParams: Promise<{ team?: string }> }) {
  const user = await requireStaff("time:write");
  const sp = await searchParams;
  const manager = user.role === "admin" || user.role === "partner";
  const team = manager && sp.team === "1";
  const d = await db();
  const scope = await matterScope(user);
  const since = new Date(Date.now() - 60 * 864e5).toISOString().slice(0, 10);
  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().slice(0, 10);

  const myMatters = await d.select({ id: matters.id, number: matters.number, title: matters.title }).from(matters).where(and(eq(matters.status, "open"), scope)).limit(300);
  const [timer] = await d.select({ t: activeTimers, m: matters.title }).from(activeTimers).innerJoin(matters, eq(activeTimers.matterId, matters.id)).where(eq(activeTimers.userId, user.id)).limit(1);

  const rows = await d
    .select({ t: timeEntries, m: matters, u: users.fullName })
    .from(timeEntries)
    .innerJoin(matters, eq(timeEntries.matterId, matters.id))
    .innerJoin(users, eq(timeEntries.userId, users.id))
    .where(and(gte(timeEntries.workedOn, since), team ? undefined : eq(timeEntries.userId, user.id)))
    .orderBy(desc(timeEntries.workedOn), desc(timeEntries.createdAt))
    .limit(200);

  const [month] = await d
    .select({ minutes: sql<number>`coalesce(sum(${timeEntries.minutes}), 0)::int`, value: sql<string>`coalesce(sum(case when ${timeEntries.billable} then ${timeEntries.minutes} / 60.0 * coalesce(${timeEntries.rate}, 0) else 0 end), 0)` })
    .from(timeEntries)
    .where(and(gte(timeEntries.workedOn, monthStart), team ? undefined : eq(timeEntries.userId, user.id)));

  return (
    <>
      <PageHeader title="الوقت والمصروفات" sub={team ? "وقت الفريق آخر ٦٠ يومًا" : "وقتي آخر ٦٠ يومًا"} actions={manager ? <Link href={team ? "/admin/time" : "/admin/time?team=1"} className="rounded-xl border border-[#e3ddcb] bg-white px-4 py-2 text-sm font-semibold">{team ? "وقتي فقط" : "وقت الفريق"}</Link> : undefined} />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Stat label="ساعات هذا الشهر" value={hours(month?.minutes ?? 0)} />
        <Stat label="قيمة الوقت القابل للفوترة هذا الشهر" value={money(month?.value)} tone="good" />
        <Stat label="مؤقّت" value={timer ? "يعمل" : "متوقف"} hint={timer ? `${timer.m} منذ ${fmtDateTime(timer.t.startedAt)}` : undefined} />
      </div>
      <div className="mb-6 grid gap-6 xl:grid-cols-2">
        <Card title="مؤقّت سريع">
          {timer ? (
            <form action={stopTimerAction}><SubmitButton className="!bg-red-700"><Square className="h-4 w-4" /> إيقاف وتسجيل الوقت</SubmitButton></form>
          ) : (
            <form action={startTimerAction} className="grid gap-2 md:grid-cols-3">
              <div className="md:col-span-2"><Select name="matterId" required defaultValue=""><option value="" disabled>اختر القضية</option>{myMatters.map((m) => <option key={m.id} value={m.id}>{m.number} — {m.title}</option>)}</Select></div>
              <Input name="description" placeholder="الوصف" />
              <SubmitButton>بدء المؤقّت</SubmitButton>
            </form>
          )}
        </Card>
        <Card title="تسجيل وقت">
          <form action={addTimeAction} className="grid gap-3 md:grid-cols-4">
            <div className="md:col-span-4"><Field label="القضية"><Select name="matterId" required defaultValue=""><option value="" disabled>اختر القضية</option>{myMatters.map((m) => <option key={m.id} value={m.id}>{m.number} — {m.title}</option>)}</Select></Field></div>
            <Field label="التاريخ"><Input name="workedOn" type="date" dir="ltr" defaultValue={new Date().toISOString().slice(0, 10)} /></Field>
            <Field label="ساعات"><Input name="hours" type="number" step="0.25" min="0" dir="ltr" defaultValue="1" /></Field>
            <Field label="الوصف" span={2}><Input name="description" required /></Field>
            <div><SubmitButton>حفظ</SubmitButton></div>
          </form>
        </Card>
      </div>
      <Card title="السجل">
        {rows.length === 0 ? <Empty>لا وقت مسجَّل.</Empty> : (
          <Table>
            <thead><tr><Th>التاريخ</Th>{team && <Th>المحامي</Th>}<Th>القضية</Th><Th>الوصف</Th><Th>المدة</Th><Th>الفوترة</Th></tr></thead>
            <tbody>
              {rows.map(({ t, m, u }) => (
                <tr key={t.id}>
                  <Td className="whitespace-nowrap text-xs">{fmtDate(t.workedOn)}</Td>
                  {team && <Td className="text-xs">{u}</Td>}
                  <Td><Link href={`/admin/matters/${m.id}?tab=time`} className="text-xs font-semibold hover:text-[#a9843c]">{m.number}</Link></Td>
                  <Td>{t.description}</Td>
                  <Td className="font-mono text-xs">{hours(t.minutes)}</Td>
                  <Td>{t.invoiceId ? <Badge tone="green">مفوتر</Badge> : t.billable ? <Badge tone="gold">قابل للفوترة</Badge> : <Badge>لا</Badge>}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </>
  );
}
