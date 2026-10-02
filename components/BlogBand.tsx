import Image from "next/image";
import Link from "next/link";
import ArrowButton from "@/components/ArrowButton";
import { articlePhoto } from "@/lib/article-photos";
import { blurProps } from "@/lib/blur";

export type BandItem = { slug: string; title: string; description: string; day: string; month: string };

function Card({ a, hidden }: { a: BandItem; hidden?: boolean }) {
  const photo = articlePhoto(a.slug);
  return (
    <Link
      href={`/blog/${a.slug}`}
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : undefined}
      className="group block w-[15.5rem] shrink-0 overflow-hidden rounded-2xl bg-[#fbf9f3] shadow-[0_18px_40px_-18px_rgba(0,0,0,0.55)] ring-1 ring-[#d0a751]/40 transition-transform duration-300 hover:-translate-y-1 md:w-[16.5rem]"
    >
      <div className="relative h-40 overflow-hidden bg-[#0f1e30]">
        {photo && (
          <Image
            src={photo.src}
            {...blurProps(photo.src)}
            alt=""
            fill
            sizes="264px"
            quality={90}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ objectPosition: photo.focus }}
          />
        )}
        <div className="absolute start-3 top-3 rounded-md bg-[#0a1420] px-3 py-1.5 text-center leading-tight text-white ring-1 ring-[#d0a751]/60">
          <div className="font-display text-lg font-bold">{a.day}</div>
          <div className="text-[10px] text-[#e6c988]">{a.month}</div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-display line-clamp-3 text-[15px] font-bold leading-snug text-ink">{a.title}</h3>
        <p className="mt-2 line-clamp-2 text-xs leading-6 text-ink-soft/80">{a.description}</p>
        <span className="mt-4 inline-block rounded-full bg-gradient-to-b from-[#f0d894] to-[#cfa64e] px-5 py-1.5 text-xs font-bold text-ink ring-1 ring-white/70">اقرأ المزيد</span>
      </div>
    </Link>
  );
}

function Column({ items, className }: { items: BandItem[]; className: string }) {
  return (
    <div className="blog-col overflow-hidden">
      <div className={`flex flex-col gap-5 ${className}`}>
        {[...items, ...items].map((a, i) => (
          <Card key={`${a.slug}-${i}`} a={a} hidden={i >= items.length} />
        ))}
      </div>
    </div>
  );
}

/** Home blog band: the title and one button on the start side, two columns of article cards drifting past on the other. */
export default function BlogBand({ items }: { items: BandItem[] }) {
  const half = Math.ceil(items.length / 2);
  const a = items.slice(0, half);
  const b = items.slice(half);
  return (
    <section data-glow className="relative isolate overflow-hidden bg-[linear-gradient(105deg,#0a1626_0%,#12233a_52%,#1c3554_78%,#3b4a3f_100%)]">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_45%_70%_at_0%_100%,rgba(208,167,81,0.28),transparent_70%)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:min-h-[40rem] lg:grid-cols-[1fr_1.1fr] lg:gap-6">
        <div className="pt-20 text-center lg:py-20 lg:text-start">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#e6c988]">Legal Insights</p>
          <h2 className="font-display mt-3 text-5xl font-bold text-white md:text-6xl">مدونتنا القانونية</h2>
          <p className="mx-auto mt-4 max-w-md text-lg leading-9 text-white/80 lg:mx-0">بحوث ومقالات نظامية في مختلف المواضيع القانونية، في مكان واحد.</p>
          <div className="mt-9 flex justify-center lg:justify-start">
            <ArrowButton href="/blog">زيارة المدونة</ArrowButton>
          </div>
        </div>

        <div
          dir="ltr"
          className="relative grid h-[30rem] grid-cols-1 gap-5 justify-items-center overflow-hidden sm:grid-cols-2 lg:h-[40rem]"
          style={{ maskImage: "linear-gradient(to bottom, transparent, #000 8%, #000 92%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 8%, #000 92%, transparent)" }}
        >
          <Column items={a} className="blog-up" />
          <div className="hidden w-full justify-items-center sm:grid">
            <Column items={b} className="blog-down mt-10" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blog-up { from { transform: translateY(0); } to { transform: translateY(calc(-50% - 0.625rem)); } }
        @keyframes blog-down { from { transform: translateY(calc(-50% - 0.625rem)); } to { transform: translateY(0); } }
        .blog-up { animation: blog-up 80s linear infinite; }
        .blog-down { animation: blog-down 95s linear infinite; }
        .blog-col:hover > div, .blog-col:focus-within > div { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .blog-up, .blog-down { animation: none; } }
      `}</style>
    </section>
  );
}
