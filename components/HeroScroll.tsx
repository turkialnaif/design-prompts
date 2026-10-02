"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * The hero is pinned to the top of the page while the rest of the home page slides up over it like a
 * curtain. As that happens `--hp` (0 → 1, one screen of scrolling) rises: the hero eases back and
 * darkens (see .hero-curtain in globals.css). Reduced motion leaves it as a plain block.
 */
export default function HeroScroll({ children }: { children: ReactNode }) {
  const el = useRef<HTMLElement>(null);
  useEffect(() => {
    const node = el.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const p = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
      node.style.setProperty("--hp", String(p));
      node.style.visibility = p >= 1 ? "hidden" : "visible";
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
  }, []);
  return (
    <section ref={el} className="hero-curtain sticky top-0 z-0 isolate flex h-[100svh] min-h-[34rem] flex-col overflow-hidden bg-[#00061d] motion-reduce:static">
      {children}
      <div aria-hidden className="hero-dim pointer-events-none absolute inset-0 z-20 bg-[#00061d]" />
    </section>
  );
}
