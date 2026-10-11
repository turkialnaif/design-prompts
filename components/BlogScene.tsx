"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * The blog's stage. Behind the page, fixed to the screen, sits a deep-navy scene that does not scroll with the text: three gold
 * pillars (the mark's columns), a very large ghost of the mark and a pool of light. As the reader descends, the scene answers:
 * the mark turns and drifts up, the light travels down, and a thin gold rail on the edge fills. The same two numbers feed the
 * page itself (`--bp` for the whole page, `--bh` for the first screen) so parts of the hero and every other card column move at
 * their own speed. Only transform and opacity change. With reduced motion the numbers stay at zero and everything rests.
 */
export default function BlogScene({ children, label }: { children: ReactNode; label: string }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = root.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const y = window.scrollY;
      node.style.setProperty("--bp", Math.min(1, Math.max(0, y / max)).toFixed(4));
      node.style.setProperty("--bh", Math.min(1, Math.max(0, y / window.innerHeight)).toFixed(4));
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
    <div ref={root} className="blog-scene relative isolate bg-[#000d33] text-white">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[linear-gradient(180deg,#000d33_0%,#00124a_42%,#000f3d_72%,#000a2b_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(40,84,220,0.32),transparent_72%)]" />
        <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1.2px)] [background-size:34px_34px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_35%,#000,transparent_80%)]" />
        {/* three gold pillars, fixed while the text moves past them */}
        {["14%", "50%", "86%"].map((x) => (
          <span key={x} className="absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-[#e0b35a]/25 to-transparent" style={{ left: x }} />
        ))}
        {/* the mark, very large and faint: it turns and drifts upward as the page is read */}
        <svg
          viewBox="150 190 420 340"
          className="blog-ghost-mark absolute end-[-8rem] top-[18vh] w-[44rem] max-w-none opacity-[0.07]"
          fill="#e0b35a"
        >
          <rect x="160" y="202" width="398" height="52" />
          <rect x="222" y="261" width="274" height="47" />
          <polygon points="264,315 320,315 320,455 264,517" />
          <polygon points="335,315 387,315 387,415 335,448" />
          <polygon points="403,315 450,315 450,400 403,409" />
        </svg>
        {/* a pool of gold light that travels down the screen with the reader */}
        <div className="blog-orb absolute start-[8%] top-0 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(224,179,90,0.2),transparent)]" />
      </div>

      {/* reading rail on the screen's edge */}
      <div aria-hidden className="pointer-events-none fixed end-3 top-1/2 z-20 hidden h-40 -translate-y-1/2 flex-col items-center gap-3 lg:flex">
        <span className="h-full w-px bg-white/15">
          <span className="blog-rail block w-px bg-[#e0b35a]" />
        </span>
        <span className="text-[10px] tracking-[0.3em] text-[#f6e2b3]/70 [writing-mode:vertical-rl]" dir="ltr">
          {label}
        </span>
      </div>

      {children}
    </div>
  );
}
