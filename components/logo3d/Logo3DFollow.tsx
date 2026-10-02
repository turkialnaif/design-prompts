"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Mark, detectWebGL, newRig, startIntro } from "./Mark";

/** A larger mark for page heroes that are not the home page: it flies together once, then turns after the pointer anywhere on the page. */
export default function Logo3DFollow() {
  const rig = useRef(newRig());
  const host = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(true);
  const [webgl] = useState(detectWebGL);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const r = rig.current;
    r.spin = 0.05;
    r.scale = 1.05;
    if (reduce) r.introAt = -10;
    const onMove = (e: PointerEvent) => {
      if (reduce) return;
      r.yaw = 0.35 + (e.clientX / window.innerWidth - 0.5) * 1.6;
      r.pitch = 0.1 - (e.clientY / window.innerHeight - 0.5) * 0.55;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    const io = new IntersectionObserver(([e]) => setRun(e.isIntersecting));
    if (host.current) io.observe(host.current);
    return () => {
      window.removeEventListener("pointermove", onMove);
      io.disconnect();
    };
  }, []);

  if (!webgl) return null;
  return (
    <div ref={host} aria-hidden className="pointer-events-none absolute inset-0">
      <Canvas
        frameloop={run ? "always" : "never"}
        camera={{ position: [0, 0, 10.5], fov: 36 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.6]}
        onCreated={({ clock }) => {
          if (rig.current.introAt === Infinity) startIntro(rig, clock.elapsedTime, 0.3);
        }}
      >
        <Mark rig={rig} />
      </Canvas>
    </div>
  );
}
