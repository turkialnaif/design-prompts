import Image from "next/image";
import type { ReactNode } from "react";
import { Logo3DHero } from "@/components/logo3d/lazy";

/**
 * The home hero. The city is left bright enough to read; a deep pool of navy sits exactly where the
 * gold mark hangs, so the mark glows out of it, with a beam of light from above, a gold pool of light
 * beneath it and a field of stars that thickens around it. Two slow orbits and a bracketed frame
 * complete it. The firm name is the page's real h1 (visually hidden: the mark is the headline).
 */
export default function HeroStage({
  photo,
  blurDataURL,
  body,
  actions,
  h1,
  cue,
}: {
  photo: string;
  blurDataURL?: string;
  body: string;
  actions: ReactNode;
  h1: string;
  cue: string;
}) {
  return (
    <>
      <div aria-hidden className="absolute inset-0 z-0 overflow-hidden bg-[#00061d]">
        <Image src={photo} {...(blurDataURL ? { placeholder: "blur" as const, blurDataURL } : {})} alt="" fill priority sizes="100vw" className="hero-kenburns object-cover" style={{ objectPosition: "center 40%" }} />
      </div>
      <div aria-hidden className="absolute inset-0 z-[1] bg-[#00124a]/45 mix-blend-multiply" />
      <div aria-hidden className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(0,6,29,0.7)_0%,rgba(0,18,74,0.12)_38%,rgba(0,6,29,0.55)_70%,rgba(0,6,29,0.95)_100%)]" />
      {/* the dark pool behind the mark */}
      <div aria-hidden className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_34%_44%_at_50%_38%,rgba(0,6,29,0.94)_0%,rgba(0,6,29,0.78)_42%,rgba(0,6,29,0.25)_75%,transparent_100%)] max-md:bg-[radial-gradient(ellipse_70%_36%_at_50%_30%,rgba(0,6,29,0.94)_0%,rgba(0,6,29,0.7)_50%,transparent_100%)]" />
      {/* beam from above and gold pool below */}
      <div aria-hidden className="absolute inset-x-0 top-0 z-[1] h-[60%] bg-[conic-gradient(from_180deg_at_50%_-8%,transparent_0deg,transparent_160deg,rgba(246,226,179,0.16)_176deg,rgba(246,226,179,0.22)_180deg,rgba(246,226,179,0.16)_184deg,transparent_200deg,transparent_360deg)] [mask-image:linear-gradient(to_bottom,#000,transparent)]" />
      <div aria-hidden className="absolute start-1/2 top-[63%] z-[1] round-keep h-24 w-[min(70vw,34rem)] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(224,179,90,0.34),transparent_70%)] blur-sm rtl:translate-x-1/2 max-md:top-[52%]" />

      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute start-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2 max-md:top-[30%]">
          <div className="hero-ring-a round-keep h-[min(82vw,38rem)] w-[min(82vw,38rem)] border border-[#e0b35a]/20 [border-style:dashed]" />
        </div>
        <div className="absolute start-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2 max-md:top-[30%]">
          <div className="hero-ring-b round-keep h-[min(60vw,27rem)] w-[min(60vw,27rem)] border border-[#f6e2b3]/15" />
        </div>
      </div>
      <div aria-hidden className="frame pointer-events-none absolute inset-3 z-[2] border border-[#e0b35a]/30 md:inset-6" />

      <div className="absolute inset-0 z-[2]">
        <Logo3DHero />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-end px-5 pb-16 pt-28 md:px-10 md:pb-20">
        <div className="hero-in relative w-full max-w-3xl text-center">
          <h1 className="sr-only">{h1}</h1>
          <p className="text-lg font-light leading-9 text-white/90 [text-shadow:0_2px_16px_rgba(0,6,29,0.9)] md:text-2xl md:leading-[2.6rem]">{body}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">{actions}</div>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none absolute bottom-5 start-1/2 z-10 hidden -translate-x-1/2 rtl:translate-x-1/2 md:block" title={cue}>
        <span className="relative block h-8 w-px overflow-hidden bg-white/25">
          <span className="hero-cue absolute inset-0 bg-[#f6e2b3]" />
        </span>
      </div>
    </>
  );
}
