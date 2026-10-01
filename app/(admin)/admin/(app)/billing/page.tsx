import Link from "next/link";
import { and, asc, desc, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { clients, invoices, matters, payments } from "@/lib/db/schema";
import { requireStaff } from "@/lib/auth/session";
import { can } from "@/lib/auth/perms";
import { Badge, Card, Empty, Field, Flash, PageHeader, Select, Stat, SubmitButton, Table, Td, Th, fmtDate, money } from "@/components/admin/ui";
import { createInvoiceAction } from "@/lib/erp/billing-actions";
import { invoiceStatusLabel } from "@/lib/erp/labels";

export const metadata = { title: "الفوترة والأتعاب" };

export default async function BillingPage({ searchParams }: { searchParams: Promise<{ client?: string; matter?: string; status?: string; error?: string }> }) {
  const user = await requireStaff("billing:read");
  const sp = await searchParams;
  const d = await db();
  const status = sp.status && sp.status in invoiceStatusLabel ? (sp.status as keyof typeof invoiceStatusLabel) : undefined;
  const rows = await d
    .select({
      i: invoices,
      c: clients.name,
      paid: sql<string>`coalesce((select sum(${payments.amount}) from ${payments} where ${payments.invoiceId} = ${invoices.id}), 0)`,
    })
    .from(invoices)
    .innerJoin(clients, eq(invoices.clientId, clients.id))
    .where(and(status ? eq(invoices.status, status) : undefined))
    .orderBy(desc(invoices.createdAt))
    .limit(300);
  const cl = await d.select({ id: clients.id, name: clients.name }).from(clients).where(eq(clients.archived, false)).orderBy(asc(clients.name));
  const ms = sp.client ? await d.select({ id: matters.id, number: matters.number, title: matters.title }).from(matters).where(eq(matters.clientId, sp.client)) : [];

  const open = rows.filter((r) => r.i.status === "issued" || r.i.status === "partial");
  const outstanding = open.reduce((s, r) => s + Number(r.i.total) - Number(r.paid), 0);
  const overdue = open.filter((r) => r.i.dueOn && r.i.dueOn < new Date().toISOString().slice(0, 10)).reduce((s, r) => s + Number(r.i.total) - Number(r.paid), 0);
  const collected = rows.reduce((s, r) => s + Number(r.paid), 0);

  return (
    <>
      <PageHeader title="الفوترة والأتعاب" sub="فواتير إدارية بضريبة القيمة المضافة. للفاتورة الإلكترونية المعتمدة لدى الهيئة استخدم نظام الفوترة الإلكترونية المعتمد." />
      <Flash error={sp.error} />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Stat label="المستحق غير المحصّل" value={money(outstanding)} />
        <Stat label="متأخر السداد" value={money(overdue)} tone={overdue ? "warn" : "good"} />
        <Stat label="إجمالي المحصّل" value={money(collected)} tone="good" />
      </div>

      {can(user.role, "billing:write") && (
        <Card title="فاتورة جديدة" className="mb-6">
          <form action="/admin/billing" className="mb-3 grid gap-3 md:grid-cols-4">
            <Field label="العميل"><Select name="client" defaultValue={sp.client ?? ""}><option value="">اختر العميل</option>{cl.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</Select></Field>
            <div className="flex items-end"><button className="rounded-xl border border-[#e3ddcb] bg-white px-4 py-2.5 text-sm font-semibold">تحميل قضاياه</button></div>
          </form>
          {sp.client && (
            <form action={createInvoiceAction} className="grid gap-3 border-t border-[#f0ebdc] pt-4 md:grid-cols-4">
              <input type="hidden" name="clientId" value={sp.client} />
              <Field label="القضية (اختياري: كل قضايا العميل إن تُركت)"><Select name="matterId" defaultValue={sp.matter ?? ""}><option value="">كل القضايا</option>{ms.map((m) => <option key={m.id} value={m.id}>{m.number} — {m.title}</option>)}</Select></Field>
              <label className="flex items-end gap-2 pb-2.5 text-sm md:col-span-2"><input type="checkbox" name="includeUnbilled" defaultChecked /> تضمين الوقت والمصروفات القابلة للفوترة غير المفوترة</label>
              <div className="flex items-end"><SubmitButton>إنشاء مسودة</SubmitButton></div>
            </form>
          )}
        </Card>
      )}

      <Card title="الفواتير">
        <div className="mb-4 flex flex-wrap gap-1.5">
          <Link href="/admin/billing" className={`rounded-xl px-3 py-1.5 text-xs font-semibold ${!status ? "bg-[#12233a] text-white" : "border border-[#e3ddcb]"}`}>الكل</Link>
          {Object.entries(invoiceStatusLabel).map(([k, l]) => <Link key={k} href={`/admin/billing?status=${k}`} className={`rounded-xl px-3 py-1.5 text-xs font-semibold ${status === k ? "bg-[#12233a] text-white" : "border border-[#e3ddcb]"}`}>{l}</Link>)}
        </div>
        {rows.length === 0 ? <Empty>لا فواتير.</Empty> : (
          <Table>
            <thead><tr><Th>الرقم</Th><Th>العميل</Th><Th>التاريخ</Th><Th>الاستحقاق</Th><Th>الإجمالي</Th><Th>المدفوع</Th><Th>الحالة</Th></tr></thead>
            <tbody>
              {rows.map(({ i, c, paid }) => (
                <tr key={i.id}>
                  <Td><Link href={`/admin/billing/${i.id}`} className="font-mono text-xs font-bold hover:text-[#a9843c]">{i.number}</Link></Td>
                  <Td>{c}</Td>
                  <Td className="text-xs">{fmtDate(i.issuedOn)}</Td>
                  <Td className="text-xs">{fmtDate(i.dueOn)}</Td>
                  <Td>{money(i.total)}</Td>
                  <Td>{money(paid)}</Td>
                  <Td><Badge tone={i.status === "paid" ? "green" : i.status === "void" ? "red" : i.status === "draft" ? "gray" : "gold"}>{invoiceStatusLabel[i.status]}</Badge></Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </>
  );
}
