import Link from "next/link";
import { Download, Share2, Trash2 } from "lucide-react";
import type { InferSelectModel } from "drizzle-orm";
import type { documents, events, tasks } from "@/lib/db/schema";
import { Badge, Empty, Field, Input, Select, SubmitButton, Table, Td, Textarea, Th, fmtDate, fmtDateTime } from "@/components/admin/ui";
import DocUploadForm from "@/components/admin/DocUploadForm";
import { directUploadEnabled } from "@/lib/erp/storage";
import { docCategoryLabel, eventKindLabel, eventStatusLabel, priorityLabel, taskStatusLabel } from "@/lib/erp/labels";
import {
  createEventAction, createTaskAction, deleteDocumentAction, deleteEventAction, deleteTaskAction, setEventStatusAction,
  setTaskStatusAction, toggleShareDocumentAction,
} from "@/lib/erp/work-actions";

type Ev = InferSelectModel<typeof events>;
type Tk = InferSelectModel<typeof tasks>;
type Doc = InferSelectModel<typeof documents>;
type Person = { id: string; fullName: string };

export function EventForm({ matterId, people }: { matterId?: string; people: Person[] }) {
  return (
    <form action={createEventAction} className="grid gap-3 md:grid-cols-4">
      {matterId && <input type="hidden" name="matterId" value={matterId} />}
      <Field label="العنوان" span={2}><Input name="title" required placeholder="جلسة مرافعة، موعد تقديم مذكرة…" /></Field>
      <Field label="النوع">
        <Select name="kind" defaultValue="hearing">{Object.entries(eventKindLabel).map(([k, l]) => <option key={k} value={k}>{l}</option>)}</Select>
      </Field>
      <Field label="التاريخ والوقت"><Input name="startsAt" type="datetime-local" required dir="ltr" /></Field>
      <Field label="المكان / الدائرة"><Input name="location" /></Field>
      <Field label="المسؤول">
        <Select name="assigneeId" defaultValue="">
          <option value="">أنا</option>
          {people.map((p) => <option key={p.id} value={p.id}>{p.fullName}</option>)}
        </Select>
      </Field>
      <Field label="تنبيه قبل (أيام)"><Input name="remindDaysBefore" type="number" min="0" max="30" defaultValue={2} dir="ltr" /></Field>
      <label className="flex items-end gap-2 pb-2.5 text-sm"><input type="checkbox" name="visibleToClient" /> يظهر للعميل في البوابة</label>
      <Field label="ملاحظات" span={3}><Input name="notes" /></Field>
      <div className="flex items-end"><SubmitButton>إضافة</SubmitButton></div>
    </form>
  );
}

