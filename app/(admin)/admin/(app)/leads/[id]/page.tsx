import Link from "next/link";
import { notFound } from "next/navigation";
import { asc, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { LEAD_STAGES, leadEvents, leads, proposals, users } from "@/lib/db/schema";
import { requireStaff } from "@/lib/auth/session";
import { can } from "@/lib/auth/perms";
import { Badge, Card, Empty, Field, Flash, Input, PageHeader, Select, SubmitButton, Textarea, fmtDateTime, money } from "@/components/admin/ui";
import { addNoteAction, assignLeadAction, convertLeadAction, createProposalAction, markContactedAction, sendProposalAction, setStageAction, setValueAction, stopFollowupsAction } from "@/lib/erp/lead-actions";
import { stageLabel } from "@/lib/leads/engine";
import { tierLabel } from "@/lib/leads/score";
import { SITE } from "@/lib/leads/emails";
import { ago } from "../page";

export const dynamic = "force-dynamic";

const KIND: Record<string, string> = { created: "وصل الموجز", ack_sent: "ردّ آلي للعميل", followup_sent: "متابعة آلية", stage: "تغيير المرحلة", staff_contact: "تواصل", note: "ملاحظة", assigned: "إسناد", proposal_created: "عرض جديد", proposal_sent: "أُرسل العرض", proposal_reminder: "تذكير بالعرض", proposal_accepted: "قبول العرض", proposal_viewed: "اطّلع على العرض", converted: "فُتح الملف", resubmitted: "أرسل موجزًا آخر", unsubscribed: "أوقف الرسائل", followups_stopped: "إيقاف المتابعة" };
const fee: Record<string, string> = { fixed: "مبلغ مقطوع", hourly: "بالساعة", retainer: "اتفاق شهري", contingency: "نسبة نجاح" };
const pStatus: Record<string, [string, "gray" | "blue" | "gold" | "green" | "red"]> = { draft: ["مسودة", "gray"], sent: ["أُرسل", "blue"], viewed: ["اطّلع", "gold"], accepted: ["قُبل", "green"], declined: ["رُفض", "red"] };

export default async function LeadPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ ok?: string; error?: string }> }) {
  const user = await requireStaff("clients:read");
  const { id } = await params;
  const sp = await searchParams;
  const d = await db();
  const [l] = await d.select().from(leads).where(eq(leads.id, id)).limit(1);
  if (!l) notFound();
  const events = await d.select().from(leadEvents).where(eq(leadEvents.leadId, id)).orderBy(desc(leadEvents.createdAt)).limit(100);
  const props = await d.select().from(proposals).where(eq(proposals.leadId, id)).orderBy(desc(proposals.createdAt));
  const people = await d.select({ id: users.id, fullName: users.fullName }).from(users).where(eq(users.isActive, true)).orderBy(asc(users.fullName));
  const w = can(user.role, "clients:write");
  const phone = l.phone?.replace(/\D/g, "").replace(/^0/, "966");
  const reasons = (l.scoreReasons as string[] | null) ?? [];

  return (
    <>
      <PageHeader
        title={l.name}
        sub={[l.org, l.email, l.phone].filter(Boolean).join(" · ")}
        actions={
          <>
            {phone && <a href={`https://wa.me/${phone}?text=${encodeURIComponent(`السلام عليكم ${l.name}، معك تركي النايف وشركاؤه. وصلنا موجز مسألتك وأحببنا أن نتواصل معك مباشرة.`)}`} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">واتساب</a>}
            <a href={`mailto:${l.email}`} className="rounded-xl border border-[#e3ddcb] bg-white px-4 py-2 text-sm font-semibold">بريد</a>
            {l.phone && <a href={`tel:${l.phone}`} className="rounded-xl border border-[#e3ddcb] bg-white px-4 py-2 text-sm font-semibold">اتصال</a>}
          </>
        }
      />
      <Flash error={sp.error} ok={sp.ok} />

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <Card title="الموجز">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge tone={l.tier === "hot" ? "red" : l.tier === "warm" ? "gold" : "gray"}>{tierLabel[l.tier]} · {l.score}/100</Badge>
              <Badge tone="blue">{stageLabel[l.stage]}</Badge>
              <span className="text-xs text-ink-soft/80">وصل منذ {ago(l.createdAt)} · المصدر: {l.source}{l.landingPath ? ` · دخل من ${l.landingPath}` : ""}</span>
            </div>
            {l.conflictNote && <p className="mb-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">تعارض محتمل: {l.conflictNote}. تحقق قبل أي تواصل جوهري.</p>}
            {l.aiSummary && <p className="mb-3 rounded-xl bg-[#faf7ef] px-4 py-3 text-sm"><b>خلاصة:</b> {l.aiSummary}</p>}
            <p className="mb-1 text-xs font-bold text-ink-soft/80">{l.matterType ?? "—"}</p>
            <p className="whitespace-pre-wrap rounded-xl bg-[#faf7ef] px-4 py-3 text-sm leading-8">{l.description}</p>
            {reasons.length > 0 && <details className="mt-3 text-xs text-ink-soft/80"><summary className="cursor-pointer font-bold">لماذا هذه الدرجة؟</summary><ul className="mt-2 space-y-1">{reasons.map((r) => <li key={r}>{r}</li>)}</ul></details>}
          </Card>

          <Card title="عروض الأتعاب">
            {props.length === 0 ? <Empty>لا عروض بعد. العرض الواضح بالنطاق والأتعاب، يُقبل إلكترونيًا من العميل، هو أقصر طريق إلى العقد.</Empty> : (
              <ul className="space-y-3">
                {props.map((p) => (
                  <li key={p.id} className="rounded-2xl border border-[#e3ddcb] p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <b>{p.title}</b>
                      <Badge tone={pStatus[p.status][1]}>{pStatus[p.status][0]}</Badge>
                    </div>
                    <p className="mt-1 text-xs text-ink-soft/80">{fee[p.feeKind]}{p.feeAmount ? ` · ${money(p.feeAmount)}` : ""}{p.validUntil ? ` · حتى ${p.validUntil}` : ""}{p.acceptName ? ` · وقّع: ${p.acceptName}` : ""}</p>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                      <a href={`${SITE}/p/${p.token}`} target="_blank" rel="noopener noreferrer" className="font-bold text-[#8a6d25] underline">فتح صفحة العرض</a>
                      {w && p.status !== "accepted" && (
                        <form action={sendProposalAction}><input type="hidden" name="id" value={p.id} /><input type="hidden" name="leadId" value={l.id} /><button className="font-bold underline">{p.status === "draft" ? "إرسال للعميل" : "إعادة الإرسال"}</button></form>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {w && l.stage !== "won" && (
              <form action={createProposalAction} className="mt-5 grid gap-3 border-t border-[#f0ebdc] pt-5 md:grid-cols-2">
                <input type="hidden" name="leadId" value={l.id} />
                <Field label="عنوان العرض" span={2}><Input name="title" required defaultValue={`${l.matterType ?? "خدمة قانونية"} — ${l.org || l.name}`} /></Field>
                <Field label="مقدمة قصيرة" span={2}><Textarea name="intro" rows={2} defaultValue="شكرًا لثقتك. هذا عرضنا لمسألتك بنطاق عمل وأتعاب واضحة." /></Field>
                <Field label="نطاق العمل (بند في كل سطر)" span={2}><Textarea name="scope" rows={4} required defaultValue={"دراسة المستندات والوقائع وإبداء الرأي النظامي.\nإعداد المذكرات أو العقود المطلوبة.\nمتابعة المسألة حتى إنجاز النطاق المتفق عليه."} /></Field>
                <Field label="نوع الأتعاب"><Select name="feeKind" defaultValue="fixed">{Object.entries(fee).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</Select></Field>
                <Field label="المبلغ (ريال)"><Input name="feeAmount" inputMode="decimal" dir="ltr" placeholder="مثال: 15000" /></Field>
                <Field label="ملاحظة على الأتعاب" span={2}><Input name="feeNote" placeholder="ما يشمله المبلغ وما لا يشمله، وطريقة الدفع" /></Field>
                <Field label="صلاحية العرض (أيام)"><Input name="validDays" type="number" min={1} max={90} defaultValue={14} dir="ltr" /></Field>
                <div className="flex items-end gap-2">
                  <SubmitButton>حفظ مسودة</SubmitButton>
                  <button name="send" value="1" className="inline-flex items-center rounded-full bg-[#d0a751] px-6 py-2.5 text-sm font-bold text-[#0a1420]">حفظ وإرسال للعميل</button>
                </div>
              </form>
            )}
          </Card>

          <Card title="السجل">
            <ol className="space-y-3">
              {events.map((e) => (
                <li key={e.id} className="border-s-2 border-[#d0a751]/60 ps-4 text-sm">
                  <p className="font-bold">{KIND[e.kind] ?? e.kind}<span className="ms-2 text-xs font-normal text-ink-soft/80">{fmtDateTime(e.createdAt)}{e.actorName ? ` · ${e.actorName}` : ""}</span></p>
                  {e.body && <p className="mt-0.5 whitespace-pre-wrap text-ink-soft">{e.body}</p>}
                </li>
              ))}
            </ol>
          </Card>
        </div>

        <div className="space-y-6">
          {w && (
            <Card title="الإجراءات">
              <div className="space-y-4">
                <form action={markContactedAction}><input type="hidden" name="id" value={l.id} /><SubmitButton className="w-full">سجّل: تواصلتُ مع العميل</SubmitButton></form>
                <form action={setStageAction} className="space-y-2">
                  <input type="hidden" name="id" value={l.id} />
                  <Field label="المرحلة"><Select name="stage" defaultValue={l.stage}>{LEAD_STAGES.map((s) => <option key={s} value={s}>{stageLabel[s]}</option>)}</Select></Field>
                  <Field label="سبب الخسارة (إن كانت)"><Input name="reason" placeholder="السعر، اختار غيرنا، لا حاجة الآن…" /></Field>
                  <SubmitButton className="w-full">تحديث المرحلة</SubmitButton>
                </form>
                <form action={assignLeadAction} className="space-y-2">
                  <input type="hidden" name="id" value={l.id} />
                  <Field label="المسؤول"><Select name="ownerId" defaultValue={l.ownerId ?? ""}><option value="">—</option>{people.map((p) => <option key={p.id} value={p.id}>{p.fullName}</option>)}</Select></Field>
                  <SubmitButton className="w-full">إسناد</SubmitButton>
                </form>
                <form action={setValueAction} className="space-y-2">
                  <input type="hidden" name="id" value={l.id} />
                  <Field label="قيمة الأتعاب المتوقعة (ريال)"><Input name="value" dir="ltr" inputMode="decimal" defaultValue={l.estimatedValue ?? ""} /></Field>
                  <SubmitButton className="w-full">حفظ</SubmitButton>
                </form>
                <form action={addNoteAction} className="space-y-2">
                  <input type="hidden" name="id" value={l.id} />
                  <Field label="ملاحظة"><Textarea name="body" rows={3} /></Field>
                  <SubmitButton className="w-full">إضافة</SubmitButton>
                </form>
                {!l.matterId && (
                  <form action={convertLeadAction}><input type="hidden" name="id" value={l.id} /><SubmitButton className="w-full">تحويل إلى عميل وملف</SubmitButton></form>
                )}
                {l.followupStep < 4 && !l.unsubscribed && (
                  <form action={stopFollowupsAction}><input type="hidden" name="id" value={l.id} /><button className="w-full rounded-xl border border-[#e3ddcb] bg-white px-4 py-2 text-sm font-semibold">إيقاف المتابعة الآلية</button></form>
                )}
              </div>
            </Card>
          )}
          <Card title="المتابعة الآلية">
            <p className="text-sm leading-7 text-ink-soft">
              {l.stage === "won" || l.stage === "lost" ? "انتهت المتابعة الآلية: أُغلقت الفرصة." : l.unsubscribed ? "أوقف العميل الرسائل. لن تُرسل إليه أي رسالة آلية." : l.followupStep >= 99 ? "أُوقفت يدويًا." : l.followupStep >= 4 ? "اكتملت المتابعات الأربع." : `${l.followupStep} من 4 أُرسلت. تعمل حتى تصبح المرحلة «مؤهَّل» أو أبعد، أو يتواصل أحدكم.`}
            </p>
            {l.matterId && <Link href={`/admin/matters/${l.matterId}`} className="mt-3 inline-block text-sm font-bold text-[#8a6d25] underline">فتح الملف</Link>}
          </Card>
        </div>
      </div>
    </>
  );
}
