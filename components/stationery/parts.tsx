import type { CSSProperties, ReactNode } from "react";

/** The identity's tokens for print. Gold appears in two forms: flat (rules and large type) and foil (the metallic gradient). */
export const C = {
  paper: "#f6f1e6",
  ink: "#00124a",
  deep: "#00061d",
  mid: "#0a2a7a",
  gold: "#b98a35",
  goldText: "#76570f",
  goldBright: "#e0b35a",
  body: "#2c3550",
  hair: "rgba(0,18,74,0.16)",
};

/**
 * Hot-foil gold for type. It is the flat spot colour the foil is stamped over (a gradient clipped to glyphs is rasterised unevenly by
 * PDF viewers and RIPs, so type never uses one). The metallic gradient lives where it is safe: the vector mark, rules and the seal's rings.
 */
export const foil: CSSProperties = { color: "#d8ae55" };

export const foilBg: CSSProperties = {
  backgroundImage: "linear-gradient(104deg,#8a6420 0%,#d9b25c 18%,#fff3c6 34%,#d4a747 52%,#a77c2a 74%,#e8c46e 100%)",
};

export const BLEED = 3; // mm on every side

/** Display type: Hail for Arabic headlines, the brand Latin face for English ones. */
export const disp = (en = false): CSSProperties => ({
  fontFamily: en ? "var(--font-brand-raw), var(--font-brand-fallback), sans-serif" : "var(--font-blog-stack)",
  fontWeight: en ? 400 : 300,
  letterSpacing: en ? "-0.005em" : undefined,
});

export const latin: CSSProperties = { fontFamily: "var(--font-brand-raw), var(--font-brand-fallback), sans-serif" };

/**
 * One printed face at its trim size plus bleed. `bleed` is drawn across the whole sheet (backgrounds, the running line that exits
 * the paper); `children` are placed inside the trim box. `guides` draws the trim (cyan) and a 4mm safe margin (red) for proofing.
 */
