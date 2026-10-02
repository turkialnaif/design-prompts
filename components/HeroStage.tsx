import Image from "next/image";
import type { ReactNode } from "react";
import { Logo3DHero } from "@/components/logo3d/lazy";

/**
 * The home hero: one still Riyadh photograph under a navy veil, the firm's 3D gold mark floating
 * in front of it, a single sentence and the two actions. The firm name is the page's real h1.
 */
export default function HeroStage({
  photo,
  blurDataURL,
  body,
  actions,
  h1,
}: {
  photo: string;
  blurDataURL?: string;
  body: string;
  actions: ReactNode;
  h1: string;
}) {
  return (
    <>
      <div aria-hidden className="absolute inset-0 z-0 bg-[#00061d]">
        <Image src={photo} {...(blurDataURL ? { placeholder: "blur" as const, blurDataURL } : {})} alt="" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: "center 40%" }} />
      </div>
      <div aria-hidden className="absolute inset-0 z-[1] bg-[#00124a]/55 mix-blend-multiply" />
      <div aria-hidden className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(0,6,29,0.7)_0%,rgba(0,18,74,0.3)_40%,rgba(0,6,29,0.88)_100%)]" />
      <div aria-hidden className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_70%_60%_at_50%_38%,rgba(155,136,215,0.28),transparent_70%)]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 z-[1] h-44 bg-[linear-gradient(to_bottom,transparent,#00061d)]" />

      <div className="absolute inset-0 z-[2]">
        <Logo3DHero />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-end px-4 pb-28 pt-28 md:px-10 md:pb-32">
        <div className="hero-in relative w-full max-w-3xl text-center">
          <h1 className="sr-only">{h1}</h1>
          <span aria-hidden className="mx-auto block h-px w-24 bg-[linear-gradient(90deg,transparent,#f6e2b3,transparent)]" />
          <p className="mt-5 text-base font-light leading-9 text-white/90 [text-shadow:0_2px_16px_rgba(0,6,29,0.8)] md:text-xl md:leading-10">{body}</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">{actions}</div>
        </div>
      </div>
    </>
  );
}
