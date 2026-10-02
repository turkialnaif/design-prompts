"use client";

import Link from "next/link";
import { useState } from "react";

export type LineItem = { slug: string; title: string; subtitle: string; summary: string; href?: string };

const copy = {
  ar: { search: "ابحث في خطوط الممارسة", more: "عرض الكل", less: "عرض أقل", none: "لا توجد خطوط مطابقة لبحثك.", details: "تفاصيل الخدمة ←" },
  en: { search: "Search practice lines", more: "Show all", less: "Show fewer", none: "No practice lines match your search.", details: "Service details →" },
};

const INITIAL = 9;

export default function SpecializedExplorer({ items, locale }: { items: LineItem[]; locale: "ar" | "en" }) {
  const t = copy[locale];
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);

  const q = query.trim().toLowerCase();
  const filtered = q
    ? items.filter((i) => `${i.title} ${i.subtitle} ${i.summary}`.toLowerCase().includes(q))
    : items;
  const visible = q || expanded ? filtered : filtered.slice(0, INITIAL);

  return (
    <div>
      <div className="mx-auto max-w-md">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.search}
          aria-label={t.search}
          className="glass-card w-full chamfer-btn px-6 py-3 text-center text-sm text-ink outline-none focus:ring-2 focus:ring-gold/50"
        />
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((line) => {
          const inner = (
            <>
              <h3 className="font-display text-lg font-bold text-ink">{line.title}</h3>
              <p className="gold-eyebrow mt-1 text-[11px]">{line.subtitle}</p>
              <p className="mt-3 text-sm leading-7 text-ink-soft/80">{line.summary}</p>
              {line.href && (
                <span className="mt-auto inline-block pt-4 text-sm font-semibold text-gold-deep opacity-0 transition-opacity group-hover:opacity-100">
                  {t.details}
                </span>
              )}
            </>
          );
          const cls =
            "group glass-card flex h-full flex-col items-center rounded-2xl p-6 text-center transition-transform duration-300 hover:-translate-y-1";
          return line.href ? (
            <Link key={line.slug} href={line.href} className={cls}>
              {inner}
            </Link>
          ) : (
            <div key={line.slug} className={cls}>
              {inner}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && <p className="mt-8 text-center text-sm text-ink-soft/70">{t.none}</p>}

      {!q && filtered.length > INITIAL && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="glass-card chamfer-btn px-8 py-3 text-sm font-semibold text-ink transition-all duration-200 hover:-translate-y-0.5 hover:text-gold-deep"
          >
            {expanded ? t.less : `${t.more} (${filtered.length})`}
          </button>
        </div>
      )}
    </div>
  );
}
