import type { CSSProperties } from "react";

const TILE = 148;
const C = TILE / 2;
const R_OUT = 50; // medallion radius

// angle 0 = up, clockwise, matching screen coordinates (y grows downward).
const rad = (deg: number) => (deg * Math.PI) / 180;
const pt = (deg: number, radius: number) => [C + radius * Math.sin(rad(deg)), C - radius * Math.cos(rad(deg))] as const;

// 8 vertices, 45° apart — a regular octagon, its corners on the same cardinal and diagonal
// axes the strapwork below travels along.
const medallionPoints = Array.from({ length: 8 }, (_, k) => pt(k * 45, R_OUT));

/**
 * One tile of a traditional geometric lattice: an octagon medallion at the tile's centre,
 * linked to its four neighbours by straight strapwork running to the edge midpoints and the
 * four corners. Tiled edge to edge, the straps meet exactly where neighbouring tiles' own
 * straps land, so the whole canvas reads as one interlaced trellis — a proper, higher-detail
 * geometric motif with two line weights for depth (a bolder outline on the medallion, finer
 * straps connecting it).
 */
function buildTile(stroke: string) {
  const medallion = medallionPoints.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
  const cardinalTargets: [number, [number, number]][] = [
    [0, [C, 0]],
    [90, [TILE, C]],
    [180, [C, TILE]],
    [270, [0, C]],
  ];
  const cornerTargets: [number, [number, number]][] = [
    [45, [TILE, 0]],
    [135, [TILE, TILE]],
    [225, [0, TILE]],
    [315, [0, 0]],
  ];
  const straps = [...cardinalTargets, ...cornerTargets]
    .map(([deg, [tx, ty]]) => {
      const [sx, sy] = pt(deg, R_OUT);
      return `<line x1='${sx.toFixed(2)}' y1='${sy.toFixed(2)}' x2='${tx}' y2='${ty}' stroke='${stroke}' stroke-width='0.85'/>`;
    })
    .join("");

  return (
    `<svg xmlns='http://www.w3.org/2000/svg' width='${TILE}' height='${TILE}' viewBox='0 0 ${TILE} ${TILE}'>` +
    straps +
    `<polygon points='${medallion}' fill='none' stroke='${stroke}' stroke-width='1.5' stroke-linejoin='round'/>` +
    `<circle cx='${C}' cy='${C}' r='2.6' fill='${stroke}'/>` +
    `</svg>`
  );
}

const TONE_HEX = { ink: "#0a1420", gold: "#b8863f", cream: "#f6ead0" } as const;
export type FieldTone = keyof typeof TONE_HEX;

function tileUrl(tone: FieldTone) {
  return `url("data:image/svg+xml,${encodeURIComponent(buildTile(TONE_HEX[tone]))}")`;
}

// Each a plain right triangle hugging one corner, cut by a straight diagonal — a hard edge,
// not a blur.
const CLIPS = {
  tl: "polygon(0 0, 100% 0, 0 100%)",
  tr: "polygon(0 0, 100% 0, 100% 100%)",
  bl: "polygon(0 0, 0 100%, 100% 100%)",
  br: "polygon(100% 0, 100% 100%, 0 100%)",
  none: undefined,
} as const;

export type FieldCorner = keyof typeof CLIPS;

// A soft vertical fade instead of a hard diagonal — the pattern rises out of nothing rather
// than being cut. Used at the foot of the page, where a diagonal clip would read as a stray
// edge rather than a glow.
const FADES = {
  bottom: "linear-gradient(to top, #000 0%, rgba(0,0,0,0.7) 45%, transparent 100%)",
  top: "linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.7) 45%, transparent 100%)",
  none: undefined,
} as const;

export type FieldFade = keyof typeof FADES;

/**
 * The lattice motif, either cut to a hard diagonal corner or left to rise as a soft vertical
 * fade (`fade`, for the foot of a page). Never a full-bleed backdrop covering everything at
 * once: one deliberate patch, sized and placed by the caller.
 */
export default function CornerField({
  tone = "gold",
  corner = "tr",
  fade = "none",
  size = 148,
  opacity = 0.16,
  className = "",
  style,
}: {
  tone?: FieldTone;
  corner?: FieldCorner;
  fade?: FieldFade;
  size?: number;
  opacity?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const clip = corner === "none" ? undefined : CLIPS[corner];
  const mask = FADES[fade];
  return (
    <div
      aria-hidden
      className={`pointer-events-none ${className}`}
      style={{
        ...style,
        backgroundImage: tileUrl(tone),
        backgroundSize: `${size}px ${size}px`,
        opacity,
        clipPath: clip,
        WebkitClipPath: clip,
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    />
  );
}
