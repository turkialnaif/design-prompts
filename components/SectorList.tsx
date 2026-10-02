import Link from "next/link";
import Reveal from "@/components/Reveal";
import { sectors } from "@/lib/sectors";

/** The twenty sectors as a two-column list of links: a hairline between rows, the row filling with colour and nudging on hover. Each row is a real page. */
export default function SectorList({ locale }: { locale: "ar" | "en" }) {
  const base = locale === "ar" ? "/sectors" : "/en/sectors";
  return (
    <ul className="grid border-t border-[#00124a]/15 md:grid-cols-2 md:gap-x-16">
      {sectors.map((s, i) => (
        <li key={s.slug} className="border-b border-[#00124a]/15">
          <Reveal delay={(i % 2) * 60}>
            <Link href={`${base}/${s.slug}`} className="group relative flex items-center gap-4 overflow-hidden px-3 py-5 md:py-6">
              <span aria-hidden className="absolute inset-0 origin-[100%_50%] scale-x-0 bg-[linear-gradient(to_left,rgba(224,179,90,0.16),rgba(246,226,179,0.14),rgba(224,179,90,0.12))] transition-transform duration-500 ease-out group-hover:scale-x-100" />
              <span className="relative font-display text-xs tracking-widest text-[#00124a]/45" dir="ltr">{String(i + 1).padStart(2, "0")}</span>
              <span className="relative font-display flex-1 text-2xl font-light text-[#00124a] transition-transform duration-500 group-hover:translate-x-[var(--nudge)] md:text-3xl" style={{ ["--nudge" as string]: locale === "ar" ? "-12px" : "12px" }}>
                {s[locale].title}
              </span>
              <span aria-hidden className="relative grid h-8 w-8 shrink-0 grid-cols-3 gap-[3px] p-1.5 opacity-60 transition-opacity duration-300 group-hover:opacity-100">
                {Array.from({ length: 9 }).map((_, k) => (
                  <i key={k} className={`bg-[#00124a] ${[0, 2, 4, 6, 8].includes(k) ? "" : "opacity-25"}`} />
                ))}
              </span>
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
