"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Mark, detectWebGL, newRig } from "./Mark";

/**
 * The reading companion for an article: a small gold mark in the corner that starts drawn apart and
 * is assembled by the reader's own progress down the page. At the end it is whole and lit.
 */
export default function Logo3DReader() {
  const rig = useRef(newRig());
  const [run, setRun] = useState(true);
  const [webgl] = useState(detectWebGL);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const r = rig.current;
    r.introAt = -10;
    r.spin = 0;
    r.scale = 1.7;
    r.y = -0.15;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const done = Math.min(1, p / 0.9);
      r.explode = reduce ? 0 : (1 - done) * 2.4;
      r.yaw = 0.35 + p * Math.PI * 2;
      r.dim = p > 0.97 ? 1 : 0;
      r.hl = [1, 1, 1];
      setRun(p > 0.01 || window.scrollY > 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  if (!webgl) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed bottom-5 right-5 z-30 hidden h-28 w-28 md:block">
      <Canvas frameloop={run ? "always" : "demand"} camera={{ position: [0, 0, 11], fov: 36 }} gl={{ alpha: true, antialias: true }} dpr={[1, 1.6]}>
        <Mark rig={rig} />
      </Canvas>
    </div>
  );
}
