import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { sectors } from "@/lib/sectors";
import { firm } from "@/lib/site";

const ui = {
  ar: {
    title: "القطاعات التي نخدمها",
    eyebrow: "Sectors",
    lead: "نفهم طبيعة كل قطاع وأنظمته وعقوده وأطرافه، فنقدّم مشورة قانونية تناسب واقع العمل فيه. اختر قطاعك لتعرف أبرز المسائل القانونية فيه وكيف نخدمك.",
    home: "الرئيسية",
    base: "/sectors",
    homeHref: "/",
    open: "اعرف أكثر",
  },
  en: {
    title: "Sectors We Serve",
    eyebrow: "Sectors",
    lead: "We understand each sector's regulation, contracts and counterparties, so our legal advice fits how business works there. Choose your sector to see its key legal matters and how we can help.",
    home: "Home",
    base: "/en/sectors",
    homeHref: "/en",
    open: "Learn more",
  },
};

export default function SectorsIndex({ locale }: { locale: "ar" | "en" }) {
  const t = ui[locale];
  const ld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.title,
    itemListElement: sectors.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s[locale].title, url: `${firm.website}${t.base}/${s.slug}` })),
  };
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHero photo="/brand/riyadh-skyline.jpg" focus="center 55%">
        <div className="relative px-6 py-14 text-center md:px-16 md:py-20">
          <SectionHeading as="h1" eyebrow={t.eyebrow} title={t.title} tone="onDark" />
          <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-8 text-white/85">{t.lead}</p>
        </div>
      </PageHero>
      <Breadcrumbs locale={locale} items={[{ label: t.home, href: t.homeHref }, { label: t.title, href: t.base }]} />
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((s, i) => (
              <li key={s.slug} className="h-full list-none">
                <Reveal delay={(i % 3) * 70} className="h-full">
                  <Link href={`${t.base}/${s.slug}`} className="group glass-card block h-full rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1">
                    <span className="font-display text-sm tracking-widest text-[#806223]" dir="ltr">{String(i + 1).padStart(2, "0")}</span>
                    <h2 className="font-display mt-3 !text-2xl !font-normal text-[#00124a]">{s[locale].title}</h2>
                    <p className="mt-3 text-[15px] font-light leading-8 text-ink-soft">{s[locale].short}</p>
                    <span className="mt-5 inline-block text-sm text-[#806223] opacity-70 transition-opacity group-hover:opacity-100">{t.open} {locale === "ar" ? "←" : "→"}</span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
