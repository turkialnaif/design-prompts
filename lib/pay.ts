import "server-only";
import { and, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { clients, invoices, payments } from "@/lib/db/schema";
import { audit } from "@/lib/audit";
import { getOrder } from "@/lib/ngenius";

const round2 = (n: number) => Math.round(n * 100) / 100;
export const isUuid = (s: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s);

export type PayableInvoice = {
  id: string;
  number: string;
  status: string;
  total: number;
  paid: number;
  due: number;
  clientName: string;
  clientEmail: string | null;
  dueOn: string | null;
};

/** The invoice behind a payment link, with what is still owed. */
export async function payableInvoice(id: string): Promise<PayableInvoice | null> {
  if (!isUuid(id)) return null;
  const d = await db();
  const [row] = await d
    .select({ inv: invoices, client: clients })
    .from(invoices)
    .innerJoin(clients, eq(invoices.clientId, clients.id))
    .where(eq(invoices.id, id))
    .limit(1);
  if (!row) return null;
  const [{ paid }] = await d.select({ paid: sql<string>`coalesce(sum(${payments.amount}), 0)` }).from(payments).where(eq(payments.invoiceId, id));
  const total = Number(row.inv.total);
  const paidN = Number(paid);
  return {
    id,
    number: row.inv.number,
    status: row.inv.status,
    total,
    paid: paidN,
    due: Math.max(0, round2(total - paidN)),
    clientName: row.client.name,
    clientEmail: row.client.email,
    dueOn: row.inv.dueOn,
  };
}

export const canPay = (i: PayableInvoice) => (i.status === "issued" || i.status === "partial") && i.due > 0;

/**
 * Settles a returned order: reads it from the gateway, and if it was paid for one of our invoices
 * records the payment once (idempotent on the order reference) and updates the invoice status.
 */
export async function settleOrder(reference: string): Promise<{ ok: boolean; invoiceId: string | null; number: string | null; amount: number; state: string }> {
  const order = await getOrder(reference);
  const invoiceId = order.data.invoiceId && isUuid(order.data.invoiceId) ? order.data.invoiceId : null;
  const base = { invoiceId, number: order.data.invoiceNumber ?? null, amount: order.amountSar, state: order.state };
  if (!order.paid || !invoiceId || order.currency !== "SAR") return { ok: false, ...base };

  const d = await db();
  const [inv] = await d.select().from(invoices).where(eq(invoices.id, invoiceId)).limit(1);
  if (!inv || inv.status === "void" || inv.status === "draft") return { ok: false, ...base };

  const [dup] = await d.select({ id: payments.id }).from(payments).where(and(eq(payments.invoiceId, invoiceId), eq(payments.reference, reference))).limit(1);
  if (!dup) {
    await d.insert(payments).values({
      invoiceId,
      amount: String(round2(order.amountSar)),
      method: "card",
      reference,
      paidOn: new Date().toISOString().slice(0, 10),
    });
    const [{ paid }] = await d.select({ paid: sql<string>`coalesce(sum(${payments.amount}), 0)` }).from(payments).where(eq(payments.invoiceId, invoiceId));
    const status = Number(paid) + 0.001 >= Number(inv.total) ? "paid" : "partial";
    await d.update(invoices).set({ status }).where(eq(invoices.id, invoiceId));
    await audit({ kind: "client", name: "بوابة الدفع الإلكتروني" }, "payment_online", "invoice", invoiceId, { amount: order.amountSar, reference, paymentId: order.paymentId });
  }
  return { ok: true, ...base, number: inv.number };
}
