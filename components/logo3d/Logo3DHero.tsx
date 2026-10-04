"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Mark, detectWebGL, newRig } from "./Mark";

const FOV = 36;
const DIST = 10.5;
const HALF_H = Math.tan((FOV / 2) * (Math.PI / 180)) * DIST;

/**
 * The hero's mark. It flies together once the intro is out of the way and then waits, dark and still,
 * on the side opposite the text. The first movement of the pointer (or a touch, or a scroll) wakes it:
 * the stars come out around it and it lights up (see HeroScroll, which fires `hero-wake`). From then on it
 * turns to follow the pointer, and drifts up with the scroll.
 */
export default function Logo3DHero() {
  const rig = useRef(newRig());
  const [run, setRun] = useState(true);
  const [webgl] = useState(detectWebGL);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const r = rig.current;
    let baseX = 0;
    let baseY = 0;
    let baseScale = 1;
    const place = () => {
      const side = window.matchMedia("(min-width: 1024px)").matches;
      if (side) {
        const halfW = HALF_H * (window.innerWidth / window.innerHeight);
        const rtl = getComputedStyle(document.documentElement).direction === "rtl";
        baseX = (rtl ? -1 : 1) * halfW * 0.5;
        baseY = 0.25;
        baseScale = 1.05;
      } else {
        baseX = 0;
        baseY = 1.75;
        baseScale = 0.5;
      }
      r.x = baseX;
      r.sx = baseX;
      r.scale = baseScale;
      r.y = baseY;
      r.sy = baseY;
    };
    place();
    r.spin = 0;
    r.yaw = 0.35;
    r.pitch = 0.1;
    r.introDur = 1.9;
    r.awake = reduce || document.querySelector('[data-awake="1"]') ? 1 : 0;
    if (reduce) r.introAt = -10;

    const wake = () => {
      r.awake = 1;
    };
    const onMove = (e: PointerEvent) => {
      if (reduce || r.awake < 1) return;
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      r.yaw = 0.35 + nx * 1.5;
      r.pitch = 0.1 - ny * 0.5;
    };
    const onScroll = () => {
      if (reduce) return;
      const s = window.scrollY / window.innerHeight;
      const leave = Math.min(1, s);
      r.y = baseY + leave * 0.8;
      r.sy = r.y;
      r.scale = baseScale + leave * 0.12;
      setRun(s < 1.15);
    };
    window.addEventListener("hero-wake", wake);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("hero-wake", wake);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", place);
    };
  }, []);

  if (!webgl) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <Canvas
        frameloop={run ? "always" : "never"}
        camera={{ position: [0, 0, DIST], fov: FOV }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.75]}
        onCreated={({ clock }) => {
          const r = rig.current;
          if (r.introAt === Infinity) {
            const intro = document.querySelector(".preloader");
            const covered = intro && getComputedStyle(intro).display !== "none";
            r.introAt = clock.elapsedTime + (covered ? 1.0 : 0.2);
          }
        }}
      >
        <Mark rig={rig} />
      </Canvas>
    </div>
  );
}
