/**
 * The one section heading used across the site. The order never changes: a hairline number (optional),
 * the English eyebrow, the title, then an optional lead. On navy the title carries the champagne-to-gold
 * gradient; on light surfaces it is solid deep navy. `as="h1"` is for page heroes only.
 */
export default function SectionHeading({
  as: Heading = "h2",
  number,
  eyebrow,
  title,
  lead,
  align = "center",
  tone = "onDark",
}: {
  as?: "h1" | "h2";
  number?: string;
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "start" | "center";
  tone?: "onDark" | "onLight";
}) {
  const dark = tone === "onDark";
  const center = align === "center";
  return (
    <div className={center ? "text-center" : "text-start"}>
      {number && (
        <div className={`mb-4 flex items-center gap-3 ${center ? "justify-center" : ""}`} aria-hidden>
          <span className="h-px w-10 bg-[#e0b35a]/70" />
          <span className={`font-display text-sm tracking-[0.3em] ${dark ? "text-[#f6e2b3]" : "text-[#00124a]"}`}>{number}</span>
          <span className="h-px w-10 bg-[#e0b35a]/70" />
        </div>
      )}
      <p className={`gold-eyebrow text-xs md:text-sm ${dark ? "!text-[#f6e2b3]" : ""}`}>{eyebrow}</p>
      <Heading className={`font-display mt-4 text-4xl leading-[1.25] sm:text-5xl md:text-6xl ${dark ? "grad-text" : "text-[#00124a]"}`}>{title}</Heading>
      {lead && <p className={`mt-6 text-base font-light leading-8 md:text-lg md:leading-9 ${center ? "mx-auto max-w-2xl" : "max-w-xl"} ${dark ? "text-white/80" : "text-ink-soft"}`}>{lead}</p>}
    </div>
  );
}
