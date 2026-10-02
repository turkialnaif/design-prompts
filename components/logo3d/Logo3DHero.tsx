"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Mark, detectWebGL, newRig } from "./Mark";

/** The hero's mark: it flies together once the intro is out of the way, then turns to follow the pointer and drifts with the scroll. */
export default function Logo3DHero() {
  const rig = useRef(newRig());
  const host = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(true);
  const [webgl] = useState(detectWebGL);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const r = rig.current;
    const wide = window.matchMedia("(min-width: 768px)").matches;
    const baseY = wide ? 0.7 : 0.95;
    const baseScale = wide ? 0.92 : 0.6;
    r.y = baseY;
    r.scale = baseScale;
    if (reduce) {
      r.introAt = -10;
      r.spin = 0;
    }
    const onMove = (e: PointerEvent) => {
      if (reduce) return;
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      r.yaw = 0.35 + nx * 1.3;
      r.pitch = 0.1 - ny * 0.45;
    };
    const onScroll = () => {
      if (reduce) return;
      const s = window.scrollY / window.innerHeight;
      r.y = baseY + s * 1.4;
      r.scale = Math.max(0.4, baseScale - s * 0.3);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(([e]) => setRun(e.isIntersecting));
    if (host.current) io.observe(host.current);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  if (!webgl) return null;
  return (
    <div ref={host} aria-hidden className="pointer-events-none absolute inset-0">
      <Canvas
        frameloop={run ? "always" : "never"}
        camera={{ position: [0, 0, 10.5], fov: 36 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.75]}
        onCreated={({ clock }) => {
          const r = rig.current;
          if (r.introAt === Infinity) {
            const intro = document.querySelector(".preloader");
            const covered = intro && getComputedStyle(intro).display !== "none";
            r.introAt = clock.elapsedTime + (covered ? 1.9 : 0.25);
          }
        }}
      >
        <Mark rig={rig} />
      </Canvas>
    </div>
  );
}
