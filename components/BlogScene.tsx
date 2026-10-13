"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * The blog's stage. Behind the page, fixed to the screen, sits a deep-navy scene that does not scroll with the text: a very large
 * ghost of the mark and a pool of light. As the reader descends, the scene answers: the mark turns and drifts up, the light travels
 * down, and a thin gold rail on the edge fills. Scroll is never read from layout: the page height is measured only when the page
 * resizes, each frame writes transforms straight to the three or four elements that move (no custom property is inherited by the
 * cards), and nothing in the text column moves at its own speed, so fast scrolling stays steady. With reduced motion everything rests.
 */
export default function BlogScene({ children, label }: { children: ReactNode; label: string }) {
  const mark = useRef<SVGSVGElement>(null);
  const orb = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const hero = document.querySelector<HTMLElement>(".blog-hero-name");
    let raf = 0;
    let max = 1;
    let vh = window.innerHeight;
    let vw = window.innerWidth;
    let last = -1;
    const measure = () => {
      max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      vh = window.innerHeight;
      vw = window.innerWidth;
      last = -1;
      schedule();
    };
    const paint = () => {
      raf = 0;
      const y = window.scrollY;
      if (y === last) return;
      last = y;
      const bp = Math.min(1, Math.max(0, y / max));
      const bh = Math.min(1, Math.max(0, y / vh));
      if (mark.current) mark.current.style.transform = `translate3d(0, ${(-bp * 0.26 * vh).toFixed(1)}px, 0) rotate(${(bp * 9).toFixed(2)}deg)`;
      if (orb.current) orb.current.style.transform = `translate3d(0, ${(bp * 0.78 * vh).toFixed(1)}px, 0)`;
      if (rail.current) rail.current.style.transform = `scaleY(${bp.toFixed(4)})`;
      if (hero && vw >= 1024) hero.style.transform = `translate3d(${(bh * 0.05 * vw).toFixed(1)}px, 0, 0)`;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    // the page grows as cards and images arrive: re-measure then, not on every scroll
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    ro?.observe(document.body);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      ro?.disconnect();
      if (raf) cancelAnimationFrame(raf);
      if (hero) hero.style.transform = "";
    };
  }, []);

  return (
    <div className="blog-scene relative isolate bg-[#000d33] text-white">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[linear-gradient(180deg,#000d33_0%,#00124a_42%,#000f3d_72%,#000a2b_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(40,84,220,0.32),transparent_72%)]" />
        <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1.2px)] [background-size:34px_34px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_35%,#000,transparent_80%)]" />
        {/* the mark, very large and faint: it turns and drifts upward as the page is read (the same part of it stays off the edge) */}
        <svg
          ref={mark}
          viewBox="150 190 420 340"
          className="absolute end-[-12.8rem] top-[18vh] w-[70rem] max-w-none opacity-[0.07] will-change-transform"
          fill="#e0b35a"
        >
          <rect x="160" y="202" width="398" height="52" />
          <rect x="222" y="261" width="274" height="47" />
          <polygon points="264,315 320,315 320,455 264,517" />
          <polygon points="335,315 387,315 387,415 335,448" />
          <polygon points="403,315 450,315 450,400 403,409" />
        </svg>
        {/* a pool of gold light that travels down the screen with the reader */}
        <div ref={orb} className="absolute start-[8%] top-0 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(224,179,90,0.2),transparent)] will-change-transform" />
      </div>

      {/* reading rail on the screen's edge */}
      <div aria-hidden className="pointer-events-none fixed end-3 top-1/2 z-20 hidden h-40 -translate-y-1/2 flex-col items-center gap-3 lg:flex">
        <span className="h-full w-px bg-white/15">
          <span ref={rail} className="block h-full w-px origin-top scale-y-0 bg-[#e0b35a] will-change-transform" />
        </span>
        <span className="text-[10px] tracking-[0.3em] text-[#f6e2b3]/70 [writing-mode:vertical-rl]" dir="ltr">
          {label}
        </span>
      </div>

      {children}
    </div>
  );
}
