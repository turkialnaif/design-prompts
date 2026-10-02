import { blurProps } from "@/lib/blur";
import Image from "next/image";
import { articlePhoto } from "@/lib/article-photos";

type Cluster = "corporate" | "contracts" | "disputes" | "individuals";

/** غلاف مرسوم لكل محور: خطوط ذهبية رفيعة على كحلي مسطّح. */
export default function ArticleCover({
  cluster,
  slug,
  className = "",
  badge,
}: {
  cluster: string;
  slug?: string;
  className?: string;
  badge?: { day: string; month: string };
}) {
  const c = cluster as Cluster;
  const photo = slug ? articlePhoto(slug) : undefined;
  if (photo) {
    return (
      <div className={`relative isolate w-full overflow-hidden rounded-2xl bg-[#00124a] ${className}`}>
        <Image src={photo.src} {...blurProps(photo.src)} alt={photo.alt} fill sizes="(min-width: 1024px) 400px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" style={{ objectPosition: photo.focus }} />
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,18,32,0.05)_40%,rgba(8,18,32,0.45)_100%)]" />
        {badge && (
          <div className="absolute start-3 top-3 rounded-lg bg-[#00124a]/85 px-3 py-1.5 text-center leading-tight text-white ring-1 ring-[#9b88d7]/60 backdrop-blur-sm">
            <div className="font-display text-lg font-bold">{badge.day}</div>
            <div className="text-[10px] text-[#f6e2b3]">{badge.month}</div>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className={`relative w-full overflow-hidden rounded-2xl bg-[#00124a] ${className}`} aria-hidden>
      <svg viewBox="0 0 320 120" className="absolute inset-0 h-full w-full" fill="none" stroke="#9b88d7" preserveAspectRatio="xMidYMid slice">
        <rect x="6" y="6" width="308" height="108" rx="10" strokeWidth="0.6" opacity="0.5" />
        {c === "corporate" && (
          <g>
            <path d="M120 34h80M128 44h64" strokeWidth="1.4" />
            {[132, 156, 180].map((x) => (
              <path key={x} d={`M${x} 52V92`} strokeWidth="6" strokeLinecap="butt" opacity="0.9" />
            ))}
            <path d="M112 96h96" strokeWidth="1.2" />
          </g>
        )}
        {c === "contracts" && (
          <g>
            <rect x="122" y="26" width="76" height="70" rx="4" strokeWidth="1.2" />
            <path d="M134 44h52M134 54h52M134 64h36" strokeWidth="1.2" />
            <circle cx="182" cy="82" r="8" strokeWidth="1.2" />
            <path d="M178 82l3 3 5-6" strokeWidth="1.2" />
          </g>
        )}
        {c === "disputes" && (
          <g>
            <path d="M160 28v62M118 40h84" strokeWidth="1.4" />
            <path d="M124 40l-14 26h28zM196 40l-14 26h28z" strokeWidth="1.2" />
            <path d="M108 66h32M180 66h32M140 92h40" strokeWidth="1.2" />
          </g>
        )}
        {c === "individuals" && (
          <g>
            <circle cx="160" cy="44" r="12" strokeWidth="1.3" />
            <path d="M132 96c0-16 12-26 28-26s28 10 28 26" strokeWidth="1.3" />
            <path d="M112 100h96" strokeWidth="1" opacity="0.7" />
          </g>
        )}
        <path d="M22 100h30M268 20h30" strokeWidth="0.6" opacity="0.6" />
      </svg>
      {badge && (
        <div className="absolute start-3 top-3 rounded-lg bg-[#00124a]/90 px-3 py-1.5 text-center leading-tight text-white ring-1 ring-[#9b88d7]/60">
          <div className="font-display text-lg font-bold">{badge.day}</div>
          <div className="text-[10px] text-[#f6e2b3]">{badge.month}</div>
        </div>
      )}
    </div>
  );
}
