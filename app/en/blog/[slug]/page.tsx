import RelatedSectors from "@/components/RelatedSectors";
import { sectorsForArticle } from "@/lib/sector-extra";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArrowButton from "@/components/ArrowButton";
import ArticleMarkdown, { getArticleHeadings } from "@/components/ArticleMarkdown";
import ArticleToc from "@/components/ArticleToc";
import Breadcrumbs from "@/components/Breadcrumbs";
import MatterBriefCTA from "@/components/MatterBriefCTA";
import ReadingProgress from "@/components/ReadingProgress";
import ShareBar from "@/components/ShareBar";
import { NavyField } from "@/components/ui";
import { articles } from "@/lib/articles";
import { articlesEn } from "@/lib/en/articles";
import { enArticleSlugs, hasEnArticle } from "@/lib/en/slugs";
import { lawLink } from "@/lib/law-links";
import { fitTitle } from "@/lib/seo";
import { corePillars, firm } from "@/lib/site";

const SUFFIX = " | Turki AlNaif & Partners";

const clusterLabels = {
  corporate: "Corporate",
  contracts: "Commercial contracts",
  disputes: "Disputes & arbitration",
  individuals: "Individuals",
} as const;

const dateFormat = new Intl.DateTimeFormat("en-GB", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

export function generateStaticParams() {
  return enArticleSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const ar = articles.find((a) => a.slug === slug);
  if (!ar || !hasEnArticle(slug)) return {};
  const en = articlesEn[slug as keyof typeof articlesEn];
  return {
    title: fitTitle(en.seoTitle, SUFFIX),
    description: en.metaDescription,
    alternates: {
      canonical: `/en/blog/${slug}`,
      languages: { ar: `/blog/${slug}`, en: `/en/blog/${slug}`, "x-default": `/blog/${slug}` },
    },
    openGraph: {
      type: "article",
      publishedTime: ar.publishedAt,
      modifiedTime: ar.updatedAt,
      authors: ["Turki AlNaif"],
      title: en.seoTitle,
      description: en.metaDescription,
      images: [{ url: "/brand/riyadh-kafd.jpg" }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function EnArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ar = articles.find((a) => a.slug === slug);
  if (!ar || !hasEnArticle(slug)) notFound();
  const en = articlesEn[slug as keyof typeof articlesEn];

  const headings = getArticleHeadings(en.body);
  const readMinutes = Math.max(1, Math.ceil(en.body.split(/\s+/).length / 220));
  const url = `${firm.website}/en/blog/${slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: en.h1,
    description: en.metaDescription,
    inLanguage: "en",
    datePublished: ar.publishedAt,
    dateModified: ar.updatedAt,
    image: [`${firm.website}/brand/riyadh-kafd.jpg`],
    author: { "@type": "Person", name: "Turki AlNaif", url: `${firm.website}/en/team/turki-alnayef` },
    publisher: {
      "@type": "Organization",
      "@id": `${firm.website}/#firm`,
      name: "Turki AlNaif & Partners",
      url: firm.website,
      logo: { "@type": "ImageObject", url: `${firm.website}/brand/icon-512.png` },
    },
    mainEntityOfPage: url,
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: en.faq.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };

  const cta = (
    <aside className="chamfer-lg bg-[#00124a] px-7 py-8 text-white md:px-10">
      <p className="text-sm text-[#f6e2b3]">Have a similar matter?</p>
      <p className="font-display mt-2 text-2xl font-light leading-[1.5] md:text-3xl">{en.ctaTitle}</p>
      <p className="mt-3 text-sm font-light leading-7 text-white/80">{en.ctaBody}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <ArrowButton href="/en/contact" small ltr>
          {en.ctaPrimaryLabel}
        </ArrowButton>
        <MatterBriefCTA locale="en" matterTypes={corePillars.map((s) => s.titleEn)} tone="onDark" small />
      </div>
    </aside>
  );

  return (
    <div>
      <ReadingProgress minutes={readMinutes} locale="en" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      {en.faq.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}

      <section data-glow className="relative isolate overflow-hidden bg-[#00061d] px-5 pb-20 pt-36 md:px-12 md:pb-28 md:pt-44">
        <NavyField />
        <div aria-hidden className="orn absolute inset-x-0 bottom-0" />
        <div className="mx-auto w-full max-w-4xl">
          <nav aria-label="Back to articles" className="flex items-center gap-3 text-sm text-[#f6e2b3]">
            <Link href="/en/blog" className="-my-2 inline-block py-2 transition-colors hover:text-white">Legal Insights</Link>
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-[#e0b35a]" />
            <span>{clusterLabels[ar.cluster]}</span>
          </nav>
          <h1 className="grad-text mt-6 text-4xl font-bold leading-[1.2] md:text-6xl">{en.h1}</h1>
          <p className="mt-7 max-w-2xl text-lg font-light leading-8 text-white/80 md:text-xl md:leading-9">{en.metaDescription}</p>
          <dl className="mt-9 grid max-w-2xl grid-cols-3 gap-px border border-white/12 bg-white/12 text-sm">
            {[
              { k: "Published", v: dateFormat.format(new Date(ar.publishedAt)) },
              { k: "Updated", v: dateFormat.format(new Date(ar.updatedAt)) },
              { k: "Reading time", v: `${readMinutes} min` },
            ].map((m) => (
              <div key={m.k} className="bg-[#00124a]/80 px-4 py-3">
                <dt className="text-xs text-white/55">{m.k}</dt>
                <dd className="mt-1 text-[#f6e2b3]">{m.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className={`mx-auto grid max-w-6xl gap-14 px-5 ${headings.length > 1 ? "lg:grid-cols-[15rem_1fr]" : ""}`}>
          {headings.length > 1 && (
            <aside className="order-first hidden lg:block">
              <ArticleToc headings={headings} locale="en" />
            </aside>
          )}
          <div className="mx-auto w-full max-w-[46rem]">
            <ShareBar url={url} title={en.h1} locale="en" />
            <article className="article-prose mt-10" lang="en" dir="ltr">
              <ArticleMarkdown content={en.body} inline={cta} locale="en" />
            </article>

            <div className="frame glass-card mt-12 p-6">
              <h2 className="font-display text-xl font-light text-[#00124a]">Legal sources</h2>
              <ul className="mt-3 space-y-1.5 text-sm leading-7 text-ink-soft/80">
                {en.sources.map((source) => {
                  const href = lawLink(source);
                  return (
                    <li key={source}>
                      {href ? (
                        <a href={href} target="_blank" rel="noopener noreferrer" className="underline decoration-gold/60 underline-offset-4 hover:text-gold-deep">
                          {source}
                        </a>
                      ) : (
                        source
                      )}
                    </li>
                  );
                })}
              </ul>
              <p className="mt-5 border-t border-line pt-4 text-xs leading-6 text-ink-soft/80">{en.disclaimer}</p>
            </div>

            {en.related.length > 0 && (
              <div className="mt-10">
                <h2 className="font-display text-xl font-light text-[#00124a]">Read next</h2>
                <ul className="mt-4 flex flex-wrap gap-2.5">
                  {en.related.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="chamfer-btn inline-block border border-[#00124a]/20 px-4 py-2 text-sm font-light text-[#00124a] transition-colors hover:border-[#e0b35a] hover:bg-[#f4f5fe]"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {en.faq.length > 0 && (
        <section className="bg-[#f4f5fe] py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-5">
            <h2 className="font-display text-3xl font-light text-[#00124a] md:text-4xl">Frequently asked questions</h2>
            <div className="mt-8 divide-y divide-[#00124a]/10 border-y border-[#00124a]/10">
              {en.faq.map((f) => (
                <details key={f.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-[#00124a]">
                    <span>{f.question}</span>
                    <span aria-hidden className="text-xl text-[#8a5d0e] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-base font-light leading-8 text-[#1b2646]">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <RelatedSectors locale="en" items={sectorsForArticle(slug)} alt={{ href: `/blog/${slug}` }} />

      <Breadcrumbs
        locale="en"
        items={[
          { label: "Home", href: "/en" },
          { label: "Legal Insights", href: "/en/blog" },
          { label: en.h1, href: `/en/blog/${slug}` },
        ]}
      />
      <div className="h-10" />
    </div>
  );
}
