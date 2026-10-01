"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import ArticlePoster from "@/components/ArticlePoster";
import { articlePhoto } from "@/lib/article-photos";
import { readLabel } from "@/lib/article-meta";

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

const pill = (on: boolean) =>
  `shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold transition-all duration-200 ${
    on ? "bg-[#e6c988] text-[#08121f]" : "text-white/70 ring-1 ring-white/15 hover:text-[#e6c988] hover:ring-[#e6c988]/60"
  }`;

export default function ArticleExplorer({ articles, clusters }: { articles: ArticleSummary[]; clusters: ClusterOption[] }) {
  const [cluster, setCluster] = useState("all");
  const [audience, setAudience] = useState("all");
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "index">("grid");

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

  const audienceChips = [
    { key: "all", label: "كل الجمهور" },
    { key: "individuals", label: "للأفراد" },
    { key: "companies", label: "للشركات" },
    { key: "institutions", label: "للمؤسسات" },
  ];
  const clusterChips = [{ key: "all", label: "كل المحاور", count: articles.length }, ...clusters];

  return (
    <div>
      {cover && (
        <div className="mx-auto max-w-[92rem] px-4 md:px-8">
          <p className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-[#e6c988]">
            <span className="h-px w-10 bg-[#e6c988]" /> أحدث ما نُشر
          </p>
          <ArticlePoster
            a={{ slug: cover.slug, cluster: cover.cluster, clusterLabel: cover.clusterLabel, title: cover.title, description: cover.description, date: cover.date, meta: readLabel(cover.readMinutes) }}
            size="hero"
            priority
          />
        </div>
      )}

      {/* Filter rail — stays under the header while the archive scrolls */}
      <div className="md:sticky md:top-16 z-30 mt-14 border-y border-white/10 bg-[#050c14]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[92rem] flex-col gap-3 px-4 py-3 md:px-8">
          <div className="flex items-center gap-3">
            <div data-lenis-prevent className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none]">
              {clusterChips.map((c) => (
                <button key={c.key} type="button" onClick={() => setCluster(c.key)} className={pill(cluster === c.key)}>
                  {c.label} <span className="text-[11px] opacity-60">{c.count}</span>
                </button>
              ))}
            </div>
            <div className="hidden shrink-0 items-center gap-1 rounded-full p-1 ring-1 ring-white/15 sm:flex" role="group" aria-label="طريقة العرض">
              {(["grid", "index"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  aria-pressed={view === v}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition-colors ${view === v ? "bg-white/15 text-white" : "text-white/55 hover:text-white"}`}
                >
                  {v === "grid" ? "معرض" : "فهرس"}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div data-lenis-prevent className="flex min-w-0 flex-1 gap-2 overflow-x-auto [scrollbar-width:none]">
              {audienceChips.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setAudience(c.key)}
                  className={`shrink-0 border-b-2 px-1 pb-1 text-xs font-semibold transition-colors ${audience === c.key ? "border-[#e6c988] text-[#e6c988]" : "border-transparent text-white/55 hover:text-white"}`}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث في الأبحاث"
              aria-label="ابحث في الأبحاث"
              className="w-full rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#e6c988] sm:w-64"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-[92rem] px-4 md:px-8">
        <p className="mb-6 text-xs text-white/50">
          {filtered.length === articles.length ? `${articles.length} مقالة` : `${filtered.length} من ${articles.length} مقالة`}
        </p>

        {view === "grid" ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => (
              <ArticlePoster
                key={a.slug}
                a={{ slug: a.slug, cluster: a.cluster, clusterLabel: a.clusterLabel, title: a.title, description: a.description, date: a.date, meta: readLabel(a.readMinutes) }}
                className="h-full"
              />
            ))}
          </div>
        ) : (
          <ol className="divide-y divide-white/10 border-y border-white/10">
            {filtered.map((a) => {
              const photo = articlePhoto(a.slug);
              return (
                <li key={a.slug}>
                  <Link href={`/blog/${a.slug}`} className="group flex items-center gap-4 py-5 transition-colors hover:bg-white/[0.04] md:gap-8 md:px-4">
                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#e6c988]">{a.clusterLabel}</span>
                      <span className="font-display mt-1 block text-lg font-bold leading-snug text-white transition-colors group-hover:text-[#e6c988] md:text-2xl">{a.title}</span>
                    </span>
                    <span className="hidden shrink-0 text-xs text-white/50 md:block">{a.date}</span>
                    <span className="relative hidden h-16 w-0 shrink-0 overflow-hidden rounded-xl opacity-0 transition-all duration-500 group-hover:w-32 group-hover:opacity-100 md:block">
                      {photo && <Image src={photo.src} alt="" fill sizes="128px" className="object-cover" style={{ objectPosition: photo.focus }} />}
                    </span>
                    <span aria-hidden className="text-xl text-[#e6c988] transition-transform group-hover:-translate-x-1.5">←</span>
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
