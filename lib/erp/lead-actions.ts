"use server";

import { randomBytes } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db";
import { LEAD_STAGES, leads, proposals, type LeadStage } from "@/lib/db/schema";
import { requireStaff } from "@/lib/auth/session";
import { audit } from "@/lib/audit";
import { convertLead, logEvent, sendProposal, stageLabel } from "@/lib/leads/engine";

const back = (id: string, k: "ok" | "error", msg: string) => redirect(`/admin/leads/${id}?${k}=${encodeURIComponent(msg)}`);

export async function setStageAction(formData: FormData) {
  const user = await requireStaff("clients:write");
  const id = String(formData.get("id"));
  const stage = String(formData.get("stage")) as LeadStage;
  const reason = String(formData.get("reason") ?? "").trim();
  if (!LEAD_STAGES.includes(stage)) return back(id, "error", "مرحلة غير صالحة");
  if (stage === "lost" && reason.length < 3) return back(id, "error", "اكتب سبب الخسارة: هو ما يعلّمنا ما نحسّنه");
  const d = await db();
  const [l] = await d.select().from(leads).where(eq(leads.id, id)).limit(1);
  if (!l) return back(id, "error", "الفرصة غير موجودة");
  const now = new Date();
  await d
    .update(leads)
    .set({ stage, lostReason: stage === "lost" ? reason : l.lostReason, firstContactAt: l.firstContactAt ?? (stage !== "new" ? now : null), lastContactAt: stage !== "new" ? now : l.lastContactAt })
    .where(eq(leads.id, id));
  await logEvent(id, "stage", `${stageLabel[l.stage]} ← ${stageLabel[stage]}${reason ? ` · ${reason}` : ""}`, undefined, user.fullName);
  await audit({ id: user.id, name: user.fullName }, "lead_stage", "lead", id, { from: l.stage, to: stage });
  revalidatePath(`/admin/leads/${id}`);
  back(id, "ok", `المرحلة: ${stageLabel[stage]}`);
}

export async function markContactedAction(formData: FormData) {
  const user = await requireStaff("clients:write");
  const id = String(formData.get("id"));
  const d = await db();
  const [l] = await d.select().from(leads).where(eq(leads.id, id)).limit(1);
  if (!l) return back(id, "error", "الفرصة غير موجودة");
  const now = new Date();
  await d.update(leads).set({ stage: l.stage === "new" ? "contacted" : l.stage, firstContactAt: l.firstContactAt ?? now, lastContactAt: now, ownerId: l.ownerId ?? user.id }).where(eq(leads.id, id));
  await logEvent(id, "staff_contact", "تم التواصل مع العميل", undefined, user.fullName);
  revalidatePath(`/admin/leads/${id}`);
  back(id, "ok", "سُجّل التواصل");
}

export async function assignLeadAction(formData: FormData) {
  const user = await requireStaff("clients:write");
  const id = String(formData.get("id"));
  const ownerId = String(formData.get("ownerId") ?? "") || null;
  const d = await db();
  await d.update(leads).set({ ownerId }).where(eq(leads.id, id));
  await logEvent(id, "assigned", ownerId ? "إسناد المسؤول" : "إلغاء الإسناد", undefined, user.fullName);
  revalidatePath(`/admin/leads/${id}`);
  back(id, "ok", "تم الإسناد");
}

export async function addNoteAction(formData: FormData) {
  const user = await requireStaff("clients:write");
  const id = String(formData.get("id"));
  const body = String(formData.get("body") ?? "").trim();
  if (!body) return back(id, "error", "اكتب الملاحظة");
  await logEvent(id, "note", body, undefined, user.fullName);
  revalidatePath(`/admin/leads/${id}`);
  back(id, "ok", "أُضيفت الملاحظة");
}

