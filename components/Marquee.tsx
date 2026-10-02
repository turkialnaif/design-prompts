export default function Marquee({
  items,
  duration = 26,
  tone = "onDark",
  ornate = false,
  caps = false,
  reverse = false,
}: {
  items: string[];
  duration?: number;
  tone?: "onDark" | "onInk2" | "onLight";
  ornate?: boolean;
  /** small tracked capitals — a quiet second line */
  caps?: boolean;
  reverse?: boolean;
}) {
  const track = [...items, ...items];

  return (
    <div
      dir="ltr"
      className="marquee-wrap w-full overflow-hidden"
      style={
        ornate || caps
          ? {
              maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            }
          : undefined
      }
    >
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll linear infinite;
        }
        .marquee-wrap:hover .marquee-track { animation-play-state: paused; }
      `}</style>
      <div className="marquee-track" style={{ animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}>
        {track.map((item, i) =>
          caps ? (
            <span key={i} className="mx-4 inline-flex shrink-0 items-center gap-8 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.28em] text-white/70">
              {item}
              <span aria-hidden className="h-1 w-1 rounded-full bg-[#f6e2b3]/80" />
            </span>
          ) : ornate ? (
            <span key={i} className="mx-5 inline-flex shrink-0 items-center gap-10 whitespace-nowrap">
              <span className={`font-ruqaa text-xl font-bold md:text-2xl ${tone === "onLight" ? "text-gold-deep" : "text-[#f6e2b3]"}`}>{item}</span>
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gold" />
            </span>
          ) : (
            <span
              key={i}
              className={`mx-6 shrink-0 whitespace-nowrap text-sm font-semibold ${
                tone === "onDark" ? "text-gold/70" : tone === "onLight" ? "text-ink-soft/50" : "text-white/50"
              }`}
            >
              {item}
            </span>
          ),
        )}
      </div>
    </div>
  );
}
