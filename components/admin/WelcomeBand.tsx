import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

/** The opening card of a signed-in page: Riyadh under navy, a greeting, a few live figures, the usual next steps. */
export default function WelcomeBand({
  title,
  sub,
  chips = [],
  actions = [],
}: {
  title: string;
  sub: string;
  chips?: { label: string; value: ReactNode }[];
  actions?: { href: string; label: string }[];
}) {
  return (
    <section className="relative isolate mb-8 overflow-hidden rounded-3xl p-7 text-white ring-1 ring-[#d0a751]/40 md:p-10">
      <Image src="/brand/riyadh-kafd.jpg" alt="" fill sizes="(min-width: 1280px) 1200px, 100vw" className="-z-20 object-cover" style={{ objectPosition: "center 42%" }} />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[#0c1f3a]/70 mix-blend-multiply" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(7,16,30,0.9)_0%,rgba(10,26,48,0.55)_60%,rgba(7,16,30,0.78)_100%)]" />
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e6c988]">{sub}</p>
          <h1 className="font-display mt-2 text-3xl font-bold md:text-4xl">{title}</h1>
          <span aria-hidden className="mt-4 block h-px w-24 bg-[linear-gradient(90deg,#f0d894,transparent)]" />
          {chips.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2.5">
              {chips.map((c) => (
                <span key={c.label} className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur">
                  {c.label} <b className="ms-1 font-display text-[#f0d894]">{c.value}</b>
                </span>
              ))}
            </div>
          )}
        </div>
        {actions.length > 0 && (
          <div className="flex flex-wrap gap-2.5">
            {actions.map((a) => (
              <Link key={a.href} href={a.href} className="rounded-full bg-[linear-gradient(135deg,#f0d894,#cfa64e)] px-5 py-2.5 text-sm font-bold text-[#0a1420] shadow-[0_12px_26px_-14px_rgba(208,167,81,0.9)] transition hover:brightness-105">
                {a.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
