"use client";

import { useState } from "react";

const items = [
  { key: "wa", label: "واتساب", href: (u: string, t: string) => `https://wa.me/?text=${encodeURIComponent(`${t}\n${u}`)}` },
  { key: "x", label: "X", href: (u: string, t: string) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(t)}&url=${encodeURIComponent(u)}` },
  { key: "in", label: "LinkedIn", href: (u: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(u)}` },
];

/** Share and print row for an article: WhatsApp, X, LinkedIn, copy link, print. */
export default function ShareBar({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const cls = "border border-[#00124a]/20 px-4 py-2 text-sm text-[#00124a] transition-colors hover:border-[#e0b35a] hover:bg-[#f4f5fe]";
  return (
    <div className="flex flex-wrap items-center gap-2.5 border-y border-[#00124a]/12 py-4" aria-label="مشاركة المقال">
      <span className="me-2 text-sm text-ink-soft">شارك المقال</span>
      {items.map((i) => (
        <a key={i.key} href={i.href(url, title)} target="_blank" rel="noopener noreferrer" className={cls}>
          {i.label}
        </a>
      ))}
      <button
        type="button"
        className={cls}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          } catch {}
        }}
      >
        {copied ? "تم النسخ" : "انسخ الرابط"}
      </button>
      <button type="button" className={`${cls} print:hidden`} onClick={() => window.print()}>
        طباعة
      </button>
    </div>
  );
}
