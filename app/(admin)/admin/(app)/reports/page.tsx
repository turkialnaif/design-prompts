import { and, eq, gte, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { clients, invoices, matters, payments, timeEntries, users } from "@/lib/db/schema";
import { requireStaff } from "@/lib/auth/session";
import { can } from "@/lib/auth/perms";
import { Card, Empty, PageHeader, Stat, Table, Td, Th, hours, money } from "@/components/admin/ui";
import { matterStatusLabel } from "@/lib/erp/labels";

export const metadata = { title: "التقارير" };

function Bars({ data, format }: { data: { label: string; value: number }[]; format?: (n: number) => string }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <ul className="space-y-2.5">
      {data.map((d) => (
        <li key={d.label} className="grid grid-cols-[9rem_1fr_auto] items-center gap-3 text-sm">
          <span className="truncate text-ink-soft/80">{d.label}</span>
          <span className="h-3 overflow-hidden rounded-full bg-[#f0ebdc]"><span className="block h-full rounded-full bg-gradient-to-l from-[#d0a751] to-[#a9843c]" style={{ width: `${(d.value / max) * 100}%` }} /></span>
          <span className="font-mono text-xs">{format ? format(d.value) : d.value}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ReportsPage() {
  const user = await requireStaff("reports:read");
  const firmWide = can(user.role, "reports:firm");
  const d = await db();
  const yearAgo = new Date(new Date().getFullYear(), new Date().getMonth() - 11, 1).toISOString().slice(0, 10);
  const ninety = new Date(new Date().getTime() - 90 * 864e5).toISOString().slice(0, 10);

  const byStatus = firmWide
    ? await d.select({ k: matters.status, n: sql<number>`count(*)::int` }).from(matters).groupBy(matters.status)
    : [];
  const byArea = firmWide
    ? await d.select({ k: sql<string>`coalesce(${matters.practiceArea}, 'غير محدد')`, n: sql<number>`count(*)::int` }).from(matters).groupBy(sql`coalesce(${matters.practiceArea}, 'غير محدد')`).orderBy(sql`count(*) desc`).limit(8)
    : [];
  const revenue = firmWide && can(user.role, "billing:read")
    ? await d.select({ k: sql<string>`to_char(${payments.paidOn}, 'YYYY-MM')`, v: sql<string>`sum(${payments.amount})` }).from(payments).where(gte(payments.paidOn, yearAgo)).groupBy(sql`to_char(${payments.paidOn}, 'YYYY-MM')`).orderBy(sql`to_char(${payments.paidOn}, 'YYYY-MM')`)
    : [];
  const hoursByLawyer = await d
    .select({ k: users.fullName, m: sql<number>`sum(${timeEntries.minutes})::int`, v: sql<string>`sum(case when ${timeEntries.billable} then ${timeEntries.minutes} / 60.0 * coalesce(${timeEntries.rate},0) else 0 end)` })
    .from(timeEntries)
    .innerJoin(users, eq(timeEntries.userId, users.id))
    .where(and(gte(timeEntries.workedOn, ninety), firmWide ? undefined : eq(timeEntries.userId, user.id)))
    .groupBy(users.fullName)
    .orderBy(sql`sum(${timeEntries.minutes}) desc`);
  const topClients = firmWide && can(user.role, "billing:read")
    ? await d.select({ k: clients.name, v: sql<string>`sum(${invoices.total})` }).from(invoices).innerJoin(clients, eq(invoices.clientId, clients.id)).where(sql`${invoices.status} <> 'void' and ${invoices.status} <> 'draft'`).groupBy(clients.name).orderBy(sql`sum(${invoices.total}) desc`).limit(8)
    : [];
  const aging = firmWide && can(user.role, "billing:read")
    ? await d.select({
        b: sql<string>`case when ${invoices.dueOn} is null or ${invoices.dueOn} >= current_date then 'غير متأخر' when current_date - ${invoices.dueOn} <= 30 then '١–٣٠ يومًا' when current_date - ${invoices.dueOn} <= 60 then '٣١–٦٠ يومًا' else 'أكثر من ٦٠ يومًا' end`,
        v: sql<string>`sum(${invoices.total} - coalesce((select sum(p.amount) from payments p where p.invoice_id = ${invoices.id}), 0))`,
      }).from(invoices).where(sql`${invoices.status} in ('issued','partial')`).groupBy(sql`1`)
    : [];

  const totalMin = hoursByLawyer.reduce((s, r) => s + r.m, 0);
  const totalRev = revenue.reduce((s, r) => s + Number(r.v), 0);

  return (
    <>
      <PageHeader title="التقارير" sub={firmWide ? "نظرة شاملة على أداء المكتب" : "تقارير عملك الشخصي"} />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Stat label="ساعات آخر ٩٠ يومًا" value={hours(totalMin)} />
        {firmWide && can(user.role, "billing:read") && <Stat label="المحصّل آخر ١٢ شهرًا" value={money(totalRev)} tone="good" />}
        {firmWide && <Stat label="عدد القضايا" value={byStatus.reduce((s, r) => s + r.n, 0)} />}
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <Card title="ساعات وقيمة العمل (٩٠ يومًا)">
          {hoursByLawyer.length === 0 ? <Empty>لا بيانات.</Empty> : (
            <Table>
              <thead><tr><Th>المحامي</Th><Th>الساعات</Th><Th>القيمة القابلة للفوترة</Th></tr></thead>
              <tbody>{hoursByLawyer.map((r) => <tr key={r.k}><Td>{r.k}</Td><Td className="font-mono text-xs">{hours(r.m)}</Td><Td>{money(r.v)}</Td></tr>)}</tbody>
            </Table>
          )}
        </Card>
        {firmWide && (
          <>
            <Card title="القضايا حسب الحالة"><Bars data={byStatus.map((r) => ({ label: matterStatusLabel[r.k], value: r.n }))} /></Card>
            <Card title="القضايا حسب مجال الممارسة"><Bars data={byArea.map((r) => ({ label: r.k, value: r.n }))} /></Card>
            {can(user.role, "billing:read") && (
              <>
                <Card title="المحصّل شهريًا"><Bars data={revenue.map((r) => ({ label: r.k, value: Number(r.v) }))} format={money} /></Card>
                <Card title="أكبر العملاء بالفواتير"><Bars data={topClients.map((r) => ({ label: r.k, value: Number(r.v) }))} format={money} /></Card>
                <Card title="أعمار الذمم المدينة"><Bars data={aging.map((r) => ({ label: r.b, value: Number(r.v) }))} format={money} /></Card>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
