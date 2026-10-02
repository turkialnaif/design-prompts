import { blurProps } from "@/lib/blur";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/lib/articles";
import { firm } from "@/lib/site";
import ArrowButton from "@/components/ArrowButton";
import ArticleMarkdown, { getArticleHeadings } from "@/components/ArticleMarkdown";
import MatterBriefCTA from "@/components/MatterBriefCTA";
import ReadingProgress from "@/components/ReadingProgress";
import ShareBar from "@/components/ShareBar";
import { entryNumber, newestFirst } from "@/lib/article-index";
import NewsletterSignup from "@/components/NewsletterSignup";
import { audienceLabels, audiencesOf, readLabel } from "@/lib/article-meta";
import AuthorBox from "@/components/AuthorBox";
import Reveal from "@/components/Reveal";
import { NavyField } from "@/components/ui";
import { Logo3DReader } from "@/components/logo3d/lazy";
import { articlePhoto } from "@/lib/article-photos";
import ArticlePoster from "@/components/ArticlePoster";
import ArticleToc from "@/components/ArticleToc";
import { corePillars } from "@/lib/site";

const clusterLabels: Record<(typeof articles)[number]["cluster"], string> = {
  corporate: "قضايا الشركات",
  contracts: "العقود التجارية",
  disputes: "المنازعات التجارية",
  individuals: "قضايا الأفراد",
};