export function Face({
  w,
  h,
  bg,
  bleed,
  children,
  guides = false,
  className = "",
  dir = "rtl",
  style,
}: {
  w: number;
  h: number;
  bg: string;
  bleed?: ReactNode;
  children?: ReactNode;
  guides?: boolean;
  className?: string;
  dir?: "rtl" | "ltr";
  style?: CSSProperties;
}) {
  return (
    <section
      className={`stn-face relative overflow-hidden ${className}`}
      dir={dir}
      style={{ width: `${w + BLEED * 2}mm`, height: `${h + BLEED * 2}mm`, background: bg, breakAfter: "page", ...style }}
    >
      {bleed}
      <div className="absolute" style={{ left: `${BLEED}mm`, top: `${BLEED}mm`, width: `${w}mm`, height: `${h}mm` }}>
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

/** A small gold diamond, the brand's bullet. */
export const Diamond = ({ size = 1.6, color = C.gold, style }: { size?: number; color?: string; style?: CSSProperties }) => (
  <span aria-hidden style={{ display: "inline-block", width: `${size}mm`, height: `${size}mm`, background: color, transform: "rotate(45deg)", ...style }} />
);

/**
 * The golden thread: the line that "runs ahead". It starts inside the page and leaves through the edge, so laid side by side the
 * pieces of the set read as one line. `from` is where it starts (mm from the start edge); it runs to the opposite bleed.
 * `nodes` are small diamonds set on it at those offsets (mm from the start).
 */
export function Thread({
  y,
  from,
  to = "end",
  nodes = [],
  color = C.gold,
  weight = 0.25,
  foilLine = false,
}: {
  y: number;
  from: number;
  to?: "end" | number;
  nodes?: number[];
  color?: string;
  weight?: number;
  foilLine?: boolean;
}) {
  return (
    <div className="absolute" style={{ top: `${y}mm`, insetInlineStart: `${from}mm`, insetInlineEnd: to === "end" ? `-${BLEED + 1}mm` : `${to}mm`, height: `${weight}mm`, ...(foilLine ? foilBg : { background: color }) }}>
      {nodes.map((n) => (
        <Diamond key={n} size={1.4} color={color} style={{ position: "absolute", insetInlineStart: `${n}mm`, top: "50%", marginTop: "-0.7mm", ...(foilLine ? foilBg : {}) }} />
      ))}
    </div>
  );
}

/** The firm's mark, drawn as a vector so it stays crisp at any size and can take the foil gradient. */
export function Mark({ height, fill = "foil", style }: { height: number; fill?: "foil" | "flat" | string; style?: CSSProperties }) {
  const f = fill === "foil" ? "url(#stn-foil)" : fill === "flat" ? C.gold : fill;
  return (
    <svg viewBox="150 190 420 340" style={{ height: `${height}mm`, width: "auto", display: "block", ...style }} aria-hidden>
      <defs>
        <linearGradient id="stn-foil" x1="0" y1="0" x2="1" y2="0.35">
          <stop offset="0" stopColor="#8a6420" />
          <stop offset="0.2" stopColor="#d9b25c" />
          <stop offset="0.36" stopColor="#fff3c6" />
          <stop offset="0.55" stopColor="#d4a747" />
          <stop offset="0.78" stopColor="#a77c2a" />
          <stop offset="1" stopColor="#e8c46e" />
        </linearGradient>
      </defs>
      <g fill={f}>
        <rect x="160" y="202" width="398" height="52" />
        <rect x="222" y="261" width="274" height="47" />
        <polygon points="264,315 320,315 320,455 264,517" />
        <polygon points="335,315 387,315 387,415 335,448" />
        <polygon points="403,315 450,315 450,400 403,409" />
      </g>
    </svg>
  );
}

/** Tonal (tone-on-tone) mark for blind emboss / low-contrast backgrounds. */
export const GhostMark = ({ height, color = "rgba(255,255,255,0.05)", style }: { height: number; color?: string; style?: CSSProperties }) => (
  <Mark height={height} fill={color} style={style} />
);

/**
 * The mark drawn as a gold outline over a faint wash of its own colour: architecture rather than logo. Meant to be large and cropped by the
 * edge of the sheet. `id` keeps the gradients of several marks on one page apart.
 */
export function LineMark({ height, id = "lm", stroke = 0.22, wash = "rgba(40,84,220,0.16)", style, unit = "mm" }: { height: number; id?: string; stroke?: number; wash?: string; style?: CSSProperties; unit?: "mm" | "px" }) {
  const sw = (stroke * 340) / (unit === "mm" ? height : height); // stroke in viewBox units so it reads the same at any size
  return (
    <svg viewBox="150 190 420 340" style={{ height: `${height}${unit}`, width: "auto", display: "block", overflow: "visible", ...style }} aria-hidden>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0" stopColor="#a77c2a" />
          <stop offset="0.3" stopColor="#e8c46e" />
          <stop offset="0.5" stopColor="#fff3c6" />
          <stop offset="0.75" stopColor="#d4a747" />
          <stop offset="1" stopColor="#8a6420" />
        </linearGradient>
      </defs>
      <g fill={wash} stroke={`url(#${id}-g)`} strokeWidth={sw} strokeLinejoin="miter">
        <rect x="160" y="202" width="398" height="52" />
        <rect x="222" y="261" width="274" height="47" />
        <polygon points="264,315 320,315 320,455 264,517" />
        <polygon points="335,315 387,315 387,415 335,448" />
        <polygon points="403,315 450,315 450,400 403,409" />
      </g>
    </svg>
  );
}

/**
 * A brick-laid field of small marks, tone on tone: the identity as texture. Used where a photograph would otherwise go. It is a plain SVG
 * pattern (vector, no masks); the fade into solid navy is a separate gradient laid over it, which prints reliably.
 */
export function MarkField({ w, h, tile = 11, size = 3.6, color = "rgba(40,84,220,0.22)", id = "mf", style }: { w: number; h: number; tile?: number; size?: number; color?: string; id?: string; style?: CSSProperties }) {
  const k = size / 420; // mark width (420 units) -> `size` mm
  // Explicit copies of one <symbol>, not an SVG <pattern>: PDF viewers and RIPs render patterns unevenly, plain repeated shapes always print the same.
  const marks: { x: number; y: number }[] = [];
  for (let r = 0, y = tile * 0.15; y < h; r++, y += tile / 2) {
    for (let x = (r % 2 ? tile * 0.7 : tile * 0.2); x < w; x += tile) marks.push({ x, y });
  }
  return (
    <svg className="absolute inset-0" width={`${w}mm`} height={`${h}mm`} viewBox={`0 0 ${w} ${h}`} style={style} aria-hidden>
      <defs>
        <g id={id} fill={color} transform={`scale(${k}) translate(-150 -190)`}>
          <rect x="160" y="202" width="398" height="52" />
          <rect x="222" y="261" width="274" height="47" />
          <polygon points="264,315 320,315 320,455 264,517" />
          <polygon points="335,315 387,315 387,415 335,448" />
          <polygon points="403,315 450,315 450,400 403,409" />
        </g>
      </defs>
      {marks.map((m, i) => (
        <use key={i} href={`#${id}`} x={m.x} y={m.y} />
      ))}
    </svg>
  );
}
