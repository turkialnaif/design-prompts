import { blurProps } from "@/lib/blur";
import Image from "next/image";
import type { ReactNode } from "react";
import GlassFrame from "@/components/GlassFrame";
import { Logo3DMini } from "@/components/logo3d/lazy";

/** The opening of every inner page: a still Riyadh photograph, a navy veil and the site's clear glass. */
export default function PageHero({
  children,
  photo = "/brand/riyadh-skyline.jpg",
  focus = "center 55%",
  wide = false,
  mark = true,
}: {
  children: ReactNode;
  photo?: string;
  focus?: string;
  wide?: boolean;
  mark?: boolean;
}) {
  return (
    <section data-glow className="relative isolate overflow-hidden px-5 pb-14 pt-32 md:px-10 md:pb-24 md:pt-44">
      <Image src={photo} {...blurProps(photo)} alt="" fill priority sizes="100vw" className="-z-20 object-cover" style={{ objectPosition: focus }} />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,18,32,0.62)_0%,rgba(8,18,32,0.4)_50%,rgba(8,18,32,0.72)_100%)]" />
      <GlassFrame tint className={`mx-auto ${wide ? "max-w-6xl" : "max-w-4xl"}`}>
        {mark && (
        <div aria-hidden className="pointer-events-none absolute -top-8 end-1 z-0 hidden h-52 w-52 sm:block md:-top-12 md:end-6 md:h-72 md:w-72">
          <Logo3DMini />
        </div>
        )}
        {children}
      </GlassFrame>
    </section>
  );
}
