import Image from "next/image";
import type { ReactNode } from "react";
import GlassFrame from "@/components/GlassFrame";
import { blurProps } from "@/lib/blur";

/** Sign-in surface shared by the office system and the client portal: Riyadh under navy, one clear glass panel. */
export default function AuthShell({ title, sub, note, children }: { title: string; sub: string; note?: ReactNode; children: ReactNode }) {
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-5 py-10">
      <Image src="/brand/riyadh-kafd.jpg" {...blurProps("/brand/riyadh-kafd.jpg")} alt="" fill priority sizes="100vw" className="-z-20 object-cover" style={{ objectPosition: "center 40%" }} />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[#0c1f3a]/60 mix-blend-multiply" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(7,16,30,0.72)_0%,rgba(10,26,48,0.4)_45%,rgba(7,16,30,0.88)_100%)]" />
      <GlassFrame hero className="w-full max-w-md px-7 py-10 md:px-10 md:py-12">
        <div className="relative">
          <div className="text-center">
            <Image src="/brand/logo-lockup.png" alt="تركي النايف وشركاؤه" width={163} height={48} className="mx-auto h-14 w-auto" priority />
            <span aria-hidden className="mx-auto mt-5 block h-px w-20 bg-[linear-gradient(90deg,transparent,#f0d894,transparent)]" />
            <h1 className="font-display mt-5 text-2xl font-bold text-white">{title}</h1>
            <p className="mt-1.5 text-xs text-white/70">{sub}</p>
          </div>
          <div className="mt-8">{children}</div>
          {note && <div className="mt-7 text-center text-[11px] text-white/55">{note}</div>}
        </div>
      </GlassFrame>
    </main>
  );
}
