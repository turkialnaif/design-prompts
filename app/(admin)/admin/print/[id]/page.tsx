import { notFound } from "next/navigation";
import { asc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { clients, invoiceItems, invoices, matters, payments } from "@/lib/db/schema";
import { requireStaff } from "@/lib/auth/session";
import { getFirmSettings } from "@/lib/erp/settings";
import { fmtDate, money } from "@/components/admin/ui";
import PrintButton from "@/components/admin/PrintButton";
import { invoiceStatusLabel } from "@/lib/erp/labels";

export const metadata = { title: "طباعة الفاتورة" };

export default async function PrintInvoice({ params }: { params: Promise<{ id: string }> }) {
  await requireStaff("billing:read");
  const { id } = await params;
  const d = await db();
  const [row] = await d.select({ i: invoices, c: clients }).from(invoices).innerJoin(clients, eq(invoices.clientId, clients.id)).where(eq(invoices.id, id)).limit(1);
  if (!row) notFound();
  const { i, c } = row;
  const items = await d.select().from(invoiceItems).where(eq(invoiceItems.invoiceId, id));
  const pays = await d.select().from(payments).where(eq(payments.invoiceId, id)).orderBy(asc(payments.paidOn));
  const [m] = i.matterId ? await d.select().from(matters).where(eq(matters.id, i.matterId)).limit(1) : [null];
  const firm = await getFirmSettings();
  const paid = pays.reduce((s, p) => s + Number(p.amount), 0);

  return (
    <div className="mx-auto max-w-3xl bg-white p-10 print:p-0" style={{ minHeight: "100vh" }}>
      <style>{`@page { size: A4; margin: 14mm } @media print { .no-print { display: none } body { background: white } }`}</style>
      <div className="no-print mb-6 flex justify-end"><PrintButton /></div>
      <div className="flex items-start justify-between border-b-2 border-[#d0a751] pb-5">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-ink">فاتورة</h1>
          <p className="mt-1 font-mono text-sm">{i.number}</p>
          <p className="mt-1 text-xs text-ink-soft/70">{invoiceStatusLabel[i.status]}</p>
        </div>
        <div className="text-end text-sm leading-7">
          <p className="font-display text-lg font-bold">{firm.name}</p>
          <p>{firm.address}</p>
          <p dir="ltr">{firm.phone} · {firm.email}</p>
          <p>رخصة المحاماة: {firm.licenseNumber}{firm.vatNumber ? ` · الرقم الضريبي: ${firm.vatNumber}` : ""}</p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-6 text-sm">
        <div><p className="text-xs font-bold text-ink-soft/60">فاتورة إلى</p><p className="mt-1 text-base font-bold">{c.name}</p><p>{c.identifier ?? ""}</p><p>{c.address ?? ""}</p></div>
        <div className="space-y-1"><p><span className="text-ink-soft/60">تاريخ الإصدار:</span> {fmtDate(i.issuedOn)}</p><p><span className="text-ink-soft/60">الاستحقاق:</span> {fmtDate(i.dueOn)}</p>{m && <p><span className="text-ink-soft/60">القضية:</span> {m.number} — {m.title}</p>}</div>
      </div>
      <table className="mt-6 w-full text-sm">
        <thead><tr className="border-b border-ink/20 text-start text-xs text-ink-soft/70"><th className="py-2 text-start">الوصف</th><th className="text-start">الكمية</th><th className="text-start">السعر</th><th className="text-start">المبلغ</th></tr></thead>
        <tbody>{items.map((it) => <tr key={it.id} className="border-b border-ink/10"><td className="py-2 pe-3">{it.description}</td><td>{it.quantity}</td><td>{money(it.unitPrice)}</td><td>{money(it.amount)}</td></tr>)}</tbody>
      </table>
      <div className="mt-6 ms-auto w-72 space-y-1.5 text-sm">
        <div className="flex justify-between"><span>المجموع</span><span>{money(i.subtotal)}</span></div>
        <div className="flex justify-between"><span>ضريبة القيمة المضافة ({i.vatRate}%)</span><span>{money(i.vatAmount)}</span></div>
        <div className="flex justify-between border-t border-ink/30 pt-2 text-base font-extrabold"><span>الإجمالي</span><span>{money(i.total)}</span></div>
        <div className="flex justify-between text-ink-soft/70"><span>المدفوع</span><span>{money(paid)}</span></div>
        <div className="flex justify-between font-bold"><span>المتبقي</span><span>{money(Number(i.total) - paid)}</span></div>
      </div>
      {(firm.iban || i.notes) && (
        <div className="mt-8 rounded-xl bg-[#faf7ef] p-4 text-sm leading-7">
          {firm.iban && <p>الآيبان: <span dir="ltr" className="font-mono">{firm.iban}</span>{firm.bank ? ` — ${firm.bank}` : ""}</p>}
          {i.notes && <p className="whitespace-pre-wrap">{i.notes}</p>}
        </div>
      )}
    </div>
  );
}
