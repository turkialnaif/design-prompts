"use client";

import Image from "next/image";

/**
 * The firm's mark on a clear glass disc, floating beside the chat button on every page.
 * Every ten seconds a band of light crosses the disc and the mark catches it. Pressing it returns to the top.
 */
export default function HeroSeal({ label }: { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="hero-float round-keep relative flex h-14 w-14 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-white/80 bg-[linear-gradient(140deg,rgba(14,28,46,0.72),rgba(14,28,46,0.5))] shadow-[inset_0_1.5px_0_rgba(255,255,255,0.55),0_12px_26px_-10px_rgba(0,0,0,0.6)] backdrop-blur-md md:h-16 md:w-16"
    >
      <span aria-hidden className="seal-glint pointer-events-none absolute inset-0" />
      <Image
        src="/brand/logo-mark.png"
        alt=""
        width={40}
        height={32}
        className="seal-mark h-6 w-auto md:h-7"
        style={{ filter: "brightness(1.35) drop-shadow(0 1px 0 rgba(255,255,255,0.55)) drop-shadow(0 -1px 0 rgba(60,40,5,0.45)) drop-shadow(0 6px 10px rgba(0,0,0,0.45))" }}
      />
    </button>
  );
}
