"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "success" | "error";

const options = [
  { key: "individuals", label: "أفراد" },
  { key: "companies", label: "شركات" },
  { key: "institutions", label: "مؤسسات" },
];

const en = {
  options: [
    { key: "individuals", label: "Individuals" },
    { key: "companies", label: "Companies" },
    { key: "institutions", label: "Institutions" },
  ],
  success: "You are subscribed. Thank you.",
  sending: "Sending…",
  submit: "Subscribe",
  error: "Could not subscribe. Please try again or contact us directly.",
  email: "Email address",
  who: "I am",
};

export default function NewsletterSignup({ source, compact = false, locale = "ar" }: { source: string; compact?: boolean; locale?: "ar" | "en" }) {
  const isEn = locale === "en";
  const opts = isEn ? en.options : options;
  const [email, setEmail] = useState("");
  const [audience, setAudience] = useState("companies");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, audience, source }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (compact) {
    return status === "success" ? (
      <p className="text-sm font-semibold text-gold-deep">{isEn ? en.success : "تم تسجيل اشتراكك. شكرًا لك."}</p>
    ) : (
      <form onSubmit={onSubmit} className="space-y-3">
        <div className="flex flex-wrap justify-center gap-1.5 md:justify-start" role="radiogroup" aria-label={isEn ? en.who : "أنا"}>
          {opts.map((o) => (
            <button
              key={o.key}
              type="button"
              role="radio"
              aria-checked={audience === o.key}
              onClick={() => setAudience(o.key)}
              className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-colors ${audience === o.key ? "bg-ink text-white" : "border border-ink/15 text-ink-soft hover:border-gold-deep"}`}
            >
              {o.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="email"
            required
            dir="ltr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            aria-label={isEn ? en.email : "البريد الإلكتروني"}
            className="min-w-0 flex-1 rounded-full border border-line bg-white/80 px-4 py-2.5 text-sm text-ink outline-none focus:border-gold-deep"
          />
          <button type="submit" disabled={status === "sending"} className="shrink-0 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gold-deep disabled:opacity-60">
            {status === "sending" ? (isEn ? en.sending : "جارٍ الإرسال…") : isEn ? en.submit : "اشترك"}
          </button>
        </div>
        {status === "error" && <p className="text-xs text-red-700">{isEn ? en.error : "تعذّر الاشتراك، حاول مرة أخرى أو راسلنا مباشرة."}</p>}
        <p className="text-[11px] text-ink-soft/50">
          {isEn ? (
            <>By subscribing you agree to our <Link href="/en/privacy" className="underline hover:text-gold-deep">privacy policy</Link>.</>
          ) : (
            <>بالاشتراك فإنك توافق على <Link href="/privacy" className="underline hover:text-gold-deep">سياسة الخصوصية</Link>.</>
          )}
        </p>
      </form>
    );
  }

  return (
    <div className="glass-card rounded-3xl p-8 text-center md:p-10">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep">Newsletter</p>
      <h2 className="font-display mt-2 text-xl font-bold text-ink md:text-2xl">اشترك في التنبيهات القانونية</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-ink-soft/80">
        رسالة موجزة عند نشر مقال جديد أو صدور تعديل نظامي يهم منشأتك. بلا إزعاج، ويمكنك إلغاء الاشتراك بمراسلتنا.
      </p>

      {status === "success" ? (
        <p className="mt-6 text-sm font-semibold text-gold-deep">تم تسجيل اشتراكك. شكرًا لك.</p>
      ) : (
        <form onSubmit={onSubmit} className="mx-auto mt-6 max-w-md space-y-4">
          <div className="flex flex-wrap justify-center gap-2" role="radiogroup" aria-label="أنا">
            {options.map((o) => (
              <button
                key={o.key}
                type="button"
                role="radio"
                aria-checked={audience === o.key}
                onClick={() => setAudience(o.key)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                  audience === o.key ? "bg-[#12233a] text-white" : "glass-card text-ink-soft"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              dir="ltr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              aria-label="البريد الإلكتروني"
              className="w-full flex-1 rounded-full border border-line bg-white/80 px-5 py-3 text-center text-sm text-ink outline-none focus:border-gold-deep"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-full bg-gradient-to-b from-[#f0d894] to-[#cfa64e] px-7 py-3 text-sm font-semibold text-ink ring-1 ring-white/80 transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {status === "sending" ? "جارٍ الإرسال…" : "اشترك"}
            </button>
          </div>
          {status === "error" && <p className="text-xs text-red-700">تعذّر الاشتراك، حاول مرة أخرى أو راسلنا مباشرة.</p>}
          <p className="text-[11px] text-ink-soft/50">
            بالاشتراك فإنك توافق على <Link href="/privacy" className="underline hover:text-gold-deep">سياسة الخصوصية</Link>.
          </p>
        </form>
      )}
    </div>
  );
}
