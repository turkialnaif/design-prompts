"use client";

import { useEffect, useRef, useState } from "react";

const copy = {
  ar: {
    button: "دخول",
    title: "الدخول الآمن",
    staff: { label: "إدارة المكتب", hint: "للمحامين وفريق العمل" },
    client: { label: "بوابة العملاء", hint: "متابعة قضاياك ومستنداتك" },
  },
  en: {
    button: "Sign in",
    title: "Secure sign-in",
    staff: { label: "Firm management", hint: "Lawyers and staff" },
    client: { label: "Client portal", hint: "Your matters and documents" },
  },
};

function Lock({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </svg>
  );
}

export default function LoginMenu({ locale = "ar", floating = false }: { locale?: "ar" | "en"; floating?: boolean }) {
  const t = copy[locale];
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className={`chamfer-btn flex items-center gap-1.5 whitespace-nowrap border px-3.5 py-2 text-xs font-normal transition-colors ${
          floating ? "border-ink/20 text-ink/70 hover:text-gold-deep" : "border-white/30 text-white/90 hover:bg-white/10 hover:text-white"
        }`}
      >
        <Lock className="h-3.5 w-3.5" />
        {t.button}
      </button>

      {open && (
        <div
          className={`absolute top-full z-50 mt-3 w-64 overflow-hidden rounded-2xl border border-gold/30 bg-white/95 p-2 text-ink backdrop-blur-xl ${
            locale === "ar" ? "left-0" : "right-0"
          }`}
        >
          <p className="px-3 pb-1 pt-2 text-[11px] font-semibold tracking-wide text-ink-soft/60">{t.title}</p>
          {[
            { href: "/admin/login", ...t.staff },
            { href: "/portal/login", ...t.client },
          ].map((item) => (
            <a key={item.href} href={item.href} className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-gold/10">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold-deep">
                <Lock className="h-4 w-4" />
              </span>
              <span className="block">
                <span className="block text-sm font-semibold">{item.label}</span>
                <span className="block text-xs text-ink-soft/70">{item.hint}</span>
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
