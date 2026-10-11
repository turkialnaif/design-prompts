"use client";

import { useEffect } from "react";

/**
 * The profile on a screen: a slim bar with the two things a reader wants (the PDF, the website), and the pages scaled to
 * fit the viewport width (an A4 sheet is 794px wide, wider than a phone). Hidden when printing.
 */
export default function ProfileScreenBar({
  labels,
  pdfHref,
  siteHref,
  en,
}: {
  labels: { pdf: string; site: string; back: string };
  pdfHref: string;
  siteHref: string;
  en: boolean;
}) {
  useEffect(() => {
    const fit = () => {
      const sheet = 794; // 210mm at 96dpi
      const z = Math.min(1, (window.innerWidth - 24) / sheet);
      document.documentElement.style.setProperty("--fit", String(Math.max(0.3, z)));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  const btn = "inline-flex min-h-11 items-center rounded-md px-4 text-[13px] font-semibold transition-colors";
  return (
    <div
      dir={en ? "ltr" : "rtl"}
      className="no-print fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-3 px-3 sm:px-6"
      style={{ height: 54, background: "rgba(0,6,29,0.92)", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(224,179,90,0.35)" }}
    >
      <a href={siteHref} className="flex items-center gap-2.5 text-[12px] tracking-[0.3em]" style={{ color: "#e0b35a" }}>
        <img src="/brand/logo-mark.png" alt="" width={24} height={19} style={{ height: 19, width: "auto" }} />
        <span dir="ltr">{labels.back}</span>
      </a>
      <div className="flex items-center gap-2">
        <a href={siteHref} className={`${btn} hidden border sm:inline-flex`} style={{ borderColor: "rgba(255,255,255,0.35)", color: "#fff" }}>
          {labels.site}
        </a>
        <a href={pdfHref} download className={btn} style={{ background: "#e0b35a", color: "#00124a" }}>
          {labels.pdf}
        </a>
      </div>
    </div>
  );
}
