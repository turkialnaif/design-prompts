export default function SectionHeading({
  number,
  eyebrow,
  title,
  align = "center",
  tone = "onDark",
  size = "md",
}: {
  number?: string;
  eyebrow: string;
  title: string;
  align?: "start" | "center";
  tone?: "onDark" | "onLight";
  size?: "md" | "xl";
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-start"}>
      {number && (
        <div className={`mb-4 flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`} aria-hidden>
          <span className="h-px w-10 bg-gold/70" />
          <span className={`font-display text-sm font-bold tracking-[0.3em] ${tone === "onDark" ? "text-[#e6c988]" : "text-gold-deep"}`}>{number}</span>
          <span className="h-px w-10 bg-gold/70" />
        </div>
      )}
      <h2
        className={`font-display font-bold leading-[1.3] ${size === "xl" ? "text-4xl md:text-6xl lg:text-7xl" : "text-2xl md:text-4xl"} ${
          tone === "onDark" ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      <p className={`gold-eyebrow ${size === "xl" ? "mt-4 text-sm md:text-base" : "mt-2 text-xs md:text-sm"}`}>{eyebrow}</p>
    </div>
  );
}
