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
import NewsletterSignup from "@/components/NewsletterSignup";
import { audienceLabels, audiencesOf, readLabel } from "@/lib/article-meta";
import AuthorBox from "@/components/AuthorBox";
import Reveal from "@/components/Reveal";
import { NavyField } from "@/components/ui";
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

  return (
    <div>
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="hero-cut relative isolate overflow-hidden bg-[#00061d] px-5 pb-20 pt-40 md:px-12 md:pb-28 md:pt-48">
        <NavyField />

        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1fr_22rem] lg:gap-14">
          <div>
            <nav aria-label="مسار التصفح" className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#f6e2b3]">
              <Link href="/blog" className="transition-colors hover:text-white">المدونة</Link>
              <span aria-hidden className="h-px w-8 bg-[#f6e2b3]/70" />
              <span>{clusterLabels[article.cluster]}</span>
            </nav>
            <h1 className="font-display grad-text mt-6 text-4xl leading-[1.4] md:text-5xl md:leading-[1.35] lg:text-6xl">{article.h1}</h1>

            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/20 pt-6 text-sm text-white/75">
              <span>نُشر {dateFormat.format(new Date(article.publishedAt))}</span>
              <span>حُدّث {dateFormat.format(new Date(article.updatedAt))}</span>
              <span>{readLabel(readMinutes)}</span>
              <span className="flex flex-wrap gap-2">
                {audiencesOf(article.slug).map((k) => (
                  <span key={k} className="chamfer-btn px-3.5 py-1 text-xs font-semibold text-[#f6e2b3] ring-1 ring-[#f6e2b3]/60">
                    {audienceLabels[k]}
                  </span>
                ))}
              </span>
            </div>
          </div>

          {photo && (
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[22rem] overflow-hidden rounded-3xl bg-[#00124a] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] ring-1 ring-[#f6e2b3]/50">
              <Image src={photo.src} {...blurProps(photo.src)} alt={photo.alt} fill priority quality={90} sizes="352px" className="object-cover" style={{ objectPosition: photo.focus }} />
            </div>
          )}
        </div>
      </section>

      <section className="bg-paper py-16 md:py-24">
        <div className={`mx-auto grid max-w-6xl gap-14 px-5 ${headings.length > 1 ? "lg:grid-cols-[15rem_1fr]" : ""}`}>
          {headings.length > 1 && (
            <aside className="order-first hidden lg:block">
              <ArticleToc headings={headings} />
            </aside>
          )}

          <div className="mx-auto w-full max-w-[44rem]">
            <article>
              <ArticleMarkdown content={article.body} />
            </article>

            <div className="mt-14">
              <AuthorBox attorneySlug="turki-alnayef" variant={article.authorVariant} />
            </div>

            <div className="mt-8 rounded-2xl border border-line bg-white/60 p-6">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">مصادر نظامية</h2>
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

      <section className="bg-[#00061d] py-20 text-white md:py-28">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal>
            <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-[#f6e2b3]">FAQ</p>
            <h2 className="font-display mt-3 text-center text-3xl font-bold md:text-5xl">أسئلة شائعة</h2>
          </Reveal>
          <div className="mt-12 divide-y divide-white/12 border-y border-white/12">
            {article.faq.map((item) => (
              <details key={item.question} className="group py-6">
                <summary className="flex cursor-pointer list-none items-start gap-5 text-lg font-bold leading-8">
                  <span className="flex-1">{item.question}</span>
                  <span aria-hidden className="text-2xl leading-none text-[#f6e2b3] transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-base leading-8 text-white/75">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-24 max-w-[92rem] px-4 md:px-8">
          <Reveal>
            <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-[#f6e2b3]">Keep Reading</p>
            <h2 className="font-display mt-3 text-center text-3xl font-bold md:text-5xl">تابع القراءة</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {related.map((a) => (
              <ArticlePoster
                key={a.slug}
                a={{ slug: a.slug, cluster: a.cluster, clusterLabel: clusterLabels[a.cluster], title: a.h1 }}
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
                  <Link
                    href={link.href}
                    className="inline-block chamfer-btn px-5 py-2.5 text-sm font-semibold text-white/80 ring-1 ring-white/20 transition-colors duration-300 hover:text-[#f6e2b3] hover:ring-[#f6e2b3]/60"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="bg-paper py-16 md:py-20">
        <div className="mx-auto max-w-2xl px-5">
          <NewsletterSignup source={`article:${article.slug}`} />
        </div>
      </section>

      <section className="bg-[radial-gradient(ellipse_70%_100%_at_50%_0%,#012696,#00061d_72%)] py-24 md:py-28">
        <Reveal className="mx-auto block max-w-4xl px-5">
          <div className="chamfer-lg border border-white/10 bg-white/[0.05] backdrop-blur-xl">
            <div className="relative px-8 py-12 text-center">
              <h2 className="font-display grad-text text-3xl md:text-4xl">{article.ctaTitle}</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/70">{article.ctaBody}</p>
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
