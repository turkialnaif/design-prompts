"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Holds the hero in place for three-quarters of a screen of scrolling while it lets go: it drifts up,
 * shrinks and fades into the navy behind it as the gold mark inside it comes apart (see Logo3DHero).
 * With reduced motion the hero is an ordinary, unpinned block.
 */
export default function HeroPin({ children }: { children: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = outer.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      el.style.setProperty("--hp", String(Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.75)))));
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
    <div ref={outer} className="relative z-10 mb-[-100svh] h-[175svh] motion-reduce:mb-0 motion-reduce:h-auto">
      <div className="hero-pin sticky top-0 h-[100svh] bg-[#00061d] motion-reduce:static">{children}</div>
    </div>
  );
}
