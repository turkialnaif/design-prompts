import Link from "next/link";
import { notFound } from "next/navigation";
import { asc, eq } from "drizzle-orm";
import { Printer, Trash2 } from "lucide-react";
import { db } from "@/lib/db";
import { clients, invoiceItems, invoices, matters, payments } from "@/lib/db/schema";
import { requireStaff } from "@/lib/auth/session";
import { can } from "@/lib/auth/perms";
import { Badge, Card, Field, Input, LinkButton, PageHeader, Select, SubmitButton, Table, Td, Textarea, Th, fmtDate, money } from "@/components/admin/ui";
import {
  addInvoiceItemAction, deleteDraftInvoiceAction, issueInvoiceAction, recordPaymentAction, removeInvoiceItemAction, updateInvoiceMetaAction, voidInvoiceAction,
} from "@/lib/erp/billing-actions";
import { invoiceStatusLabel } from "@/lib/erp/labels";

export default async function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireStaff("billing:read");
  const { id } = await params;
  const d = await db();
  const [row] = await d.select({ i: invoices, c: clients }).from(invoices).innerJoin(clients, eq(invoices.clientId, clients.id)).where(eq(invoices.id, id)).limit(1);
  if (!row) notFound();
  const { i, c } = row;
  const items = await d.select().from(invoiceItems).where(eq(invoiceItems.invoiceId, id));
  const pays = await d.select().from(payments).where(eq(payments.invoiceId, id)).orderBy(asc(payments.paidOn));
  const [matter] = i.matterId ? await d.select().from(matters).where(eq(matters.id, i.matterId)).limit(1) : [null];
  const paid = pays.reduce((s, p) => s + Number(p.amount), 0);
  const balance = Number(i.total) - paid;
  const canWrite = can(user.role, "billing:write");
  const draft = i.status === "draft";

  return (
    <>
      <PageHeader
        title={`فاتورة ${i.number}`}
        sub={`${c.name}${matter ? ` · ${matter.number}` : ""}`}
        actions={
          <>
            <Badge tone={i.status === "paid" ? "green" : i.status === "void" ? "red" : draft ? "gray" : "gold"}>{invoiceStatusLabel[i.status]}</Badge>
            <LinkButton href={`/admin/print/${i.id}`} variant="ghost"><Printer className="h-4 w-4" /> طباعة / PDF</LinkButton>
          </>
        }
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <Card title="البنود">
            <Table>
              <thead><tr><Th>الوصف</Th><Th>الكمية</Th><Th>السعر</Th><Th>المبلغ</Th><Th></Th></tr></thead>
              <tbody>
                {items.map((it) => (
                  <tr key={it.id}>
                    <Td>{it.description}</Td>
                    <Td className="text-xs">{it.quantity}</Td>
                    <Td className="text-xs">{money(it.unitPrice)}</Td>
                    <Td>{money(it.amount)}</Td>
                    <Td>{draft && canWrite && <form action={removeInvoiceItemAction}><input type="hidden" name="invoiceId" value={i.id} /><input type="hidden" name="itemId" value={it.id} /><button aria-label="حذف" className="text-red-700"><Trash2 className="h-4 w-4" /></button></form>}</Td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr><Td className="text-end font-bold" >المجموع قبل الضريبة</Td><Td /><Td /><Td className="font-bold">{money(i.subtotal)}</Td><Td /></tr>
                <tr><Td className="text-end">ضريبة القيمة المضافة ({i.vatRate}%)</Td><Td /><Td /><Td>{money(i.vatAmount)}</Td><Td /></tr>
                <tr><Td className="text-end text-base font-extrabold">الإجمالي</Td><Td /><Td /><Td className="text-base font-extrabold">{money(i.total)}</Td><Td /></tr>
              </tfoot>
            </Table>
            {draft && canWrite && (
              <form action={addInvoiceItemAction} className="mt-5 grid gap-2 border-t border-[#f0ebdc] pt-4 md:grid-cols-5">
                <input type="hidden" name="invoiceId" value={i.id} />
                <div className="md:col-span-2"><Input name="description" required placeholder="وصف البند (أتعاب مقطوعة، جلسة…)" /></div>
                <Input name="quantity" type="number" step="0.01" defaultValue="1" dir="ltr" />
                <Input name="unitPrice" type="number" step="0.01" min="0" required placeholder="السعر" dir="ltr" />
                <SubmitButton>إضافة بند</SubmitButton>
              </form>
            )}
          </Card>

          <Card title={`المدفوعات — المتبقي ${money(balance)}`}>
            {pays.length === 0 ? <p className="text-sm text-ink-soft/60">لا مدفوعات مسجَّلة.</p> : (
              <Table>
                <thead><tr><Th>التاريخ</Th><Th>المبلغ</Th><Th>الطريقة</Th><Th>المرجع</Th></tr></thead>
                <tbody>{pays.map((p) => <tr key={p.id}><Td className="text-xs">{fmtDate(p.paidOn)}</Td><Td>{money(p.amount)}</Td><Td className="text-xs">{p.method}</Td><Td className="text-xs">{p.reference ?? "—"}</Td></tr>)}</tbody>
              </Table>
            )}
            {canWrite && (i.status === "issued" || i.status === "partial") && (
              <form action={recordPaymentAction} className="mt-5 grid gap-2 border-t border-[#f0ebdc] pt-4 md:grid-cols-5">
                <input type="hidden" name="invoiceId" value={i.id} />
                <Input name="amount" type="number" step="0.01" min="0.01" required placeholder="المبلغ" dir="ltr" defaultValue={balance > 0 ? balance.toFixed(2) : ""} />
                <Select name="method" defaultValue="transfer"><option value="transfer">تحويل بنكي</option><option value="cash">نقدًا</option><option value="card">بطاقة</option><option value="cheque">شيك</option></Select>
                <Input name="reference" placeholder="رقم العملية" dir="ltr" />
                <Input name="paidOn" type="date" dir="ltr" />
                <SubmitButton>تسجيل دفعة</SubmitButton>
              </form>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="تفاصيل">
            {draft && canWrite ? (
              <form action={updateInvoiceMetaAction} className="grid gap-3">
                <input type="hidden" name="invoiceId" value={i.id} />
                <Field label="تاريخ الاستحقاق"><Input name="dueOn" type="date" dir="ltr" defaultValue={i.dueOn ?? ""} /></Field>
                <Field label="نسبة الضريبة %"><Input name="vatRate" type="number" step="0.01" min="0" dir="ltr" defaultValue={i.vatRate} /></Field>
                <Field label="ملاحظات"><Textarea name="notes" rows={3} defaultValue={i.notes ?? ""} /></Field>
                <SubmitButton>حفظ</SubmitButton>
              </form>
            ) : (
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-ink-soft/60">صدرت</dt><dd>{fmtDate(i.issuedOn)}</dd></div>
                <div className="flex justify-between"><dt className="text-ink-soft/60">الاستحقاق</dt><dd>{fmtDate(i.dueOn)}</dd></div>
                <div><dt className="text-ink-soft/60">ملاحظات</dt><dd className="mt-1 whitespace-pre-wrap">{i.notes ?? "—"}</dd></div>
              </dl>
            )}
          </Card>
          {canWrite && (
            <Card title="إجراءات">
              <div className="flex flex-wrap gap-2">
                {draft && <form action={issueInvoiceAction}><input type="hidden" name="invoiceId" value={i.id} /><SubmitButton>إصدار الفاتورة</SubmitButton></form>}
                {draft && <form action={deleteDraftInvoiceAction}><input type="hidden" name="invoiceId" value={i.id} /><SubmitButton className="!bg-white !text-red-700 border border-red-200 hover:!bg-red-50">حذف المسودة</SubmitButton></form>}
                {!draft && i.status !== "void" && <form action={voidInvoiceAction}><input type="hidden" name="invoiceId" value={i.id} /><SubmitButton className="!bg-white !text-red-700 border border-red-200 hover:!bg-red-50">إلغاء الفاتورة</SubmitButton></form>}
              </div>
              <p className="mt-3 text-xs text-ink-soft/55">عند الإصدار يُقفل تعديل البنود. إلغاء الفاتورة يُعيد الوقت والمصروفات إلى «غير مفوتر».</p>
            </Card>
          )}
          <Link href={`/admin/clients/${c.id}`} className="block text-center text-sm font-semibold text-[#a9843c]">ملف العميل ←</Link>
        </div>
      </div>
    </>
  );
}
