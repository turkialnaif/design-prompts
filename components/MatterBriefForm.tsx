"use client";

import { useId, useState, type FormEvent } from "react";

export type BriefLocale = "ar" | "en";
type Status = "idle" | "sending" | "success" | "error";

export const briefCopy = {
  ar: {
    trigger: "أرسل موجز المسألة",
    title: "أرسل موجز المسألة",
    subtitle: "نموذج مخصّص للعملاء المؤسسيين — نراجع الموجز ونرد خلال يوم عمل واحد.",
    name: "الاسم الكامل",
    org: "المنشأة / الشركة",
    email: "البريد الإلكتروني",
    phone: "رقم الجوال (اختياري)",
    privacyLead: "نستخدم بياناتك للرد على استفسارك، وفق",
    privacyLink: "سياسة الخصوصية",
    privacyHref: "/privacy",
    matterType: "نوع المسألة",
    matterTypeOther: "أخرى",
    description: "وصف مختصر للمسألة",
    docsNote: "لإرفاق مستندات، سنتواصل معك عبر البريد الإلكتروني بعد استلام الموجز.",
    disclaimer: "إرسال هذا النموذج لا ينشئ علاقة محاماة (محامٍ–موكل) إلا بعد قبول المكتب للتكليف رسميًا.",
    submit: "إرسال الموجز",
    sending: "جارٍ الإرسال…",
    success: "تم استلام موجزك بنجاح. سنرد خلال يوم عمل واحد.",
    error: "تعذّر الإرسال، حاول مرة أخرى أو تواصل عبر واتساب.",
    cancel: "إلغاء",
    close: "إغلاق",
  },
  en: {
    trigger: "Send Matter Brief",
    title: "Send Matter Brief",
    subtitle: "A dedicated form for institutional clients — we review and respond within one business day.",
    name: "Full Name",
    org: "Organization / Company",
    email: "Email",
    phone: "Mobile number (optional)",
    privacyLead: "We use your details to answer your enquiry, as set out in our",
    privacyLink: "Privacy Policy",
    privacyHref: "/en/privacy",
    matterType: "Matter Type",
    matterTypeOther: "Other",
    description: "Brief Description of the Matter",
    docsNote: "To share documents, we'll follow up by email once we receive your brief.",
    disclaimer: "Submitting this form does not create an attorney-client relationship until the firm formally accepts the engagement.",
    submit: "Send Brief",
    sending: "Sending…",
    success: "Your brief has been received. We'll respond within one business day.",
    error: "Something went wrong. Please try again or reach us on WhatsApp.",
    cancel: "Cancel",
    close: "Close",
  },
};

const field = "mt-1.5 w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink outline-none focus:border-gold-deep";

/** The matter-brief form. `onClose` present → used inside the modal (cancel / close buttons); absent → inline on a page. */
export default function MatterBriefForm({
  locale = "ar",
  matterTypes,
  onClose,
}: {
  locale?: BriefLocale;
  matterTypes: string[];
  onClose?: () => void;
}) {
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const t = briefCopy[locale];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    try {
      const res = await fetch("/api/matter-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          org: data.get("org"),
          email: data.get("email"),
          phone: data.get("phone"),
          website: data.get("website"),
          matterType: data.get("matterType"),
          description: data.get("description"),
          locale,
        }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="py-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/15">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#012696" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <p className="mt-4 text-sm leading-6 text-ink">{t.success}</p>
        {onClose && (
          <button type="button" onClick={onClose} className="mt-6 btn btn-gold chamfer-btn px-6 py-2.5 text-sm font-normal">
            {t.close}
          </button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor={`${uid}-name`} className="text-xs font-semibold text-ink-soft/70">{t.name} *</label>
        <input id={`${uid}-name`} name="name" type="text" required className={field} />
      </div>
      <div>
        <label htmlFor={`${uid}-org`} className="text-xs font-semibold text-ink-soft/70">{t.org}</label>
        <input id={`${uid}-org`} name="org" type="text" className={field} />
      </div>
      <div>
        <label htmlFor={`${uid}-email`} className="text-xs font-semibold text-ink-soft/70">{t.email} *</label>
        <input id={`${uid}-email`} name="email" type="email" required dir="ltr" className={`${field} text-end`} />
      </div>
      <div>
        <label htmlFor={`${uid}-phone`} className="text-xs font-semibold text-ink-soft/70">{t.phone}</label>
        <input id={`${uid}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" dir="ltr" maxLength={30} className={`${field} text-end`} />
      </div>
      <div>
        <label htmlFor={`${uid}-matterType`} className="text-xs font-semibold text-ink-soft/70">{t.matterType} *</label>
        <select id={`${uid}-matterType`} name="matterType" required defaultValue="" className={field}>
          <option value="" disabled>
            —
          </option>
          {matterTypes.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
          <option value={t.matterTypeOther}>{t.matterTypeOther}</option>
        </select>
      </div>
      <div>
        <label htmlFor={`${uid}-description`} className="text-xs font-semibold text-ink-soft/70">{t.description} *</label>
        <textarea id={`${uid}-description`} name="description" required rows={4} className={field} />
        <p className="mt-1.5 text-xs leading-5 text-ink-soft/50">{t.docsNote}</p>
      </div>

      {/* honeypot: people never see or fill this; scripts that fill every field give themselves away */}
      <div aria-hidden="true" className="absolute -start-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <p className="rounded-lg bg-paper px-3.5 py-3 text-xs font-medium leading-5 text-ink-soft/80">{t.disclaimer}</p>
      <p className="text-xs leading-5 text-ink-soft/70">
        {t.privacyLead}{" "}
        <a href={t.privacyHref} className="font-semibold text-gold-deep underline underline-offset-2">
          {t.privacyLink}
        </a>
        .
      </p>

      {status === "error" && <p className="rounded-lg bg-red-50 px-3.5 py-2.5 text-xs font-medium text-red-700">{t.error}</p>}

      <div className="flex gap-3 pt-1">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn btn-gold chamfer-btn px-6 py-2.5 text-sm font-normal transition-[filter] disabled:opacity-60"
        >
          {status === "sending" ? t.sending : t.submit}
        </button>
        {onClose && (
          <button type="button" onClick={onClose} className="chamfer-btn border border-ink/15 px-6 py-2.5 text-sm font-semibold text-ink-soft hover:border-gold-deep">
            {t.cancel}
          </button>
        )}
      </div>
    </form>
  );
}
