"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { activeTimers, documents, events, expenses, matters, tasks, timeEntries } from "@/lib/db/schema";
import { requireStaff } from "@/lib/auth/session";
import { canSeeMatter } from "@/lib/erp/queries";
import { storeDelete, storePut } from "@/lib/erp/storage";
import { audit } from "@/lib/audit";

const nul = (s?: string | null) => (s && s.trim().length ? s.trim() : null);
const back = (matterId: string | null, tab: string) => revalidatePath(matterId ? `/admin/matters/${matterId}` : `/admin/${tab}`);

/* ------------------------------ الجلسات والمواعيد ------------------------------ */
export async function createEventAction(formData: FormData) {
  const user = await requireStaff("events:write");
  const matterId = nul(String(formData.get("matterId") ?? ""));
  if (matterId && !(await canSeeMatter(user, matterId))) return;
  const title = String(formData.get("title") ?? "").trim();
  const startsAt = String(formData.get("startsAt") ?? "");
  if (!title || !startsAt) return;
  const d = await db();
  const [row] = await d
    .insert(events)
    .values({
      matterId,
      title,
      kind: String(formData.get("kind") ?? "hearing") as "hearing",
      startsAt: new Date(startsAt),
      location: nul(String(formData.get("location") ?? "")),
      notes: nul(String(formData.get("notes") ?? "")),
      assigneeId: nul(String(formData.get("assigneeId") ?? "")) ?? user.id,
      remindDaysBefore: Number(formData.get("remindDaysBefore") ?? 2) || 2,
      visibleToClient: formData.get("visibleToClient") === "on",
      createdBy: user.id,
    })
    .returning({ id: events.id });
  await audit({ id: user.id, name: user.fullName }, "event_created", "event", row.id, { title });
  back(matterId, "calendar");
  revalidatePath("/admin/calendar");
}

export async function setEventStatusAction(formData: FormData) {
  const user = await requireStaff("events:write");
  const id = String(formData.get("id"));
  const status = String(formData.get("status")) as "scheduled" | "done" | "postponed" | "cancelled";
  const d = await db();
  const [e] = await d.select().from(events).where(eq(events.id, id)).limit(1);
  if (!e || (e.matterId && !(await canSeeMatter(user, e.matterId)))) return;
  await d.update(events).set({ status }).where(eq(events.id, id));
  await audit({ id: user.id, name: user.fullName }, "event_status", "event", id, { status });
  back(e.matterId, "calendar");
  revalidatePath("/admin/calendar");
}

export async function deleteEventAction(formData: FormData) {
  const user = await requireStaff("events:write");
  const id = String(formData.get("id"));
  const d = await db();
  const [e] = await d.select().from(events).where(eq(events.id, id)).limit(1);
  if (!e || (e.matterId && !(await canSeeMatter(user, e.matterId)))) return;
  await d.delete(events).where(eq(events.id, id));
  await audit({ id: user.id, name: user.fullName }, "event_deleted", "event", id, { title: e.title });
  back(e.matterId, "calendar");
  revalidatePath("/admin/calendar");
}

/* ------------------------------------ المهام ------------------------------------ */
export async function createTaskAction(formData: FormData) {
  const user = await requireStaff("tasks:write");
  const matterId = nul(String(formData.get("matterId") ?? ""));
  if (matterId && !(await canSeeMatter(user, matterId))) return;
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return;
  const d = await db();
  await d.insert(tasks).values({
    matterId,
    title,
    description: nul(String(formData.get("description") ?? "")),
    assigneeId: nul(String(formData.get("assigneeId") ?? "")) ?? user.id,
    dueOn: nul(String(formData.get("dueOn") ?? "")),
    priority: String(formData.get("priority") ?? "normal") as "normal",
    createdBy: user.id,
  });
  back(matterId, "tasks");
  revalidatePath("/admin/tasks");
}

export async function setTaskStatusAction(formData: FormData) {
  const user = await requireStaff("tasks:write");
  const id = String(formData.get("id"));
  const status = String(formData.get("status")) as "todo" | "doing" | "done";
  const d = await db();
  const [t] = await d.select().from(tasks).where(eq(tasks.id, id)).limit(1);
  if (!t || (t.matterId && !(await canSeeMatter(user, t.matterId)))) return;
  await d.update(tasks).set({ status, completedAt: status === "done" ? new Date() : null }).where(eq(tasks.id, id));
  back(t.matterId, "tasks");
  revalidatePath("/admin/tasks");
}

