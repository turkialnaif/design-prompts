"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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

  const triggerClasses = tone === "onDark" ? "btn-ghost" : "btn-line";

  // While the sheet is open the page behind it must not scroll, and Escape closes it.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const before = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = before;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`btn chamfer-btn font-normal ${small ? "px-5 py-2 text-sm" : "px-7 py-3.5 text-base"} ${triggerClasses}`}
      >
        {t.trigger}
      </button>

      {open &&
        /* Rendered on <body>: the home hero scales its content (a transform), and inside a transformed ancestor a
           "fixed" sheet is positioned against that ancestor instead of the screen, which cut off the form's end on phones. */
        createPortal(
          <div
            className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/70 backdrop-blur-sm sm:items-center sm:p-4"
            onClick={() => setOpen(false)}
          >
            <div
              dir={dir}
              role="dialog"
              aria-modal="true"
              aria-label={t.title}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent
              className="max-h-[100dvh] w-full max-w-lg overflow-y-auto overscroll-contain rounded-t-2xl glass-card p-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] [-webkit-overflow-scrolling:touch] sm:max-h-[min(90dvh,48rem)] sm:rounded-2xl sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-display text-xl font-bold text-ink">{t.title}</h2>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={locale === "ar" ? "إغلاق" : "Close"}
                  className="-m-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xl leading-none text-ink-soft hover:bg-black/5"
                >
                  <span aria-hidden>×</span>
                </button>
              </div>
              <p className="mb-6 mt-2 text-sm leading-6 text-ink-soft/80">{t.subtitle}</p>
              <MatterBriefForm locale={locale} matterTypes={matterTypes} onClose={() => setOpen(false)} />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
