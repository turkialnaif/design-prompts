import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { asc, desc, eq } from "drizzle-orm";
import { AlertTriangle, Play, Square, Trash2 } from "lucide-react";
import { db } from "@/lib/db";
import {
  activeTimers, clients, documents, events, expenses, invoices, matterNotes, matterParties, matterTeam, matters, messages, tasks, timeEntries, users,
} from "@/lib/db/schema";
import { requireStaff } from "@/lib/auth/session";
import { can } from "@/lib/auth/perms";
import { canSeeMatter } from "@/lib/erp/queries";
import { findConflicts } from "@/lib/erp/conflicts";
import {
  Badge, Card, Empty, Field, Flash, Input, LinkButton, PageHeader, Select, SubmitButton, Table, Td, Textarea, Th, fmtDate, fmtDateTime, hours, money,
} from "@/components/admin/ui";
import MatterForm from "@/components/admin/MatterForm";
import { DocList, DocUpload, EventForm, EventList, TaskForm, TaskList } from "@/components/admin/work";
import {
  acknowledgeConflictAction, addNoteAction, addPartyAction, addTeamAction, changeStatusAction, removePartyAction, removeTeamAction, updateMatterAction,
} from "@/lib/erp/matter-actions";
import { addExpenseAction, addTimeAction, deleteExpenseAction, deleteTimeAction, startTimerAction, stopTimerAction } from "@/lib/erp/work-actions";
import { staffSendMessageAction } from "@/lib/erp/message-actions";
import { billingTypeLabel, invoiceStatusLabel, matterStatusLabel, partyRoleLabel } from "@/lib/erp/labels";

const TABS = [
  ["overview", "نظرة عامة"],
  ["events", "الجلسات والمواعيد"],
  ["tasks", "المهام"],
  ["documents", "المستندات"],
  ["time", "الوقت والمصروفات"],
  ["billing", "الفوترة"],
  ["messages", "المراسلات"],
] as const;

