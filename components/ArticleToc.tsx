"use client";

import { useEffect, useState } from "react";

/** Sticky chapter list that follows the reader: the section in view is lit in gold. */
export default function ArticleToc({ headings }: { headings: { id: string; text: string }[] }) {
  const [active, setActive] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    const onScroll = () => {
      let current = els[0].id;
      for (const el of els) if (el.getBoundingClientRect().top <= 180) current = el.id;
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [headings]);

  return (
    <nav data-lenis-prevent className="sticky top-28 max-h-[calc(100vh-9rem)] overflow-y-auto pe-2" aria-label="محتويات المقال">
      <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-deep">محتويات المقال</p>
      <ol className="mt-5 border-e border-[#d0a751]/35 pe-5">
        {headings.map((h) => {
          const on = h.id === active;
          return (
            <li key={h.id} className="relative py-2">
              <span aria-hidden className={`absolute -end-[1.4rem] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 transition-all duration-300 ${on ? "scale-125 bg-gold" : "bg-[#d0a751]/35"}`} />
              <a href={`#${h.id}`} className={`flex gap-3 text-sm leading-6 transition-colors ${on ? "font-bold text-ink" : "text-ink-soft/70 hover:text-gold-deep"}`}>
                {h.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
