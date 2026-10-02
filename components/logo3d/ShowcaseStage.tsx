"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState, type MutableRefObject } from "react";
import { Mark, detectWebGL, type RigState } from "./Mark";

/** The WebGL half of the scroll-pinned showcase; the section component writes targets into `rig`. */
export default function ShowcaseStage({ rig }: { rig: MutableRefObject<RigState> }) {
  const host = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  const [ok] = useState(() => detectWebGL() && !window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setRun(e.isIntersecting), { rootMargin: "20% 0px" });
    if (host.current) io.observe(host.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={host} aria-hidden className="pointer-events-none absolute inset-0">
      {ok && (
        <Canvas
          frameloop={run ? "always" : "never"}
          camera={{ position: [0, 0, 10.5], fov: 36 }}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          dpr={[1, 1.75]}
        >
          <Mark rig={rig} />
        </Canvas>
      )}
    </div>
  );
}
