"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { LINKEDIN_STATES, PROSPECT_STATUSES, prospectContacts, prospects, type LinkedinState, type ProspectStatus } from "@/lib/db/schema";
import { requireStaff } from "@/lib/auth/session";
import { firm } from "@/lib/site";
import { nameKey } from "@/lib/prospects/companies";
import { importContactsCsv, importLinkedInConnections, logProspect, seedCompanies, sendNext } from "@/lib/prospects/engine";

const go = (path: string, k: "ok" | "error", msg: string) => redirect(`${path}${path.includes("?") ? "&" : "?"}${k}=${encodeURIComponent(msg)}`);
const HOME = "/admin/prospects";

async function csvText(formData: FormData): Promise<string> {
  const f = formData.get("file");
  if (f instanceof File && f.size > 0) {
    if (f.size > 4_000_000) return "";
    return await f.text();
  }
  return String(formData.get("csv") ?? "");
}

const report = (r: { added: number; skipped: number; unmatched: string[]; createdCompanies: number }) =>
  `أُضيف ${r.added} · تخطّي ${r.skipped}${r.createdCompanies ? ` · منشآت جديدة ${r.createdCompanies}` : ""}${r.unmatched.length ? ` · بلا منشأة مطابقة ${r.unmatched.length} (مثل: ${[...new Set(r.unmatched)].slice(0, 4).join("، ")})` : ""}`;

export async function seedAction() {
  await requireStaff("clients:write");
  const r = await seedCompanies();
  revalidatePath(HOME);
  go(HOME, "ok", `أُضيفت ${r.added} منشأة${r.duplicates.length ? ` · تخطّيت ${r.duplicates.length} مكرّرة (${r.duplicates.join("، ")})` : ""}`);
}

export async function addProspectAction(formData: FormData) {
  await requireStaff("clients:write");
  const name = String(formData.get("name") ?? "").trim();
  if (name.length < 2) return go(HOME, "error", "اكتب اسم المنشأة");
  const d = await db();
  const [row] = await d.insert(prospects).values({ list: "imported", name, nameKey: nameKey(name) || name.toLowerCase(), priority: formData.get("priority") === "on" }).onConflictDoNothing().returning({ id: prospects.id });
  revalidatePath(HOME);
  if (!row) return go(HOME, "error", "المنشأة موجودة");
  go(`${HOME}/${row.id}`, "ok", "أُضيفت المنشأة");
}

export async function importContactsAction(formData: FormData) {
  const user = await requireStaff("clients:write");
  const text = await csvText(formData);
  if (!text.trim()) return go(HOME, "error", "ارفع ملف CSV أو الصق محتواه");
  const basis = String(formData.get("basis") ?? "manual");
  const r = await importContactsCsv(text, basis, formData.get("create") === "on", user.fullName);
  revalidatePath(HOME);
  if (r.error) return go(HOME, "error", r.error);
  go(HOME, "ok", report(r));
}

export async function importConnectionsAction(formData: FormData) {
  const user = await requireStaff("clients:write");
  const text = await csvText(formData);
  if (!text.trim()) return go(HOME, "error", "ارفع ملف Connections.csv");
  const r = await importLinkedInConnections(text, formData.get("create") === "on", user.fullName);
  revalidatePath(HOME);
  revalidatePath(`${HOME}/linkedin`);
  if (r.error) return go(HOME, "error", r.error);
  go(HOME, "ok", report(r));
}

export async function updateProspectAction(formData: FormData) {
  const user = await requireStaff("clients:write");
  const id = String(formData.get("id"));
  const status = String(formData.get("status")) as ProspectStatus;
  if (!PROSPECT_STATUSES.includes(status)) return go(`${HOME}/${id}`, "error", "حالة غير صالحة");
  const d = await db();
  const [p] = await d.select().from(prospects).where(eq(prospects.id, id)).limit(1);
  if (!p) return go(HOME, "error", "المنشأة غير موجودة");
  await d.update(prospects).set({ status, notes: String(formData.get("notes") ?? "").trim() || null, priority: formData.get("priority") === "on", website: String(formData.get("website") ?? "").trim() || null, ownerId: p.ownerId ?? user.id }).where(eq(prospects.id, id));
  if (status !== p.status) await logProspect(id, "status", `${p.status} ← ${status}`, null, user.fullName);
  revalidatePath(`${HOME}/${id}`);
  go(`${HOME}/${id}`, "ok", "حُفظت");
}

