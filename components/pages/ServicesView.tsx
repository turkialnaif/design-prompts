import Link from "next/link";
import ArrowButton from "@/components/ArrowButton";
import MatterBriefCTA from "@/components/MatterBriefCTA";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ServiceTiles from "@/components/ServiceTiles";
import SpecializedExplorer from "@/components/SpecializedExplorer";
import { Band, BandHead, HeroHead, StatTile, Wrap } from "@/components/ui";
import { pillarTiles, totalServices } from "@/lib/service-tiles";
import { sectors } from "@/lib/sectors";
import { corePillars, firm, specializedLines } from "@/lib/site";
import { specializedLineSummaryEn } from "@/lib/site.en";

const ui = {
  ar: {
    eyebrow: "Service Architecture",
    title: "منظومة الخدمات القانونية",
    lead: "نعرض الخدمات بوصفها رحلة عمل متصلة، من المشورة قبل القرار إلى اكتمال الأثر.",
    stats: [
      { value: totalServices, label: "خدمة قانونية" },
      { value: corePillars.length, label: "محاور أساسية" },
      { value: specializedLines.length, label: "خط ممارسة متخصص" },
    ],
    book: "احجز استشارة أولية",
    core: { number: "01", eyebrow: "Core Pillars", title: "المحاور الأساسية" },
    lines: { number: "02", eyebrow: "Specialized Practice Lines", title: "خطوط ممارسة متخصصة" },
    cta: "تفاصيل الخدمة ←",
    sectorsTitle: "خدماتنا في عشرين قطاعًا",
    sectorsLead: "لكل قطاع صفحة تشرح مسائله القانونية وكيف نخدمه.",
    all: "كل القطاعات",
    allHref: "/sectors",
    base: "/sectors",
  },
  en: {
    eyebrow: "Service Architecture",
    title: "Legal Service System",
    lead: "We present our services as a connected engagement journey — from advice before a decision through to a completed practical effect.",
    stats: [
      { value: totalServices, label: "legal services" },
      { value: corePillars.length, label: "core pillars" },
      { value: specializedLines.length, label: "specialised practice lines" },
    ],
    book: "Book an Initial Consultation",
    core: { number: "01", eyebrow: "Core Pillars", title: "Core Pillars" },
    lines: { number: "02", eyebrow: "Specialized Practice Lines", title: "Specialised Practice Lines" },
    cta: "Service details →",
    sectorsTitle: "Our services across twenty sectors",
    sectorsLead: "Each sector has a page on its legal matters and how we serve it.",
    all: "All sectors",
    allHref: "/en/sectors",
    base: "/en/sectors",
  },
};

export default function ServicesView({ locale }: { locale: "ar" | "en" }) {
  const t = ui[locale];
  const ar = locale === "ar";
  return (
    <div>
      <PageHero>
        <HeroHead eyebrow={t.eyebrow} title={t.title} lead={t.lead}>
          <div className="mx-auto mt-9 grid max-w-2xl grid-cols-3 gap-3">
            {t.stats.map((s) => (
              <StatTile key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <ArrowButton href={firm.whatsapp} external ltr={!ar}>{t.book}</ArrowButton>
            <MatterBriefCTA locale={locale} matterTypes={corePillars.map((s) => (ar ? s.title : s.titleEn))} tone="onDark" />
          </div>
        </HeroHead>
      </PageHero>

      <Band tone="white">
        <Wrap>
          <BandHead {...t.core} />
          <div className="mt-14">
            <ServiceTiles items={pillarTiles(locale)} cta={t.cta} />
          </div>
        </Wrap>
      </Band>

      <Band tone="tint">
        <Wrap>
          <BandHead {...t.lines} />
          <div className="mt-14">
            <SpecializedExplorer
              locale={locale}
              items={specializedLines.map((l) =>
                ar
                  ? { slug: l.slug, title: l.title, subtitle: l.titleEn, summary: l.summary, href: `/services/${l.slug}` }
                  : { slug: l.slug, title: l.titleEn, subtitle: l.title, summary: specializedLineSummaryEn[l.slug] ?? "" },
              )}
            />
          </div>
        </Wrap>
      </Band>

      <Band tone="dark">
        <Wrap max="5xl">
          <BandHead eyebrow="Sectors" title={t.sectorsTitle} lead={t.sectorsLead} tone="onDark" />
          <Reveal>
            <ul className="mt-12 flex flex-wrap justify-center gap-2.5">
              {sectors.map((s) => (
                <li key={s.slug}>
                  <Link href={`${t.base}/${s.slug}`} className="chamfer-btn inline-block border border-white/20 px-4 py-2 text-sm font-light text-white/85 transition-colors hover:border-[#e0b35a] hover:bg-white/10 hover:text-white">
                    {s[locale].title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-10 text-center">
              <Link href={t.allHref} className="chamfer-btn inline-block bg-white px-8 py-3.5 text-base text-[#00124a] transition-colors hover:bg-[#f6e2b3]">{t.all}</Link>
            </div>
          </Reveal>
        </Wrap>
      </Band>
    </div>
  );
}
