import "server-only";
import { Resend } from "resend";
import { firm } from "@/lib/site";
import { hmac } from "@/lib/auth/crypto";

export const SITE = (process.env.NEXT_PUBLIC_SITE_URL || firm.website).replace(/\/$/, "");
const alertTo = (): string | string[] => {
  const l = process.env.LEADS_ALERT_EMAILS?.split(",").map((x) => x.trim()).filter(Boolean);
  return l && l.length ? l : firm.email;
};
const FROM = `${firm.nameShortAr} <${firm.email}>`;
const WHATSAPP = `https://wa.me/${firm.phone.replace(/\D/g, "")}`;

export const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const unsubscribeUrl = (leadId: string) => `${SITE}/api/leads/unsubscribe?l=${leadId}&t=${hmac(`unsub:${leadId}`)}`;
export const verifyUnsubscribe = (leadId: string, t: string) => hmac(`unsub:${leadId}`) === t;

/** الحجز: رابط تقويم إن وُجد، وإلا واتساب المكتب برسالة جاهزة. */
export const bookingUrl = (ar: boolean) => process.env.BOOKING_URL || `${WHATSAPP}?text=${encodeURIComponent(ar ? "السلام عليكم، أرسلت موجز مسألتي عبر الموقع وأرغب بتحديد موعد." : "Hello, I sent a matter brief through the website and would like to book a call.")}`;

function shell(ar: boolean, inner: string, foot?: string) {
  return `<!doctype html><html lang="${ar ? "ar" : "en"}" dir="${ar ? "rtl" : "ltr"}"><body style="margin:0;background:#f4efe4;padding:24px 12px;font-family:Tahoma,Arial,sans-serif;color:#1f2933">
<div style="max-width:600px;margin:0 auto;background:#ffffff;border-top:4px solid #c4a04e">
<div style="background:#00124a;padding:18px 26px;color:#f4efe4;font-size:17px;font-weight:bold">${esc(ar ? firm.nameShortAr : "Turki AlNaif & Partners")}</div>
<div style="padding:26px;line-height:2;font-size:15px">${inner}</div>
<div style="padding:16px 26px;background:#faf7ef;font-size:12px;color:#6b7280;line-height:1.9">${foot ?? ""}${esc(ar ? "تركي النايف وشركاؤه للمحاماة والاستشارات القانونية · الرياض · حي الياسمين" : "Turki AlNaif & Partners · Riyadh · Al Yasmin")} · <a href="${SITE}" style="color:#8a6d25">taap.sa</a></div>
</div></body></html>`;
}

const btn = (href: string, label: string) => `<p style="margin:22px 0"><a href="${href}" style="display:inline-block;background:#c4a04e;color:#00061d;text-decoration:none;font-weight:bold;padding:12px 26px">${esc(label)}</a></p>`;

export type MailBody = { subject: string; html: string; text?: string; replyTo?: string; unsubscribe?: string };
export type Mail = MailBody & { to: string | string[] };

