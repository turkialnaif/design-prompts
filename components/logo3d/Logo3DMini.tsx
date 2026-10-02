"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Mark, detectWebGL, newRig } from "./Mark";

/** A small turning mark for the corner of inner-page heroes. Follows the pointer from anywhere on the page. */
export default function Logo3DMini() {
  const rig = useRef(newRig());
  const host = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(true);
  const [webgl] = useState(detectWebGL);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const r = rig.current;
    r.spin = reduce ? 0 : 0.42;
    r.scale = 1.05;
    const onMove = (e: PointerEvent) => {
      if (reduce) return;
      r.pitch = 0.1 - (e.clientY / window.innerHeight - 0.5) * 0.5;
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
        camera={{ position: [0, 0, 11], fov: 36 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
        onCreated={({ clock }) => {
          rig.current.introAt = clock.elapsedTime + 0.2;
        }}
      >
        <Mark rig={rig} />
      </Canvas>
    </div>
  );
}
