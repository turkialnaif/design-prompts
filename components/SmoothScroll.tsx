"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Slows and eases wheel scrolling so long pages read at a calmer pace. Not in the blog: its pages are long, full of photographs and have
 * a fixed animated stage, and there an eased, script-driven scroll stalls and judders when the wheel is spun fast. The blog uses the
 * browser's own scrolling.
 */
export default function SmoothScroll() {
  const path = usePathname() ?? "";
  const native = /^\/(en\/)?blog(\/|$)/.test(path);
  useEffect(() => {
    if (native || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.07, wheelMultiplier: 0.65, touchMultiplier: 1 });
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [native]);
  return null;
}
