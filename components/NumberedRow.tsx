export default function NumberedRow({
  title,
  titleEn,
  isLast = false,
  tone = "onDark",
}: {
  title: string;
  titleEn?: string;
  isLast?: boolean;
  tone?: "onDark" | "onLight";
}) {
  const border = tone === "onDark" ? "border-line-on-ink" : "border-line";
  const titleColor = tone === "onDark" ? "text-white" : "text-ink";

  return (
    <div className={`flex min-h-[5rem] items-center justify-center py-4 text-center ${isLast ? "" : `border-b ${border}`}`}>
      <div>
        <p className={`font-display text-base font-bold ${titleColor}`}>{title}</p>
        {titleEn && <p className="gold-eyebrow mt-0.5 text-[11px]">{titleEn}</p>}
      </div>
    </div>
  );
}
