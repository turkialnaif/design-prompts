import Link from "next/link";
import { notFound } from "next/navigation";
import { asc, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { PROSPECT_STATUSES, prospectContacts, prospectEvents, prospects } from "@/lib/db/schema";
import { requireStaff } from "@/lib/auth/session";
import { can } from "@/lib/auth/perms";
import { findConflicts } from "@/lib/erp/conflicts";
import { Badge, Card, Empty, Field, Flash, Input, PageHeader, Select, SubmitButton, Textarea, fmtDateTime } from "@/components/admin/ui";
import { addContactAction, contactAction, sendNowAction, sendTestAction, updateProspectAction } from "@/lib/erp/prospect-actions";
import { basisLabel, statusLabel } from "@/lib/prospects/engine";
import { EMAIL_GAPS, peopleSearchUrl } from "@/lib/prospects/copy";

export const dynamic = "force-dynamic";

const CH: Record<string, string> = { named: "باسم شخص", role: "وظيفي", generic: "عام", ir: "علاقات مستثمرين", free: "شخصي", shared: "مشترك", none: "—" };
const KIND: Record<string, string> = { contact_added: "أُضيفت جهة اتصال", email_sent: "رسالة بريد", status: "تغيير الحالة", replied: "ردّت", bounced: "ارتدّ البريد", unsubscribed: "أوقفت الرسائل", contact_removed: "حُذفت جهة", linkedin_queued: "في طابور لينكدان", linkedin_sent: "دعوة لينكدان", linkedin_connected: "قبلت الدعوة", linkedin_replied: "ردّت على لينكدان", linkedin_skipped: "تخطّينا" };

export default async function ProspectPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ ok?: string; error?: string }> }) {
  const user = await requireStaff("clients:read");
  const { id } = await params;
  const sp = await searchParams;
  const d = await db();
  const [p] = await d.select().from(prospects).where(eq(prospects.id, id)).limit(1);
  if (!p) notFound();
  const contacts = await d.select().from(prospectContacts).where(eq(prospectContacts.prospectId, id)).orderBy(asc(prospectContacts.createdAt));
  const events = await d.select().from(prospectEvents).where(eq(prospectEvents.prospectId, id)).orderBy(desc(prospectEvents.createdAt)).limit(60);
  const conflicts = await findConflicts([{ name: p.name.replace(/\([^)]*\)/g, "").trim() }]).catch(() => []);
  const w = can(user.role, "clients:write");

  return (
    <>
      <PageHeader
        title={p.name}
        sub={[p.sector, p.phone, p.tier ? `مرتبة ${p.tier}` : null, p.sizeNote].filter(Boolean).join(" · ")}
        actions={
          <>
            <a href={peopleSearchUrl(p.name)} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-[#0a66c2] px-4 py-2 text-sm font-semibold text-white">ابحث عن المسؤول القانوني في لينكدان</a>
            {p.website && <a href={p.website} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-[#e3ddcb] bg-white px-4 py-2 text-sm font-semibold">الموقع</a>}
            <Link href="/admin/prospects" className="rounded-xl border border-[#e3ddcb] bg-white px-4 py-2 text-sm font-semibold">القائمة</Link>
          </>
        }
      />
      <Flash error={sp.error} ok={sp.ok} />
      {conflicts.length > 0 && <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">تنبيه تعارض: {conflicts.slice(0, 3).map((c) => (c.kind === "party" ? `${c.name} خصم في الملف ${c.matterNumber ?? ""}` : `${c.name} عميل حالي`)).join(" · ")}. افحص قبل أي مراسلة.</p>}

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <Card title={`جهات الاتصال (${contacts.length})`}>
            {contacts.length === 0 ? (
              <Empty>لا جهات اتصال بعد. أضف بريدًا أو رابط لينكدان بالنموذج أدناه، أو استورد ملفًا من صفحة القائمة.</Empty>
            ) : (
              <ul className="space-y-3">
                {contacts.map((c) => {
                  const live = c.emailOn && !!c.email && !c.replied && !c.bounced && !c.unsubscribed && c.emailStep < EMAIL_GAPS.length;
                  return (
                    <li key={c.id} className="rounded-2xl border border-[#e3ddcb] p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <b>{c.fullName || c.email || c.linkedinUrl}</b>
                        <span className="flex flex-wrap gap-1">
                          <Badge tone="gray">{CH[c.channel] ?? c.channel}</Badge>
                          {c.replied && <Badge tone="green">ردّت</Badge>}
                          {c.bounced && <Badge tone="red">ارتدّ</Badge>}
                          {c.unsubscribed && <Badge tone="red">أوقفت</Badge>}
                          {live && <Badge tone="gold">في الطابور · {c.emailStep}/{EMAIL_GAPS.length}</Badge>}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-ink-soft/80" dir="auto">{[c.title, c.email, c.phone, basisLabel[c.basis] ?? c.basis].filter(Boolean).join(" · ")}</p>
                      {c.linkedinUrl && <a href={c.linkedinUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-xs font-bold text-[#0a66c2] underline">ملف لينكدان</a>}
                      {c.lastEmailAt && <p className="mt-1 text-xs text-ink-soft/80">آخر رسالة: {fmtDateTime(c.lastEmailAt)}</p>}
                      {w && (
                        <div className="mt-3 flex flex-wrap gap-2 text-xs">
                          {c.email && <form action={sendTestAction}><input type="hidden" name="id" value={c.id} /><button className="rounded-lg border border-[#e3ddcb] px-3 py-1.5 font-bold">رسالة تجريبية إليّ</button></form>}
                          {c.email && !c.unsubscribed && !c.bounced && !c.replied && c.emailStep < EMAIL_GAPS.length && <form action={sendNowAction}><input type="hidden" name="id" value={c.id} /><button className="rounded-lg border border-[#e3ddcb] px-3 py-1.5 font-bold">أرسل الرسالة التالية الآن</button></form>}
                          {c.email && <form action={contactAction}><input type="hidden" name="id" value={c.id} /><input type="hidden" name="op" value="pause" /><button className="rounded-lg border border-[#e3ddcb] px-3 py-1.5 font-bold">{c.emailOn ? "أوقف الإرسال الآلي" : "فعّل الإرسال الآلي"}</button></form>}
                          {!c.replied && <form action={contactAction}><input type="hidden" name="id" value={c.id} /><input type="hidden" name="op" value="replied" /><button className="rounded-lg border border-emerald-300 px-3 py-1.5 font-bold text-emerald-800">سجّل أنها ردّت</button></form>}
                          <form action={contactAction}><input type="hidden" name="id" value={c.id} /><input type="hidden" name="op" value="delete" /><button className="rounded-lg border border-red-200 px-3 py-1.5 font-bold text-red-700">حذف</button></form>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
            {w && (
              <form action={addContactAction} className="mt-5 grid gap-3 border-t border-[#f0ebdc] pt-5 md:grid-cols-2">
                <input type="hidden" name="prospectId" value={id} />
                <Field label="الاسم"><Input name="fullName" /></Field>
                <Field label="المسمى"><Input name="title" /></Field>
                <Field label="البريد"><Input name="email" type="email" dir="ltr" /></Field>
                <Field label="رابط لينكدان"><Input name="linkedinUrl" dir="ltr" placeholder="https://www.linkedin.com/in/…" /></Field>
                <Field label="الجوال"><Input name="phone" dir="ltr" /></Field>
                <Field label="كيف وصلنا إليه؟"><Select name="basis" defaultValue="manual">{Object.entries(basisLabel).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</Select></Field>
                <div className="md:col-span-2"><SubmitButton>إضافة جهة اتصال</SubmitButton></div>
              </form>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          {w && (
            <Card title="المنشأة">
              <form action={updateProspectAction} className="grid gap-3">
                <input type="hidden" name="id" value={id} />
                <Field label="الحالة"><Select name="status" defaultValue={p.status}>{PROSPECT_STATUSES.map((s) => <option key={s} value={s}>{statusLabel[s]}</option>)}</Select></Field>
                <Field label="الموقع"><Input name="website" defaultValue={p.website ?? ""} dir="ltr" /></Field>
                <Field label="ملاحظات"><Textarea name="notes" rows={5} defaultValue={p.notes ?? ""} /></Field>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="priority" defaultChecked={p.priority} /> أولوية</label>
                <SubmitButton>حفظ</SubmitButton>
              </form>
            </Card>
          )}
          <Card title="السجل">
            {events.length === 0 ? <Empty>لا أحداث.</Empty> : (
              <ul className="space-y-2 text-sm">
                {events.map((e) => (
                  <li key={e.id} className="border-b border-[#f0ebdc] pb-2">
                    <b>{KIND[e.kind] ?? e.kind}</b>{e.body && <span className="block text-ink-soft/80">{e.body}</span>}
                    <span className="text-xs text-ink-soft/70">{fmtDateTime(e.createdAt)}{e.actorName ? ` · ${e.actorName}` : ""}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}
