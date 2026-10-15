import "server-only";
import { and, count, desc, eq, gte, inArray, isNotNull, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { prospectContacts, prospectEvents, prospects, suppressions, type ProspectStatus } from "@/lib/db/schema";
import { digestMail, send } from "@/lib/leads/emails";
import { COMPANIES, nameKey } from "@/lib/prospects/companies";
import { parseCsv } from "@/lib/prospects/csv";
import { EMAIL_GAPS, outreachMail, regionOf } from "@/lib/prospects/copy";
import { addressProblem } from "@/lib/prospects/hygiene";

export const statusLabel: Record<ProspectStatus, string> = { new: "جديدة", researching: "قيد البحث", contacted: "تم التواصل", replied: "ردّت", meeting: "اجتماع", client: "عميل", declined: "اعتذرت" };
export const basisLabel: Record<string, string> = { manual: "إدخال يدوي", own_relationship: "علاقة قائمة", linkedin_connection: "اتصال على لينكدان", public_site: "موقع عام للمنشأة", referral: "توصية", business_card: "بطاقة / لقاء" };

export async function logProspect(prospectId: string, kind: string, body?: string | null, contactId?: string | null, actorName?: string | null) {
  const d = await db();
  await d.insert(prospectEvents).values({ prospectId, contactId: contactId ?? null, kind, body: body ?? null, actorName: actorName ?? null });
  await d.update(prospects).set({ lastActivityAt: new Date() }).where(eq(prospects.id, prospectId));
}

/** يحمّل القائمة الأصلية (٢٥٠ منشأة). آمن للتكرار: لا يضيف إلا الناقص، ويتخطى المكرر بالاسم. */
export async function seedCompanies(): Promise<{ added: number; duplicates: string[] }> {
  const d = await db();
  const seen = new Set((await d.select({ k: prospects.nameKey }).from(prospects).where(eq(prospects.list, "khobar-dammam"))).map((r) => r.k));
  const rows: (typeof prospects.$inferInsert)[] = [];
  const duplicates: string[] = [];
  const batch = new Set<string>();
  for (const c of COMPANIES) {
    const key = nameKey(c.name) || c.name.toLowerCase();
    if (batch.has(key)) duplicates.push(`${c.rank}. ${c.name}`);
    if (seen.has(key) || batch.has(key)) continue;
    batch.add(key);
    rows.push({ list: "khobar-dammam", rank: c.rank, name: c.name, nameKey: key, priority: c.priority, website: /gulfenergysa\.com/.test(c.name) ? "http://www.gulfenergysa.com" : null });
  }
  for (let i = 0; i < rows.length; i += 100) await d.insert(prospects).values(rows.slice(i, i + 100)).onConflictDoNothing();
  return { added: rows.length, duplicates };
}

// ───────── CSV ─────────

const HEAD: Record<string, RegExp> = {
  company: /^(company|organi[sz]ation|منشأة|المنشأة|الشركة|شركة|الجهة)$/i,
  first: /^(first name|الاسم الأول)$/i,
  last: /^(last name|اسم العائلة|الكنية)$/i,
  name: /^(name|full name|الاسم|الاسم الكامل)$/i,
  title: /^(title|position|job title|role|المسمى|المسمى الوظيفي|المنصب)$/i,
  email: /^(email|e-mail|email address|البريد|البريد الإلكتروني)$/i,
  phone: /^(phone|mobile|tel|الجوال|الهاتف)$/i,
  linkedin: /^(linkedin|url|linkedin url|profile|رابط لينكدان|الرابط)$/i,
};

function indexColumns(header: string[]) {
  const idx: Partial<Record<keyof typeof HEAD, number>> = {};
  header.forEach((h, i) => {
    for (const k of Object.keys(HEAD) as (keyof typeof HEAD)[]) if (idx[k] === undefined && HEAD[k].test(h.trim())) idx[k] = i;
  });
  return idx;
}

/** يطابق اسم منشأة بمنشأة في القاعدة: تطابق المفتاح تامًّا، ثم احتواء أحدهما الآخر (٤ أحرف فأكثر). */
function matcher(list: { id: string; nameKey: string }[]) {
  const exact = new Map(list.map((p) => [p.nameKey, p.id]));
  return (company: string): string | null => {
    const k = nameKey(company);
    if (k.length < 3) return null;
    const e = exact.get(k);
    if (e) return e;
    if (k.length < 4) return null;
    return list.find((p) => p.nameKey.length >= 4 && (p.nameKey.includes(k) || k.includes(p.nameKey)))?.id ?? null;
  };
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const cleanUrl = (u?: string) => {
  const v = (u ?? "").trim();
  return /^https?:\/\/([a-z]+\.)?linkedin\.com\//i.test(v) ? v.split("?")[0] : null;
};

type ImportResult = { added: number; skipped: number; unmatched: string[]; createdCompanies: number };

async function insertContacts(
  items: { company: string; fullName?: string; title?: string; email?: string; phone?: string; linkedinUrl?: string | null }[],
  basis: string,
  createMissing: boolean,
  actor?: string,
): Promise<ImportResult> {
  const d = await db();
  const list = await d.select({ id: prospects.id, nameKey: prospects.nameKey }).from(prospects);
  const match = matcher(list);
  const sup = new Set((await d.select({ e: suppressions.email }).from(suppressions)).map((s) => s.e));
  const out: ImportResult = { added: 0, skipped: 0, unmatched: [], createdCompanies: 0 };
  const created = new Map<string, string>();

  for (const it of items) {
    const email = it.email && EMAIL.test(it.email.trim()) ? it.email.trim().toLowerCase() : null;
    const li = cleanUrl(it.linkedinUrl ?? undefined);
    if (!email && !li) { out.skipped++; continue; }
    let pid = match(it.company);
    if (!pid) {
      const k = nameKey(it.company);
      if (!createMissing || !k) { out.unmatched.push(it.company || "—"); continue; }
      pid = created.get(k) ?? null;
      if (!pid) {
        const [row] = await d.insert(prospects).values({ list: "imported", name: it.company, nameKey: k }).onConflictDoNothing().returning({ id: prospects.id });
        pid = row?.id ?? (await d.select({ id: prospects.id }).from(prospects).where(and(eq(prospects.list, "imported"), eq(prospects.nameKey, k))).limit(1))[0]?.id ?? null;
        if (!pid) { out.unmatched.push(it.company); continue; }
        created.set(k, pid);
        out.createdCompanies++;
      }
    }
    const dup = await d
      .select({ id: prospectContacts.id })
      .from(prospectContacts)
      .where(and(eq(prospectContacts.prospectId, pid), email && li ? sql`(${prospectContacts.email} = ${email} or ${prospectContacts.linkedinUrl} = ${li})` : email ? eq(prospectContacts.email, email) : eq(prospectContacts.linkedinUrl, li!)))
      .limit(1);
    if (dup.length) { out.skipped++; continue; }
    const [c] = await d
      .insert(prospectContacts)
      .values({ prospectId: pid, fullName: it.fullName || null, title: it.title || null, email, phone: it.phone || null, linkedinUrl: li, basis, unsubscribed: email ? sup.has(email) : false, linkedin: li ? "queued" : "none" })
      .returning({ id: prospectContacts.id });
    await logProspect(pid, "contact_added", `${it.fullName ?? email ?? li} · ${basisLabel[basis] ?? basis}`, c.id, actor);
    out.added++;
  }
  return out;
}

/** CSV عام: أعمدة منشأة / اسم / مسمى / بريد / لينكدان / جوال بالعربية أو الإنجليزية. */
export async function importContactsCsv(text: string, basis: string, createMissing: boolean, actor?: string): Promise<ImportResult & { error?: string }> {
  const rows = parseCsv(text);
  if (rows.length < 2) return { added: 0, skipped: 0, unmatched: [], createdCompanies: 0, error: "الملف فارغ أو بلا صفوف." };
  const ix = indexColumns(rows[0]);
  if (ix.company === undefined) return { added: 0, skipped: 0, unmatched: [], createdCompanies: 0, error: "لم أجد عمود المنشأة (company / المنشأة) في السطر الأول." };
  const g = (r: string[], k: keyof typeof HEAD) => (ix[k] === undefined ? "" : r[ix[k]!] ?? "");
  const items = rows.slice(1).map((r) => ({
    company: g(r, "company"),
    fullName: g(r, "name") || [g(r, "first"), g(r, "last")].filter(Boolean).join(" "),
    title: g(r, "title"),
    email: g(r, "email"),
    phone: g(r, "phone"),
    linkedinUrl: g(r, "linkedin"),
  }));
  return insertContacts(items, basis, createMissing, actor);
}

/** ملف «Connections.csv» الرسمي من لينكدان (الإعدادات ← خصوصية البيانات ← الحصول على نسخة من بياناتك). */
export async function importLinkedInConnections(text: string, createMissing: boolean, actor?: string): Promise<ImportResult & { error?: string }> {
  const rows = parseCsv(text);
  const h = rows.findIndex((r) => r.some((c) => /^first name$/i.test(c)) && r.some((c) => /^company$/i.test(c)));
  if (h < 0) return { added: 0, skipped: 0, unmatched: [], createdCompanies: 0, error: "هذا ليس ملف Connections.csv من لينكدان: لم أجد الأعمدة First Name وCompany." };
  const ix = indexColumns(rows[h]);
  const g = (r: string[], k: keyof typeof HEAD) => (ix[k] === undefined ? "" : r[ix[k]!] ?? "");
  const items = rows.slice(h + 1).map((r) => ({
    company: g(r, "company"),
    fullName: [g(r, "first"), g(r, "last")].filter(Boolean).join(" "),
    title: g(r, "title"),
    email: g(r, "email"),
    linkedinUrl: g(r, "linkedin"),
  }));
  return insertContacts(items, "linkedin_connection", createMissing, actor);
}

// ───────── الإرسال ─────────

const CAP = () => Math.max(1, Math.min(200, Number(process.env.OUTREACH_DAILY_CAP) || 25));
export const outreachEnabled = () => process.env.OUTREACH_ENABLED === "1";
export const dailyCap = CAP;

const startOfDay = () => { const t = new Date(); t.setUTCHours(0, 0, 0, 0); return t; };
export async function sentToday() {
  const d = await db();
  const [r] = await d.select({ n: count() }).from(prospectEvents).where(and(eq(prospectEvents.kind, "email_sent"), gte(prospectEvents.createdAt, startOfDay())));
  return r?.n ?? 0;
}

async function readingFor(): Promise<{ href: string; title: string } | null> {
  try {
    const { articles } = await import("@/lib/articles");
    const a = articles.find((x) => /الحكم والتنفيذ|نظام التنفيذ/.test(x.h1)) ?? articles.filter((x) => x.cluster === "disputes")[0];
    return a ? { href: `/blog/${a.slug}`, title: a.h1 } : null;
  } catch {
    return null;
  }
}

/** يرسل الرسالة التالية لجهة اتصال واحدة. يعيد سبب الفشل بالعربية إن لم يرسل. */
export async function sendNext(contactId: string, opts: { to?: string; actor?: string } = {}): Promise<{ ok: boolean; reason?: string }> {
  const d = await db();
  const [row] = await d.select({ c: prospectContacts, p: prospects }).from(prospectContacts).innerJoin(prospects, eq(prospectContacts.prospectId, prospects.id)).where(eq(prospectContacts.id, contactId)).limit(1);
  if (!row) return { ok: false, reason: "جهة الاتصال غير موجودة" };
  const { c, p } = row;
  const test = !!opts.to;
  if (!test) {
    if (!c.email) return { ok: false, reason: "لا بريد لهذه الجهة" };
    if (c.unsubscribed || c.bounced) return { ok: false, reason: "أوقفت الرسائل أو ارتدّ بريدها" };
    if (c.replied) return { ok: false, reason: "ردّت: لا متابعة آلية" };
    if (c.emailStep >= EMAIL_GAPS.length) return { ok: false, reason: "اكتملت الرسائل الثلاث" };
    const [s] = await d.select().from(suppressions).where(eq(suppressions.email, c.email)).limit(1);
    if (s) return { ok: false, reason: "البريد في قائمة الإيقاف" };
    const problem = await addressProblem(c.email);
    if (problem) {
      await d.update(prospectContacts).set({ emailOn: false }).where(eq(prospectContacts.id, c.id));
      const why: Record<string, string> = { dept: "صندوق قسم لا شخص", foreign: "نطاق غير سعودي", no_mail_server: "النطاق بلا خادم بريد" };
      await logProspect(p.id, "email_skipped", why[problem], c.id);
      return { ok: false, reason: `${why[problem]}: أُوقف` };
    }
  }
  const step = test ? 0 : c.emailStep;
  const mail = outreachMail(step, { id: c.id, fullName: c.fullName, title: c.title }, p.name, await readingFor(), regionOf(p.list));
  const ok = await send({ ...mail, subject: test ? `[تجربة] ${mail.subject}` : mail.subject, to: test ? opts.to! : c.email! });
  if (!ok) return { ok: false, reason: "تعذّر الإرسال: تحقق من RESEND_API_KEY" };
  if (test) return { ok: true };
  await d.update(prospectContacts).set({ emailStep: step + 1, lastEmailAt: new Date() }).where(eq(prospectContacts.id, c.id));
  if (p.status === "new" || p.status === "researching") await d.update(prospects).set({ status: "contacted" }).where(eq(prospects.id, p.id));
  await logProspect(p.id, "email_sent", `رسالة ${step + 1} من ${EMAIL_GAPS.length}: ${mail.subject}`, c.id, opts.actor);
  return { ok: true };
}

/** مفتاح الأمان: إن ارتدّ أكثر من الحد (5%) من آخر ٤٠ رسالة أُرسلت، يتوقف الإرسال حتى يراجعه الإنسان. يحمي سمعة النطاق وحساب Resend. */
export async function bounceBreaker() {
  const limit = Number(process.env.OUTREACH_BOUNCE_LIMIT) || 0.05;
  if (process.env.OUTREACH_BREAKER_OFF === "1") return { tripped: false, rate: 0, sample: 0, limit };
  const d = await db();
  const last = await d.select({ bounced: prospectContacts.bounced }).from(prospectContacts).where(isNotNull(prospectContacts.lastEmailAt)).orderBy(desc(prospectContacts.lastEmailAt)).limit(40);
  const sample = last.length;
  const rate = sample ? last.filter((r) => r.bounced).length / sample : 0;
  return { tripped: sample >= 20 && rate > limit, rate, sample, limit };
}

async function alertOnce(title: string, rows: string[]) {
  const d = await db();
  const [done] = await d.select({ n: count() }).from(prospectEvents).where(and(eq(prospectEvents.kind, "breaker_alert"), gte(prospectEvents.createdAt, startOfDay())));
  if ((done?.n ?? 0) > 0) return;
  const [any] = await d.select({ id: prospects.id }).from(prospects).limit(1);
  if (any) await d.insert(prospectEvents).values({ prospectId: any.id, kind: "breaker_alert", body: title });
  await send(digestMail(title, rows));
}

/** المهمة اليومية: تُرسل المستحق فقط، ضمن السقف اليومي، من الأحد إلى الخميس، والمتابعات قبل الجديد. */
export async function runOutreach(): Promise<{ enabled: boolean; sent: number; skipped?: string }> {
  if (!outreachEnabled()) return { enabled: false, sent: 0, skipped: "OUTREACH_ENABLED ليس 1" };
  const dow = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "Asia/Riyadh" }).format(new Date());
  if (dow === "Fri" || dow === "Sat") return { enabled: true, sent: 0, skipped: "عطلة نهاية الأسبوع" };
  const d = await db();
  const brk = await bounceBreaker();
  if (brk.tripped) {
    await alertOnce(`⛔ أُوقف الإرسال الآلي: ارتداد ${(brk.rate * 100).toFixed(1)}% من آخر ${brk.sample} رسالة`, [`الحد المسموح ${(brk.limit * 100).toFixed(0)}%.`, "راجع العناوين المرتدة في لوحة الاستقطاب وResend، ثم أعد التفعيل بعد التنظيف (OUTREACH_BREAKER_OFF=1 لتجاوزه عمدًا)."]);
    return { enabled: true, sent: 0, skipped: `مفتاح الارتداد: ${(brk.rate * 100).toFixed(1)}% من ${brk.sample}` };
  }
  let room = CAP() - (await sentToday());
  if (room <= 0) return { enabled: true, sent: 0, skipped: "بلغنا السقف اليومي" };

  const sup = new Set((await d.select({ e: suppressions.email }).from(suppressions)).map((s) => s.e));
  const rows = await d
    .select({ c: prospectContacts, p: prospects })
    .from(prospectContacts)
    .innerJoin(prospects, eq(prospectContacts.prospectId, prospects.id))
    .where(and(isNotNull(prospectContacts.email), eq(prospectContacts.emailOn, true), eq(prospectContacts.replied, false), eq(prospectContacts.bounced, false), eq(prospectContacts.unsubscribed, false), sql`${prospectContacts.emailStep} < ${EMAIL_GAPS.length}`, inArray(prospects.status, ["new", "researching", "contacted"])))
    .orderBy(desc(prospectContacts.emailStep), desc(prospects.priority), prospectContacts.createdAt)
    .limit(400);

  const now = Date.now();
  let sent = 0;
  for (const { c } of rows) {
    if (room <= 0) break;
    if (!c.email || sup.has(c.email)) continue;
    if (c.emailStep > 0 && c.lastEmailAt && now < c.lastEmailAt.getTime() + EMAIL_GAPS[c.emailStep] * 864e5) continue;
    const r = await sendNext(c.id);
    if (r.ok) { sent++; room--; await new Promise((res) => setTimeout(res, 1200)); }
  }
  return { enabled: true, sent };
}

/** إيقاف جهة بريدها (إلغاء اشتراك، ارتداد، شكوى) وإدراج البريد في قائمة الإيقاف العامة. */
export async function suppressEmail(email: string, reason: "unsubscribe" | "bounce" | "complaint") {
  const d = await db();
  const e = email.trim().toLowerCase();
  await d.insert(suppressions).values({ email: e, reason }).onConflictDoNothing();
  const rows = await d.update(prospectContacts).set(reason === "bounce" ? { bounced: true } : { unsubscribed: true }).where(eq(prospectContacts.email, e)).returning({ id: prospectContacts.id, prospectId: prospectContacts.prospectId });
  for (const r of rows) await logProspect(r.prospectId, reason === "bounce" ? "bounced" : "unsubscribed", reason === "bounce" ? "ارتدّ البريد" : "أوقف الرسائل", r.id);
  return rows.length;
}