const dateFormat = new Intl.DateTimeFormat("ar-SA-u-nu-latn", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};

  return {
    title: article.seoTitle,
    description: article.metaDescription,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [firm.nameAr],
      section: article.primaryKeyword,
      tags: [article.primaryKeyword, ...article.secondaryKeywords],
      title: article.seoTitle,
      description: article.metaDescription,
      images: articlePhoto(slug) ? [{ url: articlePhoto(slug)!.src }] : undefined,
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const photo = articlePhoto(article.slug);
  const headings = getArticleHeadings(article.body);
  const readMinutes = Math.max(1, Math.ceil(article.body.split(/\s+/).length / 180));
  const idx = newestFirst.findIndex((a) => a.slug === article.slug);
  const newer = idx > 0 ? newestFirst[idx - 1] : null;
  const older = idx >= 0 && idx < newestFirst.length - 1 ? newestFirst[idx + 1] : null;
  const related = articles
    .filter((a) => a.slug !== article.slug)
    .sort((a, b) => Number(b.cluster === article.cluster) - Number(a.cluster === article.cluster))
    .slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.h1,
    description: article.metaDescription,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: { "@type": "Person", name: "تركي النايف" },
    publisher: { "@type": "Organization", name: firm.nameShortAr },
    mainEntityOfPage: `${firm.website}/blog/${article.slug}`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const cta = (
    <aside className="chamfer-lg bg-[#00124a] px-7 py-8 text-white md:px-10">
      <p className="text-sm text-[#f6e2b3]">هل لديك مسألة مشابهة؟</p>
      <p className="font-display mt-2 text-2xl font-light leading-[1.6] md:text-3xl">{article.ctaTitle}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <ArrowButton href="/contact" small>{article.ctaPrimaryLabel}</ArrowButton>
        <MatterBriefCTA locale="ar" matterTypes={corePillars.map((s) => s.title)} tone="onDark" small />
      </div>
    </aside>
  );

  return (
    <div>
      <ReadingProgress minutes={readMinutes} />
      <Logo3DReader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section data-glow className="relative isolate overflow-hidden bg-[#00061d] px-5 pb-24 pt-36 md:px-12 md:pb-32 md:pt-48">
        <NavyField />
        <div aria-hidden className="orn absolute inset-x-0 bottom-0" />
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1fr_24rem] lg:gap-16">
          <div>
            <nav aria-label="مسار التصفح" className="flex items-center gap-3 text-sm text-[#f6e2b3]">
              <Link href="/blog" className="transition-colors hover:text-white">المدونة</Link>
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-[#e0b35a]" />
              <span>{clusterLabels[article.cluster]}</span>
            </nav>
            <h1 className="grad-text mt-6 text-5xl font-bold leading-[1.45] md:text-6xl lg:text-7xl lg:leading-[1.4]" style={{ fontFamily: "var(--font-ruqaa), serif" }}>
              {article.h1}
            </h1>
            <p className="mt-7 max-w-2xl text-lg font-light leading-9 text-white/80 md:text-xl md:leading-10">{article.metaDescription}</p>

            <dl className="mt-9 grid max-w-2xl grid-cols-2 gap-px border border-white/12 bg-white/12 text-sm sm:grid-cols-4">
              {[
                { k: "نُشر", v: dateFormat.format(new Date(article.publishedAt)) },
                { k: "حُدّث", v: dateFormat.format(new Date(article.updatedAt)) },
                { k: "القراءة", v: readLabel(readMinutes) },
                { k: "المقال", v: `رقم ${entryNumber(article.slug)}` },
              ].map((m) => (
                <div key={m.k} className="bg-[#00124a]/80 px-4 py-3">
                  <dt className="text-xs text-white/55">{m.k}</dt>
                  <dd className="mt-1 text-[#f6e2b3]">{m.v}</dd>
                </div>
              ))}
            </dl>

            <ul className="mt-6 flex flex-wrap gap-2.5" aria-label="الجمهور">
              {audiencesOf(article.slug).map((k) => (
                <li key={k} className="border border-[#e0b35a]/50 px-3.5 py-1 text-xs text-[#f6e2b3]">{audienceLabels[k]}</li>
              ))}
            </ul>
          </div>

          {photo && (
            <div className="frame relative mx-auto aspect-[4/3] w-full max-w-[24rem] overflow-hidden bg-[#00124a] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] lg:aspect-[4/5]">
              <Image src={photo.src} {...blurProps(photo.src)} alt={photo.alt} fill priority quality={90} sizes="384px" className="object-cover" style={{ objectPosition: photo.focus }} />
              <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(0,18,74,0.8)_100%)]" />
              <span aria-hidden className="font-display absolute bottom-3 start-4 text-7xl font-extralight leading-none text-transparent [-webkit-text-stroke:1px_rgba(246,226,179,0.9)]" dir="ltr">
                {entryNumber(article.slug)}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Body */}
      <section className="bg-white py-16 md:py-24">
        <div className={`mx-auto grid max-w-6xl gap-14 px-5 ${headings.length > 1 ? "lg:grid-cols-[15rem_1fr]" : ""}`}>
          {headings.length > 1 && (
            <aside className="order-first hidden lg:block">
              <ArticleToc headings={headings} />
            </aside>
          )}

          <div className="mx-auto w-full max-w-[46rem]">
            {headings.length > 1 && (
              <details className="chamfer mb-8 border border-[#00124a]/15 bg-[#f4f5fe] px-5 py-4 lg:hidden">
                <summary className="cursor-pointer list-none font-display text-xl font-light text-[#00124a]">محتويات المقال</summary>
                <ol className="mt-4 space-y-3 text-sm">
                  {headings.map((h, n) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="flex gap-3 text-ink-soft">
                        <span className="text-[#012696]" dir="ltr">{String(n + 1).padStart(2, "0")}</span>
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>
            )}

            <ShareBar url={`${firm.website}/blog/${article.slug}`} title={article.h1} />

            <article className="mt-10">
              <ArticleMarkdown content={article.body} inline={cta} />
            </article>

            <ul className="mt-12 flex flex-wrap gap-2.5" aria-label="الوسوم">
              {[article.primaryKeyword, ...article.secondaryKeywords.slice(0, 4)].map((k) => (
                <li key={k} className="border border-[#00124a]/15 px-3.5 py-1.5 text-xs text-ink-soft">{k}</li>
              ))}
            </ul>

            <div className="mt-14">
              <AuthorBox attorneySlug="turki-alnayef" variant={article.authorVariant} />
            </div>

            <div className="frame glass-card mt-8 p-6">
              <h2 className="font-display text-xl font-light text-[#00124a]">مصادر نظامية</h2>
              <ul className="mt-3 space-y-1.5 text-sm leading-7 text-ink-soft/80">
                {article.sources.map((source) => (
                  <li key={source}>{source}</li>
                ))}
              </ul>
              <p className="mt-5 border-t border-line pt-4 text-xs leading-6 text-ink-soft/60">{article.disclaimer}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f5fe] py-14">
        <div className="mx-auto grid max-w-6xl gap-5 px-5 md:grid-cols-2">
          {[
            { a: newer, label: "الأحدث" },
            { a: older, label: "الأقدم" },
          ].map(({ a, label }) =>
            a ? (
              <Link key={a.slug} href={`/blog/${a.slug}`} className="group glass-card block p-7 transition-transform duration-300 hover:-translate-y-1">
                <span className="text-xs text-[#012696]">{label}</span>
                <h3 className="font-display mt-2 text-2xl font-light leading-[1.5] text-[#00124a]">{a.h1}</h3>
                <span className="mt-4 inline-flex items-center gap-2 text-sm text-[#012696]"><span className="h-px w-6 bg-[#e0b35a] transition-all duration-300 group-hover:w-12" />اقرأ</span>
              </Link>
            ) : (
              <span key={label} />
            ),
          )}
        </div>
      </section>

      <section className="bg-[#00061d] py-20 text-white md:py-28">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal>
            <p className="gold-eyebrow text-center !text-[#f6e2b3] text-xs md:text-sm">FAQ</p>
            <h2 className="font-display grad-text mt-4 text-center text-4xl leading-[1.25] sm:text-5xl md:text-6xl">أسئلة شائعة</h2>
          </Reveal>
          <div className="mt-12 divide-y divide-white/12 border-y border-white/12">
            {article.faq.map((item) => (
              <details key={item.question} className="group py-6">
                <summary className="flex cursor-pointer list-none items-start gap-5 font-display text-xl font-light leading-8 md:text-2xl">
                  <span className="flex-1">{item.question}</span>
                  <span aria-hidden className="text-2xl leading-none text-[#f6e2b3] transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-base font-light leading-8 text-white/75">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-24 max-w-[92rem] px-4 md:px-8">
          <Reveal>
            <p className="gold-eyebrow text-center !text-[#f6e2b3] text-xs md:text-sm">Keep Reading</p>
            <h2 className="font-display grad-text mt-4 text-center text-4xl leading-[1.25] sm:text-5xl md:text-6xl">تابع القراءة</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {related.map((a) => (
              <ArticlePoster
                key={a.slug}
                a={{ slug: a.slug, cluster: a.cluster, clusterLabel: clusterLabels[a.cluster], title: a.h1, index: entryNumber(a.slug) }}
                size="md"
                className="min-h-[24rem]"
                sizesAttr="(min-width: 768px) 33vw, 100vw"
              />
            ))}
          </div>

          {article.relatedLinks.length > 0 && (
            <ul className="mt-10 flex flex-wrap justify-center gap-3">
              {article.relatedLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="btn btn-ghost chamfer-btn inline-block px-5 py-2.5 text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="bg-[#f4f5fe] py-16 md:py-20">
        <div className="mx-auto max-w-2xl px-5">
          <NewsletterSignup source={`article:${article.slug}`} />
        </div>
      </section>

      <section className="bg-[radial-gradient(ellipse_70%_100%_at_50%_0%,#012696,#00061d_72%)] py-24 md:py-28">
        <Reveal className="mx-auto block max-w-4xl px-5">
          <div className="chamfer-lg border border-white/10 bg-white/[0.05] backdrop-blur-xl">
            <div className="relative px-8 py-12 text-center">
              <h2 className="font-display grad-text text-3xl md:text-4xl">{article.ctaTitle}</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm font-light leading-7 text-white/70">{article.ctaBody}</p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <ArrowButton href="/contact">{article.ctaPrimaryLabel}</ArrowButton>
                <MatterBriefCTA locale="ar" matterTypes={corePillars.map((s) => s.title)} tone="onDark" />
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