export function EventList({ items, showMatter }: { items: { e: Ev; matterLabel?: string | null; assignee?: string | null }[]; showMatter?: boolean }) {
  if (items.length === 0) return <Empty>لا جلسات أو مواعيد.</Empty>;
  return (
    <Table>
      <thead><tr><Th>الموعد</Th><Th>العنوان</Th>{showMatter && <Th>القضية</Th>}<Th>المسؤول</Th><Th>الحالة</Th><Th></Th></tr></thead>
      <tbody>
        {items.map(({ e, matterLabel, assignee }) => (
          <tr key={e.id}>
            <Td className="whitespace-nowrap text-xs">{fmtDateTime(e.startsAt)}</Td>
            <Td><p className="font-semibold">{e.title}</p><p className="text-xs text-ink-soft/60"><Badge tone="gold">{eventKindLabel[e.kind]}</Badge> {e.location ?? ""}</p></Td>
            {showMatter && <Td className="text-xs">{matterLabel ?? "—"}</Td>}
            <Td className="text-xs">{assignee ?? "—"}</Td>
            <Td>
              <form action={setEventStatusAction} className="flex items-center gap-1">
                <input type="hidden" name="id" value={e.id} />
                <select name="status" defaultValue={e.status} className="rounded-lg border border-[#e3ddcb] bg-white px-2 py-1 text-xs">
                  {Object.entries(eventStatusLabel).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
                </select>
                <button className="rounded-lg border border-[#e3ddcb] px-2 py-1 text-xs font-semibold">حفظ</button>
              </form>
            </Td>
            <Td>
              <form action={deleteEventAction}><input type="hidden" name="id" value={e.id} /><button aria-label="حذف" className="text-red-700"><Trash2 className="h-4 w-4" /></button></form>
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export function TaskForm({ matterId, people }: { matterId?: string; people: Person[] }) {
  return (
    <form action={createTaskAction} className="grid gap-3 md:grid-cols-4">
      {matterId && <input type="hidden" name="matterId" value={matterId} />}
      <Field label="المهمة" span={2}><Input name="title" required /></Field>
      <Field label="المكلَّف">
        <Select name="assigneeId" defaultValue="">
          <option value="">أنا</option>
          {people.map((p) => <option key={p.id} value={p.id}>{p.fullName}</option>)}
        </Select>
      </Field>
      <Field label="الاستحقاق"><Input name="dueOn" type="date" dir="ltr" /></Field>
      <Field label="الأولوية">
        <Select name="priority" defaultValue="normal">{Object.entries(priorityLabel).map(([k, l]) => <option key={k} value={k}>{l}</option>)}</Select>
      </Field>
      <Field label="تفاصيل" span={2}><Input name="description" /></Field>
      <div className="flex items-end"><SubmitButton>إضافة</SubmitButton></div>
    </form>
  );
}

export function TaskList({ items, showMatter }: { items: { t: Tk; matterLabel?: string | null; assignee?: string | null }[]; showMatter?: boolean }) {
  if (items.length === 0) return <Empty>لا مهام.</Empty>;
  const today = new Date().toISOString().slice(0, 10);
  return (
    <Table>
      <thead><tr><Th>المهمة</Th>{showMatter && <Th>القضية</Th>}<Th>المكلَّف</Th><Th>الأولوية</Th><Th>الاستحقاق</Th><Th>الحالة</Th><Th></Th></tr></thead>
      <tbody>
        {items.map(({ t, matterLabel, assignee }) => {
          const late = t.status !== "done" && t.dueOn && t.dueOn < today;
          return (
            <tr key={t.id} className={t.status === "done" ? "opacity-60" : ""}>
              <Td><p className={`font-semibold ${t.status === "done" ? "line-through" : ""}`}>{t.title}</p>{t.description && <p className="text-xs text-ink-soft/60">{t.description}</p>}</Td>
              {showMatter && <Td className="text-xs">{matterLabel ?? "عامة"}</Td>}
              <Td className="text-xs">{assignee ?? "—"}</Td>
              <Td><Badge tone={t.priority === "urgent" ? "red" : t.priority === "high" ? "gold" : "gray"}>{priorityLabel[t.priority]}</Badge></Td>
              <Td className={`whitespace-nowrap text-xs ${late ? "font-bold text-red-700" : ""}`}>{fmtDate(t.dueOn)}</Td>
              <Td>
                <form action={setTaskStatusAction} className="flex items-center gap-1">
                  <input type="hidden" name="id" value={t.id} />
                  <select name="status" defaultValue={t.status} className="rounded-lg border border-[#e3ddcb] bg-white px-2 py-1 text-xs">
                    {Object.entries(taskStatusLabel).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
                  </select>
                  <button className="rounded-lg border border-[#e3ddcb] px-2 py-1 text-xs font-semibold">حفظ</button>
                </form>
              </Td>
              <Td><form action={deleteTaskAction}><input type="hidden" name="id" value={t.id} /><button aria-label="حذف" className="text-red-700"><Trash2 className="h-4 w-4" /></button></form></Td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export function DocUpload({ matterId, clientId }: { matterId?: string; clientId?: string }) {
  return <DocUploadForm matterId={matterId} clientId={clientId} direct={directUploadEnabled()} categories={Object.entries(docCategoryLabel)} />;
}

const size = (n: number) => (n > 1048576 ? `${(n / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`);

export function DocList({ items, showMatter }: { items: { doc: Doc; matterLabel?: string | null; uploader?: string | null }[]; showMatter?: boolean }) {
  if (items.length === 0) return <Empty>لا مستندات.</Empty>;
  return (
    <Table>
      <thead><tr><Th>الملف</Th><Th>التصنيف</Th>{showMatter && <Th>القضية</Th>}<Th>الحجم</Th><Th>رفعه</Th><Th>التاريخ</Th><Th>للعميل</Th><Th></Th></tr></thead>
      <tbody>
        {items.map(({ doc, matterLabel, uploader }) => (
          <tr key={doc.id}>
            <Td><Link href={`/api/admin/documents/${doc.id}`} className="inline-flex items-center gap-1.5 font-semibold hover:text-[#a9843c]"><Download className="h-4 w-4" />{doc.name}</Link></Td>
            <Td><Badge tone="gold">{docCategoryLabel[doc.category] ?? doc.category}</Badge></Td>
            {showMatter && <Td className="text-xs">{matterLabel ?? "—"}</Td>}
            <Td className="text-xs">{size(doc.size)}</Td>
            <Td className="text-xs">{uploader ?? "—"}</Td>
            <Td className="whitespace-nowrap text-xs">{fmtDate(doc.createdAt)}</Td>
            <Td>
              <form action={toggleShareDocumentAction}>
                <input type="hidden" name="id" value={doc.id} />
                <button className={`inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-xs font-semibold ${doc.sharedWithClient ? "border-emerald-300 bg-emerald-50 text-emerald-800" : "border-[#e3ddcb]"}`}><Share2 className="h-3.5 w-3.5" />{doc.sharedWithClient ? "مشارَك" : "خاص"}</button>
              </form>
            </Td>
            <Td><form action={deleteDocumentAction}><input type="hidden" name="id" value={doc.id} /><button aria-label="حذف" className="text-red-700"><Trash2 className="h-4 w-4" /></button></form></Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export { Textarea };
