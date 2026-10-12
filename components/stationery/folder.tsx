import type { CSSProperties } from "react";
import { ADDRESS_AR, PHONE, Qr, qrUrl } from "@/components/stationery/cards";
import { Lockup } from "@/components/stationery/paper";
import { C, Diamond, EngravedFrame, Face, Rosette, WaveBand, foilBg, latin, plateBg } from "@/components/stationery/parts";
import { firm } from "@/lib/site";

type G = { guides?: boolean };

export const FP = { panel: 230, spine: 8, h: 320 }; // trim, mm. Flat spread: back | spine | front (the Arabic book: front on the right)
const mm = (n: number) => `${n}mm`;

/** The mark's geometry (viewBox units), so the columns can be cut out as windows. */
const U = { x0: 150, y0: 190 };
const COLUMNS = [
  [[264, 315], [320, 315], [320, 455], [264, 517]],
  [[335, 315], [387, 315], [387, 415], [335, 448]],
  [[403, 315], [450, 315], [450, 400], [403, 409]],
] as const;

/** The big mark on the front: the scale (mm per unit), where it sits, and the columns as polygons in panel mm. */
const MARK = { scale: 0.5, left: 10, top: 36 };
const toMM = ([x, y]: readonly [number, number]) => [MARK.left + (x - U.x0) * MARK.scale, MARK.top + (y - U.y0) * MARK.scale] as const;
const colPoints = (c: readonly (readonly [number, number])[]) => c.map(toMM).map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");

const stampedLintels = (
  <>
    <rect x={MARK.left + (160 - U.x0) * MARK.scale} y={MARK.top + (202 - U.y0) * MARK.scale} width={398 * MARK.scale} height={52 * MARK.scale} />
    <rect x={MARK.left + (222 - U.x0) * MARK.scale} y={MARK.top + (261 - U.y0) * MARK.scale} width={274 * MARK.scale} height={47 * MARK.scale} />
  </>
);

/** Gold gradient for SVG shapes in the folder's units (userSpaceOnUse so the lintels and the columns read as one stamped mark). */
function GoldDefs({ id, w }: { id: string; w: number }) {
  return (
    <defs>
      <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={w} y2={w * 0.55}>
        <stop offset="0" stopColor="#8f6a22" />
        <stop offset="0.16" stopColor="#d9b25c" />
        <stop offset="0.3" stopColor="#f6e2a8" />
        <stop offset="0.46" stopColor="#caa04a" />
        <stop offset="0.62" stopColor="#b88a34" />
        <stop offset="0.8" stopColor="#e6c470" />
        <stop offset="1" stopColor="#9a7425" />
      </linearGradient>
    </defs>
  );
}

/** The front cover. The two lintels are hot-foil gold; the three columns are die-cut windows that show the gold-lined sheet inside, so the closed folder reads as one mark. */
function FrontCover({ withDielineHint = false }: { withDielineHint?: boolean }) {
  const { panel, h } = FP;
  return (
    <div className="absolute overflow-hidden" style={{ left: mm(0), top: 0, width: mm(panel), height: mm(h), background: `radial-gradient(ellipse 70% 55% at 50% 38%, rgba(40,84,220,0.34), transparent 72%), ${C.deep}` }}>
      <div className="absolute" style={{ left: mm((panel - 236) / 2), top: mm(MARK.top + 85 - 118) }}>
        <Rosette size={236} lines={34} turns={14} color="rgba(216,174,85,0.34)" weight={0.1} id="ff" />
      </div>
      <svg width={mm(panel)} height={mm(h)} viewBox={`0 0 ${panel} ${h}`} className="absolute inset-0" aria-hidden>
        <GoldDefs id="fg" w={panel} />
        <g fill="url(#fg)">{stampedLintels}</g>
        <g fill="url(#fg)">
          {COLUMNS.map((c, i) => (
            <polygon key={i} points={colPoints(c)} />
          ))}
        </g>
        {/* the die-cut edge: a hairline of shadow on the lit side of each window, so the cut reads as a cut */}
        <g fill="none" stroke="rgba(0,6,29,0.55)" strokeWidth="0.35">
          {COLUMNS.map((c, i) => (
            <polygon key={i} points={colPoints(c)} />
          ))}
        </g>
        {withDielineHint && null}
      </svg>
      <div className="absolute" style={{ left: 0, top: 0 }}>
        <EngravedFrame w={panel} h={h} inset={9} gap={1.2} cut={4} />
      </div>
      <div className="absolute flex justify-center" style={{ left: 0, right: 0, top: mm(262) }}>
        <Lockup mm={84} fill="foil" />
      </div>
      <div className="absolute flex items-center justify-center gap-[3mm]" style={{ left: 0, right: 0, top: mm(251) }}>
        <span style={{ height: "0.2mm", width: mm(36), background: "rgba(216,174,85,0.5)" }} />
        <Diamond size={1.6} color={C.goldBright} />
        <span style={{ height: "0.2mm", width: mm(36), background: "rgba(216,174,85,0.5)" }} />
      </div>
    </div>
  );
}

