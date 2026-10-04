"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * The hero is pinned to the top of the page while the rest of the home page slides up over it like a
 * curtain. As that happens `--hp` (0 → 1, one screen of scrolling) rises: the hero eases back and
 * darkens (see .hero-curtain in globals.css).
 *
 * It also runs the hero's two moods. The page opens dark and still, the headline drawn only in outline.
 * It wakes on a deliberate downward gesture: the pointer travelling down the screen (an upward move
 * undoes it), a scroll or wheel turn downwards, or a down/page-down key. Any of them sets `data-awake="1"`
 * (the CSS lights the stage and fills the headline) and fires `hero-wake` for the 3D mark. From then on the
 * pointer's position, smoothed, is published as `--px`/`--py` (-1…1) so the copy can lean with the mark.
 * Reduced motion starts awake and never moves.
 */
export default function HeroScroll({ children }: { children: ReactNode }) {
  const el = useRef<HTMLElement>(null);
  useEffect(() => {
    const node = el.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wake = () => {
      if (node.dataset.awake === "1") return;
      node.dataset.awake = "1";
      window.dispatchEvent(new Event("hero-wake"));
    };
    if (reduce) {
      wake();
      return;
    }
    let raf = 0;
    let pxT = 0;
    let pyT = 0;
    let px = 0;
    let py = 0;
    let loop = 0;
    const update = () => {
      raf = 0;
      const p = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
      node.style.setProperty("--hp", String(p));
      node.style.visibility = p >= 1 ? "hidden" : "visible";
    };
    const tick = () => {
      px += (pxT - px) * 0.08;
      py += (pyT - py) * 0.08;
      node.style.setProperty("--px", px.toFixed(4));
      node.style.setProperty("--py", py.toFixed(4));
      loop = Math.abs(pxT - px) + Math.abs(pyT - py) > 0.002 ? requestAnimationFrame(tick) : 0;
    };
    let lastY = -1;
    let down = 0;
    const onMove = (e: PointerEvent) => {
      if (lastY >= 0) down = Math.max(0, Math.min(140, down + (e.clientY - lastY)));
      lastY = e.clientY;
      if (down > 70) wake();
      pxT = (e.clientX / window.innerWidth - 0.5) * 2;
      pyT = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!loop) loop = requestAnimationFrame(tick);
    };
    let lastScroll = window.scrollY;
    const onScroll = () => {
      if (window.scrollY > lastScroll) wake();
      lastScroll = window.scrollY;
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) wake();
    };
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " ", "End"].includes(e.key)) wake();
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      if (raf) cancelAnimationFrame(raf);
      if (loop) cancelAnimationFrame(loop);
    };
  }, []);
  return (
    <section ref={el} className="hero-curtain sticky top-0 z-0 isolate flex h-[100svh] min-h-[34rem] flex-col overflow-hidden bg-[#00030f] motion-reduce:static">
      {children}
      <div aria-hidden className="hero-dim pointer-events-none absolute inset-0 z-20 bg-[#00061d]" />
    </section>
  );
}
