"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db";
import { matterNotes, matterParties, matterTeam, matters } from "@/lib/db/schema";
import { requireStaff } from "@/lib/auth/session";
import { canSeeMatter, nextMatterNumber } from "@/lib/erp/queries";
import { findConflicts } from "@/lib/erp/conflicts";
import { audit } from "@/lib/audit";

const schema = z.object({
  clientId: z.string().uuid("اختر العميل"),
  title: z.string().trim().min(3, "أدخل عنوان القضية"),
  practiceArea: z.string().optional(),
  matterType: z.string().optional(),
  court: z.string().optional(),
  courtCaseNumber: z.string().optional(),
  stage: z.string().optional(),
  claimValue: z.string().optional(),
  description: z.string().optional(),
  responsibleId: z.string().optional(),
  billingType: z.enum(["hourly", "fixed", "retainer", "contingency"]),
  fixedFee: z.string().optional(),
  hourlyRate: z.string().optional(),
});

const nul = (s?: string) => (s && s.trim().length ? s.trim() : null);

function parseParties(raw: string) {
  return raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const [name, identifier] = l.split("|").map((x) => x.trim());
      return { name, identifier: identifier || undefined };
    });
}

export async function createMatterAction(formData: FormData) {
  const user = await requireStaff("matters:write");
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect(`/admin/matters/new?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "بيانات غير صالحة")}`);
  const v = parsed.data;
  const d = await db();
  const number = await nextMatterNumber();
  const [row] = await d
    .insert(matters)
    .values({
      number,
      title: v.title,
      clientId: v.clientId,
      practiceArea: nul(v.practiceArea),
      matterType: nul(v.matterType),
      court: nul(v.court),
      courtCaseNumber: nul(v.courtCaseNumber),
      stage: nul(v.stage),
      claimValue: nul(v.claimValue),
      description: nul(v.description),
      responsibleId: nul(v.responsibleId) ?? user.id,
      billingType: v.billingType,
      fixedFee: nul(v.fixedFee),
      hourlyRate: nul(v.hourlyRate),
      createdBy: user.id,
    })
    .returning({ id: matters.id });

  await d.insert(matterTeam).values({ matterId: row.id, userId: nul(v.responsibleId) ?? user.id, role: "lead" }).onConflictDoNothing();

  const parties = parseParties(String(formData.get("parties") ?? ""));
  if (parties.length) {
    await d.insert(matterParties).values(parties.map((p) => ({ matterId: row.id, role: "opposing" as const, name: p.name, identifier: p.identifier ?? null })));
  }
  await d.insert(matterNotes).values({ matterId: row.id, userId: user.id, kind: "system", body: `فُتحت القضية برقم ${number}.` });
  await audit({ id: user.id, name: user.fullName }, "matter_created", "matter", row.id, { number });

  const conflicts = await findConflicts([...parties], row.id, v.clientId);
  revalidatePath("/admin/matters");
  redirect(`/admin/matters/${row.id}${conflicts.length ? "?conflict=1" : ""}`);
}

export async function updateMatterAction(formData: FormData) {
  const user = await requireStaff("matters:write");
  const id = String(formData.get("id"));
  if (!(await canSeeMatter(user, id))) redirect("/admin/matters");
  const parsed = schema.omit({ clientId: true }).safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect(`/admin/matters/${id}?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "بيانات غير صالحة")}`);
  const v = parsed.data;
  const d = await db();
  await d
    .update(matters)
    .set({
      title: v.title,
      practiceArea: nul(v.practiceArea),
      matterType: nul(v.matterType),
      court: nul(v.court),
      courtCaseNumber: nul(v.courtCaseNumber),
      stage: nul(v.stage),
      claimValue: nul(v.claimValue),
      description: nul(v.description),
      responsibleId: nul(v.responsibleId),
      billingType: v.billingType,
      fixedFee: nul(v.fixedFee),
      hourlyRate: nul(v.hourlyRate),
    })
    .where(eq(matters.id, id));
  await audit({ id: user.id, name: user.fullName }, "matter_updated", "matter", id);
  revalidatePath(`/admin/matters/${id}`);
  redirect(`/admin/matters/${id}?ok=${encodeURIComponent("تم حفظ التعديلات")}`);
}

