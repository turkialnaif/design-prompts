import "server-only";
import { createHash } from "node:crypto";
import { and, count, desc, eq, gte, inArray, isNull, lt, ne, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { auditLog, clients, leadEvents, leads, matters, proposals, suppressions, type LeadStage } from "@/lib/db/schema";
import { findConflicts } from "@/lib/erp/conflicts";
import { nextMatterNumber } from "@/lib/erp/queries";
import { enrichLead } from "@/lib/leads/ai";
import { FOLLOWUP_DAYS, SITE, ackMail, acceptedMail, alertMail, digestMail, esc, followupMail, proposalMail, send } from "@/lib/leads/emails";
import { scoreLead, tierLabel } from "@/lib/leads/score";

export const stageLabel: Record<LeadStage, string> = { new: "جديد", contacted: "تم التواصل", qualified: "مؤهَّل", meeting: "اجتماع", proposal: "عرض أتعاب", won: "عقد موقّع", lost: "خسرناه" };

export async function logEvent(leadId: string, kind: string, body?: string | null, meta?: Record<string, unknown>, actorName?: string) {
  const d = await db();
  await d.insert(leadEvents).values({ leadId, kind, body: body ?? null, meta: meta ?? null, actorName: actorName ?? null });
}

/** مقالان من الأبحاث يلائمان المسألة، لتخدم الرسائل الآلية قبل أن تطلب. */
async function picks(matterType?: string | null, description?: string | null, en = false) {
  try {
    const { articles } = await import("@/lib/articles");
    const t = `${matterType ?? ""} ${description ?? ""}`;
    const cluster = /نزاع|تحكيم|مطالبة|تحصيل|دعوى|تنفيذ|dispute|arbitration/i.test(t) ? "disputes" : /شراكة|شركة|حوكمة|استحواذ|اندماج|corporate|shareholder/i.test(t) ? "corporate" : "contracts";
    const list = articles.filter((a) => a.cluster === cluster).sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1)).slice(0, 2);
    return list.map((a) => ({ href: `${en ? "/en" : ""}/blog/${a.slug}`, title: a.h1 }));
  } catch {
    return [];
  }
}

export type LeadInput = { name: string; org?: string; email: string; phone?: string; matterType?: string; description?: string; locale?: string; source?: string; utm?: Record<string, string>; landingPath?: string; referrer?: string };

