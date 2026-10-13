import { newestFirst } from "@/lib/article-index";
import type { Metadata } from "next";
import BlogScene from "@/components/BlogScene";
import Marquee from "@/components/Marquee";
import { Logo3DFollow } from "@/components/logo3d/lazy";
import ArticleExplorer, { type ArticleSummary, type ClusterOption } from "@/components/ArticleExplorer";
import { articles, type Article } from "@/lib/articles";
import { audienceLabels, audiencesOf } from "@/lib/article-meta";
import NewsletterSignup from "@/components/NewsletterSignup";
import { firm } from "@/lib/site";

export const metadata: Metadata = {
  title: "مقالات قانونية",
  description: `مقالات ومحتوى قانوني من ${firm.nameShortAr} حول قضايا الشركات، العقود، التحكيم، والامتثال في السعودية.`,
  alternates: { canonical: "/blog", languages: { ar: "/blog", en: "/en/blog", "x-default": "/blog" } },
  openGraph: {
    title: "مقالات قانونية",
    description: `مقالات ومحتوى قانوني من ${firm.nameShortAr} حول قضايا الشركات، العقود، التحكيم، والامتثال في السعودية.`,
    images: [{ url: "/brand/riyadh-kafd.jpg" }],
  },
  twitter: { card: "summary_large_image" },
};

const clusterLabels: Record<Article["cluster"], string> = {
  corporate: "قضايا الشركات",
  contracts: "العقود التجارية",
  disputes: "المنازعات التجارية",
  individuals: "قضايا الأفراد",
};

const clusterLabelsEn: Record<Article["cluster"], string> = {
  corporate: "Corporate Matters",
  contracts: "Commercial Contracts",
  disputes: "Commercial Disputes",
  individuals: "Individual Matters",
};

const dateFormat = new Intl.DateTimeFormat("ar-SA-u-nu-latn", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

const monthFormat = new Intl.DateTimeFormat("ar-SA-u-nu-latn", { month: "long", timeZone: "UTC" });

export default function BlogPage() {
  const sorted = newestFirst;

  const summaries: ArticleSummary[] = sorted.map((a) => ({
    slug: a.slug,
    cluster: a.cluster,
    clusterLabel: clusterLabels[a.cluster],
    clusterLabelEn: clusterLabelsEn[a.cluster],
    title: a.h1,
    description: a.metaDescription,
    date: dateFormat.format(new Date(a.publishedAt)),
    day: String(new Date(a.publishedAt).getUTCDate()),
    month: monthFormat.format(new Date(a.publishedAt)),
    readMinutes: Math.max(1, Math.ceil(a.body.split(/\s+/).length / 180)),
    audiences: audiencesOf(a.slug).map((k) => ({ key: k, label: audienceLabels[k] })),
    searchText: [a.h1, a.metaDescription, a.primaryKeyword, ...a.secondaryKeywords].join(" "),
  }));

  const clusters: ClusterOption[] = (Object.keys(clusterLabels) as Article["cluster"][])
    .map((key) => ({ key, label: clusterLabels[key], count: articles.filter((a) => a.cluster === key).length }))
    .filter((c) => c.count > 0);

  const stats = [
    { n: articles.length, l: "مقالة" },
    { n: clusters.length, l: "محاور" },
    { n: 3, l: "فئات قرّاء" },
  ];

  return (
    <BlogScene label="LEGAL INSIGHTS">
      <section className="relative overflow-hidden px-5 pb-20 pt-32 md:pb-28 md:pt-44">
        <div aria-hidden className="orn absolute inset-x-0 bottom-0" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-6 md:grid-cols-[1.25fr_1fr] md:gap-4">
          <div className="text-center md:text-start">
            <p className="gold-eyebrow !text-[#f6e2b3] text-xs md:text-sm">Legal Research &amp; Insights</p>
            <h1 className="blog-hero-name grad-text mt-2 font-bold leading-[1.15]" style={{ fontFamily: "var(--font-blog-stack)", fontSize: "clamp(6.5rem, 22vw, 16rem)" }}>
              المدونة
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg font-light leading-9 text-white/85 md:mx-0 md:text-xl md:leading-10">
              بحوث وتحليلات نظامية في قضايا الشركات والعقود والتقاضي، مكتوبة لصانع القرار قبل أن تكون للمتخصص.
            </p>
            <dl className="mx-auto mt-10 grid max-w-xl grid-cols-3 gap-3 md:mx-0">
              {stats.map((s) => (
                <div key={s.l} className="chamfer border border-white/12 bg-[#00124a]/70 px-3 py-5 text-center backdrop-blur-sm">
                  <dt className="sr-only">{s.l}</dt>
                  <dd>
                    <span className="font-display grad-text block text-4xl font-light md:text-5xl">{s.n}</span>
                    <span className="mt-1 block text-sm font-light text-white/75">{s.l}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 hidden items-center gap-3 text-xs font-light text-white/60 md:flex">
              <span aria-hidden className="h-px w-10 bg-[#e0b35a]/60" />
              حرّك الماوس: الشعار يتبعك
            </p>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-[22rem] md:max-w-none">
            <Logo3DFollow />
          </div>
        </div>
      </section>

      {/* a ribbon of the subjects the blog covers, drifting past between the hero and the archive */}
      <div aria-hidden className="border-y border-[#e0b35a]/25 bg-[#00124a]/60 py-4 backdrop-blur-sm">
        <Marquee ornate duration={46} items={["التحكيم", "العقود التجارية", "حوكمة الشركات", "الاستثمار الأجنبي", "الامتثال", "الاندماج والاستحواذ", "حماية البيانات الشخصية", "تنفيذ الأحكام", "الإفلاس وإعادة الهيكلة", "الملكية الفكرية"]} />
      </div>

      <ArticleExplorer articles={summaries} clusters={clusters} />

      <section className="mt-24 border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-5">
          <NewsletterSignup source="blog" />
        </div>
      </section>
    </BlogScene>
  );
}
