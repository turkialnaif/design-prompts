"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { clients, docTemplates, documents, matterParties, matters, users } from "@/lib/db/schema";
import { requireStaff } from "@/lib/auth/session";
import { canSeeMatter } from "@/lib/erp/queries";
import { buildDocx, fillTemplate, todayGregorian, todayHijri } from "@/lib/erp/templates";
import { getFirmSettings } from "@/lib/erp/settings";
import { storePut } from "@/lib/erp/storage";
import { audit } from "@/lib/audit";

export async function saveTemplateAction(formData: FormData) {
  const user = await requireStaff("templates:write");
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const body = String(formData.get("body") ?? "");
  const category = String(formData.get("category") ?? "general");
  if (!name || !body.trim()) redirect("/admin/templates?error=" + encodeURIComponent("أدخل الاسم والنص"));
  const d = await db();
  if (id) {
    await d.update(docTemplates).set({ name, body, category, updatedAt: new Date() }).where(eq(docTemplates.id, id));
    await audit({ id: user.id, name: user.fullName }, "template_updated", "template", id);
  } else {
    const [row] = await d.insert(docTemplates).values({ name, body, category, createdBy: user.id }).returning({ id: docTemplates.id });
    await audit({ id: user.id, name: user.fullName }, "template_created", "template", row.id);
  }
  revalidatePath("/admin/templates");
  redirect("/admin/templates?ok=" + encodeURIComponent("تم حفظ القالب"));
}

export async function deleteTemplateAction(formData: FormData) {
  const user = await requireStaff("templates:write");
  const id = String(formData.get("id"));
  const d = await db();
  await d.delete(docTemplates).where(eq(docTemplates.id, id));
  await audit({ id: user.id, name: user.fullName }, "template_deleted", "template", id);
  revalidatePath("/admin/templates");
}

export async function generateDocumentAction(formData: FormData) {
  const user = await requireStaff("docs:write");
  const templateId = String(formData.get("templateId"));
  const matterId = String(formData.get("matterId"));
  if (!templateId || !matterId) redirect("/admin/templates?error=" + encodeURIComponent("اختر القالب والقضية"));
  if (!(await canSeeMatter(user, matterId))) redirect("/admin/templates");
  const d = await db();
  const [tpl] = await d.select().from(docTemplates).where(eq(docTemplates.id, templateId)).limit(1);
  const [row] = await d.select({ m: matters, c: clients }).from(matters).innerJoin(clients, eq(matters.clientId, clients.id)).where(eq(matters.id, matterId)).limit(1);
  if (!tpl || !row) redirect("/admin/templates");
  const parties = await d.select().from(matterParties).where(eq(matterParties.matterId, matterId));
  const [lawyer] = row.m.responsibleId ? await d.select().from(users).where(eq(users.id, row.m.responsibleId)).limit(1) : [null];
  const firm = await getFirmSettings();
  const ctx: Record<string, string | null> = {
    "client.name": row.c.name, "client.identifier": row.c.identifier, "client.address": row.c.address, "client.phone": row.c.phone, "client.email": row.c.email,
    "matter.number": row.m.number, "matter.title": row.m.title, "matter.court": row.m.court, "matter.courtCaseNumber": row.m.courtCaseNumber, "matter.claimValue": row.m.claimValue,
    opposing: parties.filter((p) => p.role === "opposing").map((p) => p.name).join("، ") || null,
    "lawyer.name": lawyer?.fullName ?? user.fullName, "lawyer.barNumber": lawyer?.barNumber ?? user.barNumber,
    "firm.name": firm.name, "firm.address": firm.address, "firm.phone": firm.phone, "firm.licenseNumber": firm.licenseNumber,
    date: todayGregorian(), hijri_date: todayHijri(),
  };
  const text = fillTemplate(tpl.body, ctx);
  const buf = await buildDocx(text);
  const stored = await storePut(buf);
  const name = `${tpl.name} — ${row.m.number}.docx`;
  const [doc] = await d
    .insert(documents)
    .values({
      matterId, clientId: row.c.id, name, category: tpl.category, mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      size: buf.length, storageKind: stored.kind, storageKey: stored.key, uploadedBy: user.id,
    })
    .returning({ id: documents.id });
  await audit({ id: user.id, name: user.fullName }, "document_generated", "document", doc.id, { template: tpl.name, matter: row.m.number });
  redirect(`/admin/matters/${matterId}?tab=documents&ok=${encodeURIComponent("أُنشئ المستند وحُفظ مشفّرًا في القضية")}`);
}
