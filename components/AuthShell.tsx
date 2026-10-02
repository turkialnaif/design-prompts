import Image from "next/image";
import type { ReactNode } from "react";
import { NavyField } from "@/components/ui";

/** Sign-in surface shared by the office system and the client portal: the identity's navy field and one chamfered glass panel. */
export default function AuthShell({ title, sub, note, children }: { title: string; sub: string; note?: ReactNode; children: ReactNode }) {
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#00061d] px-5 py-10">
      <NavyField />
      <div className="chamfer-lg w-full max-w-md border border-white/10 bg-white/[0.05] px-7 py-10 backdrop-blur-xl md:px-10 md:py-12">
        <div className="text-center">
          <Image src="/brand/logo-lockup.png" alt="تركي النايف وشركاؤه" width={163} height={48} className="mx-auto h-14 w-auto" priority />
          <h1 className="font-display grad-text mt-6 text-3xl">{title}</h1>
          <p className="mt-2 text-sm font-light text-white/70">{sub}</p>
        </div>
        <div className="mt-8">{children}</div>
        {note && <div className="mt-7 text-center text-[11px] text-white/55">{note}</div>}
      </div>
    </main>
  );
}
