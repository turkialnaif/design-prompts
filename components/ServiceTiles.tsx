import { blurProps } from "@/lib/blur";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export type ServiceTile = { href: string; title: string; titleEn: string; label: string; photo: string };

/** Wide photographic tiles, two per row: number, title and stage over a navy fade; each links to its own service page. */
export default function ServiceTiles({ items, cta }: { items: ServiceTile[]; cta: string }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((s, i) => (
        <Reveal key={s.href + s.title} delay={(i % 2) * 90}>
          <Link
            href={s.href}
            className="group relative isolate flex h-64 flex-col justify-end overflow-hidden rounded-3xl bg-ink p-6 text-white ring-1 ring-white/20 transition-shadow duration-500 hover:ring-2 hover:ring-gold md:h-72"
          >
            <Image
              src={s.photo}
              {...blurProps(s.photo)}
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="-z-20 object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
            />
            <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,18,32,0.05)_0%,rgba(8,18,32,0.35)_40%,rgba(8,18,32,0.93)_100%)]" />

            <span className="absolute end-6 top-5 font-display text-3xl font-extrabold tracking-wider text-white/85">{String(i + 1).padStart(2, "0")}</span>
            <div className="text-start">
              <span className="text-xs font-semibold text-[#e6c988]">{s.label}</span>
              <h3 className="font-display mt-1 text-2xl font-bold leading-9">{s.title}</h3>
              <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">{s.titleEn}</p>
              <span className="mt-3 inline-block translate-y-1 text-sm font-semibold text-[#f0d894] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">{cta}</span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
