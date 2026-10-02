import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const copy = {
  ar: {
    title: "من نخدم",
    eyebrow: "Who We Serve",
    lead: "نقود التأثير القانوني ونصنع أثرًا في تقاطع الأعمال والحوكمة والابتكار.",
    items: ["الأفراد", "الشركات", "المؤسسات", "الجهات الحكومية", "الجمعيات الخيرية", "الأوقاف"],
    cta: "ابدأ معنا",
    href: "/contact",
  },
  en: {
    title: "Who We Serve",
    eyebrow: "Clients",
    lead: "We lead legal impact and build results where business, governance and innovation meet.",
    items: ["Individuals", "Companies", "Institutions", "Government entities", "Charitable associations", "Endowments (Awqaf)"],
    cta: "Start with us",
    href: "/en/contact",
  },
};

/** The six client groups as one tall list: a hairline between rows, the row filling with colour and its arrow sliding on hover. */
export default function WhoWeServe({ locale }: { locale: "ar" | "en" }) {
  const t = copy[locale];
  return (
    <section className="relative bg-white py-24 md:py-36">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-[0.9fr_1.4fr] md:gap-20">
        <Reveal>
          <div className="md:sticky md:top-32">
            <SectionHeading title={t.title} eyebrow={t.eyebrow} tone="onLight" align="start" size="xl" />
            <p className="mt-6 max-w-sm text-base font-light leading-8 text-ink-soft">{t.lead}</p>
          </div>
        </Reveal>
        <ul className="border-t border-[#00124a]/15">
          {t.items.map((item, i) => (
            <Reveal key={item} delay={i * 50}>
              <li className="border-b border-[#00124a]/15">
                <Link href={t.href} className="group relative flex items-center gap-5 overflow-hidden px-3 py-6 md:py-8">
                  <span aria-hidden className="absolute inset-0 -z-0 origin-[100%_50%] scale-x-0 bg-[linear-gradient(to_left,rgba(155,136,215,0.16),rgba(243,166,182,0.14),rgba(244,147,44,0.12))] transition-transform duration-500 ease-out group-hover:scale-x-100" />
                  <span className="relative font-display text-sm tracking-widest text-[#00124a]/45" dir="ltr">{String(i + 1).padStart(2, "0")}</span>
                  <span className="relative font-display flex-1 text-3xl font-light text-[#00124a] transition-transform duration-500 group-hover:translate-x-[var(--nudge)] md:text-5xl" style={{ ["--nudge" as string]: locale === "ar" ? "-14px" : "14px" }}>
                    {item}
                  </span>
                  <span className="relative text-sm font-normal text-[#806223] opacity-0 transition-opacity duration-300 group-hover:opacity-100">{t.cta}</span>
                  <span aria-hidden className="relative grid h-9 w-9 shrink-0 grid-cols-3 gap-[3px] p-2 opacity-60 transition-all duration-300 group-hover:opacity-100">
                    {Array.from({ length: 9 }).map((_, k) => (
                      <i key={k} className={`bg-[#00124a] ${[0, 2, 4, 6, 8].includes(k) ? "" : "opacity-25"}`} />
                    ))}
                  </span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
