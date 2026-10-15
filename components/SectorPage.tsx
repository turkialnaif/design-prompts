import Link from "next/link";
import ArrowButton from "@/components/ArrowButton";
import Breadcrumbs from "@/components/Breadcrumbs";
import MatterBriefCTA from "@/components/MatterBriefCTA";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { articles } from "@/lib/articles";
import { articlesEn } from "@/lib/en/articles";
import { hasEnArticle, hasEnService } from "@/lib/en/slugs";
import { sectorArticleSlugs, sectorExtra, sectorServiceSlugs } from "@/lib/sector-extra";
import { sectors, type Sector } from "@/lib/sectors";
import { corePillars, firm, specializedLines } from "@/lib/site";

const ui = {
  ar: {
    home: "الرئيسية",
    sectors: "القطاعات",
    sectorsHref: "/services#sectors",
    base: "/sectors",
    heroEyebrow: "Sector Expertise",
    issuesTitle: "أبرز المسائل القانونية في القطاع",
    issuesEyebrow: "Key Legal Matters",
    servicesTitle: "خدمات مرتبطة بالقطاع",
    servicesEyebrow: "Related Services",
    risksTitle: "مخاطر تستحق الانتباه في هذا القطاع",
    risksEyebrow: "Watch Points",
    regTitle: "الجهات التنظيمية ذات الصلة",
    regEyebrow: "Regulators",
    contractsTitle: "العقود والمستندات المعتادة",
    otherLang: "Read this page in English",
    otherLangHref: "/en/sectors",
    faqTitle: "أسئلة شائعة",
    faqEyebrow: "FAQ",
    readTitle: "مقالات قد تهمك",
    readEyebrow: "Insights",
    othersTitle: "قطاعات أخرى نخدمها",
    ctaTitle: "هل منشأتك تعمل في هذا القطاع؟",
    ctaBody: "أرسل موجزًا مختصرًا عن مسألتك، وسنحدد معك النطاق والمخرجات منذ البداية ونرد خلال يوم عمل واحد.",
    wa: "تواصل عبر واتساب",
    disclaimer: "المعلومات في هذه الصفحة عامة لأغراض التوعية ولا تُعد استشارة قانونية، ولا تنشئ علاقة محامٍ–موكل. تختلف الإجابات بحسب وقائع كل حالة.",
    brief: "أرسل موجز المسألة",
    arLabel: "",
  },
  en: {
    home: "Home",
    sectors: "Sectors",
    sectorsHref: "/en/services#sectors",
    base: "/en/sectors",
    heroEyebrow: "Sector Expertise",
    issuesTitle: "Key legal matters in the sector",
    issuesEyebrow: "Key Legal Matters",
    servicesTitle: "Related services",
    servicesEyebrow: "Related Services",
    risksTitle: "Watch points in this sector",
    risksEyebrow: "Watch Points",
    regTitle: "Relevant regulators",
    regEyebrow: "Regulators",
    contractsTitle: "Typical contracts and documents",
    otherLang: "قراءة هذه الصفحة بالعربية",
    otherLangHref: "/sectors",
    faqTitle: "Frequently asked questions",
    faqEyebrow: "FAQ",
    readTitle: "Articles worth reading",
    readEyebrow: "Insights",
    othersTitle: "Other sectors we serve",
    ctaTitle: "Does your business operate in this sector?",
    ctaBody: "Send a short summary of your matter and we will agree scope and deliverables from the start, replying within one business day.",
    wa: "Message on WhatsApp",
    disclaimer: "The information on this page is general and for awareness only; it is not legal advice and does not create an attorney–client relationship. Answers vary with the facts of each case.",
    brief: "Send a matter brief",
    arLabel: " (Arabic)",
  },
};

const all = [...corePillars, ...specializedLines];

