import { blurProps } from "@/lib/blur";
import Image from "next/image";
import type { ReactNode } from "react";
import GlassFrame from "@/components/GlassFrame";

/** The opening of every inner page: a still Riyadh photograph, a navy veil and the site's clear glass. */
export default function PageHero({
  children,
  photo = "/brand/riyadh-skyline.jpg",
  focus = "center 55%",
  wide = false,
}: {
  children: ReactNode;
  photo?: string;
  focus?: string;
  wide?: boolean;
}) {
  return (
    <section className="relative isolate overflow-hidden px-5 pb-14 pt-32 md:px-10 md:pb-24 md:pt-44">
      <Image src={photo} {...blurProps(photo)} alt="" fill priority sizes="100vw" className="-z-20 object-cover" style={{ objectPosition: focus }} />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,18,32,0.62)_0%,rgba(8,18,32,0.4)_50%,rgba(8,18,32,0.72)_100%)]" />
      <GlassFrame tint className={`mx-auto ${wide ? "max-w-6xl" : "max-w-4xl"}`}>
        {children}
      </GlassFrame>
    </section>
  );
}
