import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { sectors } from "@/lib/sectors";

const copy = {
  ar: {
    title: "القطاعات التي نخدمها",
    eyebrow: "Sectors We Serve",
    lead: "نخدم الأفراد والشركات والمؤسسات والجهات الحكومية والجمعيات الخيرية والأوقاف في عشرين قطاعًا، ولكل قطاع صفحة تشرح مسائله القانونية وكيف نخدمه.",
    all: "كل القطاعات",
    allHref: "/sectors",
    base: "/sectors",
  },
  en: {
    title: "Sectors We Serve",
    eyebrow: "Clients",
    lead: "We serve individuals, companies, institutions, government entities, charities and endowments across twenty sectors; each has its own page on its legal matters and how we help.",
    all: "All sectors",
    allHref: "/en/sectors",
    base: "/en/sectors",
  },
};

/** The twenty sectors as a two-column list of links: a hairline between rows, the row filling with colour and nudging on hover. Each row is a real page. */
export default function WhoWeServe({ locale }: { locale: "ar" | "en" }) {
  const t = copy[locale];
  return (
    <section className="relative bg-white py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading title={t.title} eyebrow={t.eyebrow} lead={t.lead} tone="onLight" />
          </div>
        </Reveal>
        <ul className="mt-16 grid border-t border-[#00124a]/15 md:grid-cols-2 md:gap-x-16">
          {sectors.map((s, i) => (
            <li key={s.slug} className="border-b border-[#00124a]/15">
              <Reveal delay={(i % 2) * 60}>
                <Link href={`${t.base}/${s.slug}`} className="group relative flex items-center gap-4 overflow-hidden px-3 py-5 md:py-6">
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
        <div className="mt-12 text-center">
          <Link href={t.allHref} className="chamfer-btn inline-block bg-[#00124a] px-8 py-3.5 text-base font-normal text-white transition-colors hover:bg-[#012696]">{t.all}</Link>
        </div>
      </div>
    </section>
  );
}
