"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { clients, invoices } from "@/lib/db/schema";
import { firm } from "@/lib/site";
import { createOrder, paymentsEnabled } from "@/lib/ngenius";
import { audit } from "@/lib/audit";
import { canPay, payableInvoice } from "@/lib/pay";

const digits = (s: string) => s.replace(/\D/g, "");
const prefix = (l: string) => (l === "en" ? "/en/pay" : "/pay");

/** Tiny per-instance throttle on the invoice lookup (invoice numbers are sequential). */
const hits = new Map<string, { n: number; t: number }>();
async function throttled() {
  const ip = ((await headers()).get("x-forwarded-for") ?? "?").split(",")[0].trim();
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now - h.t > 10 * 60_000) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  h.n += 1;
  return h.n > 8;
}

/** Invoice number + last four digits of the phone on file → payment link. */
export async function lookupInvoiceAction(formData: FormData) {
  const locale = String(formData.get("locale")) === "en" ? "en" : "ar";
  const number = String(formData.get("number") ?? "").trim().toUpperCase();
  const last4 = digits(String(formData.get("last4") ?? "")).slice(-4);
  const back = (code: string): never => redirect(`${prefix(locale)}?e=${code}`);
  if (!/^INV-\d{4}-\d{3,6}$/.test(number) || last4.length !== 4) return back("format");
  if (await throttled()) return back("slow");
  const d = await db();
  const [row] = await d
    .select({ id: invoices.id, phone: clients.phone })
    .from(invoices)
    .innerJoin(clients, eq(invoices.clientId, clients.id))
    .where(and(eq(invoices.number, number)))
    .limit(1);
  if (!row || !row.phone || digits(row.phone).slice(-4) !== last4) return back("notfound");
  redirect(`${prefix(locale)}/${row.id}`);
}

/** Creates the gateway order for the amount still owed and sends the client to the bank's page. */
export async function startPaymentAction(formData: FormData) {
  const locale = String(formData.get("locale")) === "en" ? "en" : "ar";
  const id = String(formData.get("invoiceId") ?? "");
  const inv = await payableInvoice(id);
  const here = `${prefix(locale)}/${id}`;
  if (!inv || !canPay(inv)) redirect(inv ? here : prefix(locale));
  if (!paymentsEnabled()) redirect(`${here}?e=off`);
  let url: string;
  try {
    const order = await createOrder({
      amountSar: inv!.due,
      merchantOrderReference: `${inv!.number}-${Date.now().toString(36)}`.slice(0, 40),
      redirectUrl: `${firm.website}${prefix(locale)}/result`,
      cancelUrl: `${firm.website}${here}`,
      email: inv!.clientEmail,
      language: locale,
      data: { invoiceId: inv!.id, invoiceNumber: inv!.number },
    });
    url = order.payUrl;
    await audit({ kind: "client", name: "بوابة الدفع الإلكتروني" }, "payment_order", "invoice", inv!.id, { reference: order.reference, amount: inv!.due }).catch(() => undefined);
  } catch {
    redirect(`${here}?e=gateway`);
  }
  redirect(url!);
}
