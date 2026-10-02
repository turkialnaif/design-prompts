"use client";

import { useEffect, useState } from "react";

/** A gold line across the top and, once reading has begun, a small pill with the minutes left. */
export default function ReadingProgress({ minutes = 0 }: { minutes?: number }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const left = Math.max(0, Math.ceil(minutes * (1 - pct / 100)));
  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1 bg-transparent">
        <div className="h-full bg-gradient-to-l from-[#f6e2b3] to-[#e0b35a] shadow-[0_0_10px_rgba(224,179,90,0.7)]" style={{ width: `${pct}%` }} />
      </div>
      {minutes > 0 && (
        <div
          aria-hidden
          className={`chamfer-btn pointer-events-none fixed bottom-5 start-1/2 z-40 -translate-x-1/2 rtl:translate-x-1/2 border border-[#e0b35a]/40 bg-[#00124a]/90 px-4 py-2 text-xs text-[#f6e2b3] backdrop-blur-md transition-all duration-500 ${
            pct > 3 && pct < 97 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          {Math.round(pct)}٪ · {left > 0 ? `متبقٍ ${left} د` : "أنهيت القراءة"}
        </div>
      )}
    </>
  );
}
