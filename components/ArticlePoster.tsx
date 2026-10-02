import Image from "next/image";
import Link from "next/link";
import { blurProps } from "@/lib/blur";
import { articlePhoto } from "@/lib/article-photos";

export type PosterData = {
  slug: string;
  cluster: string;
  clusterLabel: string;
  title: string;
  description?: string;
  date?: string;
  meta?: string;
};

/**
 * Dark article card. The photographs are small originals, so they are always shown inside a fixed frame at
 * (or near) their native size, never stretched across the page. `hero` lays the card out side by side.
 */
export default function ArticlePoster({
  a,
  size = "md",
  className = "",
  sizesAttr = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
}: {
  a: PosterData;
  size?: "hero" | "md";
  className?: string;
  sizesAttr?: string;
  priority?: boolean;
}) {
  const photo = articlePhoto(a.slug);
  const hero = size === "hero";
  return (
    <Link
      href={`/blog/${a.slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-[1.5rem] bg-[#00124a] ring-1 ring-white/10 transition-all duration-500 hover:-translate-y-1 hover:ring-[#f6e2b3]/70 ${hero ? "md:flex-row" : ""} ${className}`}
    >
      <div className={`relative shrink-0 overflow-hidden bg-[#00124a] ${hero ? "h-64 md:h-auto md:w-[26rem]" : "h-56"}`}>
        {photo && (
          <Image
            src={photo.src}
            {...blurProps(photo.src)}
            alt={photo.alt}
            fill
            priority={priority}
            quality={90}
            sizes={hero ? "(min-width: 768px) 416px, 100vw" : sizesAttr}
            className="object-cover saturate-[0.7] transition-all duration-700 group-hover:scale-[1.04] group-hover:saturate-100"
            style={{ objectPosition: photo.focus }}
          />
        )}
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(12,26,43,0.55)_100%)]" />
      </div>

      <div className={`relative flex flex-1 flex-col ${hero ? "p-7 md:p-12" : "p-6"}`}>
        <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#f6e2b3]">
          <span className="h-px w-6 bg-[#f6e2b3]" />
          {a.clusterLabel}
        </span>
        <h3 className={`font-display mt-3 font-bold leading-[1.4] text-white ${hero ? "text-2xl md:text-4xl" : "text-xl"}`}>{a.title}</h3>
        {a.description && <p className={`mt-3 text-white/70 ${hero ? "text-base leading-8 md:text-lg md:leading-9" : "line-clamp-3 text-sm leading-7"}`}>{a.description}</p>}
        <div className="mt-auto flex items-center justify-between gap-4 pt-6 text-xs text-white/55">
          <span>{[a.date, a.meta].filter(Boolean).join(" · ")}</span>
          <span className="inline-flex items-center gap-1.5 font-semibold text-[#f6e2b3] transition-transform duration-300 group-hover:-translate-x-1.5">
            اقرأ <span aria-hidden>←</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
