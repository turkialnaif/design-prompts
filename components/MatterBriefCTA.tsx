"use client";

import { useState } from "react";
import MatterBriefForm, { briefCopy, type BriefLocale } from "@/components/MatterBriefForm";

export default function MatterBriefCTA({
  locale = "ar",
  matterTypes,
  tone = "onLight",
  small = false,
}: {
  locale?: BriefLocale;
  matterTypes: string[];
  tone?: "onDark" | "onLight";
  small?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const t = briefCopy[locale];
  const dir = locale === "ar" ? "rtl" : "ltr";

  const triggerClasses = tone === "onDark" ? "glass-card-dark text-white hover:text-gold" : "glass-card text-ink hover:text-gold-deep";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`rounded-full font-semibold ${small ? "px-5 py-2 text-sm" : "px-7 py-3.5 text-base"} transition-all duration-200 hover:-translate-y-0.5 ${triggerClasses}`}
      >
        {t.trigger}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div
            dir={dir}
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl glass-card p-6 md:p-8"
          >
            <h2 className="font-display text-xl font-bold text-ink">{t.title}</h2>
            <p className="mb-6 mt-2 text-sm leading-6 text-ink-soft/70">{t.subtitle}</p>
            <MatterBriefForm locale={locale} matterTypes={matterTypes} onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
