import BrandIcon, { type BrandKey } from "@/components/BrandIcons";
import { firm } from "@/lib/site";

type Platform = { key: string; icon: BrandKey; label: string; labelAr: string; href: string; hover: string; ink: string };

/** The brand colour each tile takes on hover; the glyph itself is always the platform's own official mark. */
const platforms: Platform[] = [
  { key: "x", icon: "x", label: "X", labelAr: "إكس", href: firm.social.x, hover: "hover:border-white hover:bg-white hover:text-black", ink: "hover:text-white" },
  { key: "linkedin", icon: "linkedin", label: "LinkedIn", labelAr: "لينكدإن", href: firm.social.linkedin, hover: "hover:border-[#0a66c2] hover:bg-[#0a66c2] hover:text-white", ink: "hover:text-[#4aa3ff]" },
  { key: "instagram", icon: "instagram", label: "Instagram", labelAr: "إنستغرام", href: firm.social.instagram, hover: "hover:border-transparent hover:bg-[linear-gradient(45deg,#f9a825_0%,#ee2a7b_50%,#6228d7_100%)] hover:text-white", ink: "hover:text-[#ff4f8b]" },
  { key: "tiktok", icon: "tiktok", label: "TikTok", labelAr: "تيك توك", href: firm.social.tiktok, hover: "hover:border-[#25f4ee] hover:bg-black hover:text-white hover:shadow-[3px_3px_0_#fe2c55,-3px_-3px_0_#25f4ee]", ink: "hover:text-[#25f4ee] hover:[filter:drop-shadow(2px_2px_0_#fe2c55)]" },
  { key: "snapchat", icon: "snapchat", label: "Snapchat", labelAr: "سناب شات", href: firm.social.snapchat, hover: "hover:border-[#fffc00] hover:bg-[#fffc00] hover:text-black", ink: "hover:text-[#fffc00]" },
  { key: "facebook", icon: "facebook", label: "Facebook", labelAr: "فيسبوك", href: firm.social.facebook, hover: "hover:border-[#1877f2] hover:bg-[#1877f2] hover:text-white", ink: "hover:text-[#4c9bff]" },
  { key: "whatsappChannel", icon: "whatsapp", label: "WhatsApp Channel", labelAr: "قناة واتساب", href: firm.social.whatsappChannel, hover: "hover:border-[#25d366] hover:bg-[#25d366] hover:text-white", ink: "hover:text-[#25d366]" },
];

export default function SocialIcons({
  tone = "onDark",
  className = "",
  buttonClass,
  iconSize = 15,
  variant = "round",
  locale = "ar",
}: {
  tone?: "onDark" | "onLight";
  className?: string;
  /** replaces the default round button (for larger or custom treatments) */
  buttonClass?: string;
  iconSize?: number;
  /** "round": small circles; "tiles": square tiles; "plain": bare glyphs that take the platform's colour on hover */
  variant?: "round" | "tiles" | "plain";
  locale?: "ar" | "en";
}) {
  const iconColor =
    tone === "onDark" ? "text-white/60 hover:text-gold" : "text-ink-soft/80 hover:text-gold-deep";

  if (variant === "plain") {
    return (
      <ul className={`flex flex-wrap items-center gap-x-5 gap-y-3 ${className}`}>
        {platforms.map((p) => {
          const name = locale === "ar" ? p.labelAr : p.label;
          return (
            <li key={p.key}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={p.label}
                title={name}
                className={`group relative flex h-11 w-9 items-center justify-center text-white/65 transition-all duration-300 hover:-translate-y-0.5 hover:scale-125 ${p.ink}`}
              >
                <BrandIcon name={p.icon} size={iconSize} />
                <span aria-hidden className="pointer-events-none absolute -bottom-3 start-1/2 h-px w-0 -translate-x-1/2 bg-current transition-all duration-300 group-hover:w-6" />
              </a>
            </li>
          );
        })}
      </ul>
    );
  }

  if (variant === "tiles") {
    return (
      <ul className={`flex flex-wrap items-center gap-2 md:flex-nowrap ${className}`}>
        {platforms.map((p) => {
          const name = locale === "ar" ? p.labelAr : p.label;
          return (
            <li key={p.key}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={p.label}
                title={name}
                className={`group relative flex h-12 w-12 items-center justify-center border border-white/15 bg-white/[0.04] text-white/85 transition-all duration-300 [clip-path:polygon(0_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%)] hover:-translate-y-1 ${p.hover}`}
              >
                <BrandIcon name={p.icon} size={20} />
              </a>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {platforms.map((p) => (
        <a
          key={p.key}
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={p.label}
          className={buttonClass ?? `flex h-8 w-8 items-center justify-center rounded-full border border-current/20 transition-colors ${iconColor}`}
        >
          <BrandIcon name={p.icon} size={iconSize} />
        </a>
      ))}
    </div>
  );
}
