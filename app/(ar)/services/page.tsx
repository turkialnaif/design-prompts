import PageHero from "@/components/PageHero";
import type { Metadata } from "next";
import ArrowButton from "@/components/ArrowButton";
import MatterBriefCTA from "@/components/MatterBriefCTA";
import ServiceTiles from "@/components/ServiceTiles";
import { pillarTiles } from "@/lib/service-tiles";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SpecializedExplorer from "@/components/SpecializedExplorer";
import { corePillars, firm, specializedLines } from "@/lib/site";

export const metadata: Metadata = {
  title: "الخدمات القانونية",
  description:
    "منظومة الخدمات القانونية لدى تركي النايف وشركاؤه: المشورة، العقود، التقاضي والتحكيم، الامتثال، القانون الرقمي، والتنفيذ والتحصيل.",
  alternates: { canonical: "/services", languages: { ar: "/services", en: "/en/services" } },
  openGraph: {
    title: "الخدمات القانونية",
    description:
      "منظومة الخدمات القانونية لدى تركي النايف وشركاؤه: المشورة، العقود، التقاضي والتحكيم، الامتثال، القانون الرقمي، والتنفيذ والتحصيل.",
    images: [{ url: "/brand/riyadh-kafd.jpg" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function ServicesPage() {
  const stats = [
    { value: corePillars.length, label: "محاور أساسية" },
    { value: specializedLines.length, label: "خط ممارسة متخصص" },
  ];

  return (
    <div>
            <PageHero photo="/brand/riyadh-skyline.jpg" focus="center 55%">
          <div className="relative px-6 py-14 text-center md:px-16 md:py-20">
            <SectionHeading as="h1" eyebrow="Service Architecture" title="منظومة الخدمات القانونية" tone="onDark" />
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/85">نعرض الخدمات بوصفها رحلة عمل متصلة، من المشورة قبل القرار إلى اكتمال الأثر.</p>

            <div className="mx-auto mt-8 grid max-w-md grid-cols-2 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="border border-white/25 bg-white/10 flex flex-col items-center rounded-2xl px-3 py-4">
                  <span className="glass-number-dark font-display text-4xl font-extrabold leading-none">{s.value}</span>
                  <span className="mt-2 text-xs font-semibold text-white/75">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <ArrowButton href={firm.whatsapp} external>
                احجز استشارة أولية
              </ArrowButton>
              <MatterBriefCTA locale="ar" matterTypes={corePillars.map((s) => s.title)} tone="onDark" />
            </div>
          </div>
      </PageHero>

      <div className="relative isolate overflow-hidden">
      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <SectionHeading number="01" eyebrow="Core Pillars" title="المحاور الأساسية" tone="onLight" />
          </Reveal>
          <div className="mt-12">
            <ServiceTiles items={pillarTiles("ar")} cta="تفاصيل الخدمة ←" />
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <SectionHeading number="02" eyebrow="Specialized Practice Lines" title="خطوط ممارسة متخصصة" tone="onLight" />
          </Reveal>
          <div className="mt-12">
            <SpecializedExplorer locale="ar" items={specializedLines.map((l) => ({ slug: l.slug, title: l.title, subtitle: l.titleEn, summary: l.summary, href: `/services/${l.slug}` }))} />
          </div>
        </div>
      </section>

      </div>
    </div>
  );
}