/** الاستقبال: تقييم، فحص تعارض، حفظ، ردّ فوري على العميل، وتنبيه المكتب. لا يرمي خطأً أبدًا: الموجز يصل إلى المكتب بالبريد أصلًا. */
export async function captureLead(i: LeadInput): Promise<{ id: string; repeat: boolean } | null> {
  try {
    const d = await db();
    const email = i.email.trim().toLowerCase();
    const [sup] = await d.select().from(suppressions).where(eq(suppressions.email, email)).limit(1);
    const month = new Date(Date.now() - 30 * 864e5);
    const [open] = await d.select().from(leads).where(and(eq(leads.email, email), gte(leads.createdAt, month), ne(leads.stage, "lost"))).orderBy(desc(leads.createdAt)).limit(1);
    const s = scoreLead({ name: i.name, org: i.org, email, phone: i.phone, matterType: i.matterType, description: i.description });

    if (open) {
      await logEvent(open.id, "resubmitted", i.description ?? null, { matterType: i.matterType });
      await d.update(leads).set({ score: Math.max(open.score, s.score) }).where(eq(leads.id, open.id));
      await send(alertMail({ id: open.id, name: i.name, org: i.org, email, phone: i.phone, matterType: i.matterType, description: i.description, score: Math.max(open.score, s.score), tier: tierLabel[s.tier], reasons: s.reasons, repeat: true }));
      return { id: open.id, repeat: true };
    }

    const conflicts = await findConflicts([{ name: i.org || i.name }, ...(i.org ? [{ name: i.name }] : [])]).catch(() => []);
    const conflictNote = conflicts.length ? conflicts.slice(0, 3).map((c) => (c.kind === "party" ? `${c.name} خصم في الملف ${c.matterNumber ?? ""}` : `${c.name} عميل حالي`)).join(" · ") : null;
    const ai = await enrichLead({ matterType: i.matterType, description: i.description, org: i.org });

    const [row] = await d
      .insert(leads)
      .values({
        name: i.name, org: i.org || null, email, phone: i.phone || null, locale: i.locale === "en" ? "en" : "ar", source: i.source || "brief",
        matterType: i.matterType || null, description: i.description || null, score: s.score, tier: s.tier, scoreReasons: s.reasons,
        utm: i.utm ?? null, landingPath: i.landingPath || null, referrer: i.referrer || null, unsubscribed: !!sup, aiSummary: ai?.summary ?? null, conflictNote,
      })
      .returning();
    await logEvent(row.id, "created", `${tierLabel[s.tier]} · ${s.score}/100`, { reasons: s.reasons, source: row.source });

    if (!sup) {
      const ack = ackMail({ id: row.id, name: i.name, locale: row.locale }, await picks(i.matterType, i.description, row.locale === "en"));
      if (await send({ ...ack, to: email })) {
        await d.update(leads).set({ ackSentAt: new Date() }).where(eq(leads.id, row.id));
        await logEvent(row.id, "ack_sent", "ردّ فوري على العميل");
      }
    }
    await send(alertMail({ id: row.id, name: i.name, org: i.org, email, phone: i.phone, matterType: i.matterType, description: i.description, score: s.score, tier: tierLabel[s.tier], reasons: s.reasons, aiSummary: ai?.summary, conflictNote }));
    return { id: row.id, repeat: false };
  } catch (e) {
    console.error("captureLead failed", e);
    return null;
  }
}

/** يحوّل الفرصة إلى عميل وملف. يُستدعى يدويًا من المحامي، وآليًا عند قبول العرض. */
export async function convertLead(leadId: string, opts: { feeKind?: "fixed" | "hourly" | "retainer" | "contingency"; feeAmount?: string | null; actorName?: string } = {}) {
  const d = await db();
  const [l] = await d.select().from(leads).where(eq(leads.id, leadId)).limit(1);
  if (!l) throw new Error("lead not found");
  if (l.clientId && l.matterId) {
    const [m] = await d.select().from(matters).where(eq(matters.id, l.matterId)).limit(1);
    return { clientId: l.clientId, matterId: l.matterId, matterNumber: m?.number };
  }
  let clientId = l.clientId;
  if (!clientId) {
    const [c] = await d.insert(clients).values({ type: l.org ? "company" : "individual", name: l.org || l.name, email: l.email, phone: l.phone, notes: l.org ? `جهة الاتصال: ${l.name}` : null }).returning({ id: clients.id });
    clientId = c.id;
  }
  const number = await nextMatterNumber();
  const [m] = await d
    .insert(matters)
    .values({ number, title: `${l.matterType || "مسألة قانونية"} — ${l.org || l.name}`, clientId, practiceArea: l.matterType, description: l.description, responsibleId: l.ownerId, billingType: opts.feeKind ?? "hourly", fixedFee: opts.feeKind === "fixed" ? opts.feeAmount ?? null : null })
    .returning();
  await d.update(leads).set({ clientId, matterId: m.id, stage: "won" }).where(eq(leads.id, leadId));
  await logEvent(leadId, "converted", `ملف ${m.number}`, { clientId, matterId: m.id }, opts.actorName);
  return { clientId, matterId: m.id, matterNumber: m.number };
}

export const proposalHash = (p: { leadId: string; title: string; intro: string | null; scope: string[]; feeKind: string; feeAmount: string | null; feeNote: string | null; validUntil: string | null }) =>
  createHash("sha256").update(JSON.stringify([p.leadId, p.title, p.intro, p.scope, p.feeKind, p.feeAmount, p.feeNote, p.validUntil])).digest("hex");

