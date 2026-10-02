"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/** The fixed photograph of Riyadh behind the home page. Scrolling drives --p (0..1): the picture slowly zooms and drifts. */
export default function HomeBackdrop({ photo = "/brand/riyadh-kafd.jpg" }: { photo?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.style.setProperty("--p", String(max > 0 ? Math.min(1, window.scrollY / max) : 0));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div ref={ref} aria-hidden className="home-backdrop">
      <Image src={photo} alt="" fill sizes="100vw" quality={75} className="object-cover" style={{ objectPosition: "center 45%" }} />
    </div>
  );
}
