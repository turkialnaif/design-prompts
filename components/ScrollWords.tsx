"use client";

import { useEffect, useRef } from "react";

/** A statement whose words light up one by one as it crosses the screen. With reduced motion every word is simply lit. */
export default function ScrollWords({ text, eyebrow }: { text: string; eyebrow: string }) {
  const host = useRef<HTMLParagraphElement>(null);
  const words = text.split(/\s+/);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLElement>("[data-w]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      spans.forEach((s) => (s.style.opacity = "1"));
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - rect.top) / (vh * 0.55 + rect.height * 0.6)));
      const lit = p * (spans.length + 3);
      spans.forEach((s, i) => (s.style.opacity = String(Math.min(1, Math.max(0.16, lit - i)))));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [text]);

  return (
    <section data-glow className="relative isolate overflow-hidden py-28 md:py-44">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,6,29,0.88)_0%,rgba(0,18,74,0.55)_55%,rgba(0,6,29,0.5)_100%)]" />
      <div className="mx-auto max-w-5xl px-5 text-center">
        <p className="gold-eyebrow !text-[#f6e2b3] text-xs md:text-sm">{eyebrow}</p>
        <p ref={host} className="font-display mt-8 text-3xl font-light leading-[1.7] text-white sm:text-4xl md:text-6xl md:leading-[1.55]">
          {words.map((w, i) => (
            <span key={i} data-w style={{ opacity: 0.16, transition: "opacity 0.25s linear" }}>
              {w}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
