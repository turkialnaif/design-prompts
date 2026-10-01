"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { and, eq, inArray, isNull, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { clients, expenses, invoiceItems, invoices, matters, payments, timeEntries, users } from "@/lib/db/schema";
import { requireStaff } from "@/lib/auth/session";
import { audit } from "@/lib/audit";
import { getFirmSettings } from "@/lib/erp/settings";

const round2 = (n: number) => Math.round(n * 100) / 100;

async function nextInvoiceNumber() {
  const d = await db();
  const year = new Date().getFullYear();
  const [row] = await d.select({ n: sql<number>`count(*)::int` }).from(invoices).where(sql`${invoices.number} like ${"INV-" + year + "-%"}`);
  return `INV-${year}-${String((row?.n ?? 0) + 1).padStart(4, "0")}`;
}

export async function recalcInvoice(invoiceId: string) {
  const d = await db();
  const items = await d.select().from(invoiceItems).where(eq(invoiceItems.invoiceId, invoiceId));
  const [inv] = await d.select().from(invoices).where(eq(invoices.id, invoiceId)).limit(1);
  const subtotal = round2(items.reduce((s, i) => s + Number(i.amount), 0));
  const vat = round2((subtotal * Number(inv.vatRate)) / 100);
  await d.update(invoices).set({ subtotal: String(subtotal), vatAmount: String(vat), total: String(round2(subtotal + vat)) }).where(eq(invoices.id, invoiceId));
}

export async function createInvoiceAction(formData: FormData) {
  const user = await requireStaff("billing:write");
  const clientId = String(formData.get("clientId"));
  const matterId = String(formData.get("matterId") ?? "") || null;
  const includeUnbilled = formData.get("includeUnbilled") === "on";
  const d = await db();
  const [client] = await d.select().from(clients).where(eq(clients.id, clientId)).limit(1);
  if (!client) redirect("/admin/billing?error=" + encodeURIComponent("اختر العميل"));

  const clientMatters = await d.select({ id: matters.id, title: matters.title, number: matters.number }).from(matters).where(matterId ? eq(matters.id, matterId) : eq(matters.clientId, clientId));
  const matterIds = clientMatters.map((m) => m.id);

  const firm = await getFirmSettings();
  const due = new Date(Date.now() + firm.dueDays * 864e5).toISOString().slice(0, 10);
  const [inv] = await d
    .insert(invoices)
    .values({ number: await nextInvoiceNumber(), clientId, matterId, dueOn: due, vatRate: String(firm.vatRate), notes: firm.invoiceNotes, createdBy: user.id })
    .returning({ id: invoices.id });

  if (includeUnbilled && matterIds.length) {
    const times = await d
      .select({ t: timeEntries, u: users })
      .from(timeEntries)
      .innerJoin(users, eq(timeEntries.userId, users.id))
      .where(and(inArray(timeEntries.matterId, matterIds), isNull(timeEntries.invoiceId), eq(timeEntries.billable, true)));
    for (const { t, u } of times) {
      const hours = round2(t.minutes / 60);
      const rate = Number(t.rate ?? 0);
      const m = clientMatters.find((x) => x.id === t.matterId);
      await d.insert(invoiceItems).values({
        invoiceId: inv.id,
        description: `${t.workedOn} — ${u.fullName}: ${t.description}${m ? ` (${m.number})` : ""}`,
        quantity: String(hours),
        unitPrice: String(rate),
        amount: String(round2(hours * rate)),
        source: "time",
        sourceId: t.id,
      });
      await d.update(timeEntries).set({ invoiceId: inv.id }).where(eq(timeEntries.id, t.id));
    }
    const exps = await d.select().from(expenses).where(and(inArray(expenses.matterId, matterIds), isNull(expenses.invoiceId), eq(expenses.billable, true)));
    for (const x of exps) {
      await d.insert(invoiceItems).values({ invoiceId: inv.id, description: `مصروف: ${x.description}`, quantity: "1", unitPrice: x.amount, amount: x.amount, source: "expense", sourceId: x.id });
      await d.update(expenses).set({ invoiceId: inv.id }).where(eq(expenses.id, x.id));
    }
  }
  await recalcInvoice(inv.id);
  await audit({ id: user.id, name: user.fullName }, "invoice_created", "invoice", inv.id);
  revalidatePath("/admin/billing");
  redirect(`/admin/billing/${inv.id}`);
}

async function loadDraft(id: string, userRole: string) {
  const d = await db();
  const [inv] = await d.select().from(invoices).where(eq(invoices.id, id)).limit(1);
  return { d, inv, editable: inv?.status === "draft" && !!userRole };
}

export async function addInvoiceItemAction(formData: FormData) {
  const user = await requireStaff("billing:write");
  const id = String(formData.get("invoiceId"));
  const { d, inv, editable } = await loadDraft(id, user.role);
  if (!inv || !editable) return;
  const description = String(formData.get("description") ?? "").trim();
  const qty = Number(String(formData.get("quantity") ?? "1").replace(",", ".")) || 1;
  const price = Number(String(formData.get("unitPrice") ?? "0").replace(",", "."));
  if (!description || price < 0) return;
  await d.insert(invoiceItems).values({ invoiceId: id, description, quantity: String(qty), unitPrice: String(price), amount: String(round2(qty * price)), source: "manual" });
  await recalcInvoice(id);
  revalidatePath(`/admin/billing/${id}`);
}