export default function SectorPage({ sector, locale }: { sector: Sector; locale: "ar" | "en" }) {
  const t = ui[locale];
  const ar = locale === "ar";
  const c = sector[locale];
  const url = `${firm.website}${t.base}/${sector.slug}`;
  const services = sectorServiceSlugs(sector.slug).map((s) => all.find((x) => x.slug === s)).filter((x): x is (typeof all)[number] => !!x);
  const extra = sectorExtra(sector.slug, locale);
  const faqs = [...c.faqs, ...(extra?.faqs ?? [])];
  const reads = sectorArticleSlugs(sector.slug)
    .map((s) => articles.find((a) => a.slug === s))
    .filter((x): x is (typeof articles)[number] => !!x)
    .slice(0, 6);
  const readHref = (slug: string) => (!ar && hasEnArticle(slug) ? `/en/blog/${slug}` : `/blog/${slug}`);
  const readTitle = (a: (typeof articles)[number]) => (!ar && hasEnArticle(a.slug) ? articlesEn[a.slug as keyof typeof articlesEn].h1 : `${a.h1}${ar ? "" : t.arLabel}`);
  const serviceHref = (slug: string) => (!ar && hasEnService(slug) ? `/en/services/${slug}` : `/services/${slug}`);
  const serviceIsEn = (slug: string) => !ar && hasEnService(slug);
  let no = 1;
  const nn = () => String(no++).padStart(2, "0");
  const others = sectors.filter((s) => s.slug !== sector.slug).slice(0, 8);

  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: ar ? `خدمات قانونية لقطاع ${c.title}` : `Legal services for ${c.title}`,
      serviceType: ar ? "محاماة واستشارات قانونية" : "Legal services",
      description: c.intro,
      url,
      provider: { "@type": "LegalService", name: ar ? firm.nameAr : "Turki AlNaif & Partners", url: firm.website },
      areaServed: { "@type": "Country", name: ar ? "المملكة العربية السعودية" : "Saudi Arabia" },
      audience: { "@type": "BusinessAudience", name: c.title },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <div>
      {ld.map((o, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(o) }} />
      ))}
      <PageHero>
        <div className="relative px-6 py-14 text-center md:px-16 md:py-20">
          <SectionHeading as="h1" eyebrow={t.heroEyebrow} title={c.title} tone="onDark" />
          <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-8 text-white/85">{c.short}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ArrowButton href={firm.whatsapp} external ltr={!ar} small>{t.wa}</ArrowButton>
            <MatterBriefCTA locale={locale} matterTypes={corePillars.map((p) => (ar ? p.title : p.titleEn))} tone="onDark" small />
          </div>
        </div>
      </PageHero>

      <Breadcrumbs
        locale={locale}
        items={[
          { label: t.home, href: ar ? "/" : "/en" },
          { label: ar ? "الخدمات والقطاعات" : "Services & Sectors", href: ar ? "/services" : "/en/services" },
          { label: c.title, href: `${t.base}/${sector.slug}` },
        ]}
      />

      <section className="bg-paper pb-8 pt-10 md:pt-14">
        <div className="mx-auto max-w-4xl px-5">
          <Reveal>
            <p className="font-display text-xl font-light leading-[2.1] text-[#00124a] md:text-3xl md:leading-[2.1]">{c.intro}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <SectionHeading number={nn()} eyebrow={t.issuesEyebrow} title={t.issuesTitle} tone="onLight" />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {c.issues.map((it, i) => (
              <Reveal key={it.t} delay={(i % 2) * 90}>
                <div className="glass-card h-full rounded-2xl p-7">
                  <span className="font-display text-sm tracking-widest text-[#012696]" dir="ltr">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="font-display mt-3 !text-2xl !font-normal text-[#00124a]">{it.t}</h2>
                  <p className="mt-3 text-[15px] font-light leading-8 text-ink-soft">{it.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {extra && (
        <section className="bg-white py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-5">
            <Reveal>
              <SectionHeading number={nn()} eyebrow={t.risksEyebrow} title={t.risksTitle} tone="onLight" />
            </Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {extra.risks.map((r) => (
                <Reveal key={r.t}>
                  <div className="h-full border-t-2 border-[#e0b35a] bg-paper px-6 py-6">
                    <h3 className="font-display !text-xl !font-normal leading-8 text-[#00124a]">{r.t}</h3>
                    <p className="mt-3 text-[15px] font-light leading-8 text-ink-soft">{r.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {extra && (
        <section className="bg-paper py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-5">
            <Reveal>
              <SectionHeading number={nn()} eyebrow={t.regEyebrow} title={t.regTitle} tone="onLight" />
            </Reveal>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {extra.regulators.map(([n, d]) => (
                <li key={n} className="glass-card rounded-2xl p-5">
                  <p className="font-display text-lg font-normal leading-8 text-[#00124a]">{n}</p>
                  <p className="mt-1 text-sm font-light leading-7 text-ink-soft">{d}</p>
                </li>
              ))}
            </ul>
            <h3 className="font-display mt-14 !text-2xl !font-normal text-[#00124a]">{t.contractsTitle}</h3>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {extra.contracts.map((x) => (
                <li key={x} className="border border-[#00124a]/20 bg-white px-4 py-2 text-sm font-light text-[#00124a]">{x}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {services.length > 0 && (
        <section className="bg-white py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-5">
            <Reveal>
              <SectionHeading number={nn()} eyebrow={t.servicesEyebrow} title={t.servicesTitle} tone="onLight" />
            </Reveal>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={serviceHref(s.slug)}
                    hrefLang={ar || serviceIsEn(s.slug) ? undefined : "ar"}
                    className="group flex h-full items-center justify-between gap-3 border border-[#00124a]/15 bg-white px-5 py-5 transition-colors hover:border-[#e0b35a] hover:bg-[#f4f5fe] chamfer-btn"
                  >
                    <span className="font-display text-lg font-normal text-[#00124a]">{ar ? s.title : `${s.titleEn}${serviceIsEn(s.slug) ? "" : t.arLabel}`}</span>
                    <span aria-hidden className="text-[#012696] transition-transform group-hover:-translate-x-1 rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1">{ar ? "←" : "→"}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-5">
          <Reveal>
            <SectionHeading number={nn()} eyebrow={t.faqEyebrow} title={t.faqTitle} tone="onLight" />
          </Reveal>
          <div className="mt-10 divide-y divide-[#00124a]/15 border-y border-[#00124a]/15">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl font-normal text-[#00124a] md:text-2xl">
                  <h3 className="font-display !text-xl !font-normal md:!text-2xl">{f.q}</h3>
                  <span aria-hidden className="grid h-8 w-8 shrink-0 place-items-center border border-[#00124a]/25 text-lg leading-none transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-[15px] font-light leading-8 text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-6 text-xs leading-6 text-ink-soft/80">{t.disclaimer}</p>
        </div>
      </section>

      {reads.length > 0 && (
        <section className="bg-white py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-5">
            <Reveal>
              <SectionHeading number={nn()} eyebrow={t.readEyebrow} title={t.readTitle} tone="onLight" />
            </Reveal>
            <ul className="mt-10 grid gap-4 md:grid-cols-2">
              {reads.map((a) => (
                <li key={a.slug}>
                  <Link href={readHref(a.slug)} hrefLang={ar || hasEnArticle(a.slug) ? undefined : "ar"} className="glass-card block h-full rounded-2xl p-6 transition-transform hover:-translate-y-1">
                    <h3 className="font-display !text-lg !font-normal leading-8 text-[#00124a]">{readTitle(a)}</h3>
                    <p className="mt-2 line-clamp-2 text-sm font-light leading-7 text-ink-soft">{!ar && hasEnArticle(a.slug) ? articlesEn[a.slug as keyof typeof articlesEn].metaDescription : a.metaDescription}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section data-glow className="relative isolate overflow-hidden bg-[#00061d] py-24 text-center text-white md:py-32">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(30,70,200,0.3),transparent_70%)]" />
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="font-display grad-text text-4xl leading-[1.3] sm:text-5xl md:text-6xl">{t.ctaTitle}</h2>
          <p className="mx-auto mt-6 max-w-xl text-base font-light leading-8 text-white/75">{t.ctaBody}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <ArrowButton href={firm.whatsapp} external ltr={!ar}>{t.wa}</ArrowButton>
            <MatterBriefCTA locale={locale} matterTypes={corePillars.map((p) => (ar ? p.title : p.titleEn))} tone="onDark" />
          </div>
        </div>
      </section>

      <section className="bg-paper py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="font-display mb-6 text-center !text-2xl !font-normal text-[#00124a]">{t.othersTitle}</h2>
          <ul className="flex flex-wrap justify-center gap-2.5">
            {others.map((s) => (
              <li key={s.slug}>
                <Link href={`${t.base}/${s.slug}`} className="chamfer-btn inline-block border border-[#00124a]/20 px-4 py-2 text-sm font-light text-[#00124a] transition-colors hover:border-[#e0b35a] hover:bg-[#f4f5fe]">
                  {s[locale].title}
                </Link>
              </li>
            ))}
            <li>
              <Link href={`${t.otherLangHref}/${sector.slug}`} hrefLang={ar ? "en" : "ar"} className="chamfer-btn inline-block border border-[#e0b35a] px-4 py-2 text-sm font-light text-[#00124a]">{t.otherLang}</Link>
            </li>
            <li>
              <Link href={t.sectorsHref} className="chamfer-btn inline-block bg-[#00124a] px-4 py-2 text-sm font-normal text-white">{ar ? "كل القطاعات ←" : "All sectors →"}</Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