/** قبول العرض من العميل: سجل مثبَّت بالبصمة والعنوان والتوقيت، ثم فتح الملف وإشعار المكتب. */
export async function acceptProposal(token: string, name: string, ip: string | null, ua: string | null): Promise<{ ok: boolean; error?: string }> {
  const d = await db();
  const [p] = await d.select().from(proposals).where(eq(proposals.token, token)).limit(1);
  if (!p) return { ok: false, error: "العرض غير موجود." };
  if (p.status === "accepted") return { ok: true };
  if (p.status === "declined") return { ok: false, error: "تم رفض هذا العرض سابقًا." };
  if (p.validUntil && p.validUntil < new Date().toISOString().slice(0, 10)) return { ok: false, error: "انتهت صلاحية العرض. راسلنا لتجديده." };
  if (name.trim().length < 3) return { ok: false, error: "اكتب اسمك الكامل للتوقيع." };
  const [l] = await d.select().from(leads).where(eq(leads.id, p.leadId)).limit(1);
  const hash = proposalHash({ leadId: p.leadId, title: p.title, intro: p.intro, scope: p.scope, feeKind: p.feeKind, feeAmount: p.feeAmount, feeNote: p.feeNote, validUntil: p.validUntil });
  await d.update(proposals).set({ status: "accepted", decidedAt: new Date(), acceptName: name.trim(), acceptIp: ip, acceptUserAgent: ua?.slice(0, 300) ?? null, contentHash: hash }).where(eq(proposals.id, p.id));
  await logEvent(p.leadId, "proposal_accepted", `قبول العرض بتوقيع: ${name.trim()}`, { hash, ip });
  await d.insert(auditLog).values({ actorKind: "client", actorName: name.trim(), action: "proposal_accepted", entityType: "proposal", entityId: p.id, meta: { hash, leadId: p.leadId }, ip });
  const r = await convertLead(p.leadId, { feeKind: p.feeKind, feeAmount: p.feeAmount, actorName: name.trim() });
  if (l) {
    await send({ ...acceptedMail({ title: p.title, name: l.name, locale: l.locale, matterNumber: r.matterNumber }), to: l.email });
    await send(digestMail(`🔔 تم قبول العرض: ${l.org || l.name}`, [`<b>${esc(p.title)}</b>`, `وقّع إلكترونيًا: ${esc(name.trim())}`, `الملف: ${esc(r.matterNumber ?? "")}`, `بصمة المحتوى: <span dir="ltr">${hash.slice(0, 16)}…</span>`]));
  }
  return { ok: true };
}

export async function sendProposal(proposalId: string, actorName?: string) {
  const d = await db();
  const [p] = await d.select().from(proposals).where(eq(proposals.id, proposalId)).limit(1);
  if (!p) throw new Error("proposal not found");
  const [l] = await d.select().from(leads).where(eq(leads.id, p.leadId)).limit(1);
  const url = `${SITE}/p/${p.token}`;
  const ok = await send({ ...proposalMail({ title: p.title, name: l.name, url, validUntil: p.validUntil, locale: l.locale }), to: l.email });
  if (ok) {
    await d.update(proposals).set({ status: p.status === "draft" ? "sent" : p.status, sentAt: new Date() }).where(eq(proposals.id, p.id));
    await d.update(leads).set({ stage: l.stage === "won" || l.stage === "lost" ? l.stage : "proposal" }).where(eq(leads.id, l.id));
    await logEvent(l.id, "proposal_sent", p.title, { url }, actorName);
  }
  return ok;
}

