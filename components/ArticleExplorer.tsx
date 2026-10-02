"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import ArticlePoster from "@/components/ArticlePoster";
import { articlePhoto } from "@/lib/article-photos";
import { readLabel } from "@/lib/article-meta";
import { entryNumber } from "@/lib/article-index";

export type ArticleSummary = {
  slug: string;
  cluster: string;
  clusterLabel: string;
  clusterLabelEn: string;
  title: string;
  description: string;
  date: string;
  day: string;
  month: string;
  readMinutes: number;
  searchText: string;
  audiences: { key: string; label: string }[];
};

export type ClusterOption = { key: string; label: string; count: number };

const PAGE = 9;

const topicNote: Record<string, string> = {
  corporate: "حوكمة الشركات ومسؤولية المديرين واتفاقيات الشركاء وفضّ نزاعاتهم.",
  contracts: "صياغة العقود التجارية وإنهاؤها والتعويضات والقوة القاهرة.",
  disputes: "الإثبات، والتسوية مقابل التقاضي، وتحصيل المديونيات التجارية.",
  individuals: "العمل والميراث والإيجار والوكالات وحقوق الأفراد.",
};

const tab = (on: boolean) =>
  `shrink-0 border-b px-1 pb-2 pt-1 text-sm transition-colors duration-200 ${on ? "border-[#e0b35a] text-[#f6e2b3]" : "border-transparent text-white/60 hover:text-white"}`;

const poster = (a: ArticleSummary) => ({
  slug: a.slug,
  cluster: a.cluster,
  clusterLabel: a.clusterLabel,
  title: a.title,
  description: a.description,
  date: a.date,
  meta: readLabel(a.readMinutes),
  index: entryNumber(a.slug),
});