export async function deleteTaskAction(formData: FormData) {
  const user = await requireStaff("tasks:write");
  const id = String(formData.get("id"));
  const d = await db();
  const [t] = await d.select().from(tasks).where(eq(tasks.id, id)).limit(1);
  if (!t || (t.matterId && !(await canSeeMatter(user, t.matterId)))) return;
  await d.delete(tasks).where(eq(tasks.id, id));
  back(t.matterId, "tasks");
  revalidatePath("/admin/tasks");
}

/* ---------------------------------- المستندات ---------------------------------- */
const MAX_BYTES = 4 * 1024 * 1024;
const ALLOWED = /^(application\/pdf|image\/(png|jpe?g|webp)|application\/(msword|vnd\.openxmlformats-officedocument\.[a-z.]+|vnd\.ms-excel)|text\/plain)$/;

export async function uploadDocumentAction(formData: FormData) {
  const user = await requireStaff("docs:write");
  const matterId = nul(String(formData.get("matterId") ?? ""));
  const clientId = nul(String(formData.get("clientId") ?? ""));
  if (matterId && !(await canSeeMatter(user, matterId))) return;
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return;
  if (file.size > MAX_BYTES) return;
  if (!ALLOWED.test(file.type)) return;
  const bytes = Buffer.from(await file.arrayBuffer());
  const stored = await storePut(bytes);
  const d = await db();
  let cid = clientId;
  if (matterId && !cid) {
    const [m] = await d.select({ clientId: matters.clientId }).from(matters).where(eq(matters.id, matterId)).limit(1);
    cid = m?.clientId ?? null;
  }
  const [row] = await d
    .insert(documents)
    .values({
      matterId,
      clientId: cid,
      name: nul(String(formData.get("name") ?? "")) ?? file.name,
      category: String(formData.get("category") ?? "general"),
      mimeType: file.type,
      size: file.size,
      storageKind: stored.kind,
      storageKey: stored.key,
      sharedWithClient: formData.get("sharedWithClient") === "on",
      uploadedBy: user.id,
    })
    .returning({ id: documents.id });
  await audit({ id: user.id, name: user.fullName }, "document_uploaded", "document", row.id, { name: file.name, size: file.size });
  back(matterId, "documents");
  revalidatePath("/admin/documents");
}

export async function deleteDocumentAction(formData: FormData) {
  const user = await requireStaff("docs:write");
  const id = String(formData.get("id"));
  const d = await db();
  const [doc] = await d.select().from(documents).where(eq(documents.id, id)).limit(1);
  if (!doc || (doc.matterId && !(await canSeeMatter(user, doc.matterId)))) return;
  await storeDelete(doc.storageKind, doc.storageKey);
  await d.delete(documents).where(eq(documents.id, id));
  await audit({ id: user.id, name: user.fullName }, "document_deleted", "document", id, { name: doc.name });
  back(doc.matterId, "documents");
  revalidatePath("/admin/documents");
}

export async function toggleShareDocumentAction(formData: FormData) {
  const user = await requireStaff("docs:write");
  const id = String(formData.get("id"));
  const d = await db();
  const [doc] = await d.select().from(documents).where(eq(documents.id, id)).limit(1);
  if (!doc || (doc.matterId && !(await canSeeMatter(user, doc.matterId)))) return;
  await d.update(documents).set({ sharedWithClient: !doc.sharedWithClient }).where(eq(documents.id, id));
  await audit({ id: user.id, name: user.fullName }, "document_share_toggled", "document", id, { shared: !doc.sharedWithClient });
  back(doc.matterId, "documents");
}