function BackCover() {
  const { panel, h } = FP;
  return (
    <div className="absolute overflow-hidden" style={{ left: 0, top: 0, width: mm(panel), height: mm(h), background: `radial-gradient(ellipse 80% 50% at 50% 70%, rgba(40,84,220,0.26), transparent 70%), ${C.deep}` }}>
      <div className="absolute" style={{ left: mm(20), top: mm(70) }}>
        <WaveBand w={190} h={5} lines={8} wave={13} color="rgba(216,174,85,0.6)" weight={0.08} />
      </div>
      <div className="absolute" style={{ left: mm(20), top: mm(250) }}>
        <WaveBand w={190} h={5} lines={8} wave={13} color="rgba(216,174,85,0.6)" weight={0.08} />
      </div>
      <div className="absolute" style={{ left: 0, top: 0 }}>
        <EngravedFrame w={panel} h={h} inset={9} gap={1.2} cut={4} />
      </div>
      <div className="absolute flex justify-center" style={{ left: 0, right: 0, top: mm(92) }}>
        <Lockup mm={96} fill="foil" />
      </div>
      <div className="absolute" dir="rtl" style={{ left: mm(48), right: mm(48), top: mm(186), textAlign: "center", fontSize: mm(3.4), lineHeight: 1.95, color: "rgba(255,255,255,0.92)" }}>
        {ADDRESS_AR.map((l) => (
          <p key={l} style={{ margin: 0 }}>{l}</p>
        ))}
        <p dir="ltr" style={{ ...latin, margin: `${mm(2)} 0 0`, letterSpacing: "0.08em", color: C.goldBright }}>
          {PHONE} · info@taap.sa
        </p>
      </div>
      <div className="absolute flex justify-center" style={{ left: 0, right: 0, top: mm(226) }}>
        <div style={{ background: C.deep, padding: mm(1.4), outline: "0.25mm solid rgba(216,174,85,0.7)", outlineOffset: mm(1.6) }}>
          <Qr url={qrUrl("folder")} mm={22} light="#f6f1e6" pad={1.2} />
        </div>
      </div>
      <p className="absolute" dir="rtl" style={{ left: 0, right: 0, bottom: mm(15), margin: 0, textAlign: "center", fontSize: mm(2.6), color: "rgba(255,255,255,0.7)" }}>
        رخصة مزاولة المحاماة {firm.licenseNumber} · السجل الموحد {firm.unifiedNumber}
      </p>
    </div>
  );
}

function Spine() {
  const { panel, spine, h } = FP;
  return (
    <div className="absolute flex items-center justify-center" style={{ left: mm(panel), top: 0, width: mm(spine), height: mm(h), background: "#00124a" }}>
      <div style={{ position: "absolute", inset: 0, ...foilBg, opacity: 0.0 }} />
      <span style={{ writingMode: "vertical-rl", ...latin, color: C.goldBright, fontSize: mm(2.8), letterSpacing: "0.5em", textTransform: "uppercase" }}>Turki AlNaif &amp; Partners</span>
    </div>
  );
}

/** Outer spread: back | spine | front. */
export function FolderOuter({ guides }: G) {
  const { panel, spine, h } = FP;
  return (
    <Face w={panel * 2 + spine} h={h} bg={C.deep} dir="ltr" guides={guides}>
      <BackCover />
      <Spine />
      <div className="absolute" style={{ left: mm(panel + spine), top: 0, width: mm(panel), height: mm(h) }}>
        <FrontCover />
      </div>
    </Face>
  );
}

