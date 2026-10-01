import Link from "next/link";
import { notFound } from "next/navigation";
import { and, asc, desc, eq, gte, sql } from "drizzle-orm";
import { Download } from "lucide-react";
import { db } from "@/lib/db";
import { documents, events, invoices, matterNotes, matters, messages, payments, users } from "@/lib/db/schema";
import { requireClient } from "@/lib/auth/session";
import { Badge, Card, Empty, fmtDate, fmtDateTime, money } from "@/components/admin/ui";
import { clientSendMessageAction } from "@/lib/erp/message-actions";
import { eventKindLabel, invoiceStatusLabel, matterStatusLabel } from "@/lib/erp/labels";
import SubmitButton from "@/components/admin/SubmitButton";

export default async function PortalMatter({ params }: { params: Promise<{ id: string }> }) {
  const u = await requireClient();
  const { id } = await params;
  const d = await db();
  const [m] = await d.select().from(matters).where(and(eq(matters.id, id), eq(matters.clientId, u.clientId))).limit(1);
  if (!m) notFound();

  const lawyer = m.responsibleId ? (await d.select({ n: users.fullName }).from(users).where(eq(users.id, m.responsibleId)).limit(1))[0]?.n : null;
  const upcoming = await d.select().from(events).where(and(eq(events.matterId, id), eq(events.visibleToClient, true), gte(events.startsAt, new Date()), eq(events.status, "scheduled"))).orderBy(asc(events.startsAt));
  const notes = await d.select().from(matterNotes).where(and(eq(matterNotes.matterId, id), eq(matterNotes.visibleToClient, true))).orderBy(desc(matterNotes.createdAt));
  const docs = await d.select().from(documents).where(and(eq(documents.matterId, id), eq(documents.sharedWithClient, true))).orderBy(desc(documents.createdAt));
  const inv = await d
    .select({ i: invoices, paid: sql<string>`coalesce((select sum(${payments.amount}) from ${payments} where ${payments.invoiceId} = ${invoices.id}), 0)` })
    .from(invoices)
    .where(and(eq(invoices.matterId, id), sql`${invoices.status} <> 'draft'`))
    .orderBy(desc(invoices.createdAt));
  const thread = await d.select().from(messages).where(eq(messages.matterId, id)).orderBy(asc(messages.createdAt));

  return (
    <>
      <Link href="/portal" className="text-sm font-semibold text-[#a9843c]">← كل القضايا</Link>
      <div className="mt-3 mb-6 flex flex-wrap items-start justify-between gap-3">
        <div><h1 className="font-display text-2xl font-bold">{m.title}</h1><p className="mt-1 text-sm text-ink-soft/70">{m.number}{lawyer ? ` · المحامي المسؤول: ${lawyer}` : ""}</p></div>
        <Badge tone={m.status === "open" ? "green" : "gray"}>{matterStatusLabel[m.status]}</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="المواعيد القادمة">
          {upcoming.length === 0 ? <Empty>لا مواعيد قادمة.</Empty> : (
            <ul className="space-y-2">{upcoming.map((e) => <li key={e.id} className="rounded-xl bg-[#faf7ef] p-3 text-sm"><p className="font-semibold">{e.title}</p><p className="text-xs text-ink-soft/60">{eventKindLabel[e.kind]} · {fmtDateTime(e.startsAt)} {e.location ? `· ${e.location}` : ""}</p></li>)}</ul>
          )}
        </Card>
        <Card title="آخر المستجدات">
          {notes.length === 0 ? <Empty>لا مستجدات منشورة بعد.</Empty> : (
            <ul className="space-y-2">{notes.slice(0, 6).map((n) => <li key={n.id} className="rounded-xl bg-[#faf7ef] p-3 text-sm"><p className="whitespace-pre-wrap leading-7">{n.body}</p><p className="mt-1 text-[11px] text-ink-soft/55">{fmtDate(n.createdAt)}</p></li>)}</ul>
          )}
        </Card>
        <Card title="المستندات المشتركة">
          {docs.length === 0 ? <Empty>لا مستندات مشتركة.</Empty> : (
            <ul className="space-y-2">{docs.map((x) => <li key={x.id}><a href={`/api/portal/documents/${x.id}`} className="flex items-center gap-2 rounded-xl bg-[#faf7ef] p-3 text-sm font-semibold hover:text-[#a9843c]"><Download className="h-4 w-4" />{x.name}<span className="ms-auto text-xs font-normal text-ink-soft/55">{fmtDate(x.createdAt)}</span></a></li>)}</ul>
          )}
        </Card>
        <Card title="الفواتير">
          {inv.length === 0 ? <Empty>لا فواتير.</Empty> : (
            <ul className="space-y-2">{inv.map(({ i, paid }) => <li key={i.id} className="flex items-center justify-between rounded-xl bg-[#faf7ef] p-3 text-sm"><div><p className="font-mono text-xs font-bold">{i.number}</p><p className="text-xs text-ink-soft/60">{fmtDate(i.issuedOn)} · المتبقي {money(Number(i.total) - Number(paid))}</p></div><div className="text-end"><p className="font-bold">{money(i.total)}</p><Badge tone={i.status === "paid" ? "green" : i.status === "void" ? "red" : "gold"}>{invoiceStatusLabel[i.status]}</Badge></div></li>)}</ul>
          )}
        </Card>
      </div>

      <Card title="المراسلات مع المكتب" className="mt-6">
        <div className="mb-5 space-y-3">
          {thread.length === 0 && <Empty>لا رسائل بعد.</Empty>}
          {thread.map((r) => (
            <div key={r.id} className={`max-w-2xl rounded-2xl p-3 text-sm ${r.fromKind === "client" ? "bg-[#12233a] text-white" : "me-auto bg-[#faf7ef]"}`}>
              <p className="whitespace-pre-wrap leading-7">{r.body}</p>
              <p className={`mt-1 text-[11px] ${r.fromKind === "client" ? "text-white/60" : "text-ink-soft/55"}`}>{r.fromKind === "client" ? "أنت" : "المكتب"} · {fmtDateTime(r.createdAt)}</p>
            </div>
          ))}
        </div>
        <form action={clientSendMessageAction} className="space-y-2">
          <input type="hidden" name="matterId" value={id} />
          <textarea name="body" rows={3} required maxLength={4000} placeholder="اكتب رسالتك للمكتب…" className="w-full rounded-xl border border-[#e3ddcb] bg-white px-4 py-3 text-sm outline-none focus:border-[#d0a751]" />
          <SubmitButton>إرسال</SubmitButton>
        </form>
        <p className="mt-3 text-xs text-ink-soft/55">للأمور العاجلة تواصل مع المكتب هاتفيًا. الرسائل هنا لا تُنشئ علاقة محاماة جديدة.</p>
      </Card>
    </>
  );
}
