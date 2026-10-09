const copy = {
  ar: { button: "دخول العملاء", label: "دخول بوابة العملاء" },
  en: { button: "Client sign-in", label: "Client portal sign-in" },
};

function Lock({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </svg>
  );
}

/**
 * The public header offers the client portal only. The firm's own management sign-in is not linked from the site
 * (staff use its address directly), so visitors and scanners are not pointed at it.
 */
export default function LoginMenu({ locale = "ar", floating = false }: { locale?: "ar" | "en"; floating?: boolean }) {
  const t = copy[locale];
  return (
    <a
      href="/portal/login"
      aria-label={t.label}
      className={`chamfer-btn flex items-center gap-1.5 whitespace-nowrap border px-3.5 py-2 text-xs font-normal transition-colors ${
        floating ? "border-ink/20 text-ink/70 hover:text-gold-deep" : "border-white/30 text-white/90 hover:bg-white/10 hover:text-white"
      }`}
    >
      <Lock className="h-3.5 w-3.5" />
      {t.button}
    </a>
  );
}