export async function setValueAction(formData: FormData) {
  await requireStaff("clients:write");
  const id = String(formData.get("id"));
  const v = Number(String(formData.get("value") ?? "").replace(/[^\d.]/g, ""));
  const d = await db();
  await d.update(leads).set({ estimatedValue: v > 0 ? String(v) : null }).where(eq(leads.id, id));
  revalidatePath(`/admin/leads/${id}`);
  back(id, "ok", "حُفظت القيمة المقدّرة");
}

export async function stopFollowupsAction(formData: FormData) {
  const user = await requireStaff("clients:write");
  const id = String(formData.get("id"));
  const d = await db();
  await d.update(leads).set({ followupStep: 99 }).where(eq(leads.id, id));
  await logEvent(id, "followups_stopped", "إيقاف المتابعة الآلية", undefined, user.fullName);
  revalidatePath(`/admin/leads/${id}`);
  back(id, "ok", "أُوقفت المتابعة الآلية لهذه الفرصة");
}

const proposalSchema = z.object({
  leadId: z.string().uuid(),
  title: z.string().trim().min(3, "اكتب عنوان العرض"),
  intro: z.string().trim().optional(),
  scope: z.string().trim().min(3, "اكتب نطاق العمل: بندًا في كل سطر"),
  feeKind: z.enum(["fixed", "hourly", "retainer", "contingency"]),
  feeAmount: z.string().trim().optional(),
  feeNote: z.string().trim().optional(),
  validDays: z.coerce.number().int().min(1).max(90).default(14),
});

export async function createProposalAction(formData: FormData) {
  const user = await requireStaff("clients:write");
  const leadId = String(formData.get("leadId"));
  const parsed = proposalSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return back(leadId, "error", parsed.error.issues[0]?.message ?? "بيانات غير صالحة");
  const v = parsed.data;
  const amount = Number((v.feeAmount ?? "").replace(/[^\d.]/g, ""));
  if ((v.feeKind === "fixed" || v.feeKind === "retainer") && !(amount > 0)) return back(leadId, "error", "اكتب مبلغ الأتعاب");
  const d = await db();
  const valid = new Date(Date.now() + v.validDays * 864e5).toISOString().slice(0, 10);
  const [p] = await d
    .insert(proposals)
    .values({ leadId, token: randomBytes(24).toString("base64url"), title: v.title, intro: v.intro || null, scope: v.scope.split("\n").map((s) => s.trim()).filter(Boolean), feeKind: v.feeKind, feeAmount: amount > 0 ? String(amount) : null, feeNote: v.feeNote || null, validUntil: valid, createdBy: user.id })
    .returning();
  await logEvent(leadId, "proposal_created", v.title, { proposalId: p.id }, user.fullName);
  if (formData.get("send")) {
    const ok = await sendProposal(p.id, user.fullName);
    revalidatePath(`/admin/leads/${leadId}`);
    return back(leadId, ok ? "ok" : "error", ok ? "أُرسل العرض إلى العميل بالبريد" : "حُفظ العرض لكن تعذّر إرسال البريد (تحقق من إعداد البريد)");
  }
  revalidatePath(`/admin/leads/${leadId}`);
  back(leadId, "ok", "حُفظ العرض مسودة");
}

export async function sendProposalAction(formData: FormData) {
  const user = await requireStaff("clients:write");
  const id = String(formData.get("id"));
  const leadId = String(formData.get("leadId"));
  const ok = await sendProposal(id, user.fullName);
  revalidatePath(`/admin/leads/${leadId}`);
  back(leadId, ok ? "ok" : "error", ok ? "أُرسل العرض" : "تعذّر إرسال البريد");
}

export async function convertLeadAction(formData: FormData) {
  const user = await requireStaff("clients:write");
  const id = String(formData.get("id"));
  const r = await convertLead(id, { actorName: user.fullName });
  await audit({ id: user.id, name: user.fullName }, "lead_converted", "lead", id, r);
  redirect(`/admin/matters/${r.matterId}`);
}
