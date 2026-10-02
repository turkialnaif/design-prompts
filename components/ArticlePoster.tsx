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
  index?: string;
};

/**
 * An article as a bracketed plate. `spread` is the featured layout: a tall photograph beside a large
 * title. Photographs are small originals, so they sit in a fixed frame at (or near) native size.
 * The entry number is set large in outline gold; on hover the photograph wakes up from monochrome.
 */
export default function ArticlePoster({
  a,
  size = "md",
  className = "",
  sizesAttr = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
}: {
  a: PosterData;
  size?: "spread" | "md";
  className?: string;
  sizesAttr?: string;
  priority?: boolean;
}) {
  const photo = articlePhoto(a.slug);
  const spread = size === "spread";
  return (
    <Link
      href={`/blog/${a.slug}`}
      className={`group frame relative flex flex-col overflow-hidden bg-[#00124a] ring-1 ring-white/10 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(224,179,90,0.35)] ${spread ? "md:flex-row" : ""} ${className}`}
    >
      <div className={`relative shrink-0 overflow-hidden bg-[#00124a] ${spread ? "h-72 md:h-auto md:min-h-[30rem] md:w-[44%]" : "h-56"}`}>
        {photo && (
          <Image
            src={photo.src}
            {...blurProps(photo.src)}
            alt={photo.alt}
            fill
            priority={priority}
            quality={90}
            sizes={spread ? "(min-width: 768px) 44vw, 100vw" : sizesAttr}
            className="object-cover saturate-[0.55] transition-all duration-[900ms] group-hover:scale-[1.05] group-hover:saturate-100"
            style={{ objectPosition: photo.focus }}
          />
        )}
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,6,29,0.15)_0%,rgba(0,6,29,0.1)_50%,rgba(0,18,74,0.85)_100%)]" />
        {a.index && (
          <span aria-hidden className="font-display absolute bottom-3 start-4 text-6xl font-extralight leading-none text-transparent [-webkit-text-stroke:1px_rgba(246,226,179,0.85)] md:text-7xl" dir="ltr">
            {a.index}
          </span>
        )}
      </div>

      <div className={`relative flex flex-1 flex-col ${spread ? "p-7 md:p-12" : "p-6"}`}>
        <span className="inline-flex items-center gap-2 text-xs text-[#f6e2b3]">
          <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-[#e0b35a]" />
          {a.clusterLabel}
        </span>
        <h3 className={`font-display mt-4 font-light leading-[1.4] text-white ${spread ? "text-3xl md:text-5xl md:leading-[1.3]" : "text-2xl"}`}>{a.title}</h3>
        {a.description && <p className={`mt-4 font-light text-white/70 ${spread ? "text-base leading-8 md:text-lg md:leading-9" : "line-clamp-3 text-sm leading-7"}`}>{a.description}</p>}
        <div className="mt-auto flex items-center justify-between gap-4 pt-7 text-xs text-white/55">
          <span>{[a.date, a.meta].filter(Boolean).join(" · ")}</span>
          <span className="inline-flex items-center gap-2 text-[#f6e2b3]">
            <span className="h-px w-6 bg-[#e0b35a] transition-all duration-300 group-hover:w-12" />
            اقرأ
          </span>
        </div>
      </div>
    </Link>
  );
}
