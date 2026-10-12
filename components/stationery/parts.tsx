import type { CSSProperties, ReactNode } from "react";

/**
 * The stationery's language is restraint. Two surfaces (matte deep ink and warm bone), one metal (flat brass), a great deal of empty space,
 * the logo and nothing else: no frames, patterns or gradients. The reference is a black slate panel with thin brushed-metal letters.
 */
export const C = {
  ink: "#00061d", // matte deep ink: the dark surface
  navy: "#00124a", // the identity's navy: type and the logo on bone
  bone: "#f4efe4", // warm paper
  paper: "#faf7f0", // lighter writing paper
  brass: "#c4a04e", // flat brass: letters on ink
  brassDeep: "#8a6d25", // the same metal for small type on bone (>= 4.5:1)
  body: "#2a3144",
  hair: "rgba(0,6,29,0.16)",
  hairOnInk: "rgba(196,160,78,0.5)",
};

export const BLEED = 3; // mm on every side

/** Display type: Hail for Arabic headlines, the brand Latin face for English ones. */
export const disp = (en = false): CSSProperties => ({
  fontFamily: en ? "var(--font-brand-raw), var(--font-brand-fallback), sans-serif" : "var(--font-blog-stack)",
  fontWeight: en ? 400 : 300,
  letterSpacing: en ? "-0.005em" : undefined,
});

export const latin: CSSProperties = { fontFamily: "var(--font-brand-raw), var(--font-brand-fallback), sans-serif" };
export const mm = (n: number) => `${n}mm`;

/**
 * One printed face at its trim size plus bleed. `bleed` is drawn across the whole sheet; `children` are placed inside the trim box.
 * `guides` draws the trim (cyan) and a 4 mm safe margin (red) for proofing.
 */
export function Face({ w, h, bg, bleed, children, guides = false, className = "", dir = "rtl", style }: { w: number; h: number; bg: string; bleed?: ReactNode; children?: ReactNode; guides?: boolean; className?: string; dir?: "rtl" | "ltr"; style?: CSSProperties }) {
  return (
    <section className={`stn-face relative overflow-hidden ${className}`} dir={dir} style={{ width: mm(w + BLEED * 2), height: mm(h + BLEED * 2), background: bg, breakAfter: "page", ...style }}>
      {bleed}
      <div className="absolute" style={{ left: mm(BLEED), top: mm(BLEED), width: mm(w), height: mm(h) }}>
        {children}
        {guides && (
          <>
            <div className="pointer-events-none absolute inset-0" style={{ outline: "0.2mm solid cyan" }} />
            <div className="pointer-events-none absolute" style={{ inset: "4mm", outline: "0.2mm dashed red" }} />
          </>
        )}
      </div>
    </section>
  );
}

/** The firm's mark as a flat vector in one colour. */
export function Mark({ height, color = C.brass, style }: { height: number; color?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="150 190 420 340" style={{ height: mm(height), width: "auto", display: "block", ...style }} aria-hidden>
      <g fill={color}>
        <rect x="160" y="202" width="398" height="52" />
        <rect x="222" y="261" width="274" height="47" />
        <polygon points="264,315 320,315 320,455 264,517" />
        <polygon points="335,315 387,315 387,415 335,448" />
        <polygon points="403,315 450,315 450,400 403,409" />
      </g>
    </svg>
  );
}

/** The full lockup, pre-coloured: navy on bone, brass on ink, bone on ink. */
export function Lockup({ mm: w, tone = "navy", style }: { mm: number; tone?: "navy" | "brass" | "bone"; style?: CSSProperties }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/brand/profile/lockup-${tone}.png`} alt="" style={{ width: mm(w), height: "auto", display: "block", ...style }} />;
}

/** A hairline rule. */
export const Rule = ({ w, color = C.hair, style }: { w?: number; color?: string; style?: CSSProperties }) => <div style={{ width: w === undefined ? "100%" : mm(w), height: "0.25mm", background: color, ...style }} />;
