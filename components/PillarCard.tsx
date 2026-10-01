import Link from "next/link";
import TiltCard from "@/components/TiltCard";

export default function PillarCard({
  href,
  label,
  title,
  titleEn,
  meta,
  ctaLabel = "تفاصيل الخدمة ←",
}: {
  href: string;
  label: string;
  title: string;
  titleEn: string;
  meta?: string;
  ctaLabel?: string;
}) {
  return (
    <TiltCard className="rounded-2xl">
      <Link
        href={href}
        className="group flex h-full flex-col rounded-2xl glass-card p-6 transition-transform duration-300 hover:-translate-y-1"
      >
        <span className="text-center text-sm font-semibold text-ink-soft/70">{label}</span>
        <h3 className="font-display mt-5 text-center text-xl font-bold text-ink">{title}</h3>
        <p className="gold-eyebrow mt-2 text-center text-xs">{titleEn}</p>
        {meta && <p className="mt-3 text-xs text-ink-soft/60">{meta}</p>}
        <span className="mt-5 text-center text-sm font-semibold text-gold-text opacity-0 transition-opacity group-hover:opacity-100">
          {ctaLabel}
        </span>
      </Link>
    </TiltCard>
  );
}