export default function ArticleExplorer({ articles, clusters }: { articles: ArticleSummary[]; clusters: ClusterOption[] }) {
  const [cluster, setCluster] = useState("all");
  const [audience, setAudience] = useState("all");
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "index">("grid");
  const [shown, setShown] = useState(PAGE);

  useEffect(() => {
    const a = new URLSearchParams(window.location.search).get("audience");
    if (a && ["individuals", "companies", "institutions"].includes(a)) requestAnimationFrame(() => setAudience(a));
  }, []);

  const q = query.trim();
  const filtering = cluster !== "all" || audience !== "all" || q !== "";

  const filtered = useMemo(
    () =>
      articles.filter(
        (a) =>
          (cluster === "all" || a.cluster === cluster) &&
          (audience === "all" || a.audiences.some((x) => x.key === audience)) &&
          (q === "" || a.searchText.includes(q)),
      ),
    [articles, cluster, audience, q],
  );

  const cover = !filtering && view === "grid" ? articles[0] : null;
  const rest = cover ? filtered.filter((a) => a.slug !== cover.slug) : filtered;
  const visible = view === "grid" ? rest.slice(0, shown) : filtered;

  const audienceChips = [
    { key: "all", label: "كل الجمهور" },
    { key: "individuals", label: "للأفراد" },
    { key: "companies", label: "للشركات" },
    { key: "institutions", label: "للمؤسسات" },
  ];
  const clusterChips = [{ key: "all", label: "كل المحاور", count: articles.length }, ...clusters];
  const reset = (fn: () => void) => () => {
    fn();
    setShown(PAGE);
  };

  return (
    <div>
      {cover && (
        <div className="mx-auto max-w-[92rem] px-4 md:px-8">
          <p className="mb-5 flex items-center gap-3 text-sm text-[#f6e2b3]">
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-[#e0b35a]" /> أحدث ما نُشر
          </p>
          <ArticlePoster a={poster(cover)} size="spread" priority sizesAttr="100vw" />
        </div>
      )}

      {!filtering && view === "grid" && (
        <div className="mx-auto mt-16 max-w-[92rem] px-4 md:px-8">
          <p className="mb-5 flex items-center gap-3 text-sm text-[#f6e2b3]">
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-[#e0b35a]" /> تصفّح بحسب المحور
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {clusters.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => {
                  setCluster(c.key);
                  setShown(PAGE);
                  document.getElementById("archive")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="group frame relative bg-[#00124a] p-6 text-start ring-1 ring-white/10 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(224,179,90,0.35)]"
              >
                <span className="font-display block text-7xl font-extralight leading-none text-transparent [-webkit-text-stroke:1px_rgba(246,226,179,0.8)] transition-[-webkit-text-stroke] duration-500 group-hover:[-webkit-text-stroke:1px_#f6e2b3]" dir="ltr">
                  {String(c.count).padStart(2, "0")}
                </span>
                <span className="font-display mt-5 block text-2xl font-light text-white">{c.label}</span>
                <span className="mt-2 block text-sm font-light leading-7 text-white/60">{topicNote[c.key]}</span>
                <span className="mt-5 inline-flex items-center gap-2 text-sm text-[#f6e2b3]">
                  <span className="h-px w-6 bg-[#e0b35a] transition-all duration-300 group-hover:w-12" />
                  تصفّح المحور
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Filter rail — stays under the header while the archive scrolls */}
      <div id="archive" className="z-30 mt-16 scroll-mt-24 border-y border-white/10 bg-[#00061d]/90 backdrop-blur-xl md:sticky md:top-[4.9rem]">
        <div className="mx-auto flex max-w-[92rem] flex-col gap-4 px-4 py-4 md:px-8">
          <div className="flex items-center gap-4">
            <div data-lenis-prevent className="flex min-w-0 flex-1 gap-6 overflow-x-auto [scrollbar-width:none]">
              {clusterChips.map((c) => (
                <button key={c.key} type="button" onClick={reset(() => setCluster(c.key))} className={tab(cluster === c.key)}>
                  {c.label} <span className="text-[11px] opacity-50">{c.count}</span>
                </button>
              ))}
            </div>
            <div className="hidden shrink-0 items-center gap-px border border-white/15 sm:flex" role="group" aria-label="طريقة العرض">
              {(["grid", "index"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  aria-pressed={view === v}
                  className={`px-4 py-1.5 text-xs transition-colors ${view === v ? "bg-[#e0b35a] text-[#00061d]" : "text-white/60 hover:text-white"}`}
                >
                  {v === "grid" ? "معرض" : "فهرس"}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div data-lenis-prevent className="flex min-w-0 flex-1 gap-5 overflow-x-auto [scrollbar-width:none]">
              {audienceChips.map((c) => (
                <button key={c.key} type="button" onClick={reset(() => setAudience(c.key))} className={`${tab(audience === c.key)} !text-xs`}>
                  {c.label}
                </button>
              ))}
            </div>
            <label className="relative block w-full sm:w-72">
              <span className="sr-only">ابحث في الأبحاث</span>
              <svg aria-hidden viewBox="0 0 24 24" className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#f6e2b3]/70" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="11" cy="11" r="6.5" />
                <path d="m16 16 4 4" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShown(PAGE);
                }}
                placeholder="ابحث في الأبحاث"
                className="w-full border border-white/15 bg-white/5 py-2.5 ps-10 pe-4 text-sm text-white outline-none transition-colors placeholder:text-white/40 focus:border-[#e0b35a]"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-[92rem] px-4 md:px-8">
        <p className="mb-8 text-xs text-white/50">
          {filtered.length === articles.length ? `${articles.length} مقالة` : `${filtered.length} من ${articles.length} مقالة`}
        </p>

        {view === "grid" ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((a) => (
                <ArticlePoster key={a.slug} a={poster(a)} className="h-full" />
              ))}
            </div>
            {rest.length > shown && (
              <div className="mt-14 text-center">
                <button type="button" onClick={() => setShown((n) => n + PAGE)} className="btn btn-ghost chamfer-btn px-10 py-3.5 text-base">
                  عرض المزيد · {rest.length - shown}
                </button>
              </div>
            )}
          </>
        ) : (
          <ol className="divide-y divide-white/10 border-y border-white/10">
            {filtered.map((a) => {
              const photo = articlePhoto(a.slug);
              return (
                <li key={a.slug}>
                  <Link href={`/blog/${a.slug}`} className="group flex items-center gap-5 py-6 transition-colors hover:bg-white/[0.04] md:gap-8 md:px-4">
                    <span className="font-display w-12 shrink-0 text-3xl font-extralight text-[#f6e2b3]/70" dir="ltr">{entryNumber(a.slug)}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs text-[#f6e2b3]">{a.clusterLabel}</span>
                      <span className="font-display mt-1 block text-xl font-light leading-snug text-white transition-colors group-hover:text-[#f6e2b3] md:text-3xl">{a.title}</span>
                    </span>
                    <span className="hidden shrink-0 text-xs text-white/50 md:block">{a.date}</span>
                    <span className="relative hidden h-16 w-0 shrink-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:w-32 group-hover:opacity-100 md:block">
                      {photo && <Image src={photo.src} alt="" fill sizes="128px" className="object-cover" style={{ objectPosition: photo.focus }} />}
                    </span>
                    <span aria-hidden className="text-xl text-[#f6e2b3] transition-transform group-hover:-translate-x-1.5">←</span>
                  </Link>
                </li>
              );
            })}
          </ol>
        )}

        {filtered.length === 0 && <p className="py-16 text-center text-sm text-white/60">لا توجد مقالات مطابقة لبحثك.</p>}
      </div>
    </div>
  );
}
