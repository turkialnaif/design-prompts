import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHero from "@/components/PageHero";
import { Band, HeroHead } from "@/components/ui";
import { articles } from "@/lib/articles";
import { articlesEn } from "@/lib/en/articles";
import { enArticleSlugs } from "@/lib/en/slugs";

export const metadata: Metadata = {
  title: { absolute: "Legal Insights | Turki AlNaif & Partners" },
  description: "Practical guides from Turki AlNaif & Partners, Riyadh, on commercial arbitration, enforcement, shareholder agreements, due diligence, investment registration and data protection in Saudi Arabia.",
  alternates: { canonical: "/en/blog", languages: { ar: "/blog", en: "/en/blog", "x-default": "/blog" } },
  openGraph: {
    title: "Legal Insights — Turki AlNaif & Partners",
    description: "Practical guides on Saudi commercial law, arbitration and investment.",
    images: [{ url: "/brand/riyadh-kafd.jpg" }],
  },
  twitter: { card: "summary_large_image" },
};

const dateFormat = new Intl.DateTimeFormat("en-GB", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

export default function EnBlogIndex() {
  const items = enArticleSlugs
    .map((slug) => ({ slug, ar: articles.find((a) => a.slug === slug)!, en: articlesEn[slug] }))
    .filter((x) => x.ar && x.en)
    .sort((a, b) => b.ar.publishedAt.localeCompare(a.ar.publishedAt));
  return (
    <div>
      <PageHero>
        <HeroHead
          eyebrow="Legal Insights"
          title="Saudi commercial law, in practice"
          lead="Guides written by the firm for companies and investors. The Arabic library has more articles; each English guide is a full translation of its Arabic original."
        />
      </PageHero>
      <Breadcrumbs locale="en" items={[{ label: "Home", href: "/en" }, { label: "Legal Insights", href: "/en/blog" }]} />
      <Band tone="tint">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 md:grid-cols-2">
          {items.map(({ slug, ar, en }) => (
            <Link key={slug} href={`/en/blog/${slug}`} className="glass-card group block rounded-3xl p-7 transition-transform hover:-translate-y-1">
              <p className="text-xs text-gold-deep">{dateFormat.format(new Date(ar.publishedAt))}</p>
              <h2 className="font-display mt-2 text-2xl font-light leading-snug text-[#00124a]">{en.h1}</h2>
              <p className="mt-3 text-sm font-light leading-7 text-ink-soft">{en.metaDescription}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm text-[#012696]">
                Read the guide <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-6xl px-5 text-sm text-ink-soft">
          More guides are available in Arabic: <Link href="/blog" className="underline underline-offset-4">Arabic Legal Insights</Link>.
        </p>
      </Band>
    </div>
  );
}