export async function send(m: Mail): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  try {
    const { error } = await new Resend(key).emails.send({
      from: FROM,
      to: m.to,
      subject: m.subject,
      html: m.html,
      text: m.text,
      replyTo: m.replyTo,
      headers: m.unsubscribe ? { "List-Unsubscribe": `<${m.unsubscribe}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" } : undefined,
    });
    return !error;
  } catch {
    return false;
  }
}

/** رسالة الاستلام الفوري إلى صاحب الموجز. */
export function ackMail(l: { id: string; name: string; locale: string }, picks: { href: string; title: string }[]): MailBody {
  const ar = l.locale !== "en";
  const links = picks.length ? `<p>${ar ? "قراءة مختصرة قد تفيدك قبل أن نتحدث:" : "Two short reads that may help before we speak:"}</p><ul style="padding-inline-start:20px">${picks.map((p) => `<li><a href="${SITE}${p.href}" style="color:#00124a">${esc(p.title)}</a></li>`).join("")}</ul>` : "";
  const html = shell(
    ar,
    `<p>${esc(l.name)}،</p>
<p>${ar ? "وصلنا موجز مسألتك، وسيطّلع عليه محامٍ من المكتب ويرد عليك <b>خلال يوم عمل</b>." : "We have received your brief. A lawyer at the firm will read it and reply <b>within one working day</b>."}</p>
<p><b>${ar ? "ما الذي سيحدث بعد ذلك:" : "What happens next:"}</b></p>
<ol style="padding-inline-start:22px"><li>${ar ? "نراجع الموجز ونتحقق من عدم وجود تعارض مصالح." : "We review the brief and check for any conflict of interest."}</li><li>${ar ? "نتواصل معك لاستيضاح ما ينقص ونحدد نطاق العمل." : "We contact you to clarify what is missing and agree the scope."}</li><li>${ar ? "نرسل لك عرضًا واضحًا بالنطاق والأتعاب لتقبله إلكترونيًا إن وافقك." : "We send a clear scope-and-fee proposal that you can accept online."}</li></ol>
${links}
<p>${ar ? "إن كان الأمر عاجلًا، فاحجز مكالمة الآن أو راسلنا على واتساب:" : "If it is urgent, book a call now or message us on WhatsApp:"}</p>
${btn(bookingUrl(ar), ar ? "احجز مكالمة" : "Book a call")}
<p style="font-size:13px;color:#6b7280">${ar ? "للحفاظ على سرية مسألتك، لا ترسل مستندات قبل أن نتفق على الإطار." : "To protect confidentiality, please do not send documents before we agree the framework."}</p>`,
  );
  return { subject: ar ? "استلمنا موجز مسألتك" : "We received your matter brief", html, replyTo: firm.email };
}

/** تنبيه المكتب: عميل جديد بدرجته وأسبابه وروابط الاتصال. */
export function alertMail(l: { id: string; name: string; org?: string | null; email: string; phone?: string | null; matterType?: string | null; description?: string | null; score: number; tier: string; reasons: string[]; aiSummary?: string | null; conflictNote?: string | null; repeat?: boolean }): Mail {
  const wa = l.phone ? `https://wa.me/${l.phone.replace(/\D/g, "").replace(/^0/, "966")}?text=${encodeURIComponent(`السلام عليكم ${l.name}، معك ${firm.nameShortAr}. وصلنا موجز مسألتك وأحببنا أن نتواصل معك مباشرة.`)}` : null;
  const html = shell(
    true,
    `<p style="font-size:18px;font-weight:bold;margin:0 0 6px">${l.repeat ? "إرسال متكرر · " : ""}عميل محتمل ${esc(l.tier)} (${l.score}/100)</p>
<table style="border-collapse:collapse;font-size:14px" cellpadding="5">
<tr><td><b>الاسم</b></td><td>${esc(l.name)}</td></tr>
<tr><td><b>المنشأة</b></td><td>${esc(l.org || "—")}</td></tr>
<tr><td><b>البريد</b></td><td dir="ltr">${esc(l.email)}</td></tr>
<tr><td><b>الجوال</b></td><td dir="ltr">${esc(l.phone || "—")}</td></tr>
<tr><td><b>نوع المسألة</b></td><td>${esc(l.matterType || "—")}</td></tr></table>
${l.conflictNote ? `<p style="background:#fdecea;padding:10px 14px;color:#8a1c1c"><b>تنبيه تعارض محتمل:</b> ${esc(l.conflictNote)}</p>` : ""}
${l.aiSummary ? `<p style="background:#f4efe4;padding:10px 14px"><b>خلاصة:</b> ${esc(l.aiSummary)}</p>` : ""}
<p><b>الوصف:</b></p><p style="white-space:pre-wrap;background:#faf7ef;padding:12px 14px">${esc((l.description || "").slice(0, 1800))}</p>
<p style="font-size:13px;color:#6b7280"><b>أسباب الدرجة:</b><br>${l.reasons.map(esc).join("<br>")}</p>
${wa ? btn(wa, "تواصل واتساب الآن") : ""}${btn(`${SITE}/admin/leads/${l.id}`, "فتح في لوحة الإدارة")}
<p style="font-size:13px;color:#6b7280">السرعة هي أقوى عامل: العميل الذي يُردّ عليه خلال ساعة يتحول أكثر بكثير ممن يُردّ عليه في اليوم التالي.</p>`,
  );
  return { to: alertTo(), subject: `عميل ${l.tier}: ${l.name}${l.org ? ` — ${l.org}` : ""} (${l.score})`, html, replyTo: l.email } as Mail;
}

/** المتابعات الآلية، بصياغة محسوبة: قيمة قبل أي طلب، وإيقاف بنقرة واحدة. */
export const FOLLOWUP_DAYS = [1, 3, 7, 14];
export function followupMail(step: number, l: { id: string; name: string; locale: string; matterType?: string | null }, picks: { href: string; title: string }[]): MailBody {
  const ar = l.locale !== "en";
  const unsub = unsubscribeUrl(l.id);
  const foot = `${ar ? "تصلك هذه الرسالة لأنك أرسلت موجز مسألة عبر taap.sa." : "You are receiving this because you sent a matter brief through taap.sa."} <a href="${unsub}" style="color:#8a6d25">${ar ? "إيقاف هذه الرسائل" : "Stop these emails"}</a><br>`;
  const reads = picks.length ? `<ul style="padding-inline-start:20px">${picks.map((p) => `<li><a href="${SITE}${p.href}" style="color:#00124a">${esc(p.title)}</a></li>`).join("")}</ul>` : "";
  const book = btn(bookingUrl(ar), ar ? "احجز مكالمة قصيرة" : "Book a short call");
  const body: Record<number, [string, string]> = {
    0: [ar ? "هل وصلك ردّنا؟" : "Did our reply reach you?", ar ? `<p>${esc(l.name)}، راجعنا موجز مسألتك${l.matterType ? ` («${esc(l.matterType)}»)` : ""}. إن لم يصلك اتصال منا أو كان الوقت غير مناسب، فيسعدنا أن نحدد معك مكالمة قصيرة تناسبك.</p>${book}` : `<p>${esc(l.name)}, we reviewed your brief. If we have not reached you, or the time was not right, we would be glad to set a short call.</p>${book}`],
    1: [ar ? "ثلاثة أشياء تجهّزها قبل أول اجتماع" : "Three things to prepare before a first meeting", ar ? `<p>لنستفيد من أول مكالمة، يكفي أن تجهّز:</p><ol style="padding-inline-start:22px"><li>الأطراف وصفاتهم (أسماء المنشآت والسجلات).</li><li>تسلسل الأحداث بتواريخه في صفحة واحدة.</li><li>أي عقد أو مراسلة أو إشعار وصلك، ومواعيد أي مهلة.</li></ol><p>لا ترسلها الآن؛ نطلبها حين نتفق على الإطار.</p>${book}` : `<ol style="padding-inline-start:22px"><li>The parties and their capacities.</li><li>A one-page timeline with dates.</li><li>Any contract, correspondence or notice and any deadline.</li></ol>${book}`],
    2: [ar ? "قراءة مختصرة تخص مسألتك" : "A short read on your matter", ar ? `<p>جمعنا لك ما يخدم مسألتك من أبحاثنا:</p>${reads}${book}` : `<p>Something from our research that fits your matter:</p>${reads}${book}`],
    3: [ar ? "نغلق المتابعة مؤقتًا" : "Closing our follow-up for now", ar ? `<p>لم نتمكن من الوصول إليك فنتوقف عن المتابعة حتى لا نزعجك. إن عاد الأمر مهمًّا في أي وقت، فرسالة واحدة تكفي وسنرد عليها في يوم عمل.</p>${book}` : `<p>We could not reach you, so we will stop following up. If it becomes important again, one message is enough and we will answer within a working day.</p>${book}`],
  };
  const [subject, inner] = body[step];
  return { subject, html: shell(ar, inner, foot), unsubscribe: unsub };
}

export function proposalMail(p: { title: string; name: string; url: string; validUntil?: string | null; locale: string }): MailBody {
  const ar = p.locale !== "en";
  return {
    subject: ar ? `عرضنا لمسألتك: ${p.title}` : `Our proposal: ${p.title}`,
    html: shell(
      ar,
      `<p>${esc(p.name)}،</p><p>${ar ? "أعددنا لك عرضًا واضحًا بنطاق العمل والأتعاب. يمكنك قراءته وقبوله إلكترونيًا من الرابط، وإن أردت تعديلًا فرُدّ على هذه الرسالة." : "We have prepared a clear proposal with the scope and fees. You can read and accept it online, or reply to this email to ask for a change."}</p>${btn(p.url, ar ? "قراءة العرض وقبوله" : "Read and accept the proposal")}${p.validUntil ? `<p style="font-size:13px;color:#6b7280">${ar ? "العرض ساري حتى" : "Valid until"} ${esc(p.validUntil)}</p>` : ""}`,
    ),
    replyTo: firm.email,
  };
}

export function acceptedMail(p: { title: string; name: string; locale: string; matterNumber?: string }): MailBody {
  const ar = p.locale !== "en";
  return {
    subject: ar ? "تم قبول العرض: نرحب بك" : "Proposal accepted: welcome",
    html: shell(
      ar,
      `<p>${esc(p.name)}،</p><p>${ar ? `شكرًا لثقتك. سجلنا قبولك لعرض «${esc(p.title)}»${p.matterNumber ? ` وفتحنا الملف رقم <b>${esc(p.matterNumber)}</b>` : ""}.` : `Thank you. We have recorded your acceptance of “${esc(p.title)}”${p.matterNumber ? ` and opened file <b>${esc(p.matterNumber)}</b>` : ""}.`}</p><p><b>${ar ? "الخطوة التالية:" : "Next step:"}</b> ${ar ? "سيتواصل معك المحامي المسؤول لترتيب المستندات المطلوبة وتحديد أول موعد." : "The responsible lawyer will contact you to arrange the documents we need and the first meeting."}</p>`,
    ),
    replyTo: firm.email,
  };
}

export function digestMail(title: string, rows: string[], tail?: string): Mail {
  return {
    to: alertTo(),
    subject: title,
    html: shell(true, `<p style="font-size:17px;font-weight:bold">${esc(title)}</p>${rows.map((r) => `<p style="margin:6px 0">${r}</p>`).join("")}${tail ? `<p style="color:#6b7280;font-size:13px">${esc(tail)}</p>` : ""}${btn(`${SITE}/admin/leads`, "فتح لوحة الفرص")}`),
  } as Mail;
}