export async function addContactAction(formData: FormData) {
  const user = await requireStaff("clients:write");
  const prospectId = String(formData.get("prospectId"));
  const back = `${HOME}/${prospectId}`;
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const li = String(formData.get("linkedinUrl") ?? "").trim();
  if (!email && !li) return go(back, "error", "أدخل بريدًا أو رابط لينكدان");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return go(back, "error", "بريد غير صالح");
  if (li && !/^https?:\/\/([a-z]+\.)?linkedin\.com\//i.test(li)) return go(back, "error", "رابط لينكدان غير صالح");
  const d = await db();
  const [c] = await d
    .insert(prospectContacts)
    .values({ prospectId, fullName: String(formData.get("fullName") ?? "").trim() || null, title: String(formData.get("title") ?? "").trim() || null, email: email || null, phone: String(formData.get("phone") ?? "").trim() || null, linkedinUrl: li ? li.split("?")[0] : null, basis: String(formData.get("basis") ?? "manual"), linkedin: li ? "queued" : "none" })
    .returning({ id: prospectContacts.id });
  await logProspect(prospectId, "contact_added", String(formData.get("fullName") ?? email), c.id, user.fullName);
  revalidatePath(back);
  go(back, "ok", "أُضيفت جهة الاتصال");
}

export async function contactAction(formData: FormData) {
  const user = await requireStaff("clients:write");
  const id = String(formData.get("id"));
  const op = String(formData.get("op"));
  const d = await db();
  const [c] = await d.select().from(prospectContacts).where(eq(prospectContacts.id, id)).limit(1);
  if (!c) return go(HOME, "error", "جهة الاتصال غير موجودة");
  const back = String(formData.get("back") || `${HOME}/${c.prospectId}`);
  if (op === "pause") await d.update(prospectContacts).set({ emailOn: !c.emailOn }).where(eq(prospectContacts.id, id));
  else if (op === "replied") {
    await d.update(prospectContacts).set({ replied: true, emailOn: false, linkedin: c.linkedin === "none" ? c.linkedin : "replied" }).where(eq(prospectContacts.id, id));
    await d.update(prospects).set({ status: "replied" }).where(eq(prospects.id, c.prospectId));
    await logProspect(c.prospectId, "replied", "سُجّل أنها ردّت", id, user.fullName);
  } else if (op === "delete") {
    await d.delete(prospectContacts).where(eq(prospectContacts.id, id));
    await logProspect(c.prospectId, "contact_removed", c.fullName ?? c.email, null, user.fullName);
  } else if (op === "restart") await d.update(prospectContacts).set({ emailStep: 0, lastEmailAt: null, emailOn: true }).where(eq(prospectContacts.id, id));
  revalidatePath(`${HOME}/${c.prospectId}`);
  go(back, "ok", "تم");
}

export async function sendNowAction(formData: FormData) {
  const user = await requireStaff("clients:write");
  const id = String(formData.get("id"));
  const d = await db();
  const [c] = await d.select().from(prospectContacts).where(eq(prospectContacts.id, id)).limit(1);
  if (!c) return go(HOME, "error", "جهة الاتصال غير موجودة");
  const back = `${HOME}/${c.prospectId}`;
  const r = await sendNext(id, { actor: user.fullName });
  revalidatePath(back);
  go(back, r.ok ? "ok" : "error", r.ok ? "أُرسلت الرسالة" : r.reason ?? "لم تُرسل");
}

/** نسخة تجريبية من الرسالة الأولى إلى بريدك أنت، لتقرأها كما سيقرؤها العميل قبل أي إرسال حقيقي. */
export async function sendTestAction(formData: FormData) {
  const user = await requireStaff("clients:write");
  const id = String(formData.get("id"));
  const d = await db();
  const [c] = await d.select().from(prospectContacts).where(eq(prospectContacts.id, id)).limit(1);
  if (!c) return go(HOME, "error", "جهة الاتصال غير موجودة");
  const back = `${HOME}/${c.prospectId}`;
  const r = await sendNext(id, { to: user.email || firm.email });
  go(back, r.ok ? "ok" : "error", r.ok ? `أُرسلت نسخة تجريبية إلى ${user.email || firm.email}` : r.reason ?? "لم تُرسل");
}

export async function linkedinAction(formData: FormData) {
  const user = await requireStaff("clients:write");
  const id = String(formData.get("id"));
  const state = String(formData.get("state")) as LinkedinState;
  if (!LINKEDIN_STATES.includes(state)) return go(`${HOME}/linkedin`, "error", "حالة غير صالحة");
  const d = await db();
  const [c] = await d.select().from(prospectContacts).where(eq(prospectContacts.id, id)).limit(1);
  if (!c) return go(`${HOME}/linkedin`, "error", "جهة الاتصال غير موجودة");
  const note = String(formData.get("note") ?? "").trim();
  await d
    .update(prospectContacts)
    .set({ linkedin: state, linkedinAt: new Date(), linkedinNote: note || c.linkedinNote, replied: state === "replied" ? true : c.replied, emailOn: state === "replied" ? false : c.emailOn })
    .where(eq(prospectContacts.id, id));
  const labels: Record<LinkedinState, string> = { none: "—", queued: "في الطابور", sent: "أُرسلت الدعوة", connected: "قبل الدعوة", replied: "ردّ على لينكدان", skipped: "تخطّينا" };
  await logProspect(c.prospectId, `linkedin_${state}`, labels[state], id, user.fullName);
  if (state === "replied") await d.update(prospects).set({ status: "replied" }).where(eq(prospects.id, c.prospectId));
  else if (state === "sent") await d.update(prospects).set({ status: "contacted" }).where(eq(prospects.id, c.prospectId));
  revalidatePath(`${HOME}/linkedin`);
  go(String(formData.get("back") || `${HOME}/linkedin`), "ok", labels[state]);
}
