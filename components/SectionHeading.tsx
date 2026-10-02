export default function SectionHeading({
  as: Heading = "h2",
  number,
  eyebrow,
  title,
  align = "center",
  tone = "onDark",
  size = "md",
}: {
  as?: "h1" | "h2";
  number?: string;
  eyebrow: string;
  title: string;
  align?: "start" | "center";
  tone?: "onDark" | "onLight";
  size?: "md" | "xl";
}) {
  const dark = tone === "onDark";
  return (
    <div className={align === "center" ? "text-center" : "text-start"}>
      {number && (
        <div className={`mb-4 flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`} aria-hidden>
          <span className="h-px w-10 bg-[#f4932c]/70" />
          <span className={`font-display text-sm tracking-[0.3em] ${dark ? "text-[#f6e2b3]" : "text-[#00124a]"}`}>{number}</span>
          <span className="h-px w-10 bg-[#9b88d7]/70" />
        </div>
      )}
      <Heading
        className={`font-display leading-[1.25] ${size === "xl" ? "text-5xl sm:text-6xl md:text-7xl lg:text-8xl" : "text-3xl md:text-5xl"} ${
          dark ? "grad-text" : "text-[#00124a]"
        }`}
      >
        {title}
      </Heading>
      <p className={`gold-eyebrow ${dark ? "!text-[#f6e2b3]" : ""} ${size === "xl" ? "mt-5 text-sm md:text-base" : "mt-3 text-xs md:text-sm"}`}>{eyebrow}</p>
    </div>
  );
}