/** Inner spread. Left (inside the front cover): the gold-lined sheet the windows show, with an engraved border. Right (inside the back cover): the pocket, ivory, with the slits for a business card and a 4 mm dieline for the pocket. */
export function FolderInner({ guides }: G) {
  const { panel, spine, h } = FP;
  return (
    <Face w={panel * 2 + spine} h={h} bg={C.paper} dir="ltr" guides={guides}>
      {/* inside of the FRONT cover (the left one when the folder lies open): gold-foil lining */}
      <div className="absolute overflow-hidden" style={{ left: 0, top: 0, width: mm(panel), height: mm(h), ...plateBg }}>
        <div className="absolute" style={{ left: 0, top: 0 }}>
          <EngravedFrame w={panel} h={h} inset={9} gap={1.2} cut={4} color="rgba(0,18,74,0.55)" />
        </div>
        <div className="absolute flex justify-center" style={{ left: 0, right: 0, bottom: mm(26) }}>
          <Lockup mm={50} />
        </div>
      </div>
      <div className="absolute" style={{ left: mm(panel), top: 0, width: mm(spine), height: mm(h), background: "#00124a" }} />
      {/* inside of the BACK cover: ivory pocket */}
      <div className="absolute overflow-hidden" style={{ left: mm(panel + spine), top: 0, width: mm(panel), height: mm(h), background: C.paper }}>
        <div className="absolute" style={{ left: 0, top: 0 }}>
          <EngravedFrame w={panel} h={h} inset={9} gap={1.2} cut={4} color="rgba(185,138,53,0.85)" />
        </div>
        <div className="absolute" style={{ left: mm(0), right: 0, bottom: 0, height: mm(210), background: "#fbf9f4", borderTop: "0.4mm solid #b98a35" }}>
          <div className="absolute" style={{ left: mm(9), top: mm(2), right: mm(9) }}>
            <WaveBand w={212} h={5} lines={8} wave={13} color="rgba(185,138,53,0.7)" weight={0.08} />
          </div>
          {/* two slits for business cards */}
          {[34, 118].map((x) => (
            <div key={x} className="absolute" style={{ left: mm(x), top: mm(30), width: mm(78), height: mm(2.4), background: "#e9e1cc", border: "0.2mm solid rgba(185,138,53,0.6)" }} />
          ))}
          <p className="absolute" dir="rtl" style={{ left: mm(34), width: mm(78), top: mm(36), margin: 0, textAlign: "center", fontSize: mm(2.6), color: C.goldText }}>بطاقة التعريف</p>
          <p className="absolute" dir="rtl" style={{ left: mm(118), width: mm(78), top: mm(36), margin: 0, textAlign: "center", fontSize: mm(2.6), color: C.goldText }}>بطاقة الموعد</p>
        </div>
        <div className="absolute flex justify-center" style={{ left: 0, right: 0, top: mm(24) }}>
          <Lockup mm={56} />
        </div>
      </div>
    </Face>
  );
}

/** The cutting file: die-cut windows (magenta), folds (dashed cyan), the pocket's glue line and slits. Nothing prints from this; it goes to the finisher with the artwork. */
export function FolderDieline({ guides }: G) {
  const { panel, spine, h } = FP;
  const ox = panel + spine; // the right-hand panel's left edge
  const W = panel * 2 + spine;
  const frame = <rect x="0" y="0" width={W} height={h} fill="none" stroke="#000" strokeWidth="0.3" />;
  const folds = (
    <g fill="none" stroke="#00a0e0" strokeWidth="0.3" strokeDasharray="3 2">
      <line x1={panel} y1="0" x2={panel} y2={h} />
      <line x1={ox} y1="0" x2={ox} y2={h} />
    </g>
  );
  const note: CSSProperties = {};
  return (
    <>
      {/* 1 — outside: the three column windows in the front cover (the right-hand panel) */}
      <Face w={W} h={h} bg="#ffffff" dir="ltr" guides={guides} style={note}>
        <svg width={mm(W)} height={mm(h)} viewBox={`0 0 ${W} ${h}`} className="absolute inset-0" aria-hidden>
          {frame}
          {folds}
          <g fill="none" stroke="#e5007d" strokeWidth="0.35">
            {COLUMNS.map((c, i) => (
              <polygon key={i} points={c.map(toMM).map(([x, y]) => `${(ox + x).toFixed(2)},${y.toFixed(2)}`).join(" ")} />
            ))}
          </g>
          <g fontFamily="sans-serif" fontSize="4" fill="#000">
            <text x="6" y="9">OUTSIDE · magenta = die-cut (the three column windows), cyan dashed = fold. Front cover is the right-hand panel.</text>
            <text x="6" y="14">The windows show the gold-lined sheet glued inside the front cover. Scale 1:1, flat size {W} x {h} mm.</text>
          </g>
        </svg>
      </Face>
      {/* 2 — inside: the two card slits in the pocket (the right-hand panel when the folder lies open) */}
      <Face w={W} h={h} bg="#ffffff" dir="ltr" guides={guides}>
        <svg width={mm(W)} height={mm(h)} viewBox={`0 0 ${W} ${h}`} className="absolute inset-0" aria-hidden>
          {frame}
          {folds}
          <g fill="none" stroke="#e5007d" strokeWidth="0.35">
            {[34, 118].map((x) => (
              <line key={x} x1={ox + x} y1={h - 210 + 31.2} x2={ox + x + 78} y2={h - 210 + 31.2} />
            ))}
          </g>
          <g fontFamily="sans-serif" fontSize="4" fill="#000">
            <text x="6" y="9">INSIDE · magenta = card slits (two, 78 mm each), cyan dashed = fold. The pocket is the right-hand panel.</text>
          </g>
        </svg>
      </Face>
    </>
  );
}
