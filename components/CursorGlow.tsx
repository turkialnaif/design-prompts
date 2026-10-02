"use client";

import { useEffect, useRef } from "react";

/** A soft violet-amber glow that eases after the pointer while it is over any element marked data-glow. Decorative only; hidden on touch. */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let x = window.innerWidth / 2, y = window.innerHeight / 2, tx = x, ty = y, raf = 0;
    const tick = () => {
      x += (tx - x) * 0.14;
      y += (ty - y) * 0.14;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      el.dataset.on = (e.target as Element | null)?.closest?.("[data-glow]") ? "1" : "0";
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => (el.dataset.on = "0");
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={ref} aria-hidden className="cursor-glow" />;
}
