"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Mark, detectWebGL, newRig } from "./Mark";

const TAU = Math.PI * 2;
const FRONT = 0.35;
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const smooth = (x: number) => x * x * (3 - 2 * x);

/**
 * The reading companion for an article: the whole gold mark, never broken apart, riding the right edge
 * of the screen. It slides down the edge in step with how far through the article the reader is, turns as the
 * page turns, leans into the speed of the scroll and sways a little. It also reads along with the text:
 *  - each section lights one part of the mark (top slab, second slab, legs, then round again) and, as a
 *    new heading crosses the reading line, the mark nods and flares;
 *  - it looks towards the pointer, so hovering a paragraph turns the mark to it;
 *  - selecting text makes it flash, as if it had highlighted the passage itself.
 * When the reader reaches the end it turns to face front, lights up fully and comes to rest on the author box
 * (`#article-end`), then goes away with the page.
 */
export default function Logo3DReader() {
  const rig = useRef(newRig());
  const box = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  const [webgl] = useState(detectWebGL);

  useEffect(() => {
    const el = box.current;
    if (!el || !webgl) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const r = rig.current;
    r.introAt = -10;
    r.spin = 0;
    r.scale = 1.5;
    r.y = -0.1;
    r.explode = 0;
    r.hl = [1, 1, 1];

    let raf = 0;
    let idle = 0;
    let lastY = window.scrollY;
    let vel = 0;
    let cur = Number.NaN;
    let section = -1;
    let flare = 0; // 0…1, decays every frame: set when a new heading is reached or text is selected
    let nod = 0;
    let lookX = 0; // pointer, -1…1, relative to the mark's side of the screen
    let lookY = 0;
    const heads = [...document.querySelectorAll("article h2")];

    const frame = () => {
      raf = 0;
      const sy = window.scrollY;
      vel += (sy - lastY - vel) * 0.18;
      lastY = sy;

      const size = el.offsetHeight;
      const vh = window.innerHeight;
      const art = document.querySelector("article");
      const end = document.getElementById("article-end");
      const topY = 108;
      const bottomY = vh - size - 24;

      // how far through the article the reader is: 0 as it enters the lower half, 1 once its end has been read
      let p = 0;
      if (art) {
        const a = art.getBoundingClientRect();
        p = clamp((vh * 0.55 - a.top) / Math.max(1, a.height - vh * 0.1), 0, 1);
      }
      let target = topY + (bottomY - topY) * smooth(p);
      // come to rest on the author box instead of covering what follows it
      if (end) target = Math.min(target, end.getBoundingClientRect().top - size + 30);
      if (Number.isNaN(cur)) cur = target;
      cur += (target - cur) * 0.14;

      // the section being read: the last heading above the reading line
      let now = -1;
      heads.forEach((h, i) => {
        if (h.getBoundingClientRect().top < vh * 0.4) now = i;
      });
      if (now !== section) {
        if (section !== -1 && now > section) {
          flare = 1;
          nod = 1;
        }
        section = now;
      }
      flare *= 0.94;
      nod *= 0.92;

      const dock = smooth(clamp((p - 0.9) / 0.1, 0, 1));
      const turn = FRONT + sy * 0.0026;
      const faced = FRONT + Math.round((turn - FRONT) / TAU) * TAU;
      const look = reduce ? 0 : (1 - dock) * -lookX * 0.9;
      r.yaw = reduce ? FRONT : turn + (faced - turn) * dock + look;
      r.pitch = reduce ? 0.12 : 0.12 + clamp(vel * 0.01, -0.5, 0.5) + lookY * 0.35 * (1 - dock) + nod * 0.35;
      // the part of the mark matching the section being read glows; at the end every part does
      const g = section < 0 ? -1 : section % 3;
      for (let k = 0; k < 3; k++) r.hl[k] = dock > 0.6 || g < 0 ? 1 : k === g ? 1.2 + flare : 0.28;
      r.dim = dock > 0.6 ? 1 : g < 0 ? 0 : 1;
      r.scale = 1.5 + flare * 0.25;

      const sway = reduce ? 0 : Math.sin(sy * 0.0034) * 12 * (1 - dock);
      el.style.transform = `translate3d(${sway.toFixed(1)}px, ${cur.toFixed(1)}px, 0)`;
      el.style.opacity = String(clamp((sy - 160) / 240, 0, 1));

      if (Math.abs(vel) > 0.05 || Math.abs(target - cur) > 0.4 || flare > 0.02 || nod > 0.02) raf = requestAnimationFrame(frame);
    };
    const wakeUp = () => {
      setRun(true);
      window.clearTimeout(idle);
      idle = window.setTimeout(() => setRun(false), 1600);
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onMove = (e: PointerEvent) => {
      const box = el.getBoundingClientRect();
      lookX = clamp((e.clientX - (box.left + box.width / 2)) / (window.innerWidth * 0.5), -1, 1);
      lookY = clamp((e.clientY - (box.top + box.height / 2)) / (window.innerHeight * 0.5), -1, 1);
      wakeUp();
    };
    const onSelect = () => {
      const sel = window.getSelection();
      if (sel && !sel.isCollapsed && sel.toString().trim().length > 3) {
        flare = 1;
        wakeUp();
      }
    };
    const onScroll = wakeUp;
    raf = requestAnimationFrame(frame);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    if (!reduce) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("selectionchange", onSelect);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("selectionchange", onSelect);
      window.clearTimeout(idle);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [webgl]);

  if (!webgl) return null;
  return (
    <div
      ref={box}
      aria-hidden
      className="pointer-events-none fixed right-4 top-0 z-30 hidden aspect-square w-[clamp(5.5rem,calc((100vw-72rem)/2),9rem)] opacity-0 md:block"
    >
      <Canvas frameloop={run ? "always" : "demand"} camera={{ position: [0, 0, 11], fov: 36 }} gl={{ alpha: true, antialias: true }} dpr={[1, 1.6]}>
        <Mark rig={rig} />
      </Canvas>
    </div>
  );
}
