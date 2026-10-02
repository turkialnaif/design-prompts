"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { ServiceTile } from "@/components/ServiceTiles";

/**
 * The services as a row of tall panels that open like a fan: one is open at a time, showing its
 * photograph, stage, title and a link; the others stay as slim numbered strips. On a phone the panels
 * stack and open downwards. Hover, focus or a tap opens a panel; there is no auto-play.
 */
export default function ServiceAccordion({ items, cta }: { items: ServiceTile[]; cta: string }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="flex flex-col gap-2 md:h-[36rem] md:flex-row md:gap-2.5" role="list">
      {items.map((s, i) => {
        const on = i === open;
        return (
          <div
            key={s.href + s.title}
            role="listitem"
            onMouseEnter={() => setOpen(i)}
            onFocus={() => setOpen(i)}
            className={`group relative isolate overflow-hidden bg-[#00124a] transition-[flex-grow,height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] max-md:w-full ${
              on ? "max-md:h-[23rem] md:flex-[7_1_0%]" : "max-md:h-[4.6rem] md:flex-[1_1_0%]"
            }`}
          >
            <Link href={s.href} aria-current={on || undefined} className="absolute inset-0 z-10" onClick={(e) => { if (!on) { e.preventDefault(); setOpen(i); } }}>
              <span className="sr-only">{s.title}</span>
            </Link>
            <Image
              src={s.photo}
              alt=""
              fill
              sizes="(min-width: 768px) 60vw, 100vw"
              className={`-z-20 object-cover transition-[transform,opacity,filter] duration-[900ms] ease-out ${on ? "scale-100 opacity-100 [filter:none]" : "scale-110 opacity-35 [filter:grayscale(1)]"}`}
            />
            <div aria-hidden className={`absolute inset-0 -z-10 transition-opacity duration-700 ${on ? "bg-[linear-gradient(180deg,rgba(0,6,29,0.1)_0%,rgba(0,6,29,0.45)_45%,rgba(0,6,29,0.95)_100%)]" : "bg-[#00124a]/80"}`} />

            {/* collapsed strip */}
            <div className={`absolute inset-0 flex items-center gap-4 px-5 transition-opacity duration-300 md:flex-col md:justify-between md:px-0 md:py-6 ${on ? "pointer-events-none opacity-0" : "opacity-100 delay-300"}`}>
              <span className="font-display text-2xl font-light text-[#f6e2b3] md:text-3xl" dir="ltr">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-lg font-light text-white md:hidden">{s.title}</span>
              <span className="hidden font-display text-xl font-light text-white/90 [text-orientation:mixed] [writing-mode:vertical-rl] md:block">{s.title}</span>
            </div>

            {/* open panel */}
            <div className={`absolute inset-x-0 bottom-0 p-6 transition-all duration-700 md:p-9 ${on ? "translate-y-0 opacity-100 delay-200" : "pointer-events-none translate-y-6 opacity-0"}`}>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <span className="text-sm text-[#f6e2b3]">{s.label}</span>
                  <h3 className="font-display mt-1 text-3xl font-light leading-[1.3] text-white md:text-5xl">{s.title}</h3>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-white/60">{s.titleEn}</p>
                </div>
                <span className="font-display hidden text-6xl font-light text-white/30 md:block" dir="ltr">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <span className="mt-5 inline-flex items-center gap-2 border-t border-[#e0b35a]/50 pt-4 text-sm text-[#f6e2b3]">{cta}</span>
            </div>
            <div aria-hidden className={`pointer-events-none absolute inset-0 border transition-colors duration-500 ${on ? "border-[#e0b35a]/50" : "border-white/10"}`} />
          </div>
        );
      })}
    </div>
  );
}