/** المهمة اليومية: المتابعات، وتنبيه المتأخر، وتذكير العروض، وملخص الأحد. */
export async function runDaily() {
  const d = await db();
  const now = new Date();
  const out = { followups: 0, reminders: 0, stale: 0, digest: false };

  // 1) المتابعات الآلية لمن لم يُتواصل معه بعد
  const open = await d.select().from(leads).where(and(inArray(leads.stage, ["new", "contacted"]), eq(leads.unsubscribed, false), lt(leads.followupStep, FOLLOWUP_DAYS.length)));
  const sup = new Set((await d.select().from(suppressions)).map((s) => s.email));
  for (const l of open) {
    if (sup.has(l.email)) continue;
    const due = new Date(l.createdAt.getTime() + FOLLOWUP_DAYS[l.followupStep] * 864e5);
    if (now < due) continue;
    if (l.lastContactAt && now.getTime() - l.lastContactAt.getTime() < 3 * 864e5) continue; // تواصل بشري حديث
    const mail = followupMail(l.followupStep, { id: l.id, name: l.name, locale: l.locale, matterType: l.matterType }, await picks(l.matterType, l.description, l.locale === "en"));
    if (await send({ ...mail, to: l.email })) {
      await d.update(leads).set({ followupStep: l.followupStep + 1, lastFollowupAt: now }).where(eq(leads.id, l.id));
      await logEvent(l.id, "followup_sent", `متابعة ${l.followupStep + 1} من ${FOLLOWUP_DAYS.length}`);
      out.followups++;
    }
  }

  // 2) عروض مرسلة لم تُحسم: تذكير واحد للعميل بعد ٣ أيام
  const pending = await d.select({ p: proposals, l: leads }).from(proposals).innerJoin(leads, eq(proposals.leadId, leads.id)).where(and(inArray(proposals.status, ["sent", "viewed"]), lt(proposals.sentAt, new Date(now.getTime() - 3 * 864e5))));
  for (const { p, l } of pending) {
    const [done] = await d.select({ n: count() }).from(leadEvents).where(and(eq(leadEvents.leadId, l.id), eq(leadEvents.kind, "proposal_reminder")));
    if ((done?.n ?? 0) > 0 || l.unsubscribed) continue;
    const mail = proposalMail({ title: p.title, name: l.name, url: `${SITE}/p/${p.token}`, validUntil: p.validUntil, locale: l.locale });
    if (await send({ ...mail, subject: (l.locale === "en" ? "Reminder: " : "تذكير: ") + mail.subject, to: l.email })) {
      await logEvent(l.id, "proposal_reminder", p.title);
      out.reminders++;
    }
  }

  // 3) فرص جديدة مضى عليها يوم دون تواصل: تنبيه للمكتب
  const stale = await d.select().from(leads).where(and(eq(leads.stage, "new"), isNull(leads.firstContactAt), lt(leads.createdAt, new Date(now.getTime() - 864e5)))).orderBy(desc(leads.score)).limit(30);
  if (stale.length) {
    await send(digestMail(`⏱ ${stale.length} فرصة بلا تواصل منذ أكثر من يوم`, stale.map((l) => `<a href="${SITE}/admin/leads/${l.id}">${esc(l.name)}${l.org ? ` — ${esc(l.org)}` : ""}</a> · ${tierLabel[l.tier]} (${l.score})`), "الرد في الساعة الأولى يضاعف فرصة التحويل. كلما طال الصمت قلّت."));
    out.stale = stale.length;
  }

  // 4) ملخص أسبوعي صباح الأحد (بتوقيت الرياض)
  const dow = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "Asia/Riyadh" }).format(now);
  if (dow === "Sun") {
    const since = new Date(now.getTime() - 7 * 864e5);
    const rows = await d.select({ stage: leads.stage, n: count() }).from(leads).where(gte(leads.createdAt, since)).groupBy(leads.stage);
    const total = rows.reduce((a, r) => a + r.n, 0);
    const won = rows.find((r) => r.stage === "won")?.n ?? 0;
    const [sources] = [await d.select({ s: leads.source, n: count() }).from(leads).where(gte(leads.createdAt, since)).groupBy(leads.source).orderBy(sql`count(*) desc`).limit(5)];
    await send(digestMail("ملخص الأسبوع: محرك العملاء", [`فرص جديدة: <b>${total}</b> · عقود: <b>${won}</b>`, ...rows.map((r) => `${stageLabel[r.stage as LeadStage] ?? r.stage}: ${r.n}`), `<b>المصادر:</b> ${sources.map((s) => `${esc(s.s)} (${s.n})`).join("، ") || "—"}`]));
    out.digest = true;
  }
  return out;
}