/* ------------------------------ الوقت والمصروفات ------------------------------ */
export async function addTimeAction(formData: FormData) {
  const user = await requireStaff("time:write");
  const matterId = String(formData.get("matterId"));
  if (!(await canSeeMatter(user, matterId))) return;
  const hoursRaw = String(formData.get("hours") ?? "0").replace(",", ".");
  const minutes = Math.round((Number(formData.get("minutesOnly")) || 0) + Number(hoursRaw) * 60);
  const description = String(formData.get("description") ?? "").trim();
  if (!minutes || minutes < 1 || !description) return;
  const d = await db();
  const [m] = await d.select().from(matters).where(eq(matters.id, matterId)).limit(1);
  const rate = m?.hourlyRate ?? user.hourlyRate ?? null;
  await d.insert(timeEntries).values({
    matterId,
    userId: user.id,
    workedOn: nul(String(formData.get("workedOn") ?? "")) ?? new Date().toISOString().slice(0, 10),
    minutes,
    description,
    billable: formData.get("billable") !== "off",
    rate,
  });
  revalidatePath(`/admin/matters/${matterId}`);
  revalidatePath("/admin/time");
}

export async function deleteTimeAction(formData: FormData) {
  const user = await requireStaff("time:write");
  const id = String(formData.get("id"));
  const d = await db();
  const [t] = await d.select().from(timeEntries).where(eq(timeEntries.id, id)).limit(1);
  if (!t || t.invoiceId) return;
  if (t.userId !== user.id && user.role !== "admin" && user.role !== "partner") return;
  await d.delete(timeEntries).where(eq(timeEntries.id, id));
  revalidatePath(`/admin/matters/${t.matterId}`);
  revalidatePath("/admin/time");
}

export async function startTimerAction(formData: FormData) {
  const user = await requireStaff("time:write");
  const matterId = String(formData.get("matterId"));
  if (!(await canSeeMatter(user, matterId))) return;
  const d = await db();
  await d.delete(activeTimers).where(eq(activeTimers.userId, user.id));
  await d.insert(activeTimers).values({ userId: user.id, matterId, description: nul(String(formData.get("description") ?? "")) });
  revalidatePath("/admin/time");
  revalidatePath(`/admin/matters/${matterId}`);
}

export async function stopTimerAction() {
  const user = await requireStaff("time:write");
  const d = await db();
  const [t] = await d.select().from(activeTimers).where(eq(activeTimers.userId, user.id)).limit(1);
  if (!t) return;
  const minutes = Math.max(1, Math.round((Date.now() - t.startedAt.getTime()) / 60000));
  const [m] = await d.select().from(matters).where(eq(matters.id, t.matterId)).limit(1);
  await d.insert(timeEntries).values({
    matterId: t.matterId,
    userId: user.id,
    minutes,
    description: t.description || "عمل على القضية",
    billable: true,
    rate: m?.hourlyRate ?? user.hourlyRate ?? null,
  });
  await d.delete(activeTimers).where(eq(activeTimers.userId, user.id));
  revalidatePath("/admin/time");
  revalidatePath(`/admin/matters/${t.matterId}`);
}

export async function addExpenseAction(formData: FormData) {
  const user = await requireStaff("expenses:write");
  const matterId = String(formData.get("matterId"));
  if (!(await canSeeMatter(user, matterId))) return;
  const amount = Number(String(formData.get("amount") ?? "0").replace(",", "."));
  const description = String(formData.get("description") ?? "").trim();
  if (!amount || amount <= 0 || !description) return;
  const d = await db();
  await d.insert(expenses).values({
    matterId,
    userId: user.id,
    amount: String(amount),
    category: String(formData.get("category") ?? "other"),
    description,
    spentOn: nul(String(formData.get("spentOn") ?? "")) ?? new Date().toISOString().slice(0, 10),
    billable: formData.get("billable") !== "off",
  });
  revalidatePath(`/admin/matters/${matterId}`);
  revalidatePath("/admin/time");
}

export async function deleteExpenseAction(formData: FormData) {
  const user = await requireStaff("expenses:write");
  const id = String(formData.get("id"));
  const d = await db();
  const [x] = await d.select().from(expenses).where(eq(expenses.id, id)).limit(1);
  if (!x || x.invoiceId) return;
  if (!(await canSeeMatter(user, x.matterId))) return;
  await d.delete(expenses).where(eq(expenses.id, id));
  revalidatePath(`/admin/matters/${x.matterId}`);
  revalidatePath("/admin/time");
}