export default async function MatterPage({
  params, searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string; ok?: string; error?: string; conflict?: string }>;
}) {
  const user = await requireStaff("matters:read");
  const { id } = await params;
  const sp = await searchParams;
  if (!(await canSeeMatter(user, id))) redirect("/admin/matters");
  const d = await db();
  const [row] = await d.select({ m: matters, c: clients }).from(matters).innerJoin(clients, eq(matters.clientId, clients.id)).where(eq(matters.id, id)).limit(1);
  if (!row) notFound();
  const { m, c } = row;
  const tab = TABS.some((t) => t[0] === sp.tab) ? sp.tab! : "overview";
  const canWrite = can(user.role, "matters:write");
  const allUsers = await d.select({ id: users.id, fullName: users.fullName }).from(users).where(eq(users.isActive, true)).orderBy(asc(users.fullName));
  const userName = new Map(allUsers.map((u) => [u.id, u.fullName]));

  const parties = await d.select().from(matterParties).where(eq(matterParties.matterId, id));
  const team = await d.select().from(matterTeam).where(eq(matterTeam.matterId, id));
  const notes = await d.select().from(matterNotes).where(eq(matterNotes.matterId, id)).orderBy(desc(matterNotes.createdAt));

  const conflicts = await findConflicts(parties.map((p) => ({ name: p.name, identifier: p.identifier ?? undefined })), id, m.clientId);
  const ackNote = notes.find((n) => n.body.startsWith("تمت مراجعة تنبيه تعارض المصالح"));

  return (
    <>
      <PageHeader
        title={m.title}
        sub={`${m.number} · ${c.name}`}
        actions={
          <>
            <Badge tone={m.status === "open" ? "green" : "gray"}>{matterStatusLabel[m.status]}</Badge>
            {canWrite && (
              <form action={changeStatusAction} className="flex items-center gap-1">
                <input type="hidden" name="id" value={m.id} />
                <select name="status" defaultValue={m.status} className="rounded-xl border border-[#e3ddcb] bg-white px-3 py-2 text-sm">
                  {Object.entries(matterStatusLabel).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
                </select>
                <button className="rounded-xl bg-[#12233a] px-4 py-2 text-sm font-semibold text-white">تغيير الحالة</button>
              </form>
            )}
            {can(user.role, "billing:write") && <LinkButton href={`/admin/billing?client=${c.id}&matter=${m.id}`} variant="ghost">فاتورة</LinkButton>}
          </>
        }
      />
      <Flash error={sp.error} ok={sp.ok} />

      {conflicts.length > 0 && (
        <div className={`mb-6 rounded-2xl border p-5 ${ackNote ? "border-amber-200 bg-amber-50/60" : "border-red-300 bg-red-50"}`}>
          <p className="flex items-center gap-2 font-bold text-red-900"><AlertTriangle className="h-5 w-5" /> تنبيه تعارض مصالح محتمل {ackNote && <Badge tone="green">تمت المراجعة</Badge>}</p>
          <ul className="mt-3 space-y-1.5 text-sm">
            {conflicts.slice(0, 8).map((x, i) => (
              <li key={i}>
                {x.kind === "party" ? (
                  <>الاسم «{x.name}» ({partyRoleLabel[(x.role as keyof typeof partyRoleLabel) ?? "other"]}) ورد في القضية <Link className="font-bold underline" href={`/admin/matters/${x.matterId}`}>{x.matterNumber}</Link> — عميلنا فيها: {x.clientName}</>
                ) : (
                  <>الاسم «{x.name}» مسجَّل عميلًا لدينا: <Link className="font-bold underline" href={`/admin/clients/${x.clientId}`}>{x.name}</Link></>
                )}
              </li>
            ))}
          </ul>
          {!ackNote && canWrite && (
            <form action={acknowledgeConflictAction} className="mt-4 flex flex-wrap gap-2">
              <input type="hidden" name="matterId" value={m.id} />
              <div className="min-w-72 flex-1"><Input name="reason" required minLength={5} placeholder="اكتب نتيجة مراجعة التعارض (مثال: لا تعارض؛ أطراف مختلفة)" /></div>
              <SubmitButton>تسجيل المراجعة</SubmitButton>
            </form>
          )}
        </div>
      )}

      <div className="mb-6 flex flex-wrap gap-1.5 border-b border-[#e3ddcb] pb-3">
        {TABS.filter(([k]) => (k === "billing" ? can(user.role, "billing:read") : true)).map(([k, l]) => (
          <Link key={k} href={`/admin/matters/${id}?tab=${k}`} className={`rounded-xl px-4 py-2 text-sm font-semibold ${tab === k ? "bg-[#12233a] text-white" : "text-ink-soft hover:bg-white"}`}>
            {l}
          </Link>
        ))}
      </div>

      {tab === "overview" && (
        <div className="grid gap-6 xl:grid-cols-3">
          <div className="space-y-6 xl:col-span-2">
            <Card title="بيانات القضية">
              {canWrite ? (
                <MatterForm action={updateMatterAction} lawyers={allUsers} defaults={m} id={m.id} submit="حفظ التعديلات" />
              ) : (
                <p className="text-sm">{m.description ?? "—"}</p>
              )}
            </Card>
            <Card title="السجل والملاحظات">
              <form action={addNoteAction} className="mb-5 space-y-2">
                <input type="hidden" name="matterId" value={m.id} />
                <Textarea name="body" rows={3} placeholder="أضف ملاحظة على القضية…" required />
                <div className="flex items-center justify-between gap-2">
                  <label className="flex items-center gap-2 text-xs"><input type="checkbox" name="visibleToClient" /> تظهر للعميل في البوابة</label>
                  <SubmitButton>حفظ الملاحظة</SubmitButton>
                </div>
              </form>
              <ul className="space-y-3">
                {notes.map((n) => (
                  <li key={n.id} className={`rounded-xl p-3 text-sm ${n.kind === "note" ? "bg-[#faf7ef]" : "bg-slate-50 text-ink-soft/70"}`}>
                    <p className="whitespace-pre-wrap leading-7">{n.body}</p>
                    <p className="mt-1 text-[11px] text-ink-soft/55">{n.userId ? userName.get(n.userId) ?? "" : "النظام"} · {fmtDateTime(n.createdAt)} {n.visibleToClient && <Badge tone="blue">ظاهرة للعميل</Badge>}</p>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="space-y-6">
            <Card title="ملخص">
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-ink-soft/60">العميل</dt><dd><Link href={`/admin/clients/${c.id}`} className="font-semibold hover:text-[#a9843c]">{c.name}</Link></dd></div>
                <div className="flex justify-between"><dt className="text-ink-soft/60">المسؤول</dt><dd>{m.responsibleId ? userName.get(m.responsibleId) : "—"}</dd></div>
                <div className="flex justify-between"><dt className="text-ink-soft/60">الجهة</dt><dd>{m.court ?? "—"}</dd></div>
                <div className="flex justify-between"><dt className="text-ink-soft/60">رقم الدعوى</dt><dd className="font-mono text-xs">{m.courtCaseNumber ?? "—"}</dd></div>
                <div className="flex justify-between"><dt className="text-ink-soft/60">قيمة المطالبة</dt><dd>{m.claimValue ? money(m.claimValue) : "—"}</dd></div>
                <div className="flex justify-between"><dt className="text-ink-soft/60">الأتعاب</dt><dd>{billingTypeLabel[m.billingType]}{m.fixedFee ? ` · ${money(m.fixedFee)}` : ""}</dd></div>
                <div className="flex justify-between"><dt className="text-ink-soft/60">فُتحت</dt><dd>{fmtDate(m.openedOn)}</dd></div>
              </dl>
            </Card>

            <Card title="الخصوم والأطراف">
              <ul className="space-y-2">
                {parties.length === 0 && <Empty>لم تُضف أطراف.</Empty>}
                {parties.map((p) => (
                  <li key={p.id} className="flex items-start justify-between gap-2 rounded-xl bg-[#faf7ef] p-3 text-sm">
                    <div><p className="font-semibold">{p.name}</p><p className="text-xs text-ink-soft/60">{partyRoleLabel[p.role]} {p.identifier ? `· ${p.identifier}` : ""}</p></div>
                    {canWrite && <form action={removePartyAction}><input type="hidden" name="id" value={p.id} /><input type="hidden" name="matterId" value={m.id} /><button aria-label="حذف" className="text-red-700"><Trash2 className="h-4 w-4" /></button></form>}
                  </li>
                ))}
              </ul>
              {canWrite && (
                <form action={addPartyAction} className="mt-4 grid gap-2 border-t border-[#f0ebdc] pt-4">
                  <input type="hidden" name="matterId" value={m.id} />
                  <Input name="name" placeholder="الاسم" required />
                  <Input name="identifier" placeholder="الهوية / السجل" dir="ltr" />
                  <Select name="role" defaultValue="opposing">{Object.entries(partyRoleLabel).map(([k, l]) => <option key={k} value={k}>{l}</option>)}</Select>
                  <SubmitButton>إضافة طرف</SubmitButton>
                </form>
              )}
            </Card>

            <Card title="فريق العمل">
              <ul className="space-y-2">
                {team.map((t) => (
                  <li key={t.userId} className="flex items-center justify-between rounded-xl bg-[#faf7ef] p-3 text-sm">
                    <span className="font-semibold">{userName.get(t.userId) ?? "—"}</span>
                    {canWrite && t.userId !== m.responsibleId && <form action={removeTeamAction}><input type="hidden" name="matterId" value={m.id} /><input type="hidden" name="userId" value={t.userId} /><button aria-label="إزالة" className="text-red-700"><Trash2 className="h-4 w-4" /></button></form>}
                  </li>
                ))}
              </ul>
              {canWrite && (
                <form action={addTeamAction} className="mt-4 flex gap-2 border-t border-[#f0ebdc] pt-4">
                  <input type="hidden" name="matterId" value={m.id} />
                  <Select name="userId" defaultValue="">
                    <option value="" disabled>أضف عضوًا</option>
                    {allUsers.filter((u) => !team.some((t) => t.userId === u.id)).map((u) => <option key={u.id} value={u.id}>{u.fullName}</option>)}
                  </Select>
                  <SubmitButton>إضافة</SubmitButton>
                </form>
              )}
            </Card>
          </div>
        </div>
      )}

      {tab === "events" && <EventsTab matterId={id} userIds={allUsers} canWrite={can(user.role, "events:write")} userName={userName} />}
      {tab === "tasks" && <TasksTab matterId={id} people={allUsers} canWrite={can(user.role, "tasks:write")} userName={userName} />}
      {tab === "documents" && <DocsTab matterId={id} canWrite={can(user.role, "docs:write")} canRead={can(user.role, "docs:read")} userName={userName} />}
      {tab === "time" && <TimeTab matterId={id} userId={user.id} canTime={can(user.role, "time:write")} canExp={can(user.role, "expenses:write")} userName={userName} isManager={user.role === "admin" || user.role === "partner"} />}
      {tab === "billing" && can(user.role, "billing:read") && <BillingTab matterId={id} clientId={c.id} canWrite={can(user.role, "billing:write")} />}
      {tab === "messages" && <MessagesTab matterId={id} userName={userName} clientName={c.name} />}
    </>
  );
}

async function EventsTab({ matterId, userIds, canWrite, userName }: { matterId: string; userIds: { id: string; fullName: string }[]; canWrite: boolean; userName: Map<string, string> }) {
  const d = await db();
  const rows = await d.select().from(events).where(eq(events.matterId, matterId)).orderBy(asc(events.startsAt));
  return (
    <div className="space-y-6">
      {canWrite && <Card title="إضافة جلسة أو موعد"><EventForm matterId={matterId} people={userIds} /></Card>}
      <Card title={`الجلسات والمواعيد (${rows.length})`}>
        <EventList items={rows.map((e) => ({ e, assignee: e.assigneeId ? userName.get(e.assigneeId) : null }))} />
      </Card>
    </div>
  );
}

async function TasksTab({ matterId, people, canWrite, userName }: { matterId: string; people: { id: string; fullName: string }[]; canWrite: boolean; userName: Map<string, string> }) {
  const d = await db();
  const rows = await d.select().from(tasks).where(eq(tasks.matterId, matterId)).orderBy(asc(tasks.dueOn));
  return (
    <div className="space-y-6">
      {canWrite && <Card title="مهمة جديدة"><TaskForm matterId={matterId} people={people} /></Card>}
      <Card title={`المهام (${rows.length})`}><TaskList items={rows.map((t) => ({ t, assignee: t.assigneeId ? userName.get(t.assigneeId) : null }))} /></Card>
    </div>
  );
}

async function DocsTab({ matterId, canWrite, canRead, userName }: { matterId: string; canWrite: boolean; canRead: boolean; userName: Map<string, string> }) {
  if (!canRead) return <Empty>ليست لديك صلاحية عرض المستندات.</Empty>;
  const d = await db();
  const rows = await d.select().from(documents).where(eq(documents.matterId, matterId)).orderBy(desc(documents.createdAt));
  return (
    <div className="space-y-6">
      {canWrite && <Card title="رفع مستند (يُشفَّر قبل التخزين)"><DocUpload matterId={matterId} /></Card>}
      <Card title={`مستندات القضية (${rows.length})`}><DocList items={rows.map((doc) => ({ doc, uploader: doc.uploadedBy ? userName.get(doc.uploadedBy) : null }))} /></Card>
    </div>
  );
}

async function TimeTab({ matterId, userId, canTime, canExp, userName, isManager }: { matterId: string; userId: string; canTime: boolean; canExp: boolean; userName: Map<string, string>; isManager: boolean }) {
  const d = await db();
  const times = await d.select().from(timeEntries).where(eq(timeEntries.matterId, matterId)).orderBy(desc(timeEntries.workedOn), desc(timeEntries.createdAt));
  const exps = await d.select().from(expenses).where(eq(expenses.matterId, matterId)).orderBy(desc(expenses.spentOn));
  const [timer] = await d.select().from(activeTimers).where(eq(activeTimers.userId, userId)).limit(1);
  const totalMin = times.reduce((s, t) => s + t.minutes, 0);
  const totalValue = times.filter((t) => t.billable).reduce((s, t) => s + (t.minutes / 60) * Number(t.rate ?? 0), 0);
  return (
    <div className="space-y-6">
      {canTime && (
        <div className="grid gap-6 xl:grid-cols-2">
          <Card title="مؤقّت">
            {timer ? (
              <form action={stopTimerAction} className="flex items-center justify-between gap-3">
                <p className="text-sm">مؤقّت يعمل منذ {fmtDateTime(timer.startedAt)}{timer.matterId !== matterId ? " (على قضية أخرى)" : ""}</p>
                <SubmitButton className="!bg-red-700"><Square className="h-4 w-4" /> إيقاف وتسجيل</SubmitButton>
              </form>
            ) : (
              <form action={startTimerAction} className="flex gap-2">
                <input type="hidden" name="matterId" value={matterId} />
                <Input name="description" placeholder="وصف العمل (اختياري)" />
                <SubmitButton><Play className="h-4 w-4" /> بدء</SubmitButton>
              </form>
            )}
          </Card>
          <Card title="تسجيل وقت يدويًا">
            <form action={addTimeAction} className="grid gap-3 md:grid-cols-4">
              <input type="hidden" name="matterId" value={matterId} />
              <Field label="التاريخ"><Input name="workedOn" type="date" dir="ltr" defaultValue={new Date().toISOString().slice(0, 10)} /></Field>
              <Field label="ساعات"><Input name="hours" type="number" step="0.25" min="0" dir="ltr" defaultValue="1" /></Field>
              <Field label="وصف العمل" span={2}><Input name="description" required /></Field>
              <label className="flex items-center gap-2 text-sm md:col-span-3"><input type="checkbox" name="billable" defaultChecked value="on" /> قابل للفوترة</label>
              <div><SubmitButton>إضافة</SubmitButton></div>
            </form>
          </Card>
        </div>
      )}

      <Card title={`سجل الوقت — ${hours(totalMin)} ساعة · ${money(totalValue)}`}>
        {times.length === 0 ? <Empty>لا وقت مسجَّل.</Empty> : (
          <Table>
            <thead><tr><Th>التاريخ</Th><Th>المحامي</Th><Th>الوصف</Th><Th>المدة</Th><Th>القيمة</Th><Th>الفوترة</Th><Th></Th></tr></thead>
            <tbody>
              {times.map((t) => (
                <tr key={t.id}>
                  <Td className="whitespace-nowrap text-xs">{fmtDate(t.workedOn)}</Td>
                  <Td className="text-xs">{userName.get(t.userId)}</Td>
                  <Td>{t.description}</Td>
                  <Td className="font-mono text-xs">{hours(t.minutes)}</Td>
                  <Td className="text-xs">{t.billable ? money((t.minutes / 60) * Number(t.rate ?? 0)) : "—"}</Td>
                  <Td>{t.invoiceId ? <Badge tone="green">مفوتر</Badge> : t.billable ? <Badge tone="gold">قابل للفوترة</Badge> : <Badge>غير مفوتر</Badge>}</Td>
                  <Td>{!t.invoiceId && (t.userId === userId || isManager) && <form action={deleteTimeAction}><input type="hidden" name="id" value={t.id} /><button aria-label="حذف" className="text-red-700"><Trash2 className="h-4 w-4" /></button></form>}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>

      {canExp && (
        <Card title="المصروفات">
          <form action={addExpenseAction} className="mb-5 grid gap-3 md:grid-cols-5">
            <input type="hidden" name="matterId" value={matterId} />
            <Field label="الوصف" span={2}><Input name="description" required placeholder="رسوم قيد، ترجمة، انتقال…" /></Field>
            <Field label="المبلغ (ر.س)"><Input name="amount" type="number" step="0.01" min="0" dir="ltr" required /></Field>
            <Field label="التاريخ"><Input name="spentOn" type="date" dir="ltr" defaultValue={new Date().toISOString().slice(0, 10)} /></Field>
            <div className="flex items-end"><SubmitButton>إضافة</SubmitButton></div>
          </form>
          {exps.length === 0 ? <Empty>لا مصروفات.</Empty> : (
            <Table>
              <thead><tr><Th>التاريخ</Th><Th>الوصف</Th><Th>المبلغ</Th><Th>الفوترة</Th><Th></Th></tr></thead>
              <tbody>
                {exps.map((x) => (
                  <tr key={x.id}>
                    <Td className="text-xs">{fmtDate(x.spentOn)}</Td>
                    <Td>{x.description}</Td>
                    <Td>{money(x.amount)}</Td>
                    <Td>{x.invoiceId ? <Badge tone="green">مفوتر</Badge> : <Badge tone="gold">قابل للفوترة</Badge>}</Td>
                    <Td>{!x.invoiceId && <form action={deleteExpenseAction}><input type="hidden" name="id" value={x.id} /><button aria-label="حذف" className="text-red-700"><Trash2 className="h-4 w-4" /></button></form>}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card>
      )}
    </div>
  );
}

async function BillingTab({ matterId, clientId, canWrite }: { matterId: string; clientId: string; canWrite: boolean }) {
  const d = await db();
  const rows = await d.select().from(invoices).where(eq(invoices.matterId, matterId)).orderBy(desc(invoices.createdAt));
  return (
    <Card title="فواتير القضية" actions={canWrite ? <LinkButton href={`/admin/billing?client=${clientId}&matter=${matterId}`}>فاتورة جديدة</LinkButton> : undefined}>
      {rows.length === 0 ? <Empty>لا فواتير لهذه القضية.</Empty> : (
        <Table>
          <thead><tr><Th>الرقم</Th><Th>التاريخ</Th><Th>الإجمالي</Th><Th>الحالة</Th></tr></thead>
          <tbody>
            {rows.map((i) => (
              <tr key={i.id}>
                <Td><Link href={`/admin/billing/${i.id}`} className="font-mono text-xs hover:text-[#a9843c]">{i.number}</Link></Td>
                <Td className="text-xs">{fmtDate(i.issuedOn)}</Td>
                <Td>{money(i.total)}</Td>
                <Td><Badge tone={i.status === "paid" ? "green" : i.status === "void" ? "red" : "gold"}>{invoiceStatusLabel[i.status]}</Badge></Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Card>
  );
}

async function MessagesTab({ matterId, userName, clientName }: { matterId: string; userName: Map<string, string>; clientName: string }) {
  const d = await db();
  const rows = await d.select().from(messages).where(eq(messages.matterId, matterId)).orderBy(asc(messages.createdAt));
  return (
    <Card title="المراسلات مع العميل (تظهر في بوابة العميل)">
      <div className="mb-5 space-y-3">
        {rows.length === 0 && <Empty>لا مراسلات بعد.</Empty>}
        {rows.map((r) => (
          <div key={r.id} className={`max-w-2xl rounded-2xl p-3 text-sm ${r.fromKind === "staff" ? "bg-[#12233a] text-white" : "me-auto bg-[#faf7ef]"}`}>
            <p className="whitespace-pre-wrap leading-7">{r.body}</p>
            <p className={`mt-1 text-[11px] ${r.fromKind === "staff" ? "text-white/60" : "text-ink-soft/55"}`}>{r.fromKind === "staff" ? userName.get(r.fromId) : clientName} · {fmtDateTime(r.createdAt)}</p>
          </div>
        ))}
      </div>
      <form action={staffSendMessageAction} className="space-y-2">
        <input type="hidden" name="matterId" value={matterId} />
        <Textarea name="body" rows={3} required placeholder="اكتب رسالة للعميل…" />
        <SubmitButton>إرسال</SubmitButton>
      </form>
    </Card>
  );
}