export async function changeStatusAction(formData: FormData) {
  const user = await requireStaff("matters:write");
  const id = String(formData.get("id"));
  const status = String(formData.get("status")) as "open" | "pending" | "on_hold" | "closed" | "archived";
  if (!(await canSeeMatter(user, id))) return;
  const d = await db();
  await d.update(matters).set({ status, closedOn: status === "closed" ? new Date().toISOString().slice(0, 10) : null }).where(eq(matters.id, id));
  await d.insert(matterNotes).values({ matterId: id, userId: user.id, kind: "status", body: `تغيّرت حالة القضية إلى: ${status}` });
  await audit({ id: user.id, name: user.fullName }, "matter_status", "matter", id, { status });
  revalidatePath(`/admin/matters/${id}`);
}

export async function addPartyAction(formData: FormData) {
  const user = await requireStaff("matters:write");
  const matterId = String(formData.get("matterId"));
  if (!(await canSeeMatter(user, matterId))) return;
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;
  const d = await db();
  await d.insert(matterParties).values({
    matterId,
    name,
    role: String(formData.get("role") ?? "opposing") as "opposing",
    identifier: nul(String(formData.get("identifier") ?? "")),
  });
  await audit({ id: user.id, name: user.fullName }, "party_added", "matter", matterId, { name });
  revalidatePath(`/admin/matters/${matterId}`);
}

export async function removePartyAction(formData: FormData) {
  const user = await requireStaff("matters:write");
  const id = String(formData.get("id"));
  const matterId = String(formData.get("matterId"));
  if (!(await canSeeMatter(user, matterId))) return;
  const d = await db();
  await d.delete(matterParties).where(eq(matterParties.id, id));
  revalidatePath(`/admin/matters/${matterId}`);
}

export async function addTeamAction(formData: FormData) {
  const user = await requireStaff("matters:write");
  const matterId = String(formData.get("matterId"));
  const userId = String(formData.get("userId"));
  if (!(await canSeeMatter(user, matterId)) || !userId) return;
  const d = await db();
  await d.insert(matterTeam).values({ matterId, userId }).onConflictDoNothing();
  await audit({ id: user.id, name: user.fullName }, "team_added", "matter", matterId, { userId });
  revalidatePath(`/admin/matters/${matterId}`);
}

export async function removeTeamAction(formData: FormData) {
  const user = await requireStaff("matters:write");
  const matterId = String(formData.get("matterId"));
  const userId = String(formData.get("userId"));
  if (!(await canSeeMatter(user, matterId))) return;
  const d = await db();
  await d.delete(matterTeam).where(and(eq(matterTeam.matterId, matterId), eq(matterTeam.userId, userId)));
  revalidatePath(`/admin/matters/${matterId}`);
}

export async function addNoteAction(formData: FormData) {
  const user = await requireStaff("matters:read");
  const matterId = String(formData.get("matterId"));
  if (!(await canSeeMatter(user, matterId))) return;
  const body = String(formData.get("body") ?? "").trim();
  if (!body) return;
  const d = await db();
  await d.insert(matterNotes).values({ matterId, userId: user.id, kind: "note", body, visibleToClient: formData.get("visibleToClient") === "on" });
  revalidatePath(`/admin/matters/${matterId}`);
}

export async function acknowledgeConflictAction(formData: FormData) {
  const user = await requireStaff("matters:write");
  const matterId = String(formData.get("matterId"));
  const reason = String(formData.get("reason") ?? "").trim();
  if (!(await canSeeMatter(user, matterId)) || reason.length < 5) return;
  const d = await db();
  await d.insert(matterNotes).values({ matterId, userId: user.id, kind: "system", body: `تمت مراجعة تنبيه تعارض المصالح: ${reason}` });
  await audit({ id: user.id, name: user.fullName }, "conflict_acknowledged", "matter", matterId, { reason });
  revalidatePath(`/admin/matters/${matterId}`);
  redirect(`/admin/matters/${matterId}`);
}