export async function removeInvoiceItemAction(formData: FormData) {
  const user = await requireStaff("billing:write");
  const id = String(formData.get("invoiceId"));
  const itemId = String(formData.get("itemId"));
  const { d, inv, editable } = await loadDraft(id, user.role);
  if (!inv || !editable) return;
  const [it] = await d.select().from(invoiceItems).where(eq(invoiceItems.id, itemId)).limit(1);
  if (it?.source === "time" && it.sourceId) await d.update(timeEntries).set({ invoiceId: null }).where(eq(timeEntries.id, it.sourceId));
  if (it?.source === "expense" && it.sourceId) await d.update(expenses).set({ invoiceId: null }).where(eq(expenses.id, it.sourceId));
  await d.delete(invoiceItems).where(eq(invoiceItems.id, itemId));
  await recalcInvoice(id);
  revalidatePath(`/admin/billing/${id}`);
}

export async function updateInvoiceMetaAction(formData: FormData) {
  const user = await requireStaff("billing:write");
  const id = String(formData.get("invoiceId"));
  const { d, inv, editable } = await loadDraft(id, user.role);
  if (!inv || !editable) return;
  await d
    .update(invoices)
    .set({
      dueOn: String(formData.get("dueOn") ?? "") || null,
      notes: String(formData.get("notes") ?? "") || null,
      vatRate: String(Number(formData.get("vatRate") ?? inv.vatRate)),
    })
    .where(eq(invoices.id, id));
  await recalcInvoice(id);
  revalidatePath(`/admin/billing/${id}`);
}

export async function issueInvoiceAction(formData: FormData) {
  const user = await requireStaff("billing:write");
  const id = String(formData.get("invoiceId"));
  const d = await db();
  const [inv] = await d.select().from(invoices).where(eq(invoices.id, id)).limit(1);
  if (!inv || inv.status !== "draft" || Number(inv.total) <= 0) return;
  await d.update(invoices).set({ status: "issued", issuedOn: new Date().toISOString().slice(0, 10) }).where(eq(invoices.id, id));
  await audit({ id: user.id, name: user.fullName }, "invoice_issued", "invoice", id, { number: inv.number, total: inv.total });
  revalidatePath(`/admin/billing/${id}`);
  revalidatePath("/admin/billing");
}

export async function voidInvoiceAction(formData: FormData) {
  const user = await requireStaff("billing:write");
  const id = String(formData.get("invoiceId"));
  const d = await db();
  const [inv] = await d.select().from(invoices).where(eq(invoices.id, id)).limit(1);
  if (!inv || inv.status === "void") return;
  await d.update(timeEntries).set({ invoiceId: null }).where(eq(timeEntries.invoiceId, id));
  await d.update(expenses).set({ invoiceId: null }).where(eq(expenses.invoiceId, id));
  await d.update(invoices).set({ status: "void" }).where(eq(invoices.id, id));
  await audit({ id: user.id, name: user.fullName }, "invoice_voided", "invoice", id, { number: inv.number });
  revalidatePath(`/admin/billing/${id}`);
  revalidatePath("/admin/billing");
}

export async function deleteDraftInvoiceAction(formData: FormData) {
  const user = await requireStaff("billing:write");
  const id = String(formData.get("invoiceId"));
  const d = await db();
  const [inv] = await d.select().from(invoices).where(eq(invoices.id, id)).limit(1);
  if (!inv || inv.status !== "draft") return;
  await d.update(timeEntries).set({ invoiceId: null }).where(eq(timeEntries.invoiceId, id));
  await d.update(expenses).set({ invoiceId: null }).where(eq(expenses.invoiceId, id));
  await d.delete(invoices).where(eq(invoices.id, id));
  await audit({ id: user.id, name: user.fullName }, "invoice_deleted", "invoice", id, { number: inv.number });
  redirect("/admin/billing");
}

export async function recordPaymentAction(formData: FormData) {
  const user = await requireStaff("billing:write");
  const id = String(formData.get("invoiceId"));
  const amount = round2(Number(String(formData.get("amount") ?? "0").replace(",", ".")));
  const d = await db();
  const [inv] = await d.select().from(invoices).where(eq(invoices.id, id)).limit(1);
  if (!inv || inv.status === "draft" || inv.status === "void" || amount <= 0) return;
  await d.insert(payments).values({
    invoiceId: id,
    amount: String(amount),
    method: String(formData.get("method") ?? "transfer"),
    reference: String(formData.get("reference") ?? "") || null,
    paidOn: String(formData.get("paidOn") ?? "") || new Date().toISOString().slice(0, 10),
    createdBy: user.id,
  });
  const [{ paid }] = await d.select({ paid: sql<string>`coalesce(sum(${payments.amount}), 0)` }).from(payments).where(eq(payments.invoiceId, id));
  const status = Number(paid) + 0.001 >= Number(inv.total) ? "paid" : "partial";
  await d.update(invoices).set({ status }).where(eq(invoices.id, id));
  await audit({ id: user.id, name: user.fullName }, "payment_recorded", "invoice", id, { amount });
  revalidatePath(`/admin/billing/${id}`);
  revalidatePath("/admin/billing");
}
