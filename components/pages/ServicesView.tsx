import ArrowButton from "@/components/ArrowButton";
import MatterBriefCTA from "@/components/MatterBriefCTA";
import PageHero from "@/components/PageHero";
import ServiceTiles from "@/components/ServiceTiles";
import SpecializedExplorer from "@/components/SpecializedExplorer";
import { Band, BandHead, HeroHead, StatTile, Wrap } from "@/components/ui";
import WhoWeServe from "@/components/WhoWeServe";
import { pillarTiles, totalServices } from "@/lib/service-tiles";
import { sectors } from "@/lib/sectors";
import { corePillars, firm, specializedLines } from "@/lib/site";
import { specializedLineSummaryEn } from "@/lib/site.en";

const ui = {
  ar: {
    eyebrow: "Services & Sectors",
    title: "الخدمات والقطاعات",
    lead: "منظومة خدماتنا القانونية بوصفها رحلة عمل متصلة، ثم القطاعات العشرون التي نخدمها.",
    stats: [
      { value: totalServices, label: "خدمة قانونية" },
      { value: corePillars.length, label: "محاور أساسية" },
      { value: sectors.length, label: "قطاعًا" },
    ],
    book: "احجز استشارة أولية",
    core: { number: "01", eyebrow: "Core Pillars", title: "المحاور الأساسية" },
    lines: { number: "02", eyebrow: "Specialized Practice Lines", title: "خطوط ممارسة متخصصة" },
    cta: "تفاصيل الخدمة ←",
  },
  en: {
    eyebrow: "Services & Sectors",
    title: "Services & Sectors",
    lead: "Our legal services as one connected engagement journey, then the twenty sectors we serve.",
    stats: [
      { value: totalServices, label: "legal services" },
      { value: corePillars.length, label: "core pillars" },
      { value: sectors.length, label: "sectors" },
    ],
    book: "Book an Initial Consultation",
    core: { number: "01", eyebrow: "Core Pillars", title: "Core Pillars" },
    lines: { number: "02", eyebrow: "Specialized Practice Lines", title: "Specialised Practice Lines" },
    cta: "Service details →",
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

      <WhoWeServe locale={locale} hideAll />
    </div>
  );
}
