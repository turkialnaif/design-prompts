import Image from "next/image";
import { blurProps } from "@/lib/blur";
import { newestFirst } from "@/lib/article-index";
import type { Metadata } from "next";
import ArticleExplorer, { type ArticleSummary, type ClusterOption } from "@/components/ArticleExplorer";
import { articles, type Article } from "@/lib/articles";
import { audienceLabels, audiencesOf } from "@/lib/article-meta";
import NewsletterSignup from "@/components/NewsletterSignup";
import { firm } from "@/lib/site";

export const metadata: Metadata = {
  title: "مقالات قانونية",
  description: `مقالات ومحتوى قانوني من ${firm.nameShortAr} حول قضايا الشركات، العقود، التحكيم، والامتثال في السعودية.`,
  alternates: { canonical: "/blog" },
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
    <div className="bg-[#050c14] text-white">
      <section className="relative isolate overflow-hidden px-5 pb-16 pt-36 text-center md:pb-24 md:pt-48">
        <Image src="/brand/riyadh-skyline.jpg" {...blurProps("/brand/riyadh-skyline.jpg")} alt="" fill priority sizes="100vw" className="-z-20 object-cover opacity-45" style={{ objectPosition: "center 45%" }} />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,12,20,0.55)_0%,rgba(5,12,20,0.4)_40%,#050c14_100%)]" />

        <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#e6c988]">Legal Research &amp; Insights</p>
        <h1
          className="mx-auto mt-4 bg-gradient-to-b from-[#fbeec6] via-[#e6c988] to-[#b98d3c] bg-clip-text font-bold leading-[1.25] text-transparent"
          style={{ fontFamily: "var(--font-ruqaa), serif", fontSize: "clamp(7rem, 26vw, 27rem)" }}
        >
          المدونة
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-base leading-8 text-white/80 md:text-lg md:leading-9">
          بحوث وتحليلات نظامية في قضايا الشركات والعقود والتقاضي، مكتوبة لصانع القرار قبل أن تكون للمتخصص.
        </p>

        <dl className="mx-auto mt-12 flex max-w-xl items-stretch justify-center divide-x divide-x-reverse divide-[#e6c988]/35">
          {stats.map((s) => (
            <div key={s.l} className="flex-1 px-4">
              <dt className="sr-only">{s.l}</dt>
              <dd>
                <span className="font-display block text-4xl font-extrabold text-white md:text-6xl">{s.n}</span>
                <span className="mt-1 block text-xs font-semibold tracking-wide text-white/60 md:text-sm">{s.l}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <ArticleExplorer articles={summaries} clusters={clusters} />

      <section className="mt-24 border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-5">
          <NewsletterSignup source="blog" />
        </div>
      </section>
    </div>
  );
}
