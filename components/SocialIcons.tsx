import { firm } from "@/lib/site";

const icons = {
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  x: <path d="M4 4l16 16M20 4L4 20" />,
  tiktok: (
    <>
      <circle cx="9" cy="17" r="3" />
      <path d="M12 3v14" />
      <path d="M12 7a5 5 0 0 0 5 5" />
    </>
  ),
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
    </>
  ),
  facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
};

const platforms: { key: keyof typeof icons; label: string; href: string }[] = [
  { key: "linkedin", label: "LinkedIn", href: firm.social.linkedin },
  { key: "x", label: "X", href: firm.social.x },
  { key: "instagram", label: "Instagram", href: firm.social.instagram },
  { key: "tiktok", label: "TikTok", href: firm.social.tiktok },
  { key: "facebook", label: "Facebook", href: firm.social.facebook },
];

export default function SocialIcons({
  tone = "onDark",
  className = "",
}: {
  tone?: "onDark" | "onLight";
  className?: string;
}) {
  const iconColor =
    tone === "onDark" ? "text-white/60 hover:text-gold" : "text-ink-soft/60 hover:text-gold-deep";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {platforms.map((p) => (
        <a
          key={p.key}
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={p.label}
          className={`flex h-8 w-8 items-center justify-center rounded-full border border-current/20 transition-colors ${iconColor}`}
        >
          <svg
            viewBox="0 0 24 24"
            width="15"
            height="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {icons[p.key]}
          </svg>
        </a>
      ))}
    </div>
  );
}
