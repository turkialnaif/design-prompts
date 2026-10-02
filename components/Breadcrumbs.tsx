import Link from "next/link";
import { firm } from "@/lib/site";

export type Crumb = { label: string; href: string };

/** Visible trail plus BreadcrumbList structured data. The last crumb is the current page and is not a link. */
export default function Breadcrumbs({ items, locale }: { items: Crumb[]; locale: "ar" | "en" }) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: `${firm.website}${c.href === "/" ? "" : c.href}` })),
  };
  return (
    <nav aria-label={locale === "ar" ? "مسار التصفح" : "Breadcrumb"} className="mx-auto max-w-6xl px-5 pt-8 text-xs text-ink-soft/70">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((c, i) => (
          <li key={c.href} className="flex items-center gap-2">
            {i < items.length - 1 ? (
              <Link href={c.href} className="transition-colors hover:text-[#00124a]">{c.label}</Link>
            ) : (
              <span aria-current="page" className="text-[#00124a]">{c.label}</span>
            )}
            {i < items.length - 1 && <span aria-hidden className="text-ink-soft/40">{locale === "ar" ? "‹" : "›"}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
