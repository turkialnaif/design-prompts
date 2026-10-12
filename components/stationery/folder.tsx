import { ADDRESS_AR, EMAIL, PHONE, Qr, qrUrl } from "@/components/stationery/cards";
import { firm } from "@/lib/site";
import { C, Face, Lockup, Mark, Rule, latin, mm } from "@/components/stationery/parts";
import type { CSSProperties } from "react";

type G = { guides?: boolean };
export const FP = { panel: 230, spine: 8, h: 320 }; // trim, mm. Flat: back | spine | front (an Arabic book: the front is on the right)

/** Outside: matte ink, soft-touch. The front carries the mark blind-embossed (no ink, no foil: it is only felt and seen in raking light) and the lockup in brass foil. */
export function FolderOuter({ guides }: G) {
  const { panel, spine, h } = FP;
  return (
    <Face w={panel * 2 + spine} h={h} bg={C.ink} dir="ltr" guides={guides}>
      {/* back */}
      <div className="absolute" style={{ left: 0, top: 0, width: mm(panel), height: mm(h) }}>
        <div className="absolute flex justify-center" style={{ left: 0, right: 0, top: mm(h * 0.42) }}>
          <Lockup mm={74} tone="brass" />
        </div>
        <div className="absolute" dir="rtl" style={{ left: mm(20), right: mm(20), bottom: mm(24), textAlign: "center", fontSize: mm(3.2), lineHeight: 1.9, color: "rgba(255,255,255,0.88)" }}>
          {ADDRESS_AR.map((l) => (
            <p key={l} style={{ margin: 0 }}>{l}</p>
          ))}
          <p dir="ltr" style={{ ...latin, margin: `${mm(1.6)} 0 0`, letterSpacing: "0.08em", color: C.brass }}>{PHONE} · {EMAIL}</p>
        </div>
      </div>
      {/* spine */}
      <div className="absolute flex items-center justify-center" style={{ left: mm(panel), top: 0, width: mm(spine), height: mm(h) }}>
        <span style={{ writingMode: "vertical-rl", ...latin, color: C.brass, fontSize: mm(2.6), letterSpacing: "0.5em", textTransform: "uppercase" }}>Turki AlNaif &amp; Partners</span>
      </div>
      {/* front */}
      <div className="absolute overflow-hidden" style={{ left: mm(panel + spine), top: 0, width: mm(panel), height: mm(h) }}>
        <div className="absolute flex justify-center" style={{ left: 0, right: 0, top: mm(46) }}>
          <Mark height={170} color="rgba(255,255,255,0.06)" />
        </div>
        <div className="absolute flex justify-center" style={{ left: 0, right: 0, bottom: mm(34) }}>
          <Lockup mm={80} tone="brass" />
        </div>
      </div>
    </Face>
  );
}

/** Inside: bone. Left (inside the front cover): quiet, the mark small. Right (inside the back cover): the pocket, with two slits for cards. */
export function FolderInner({ guides }: G) {
  const { panel, spine, h } = FP;
  return (
    <Face w={panel * 2 + spine} h={h} bg={C.bone} dir="ltr" guides={guides}>
      <div className="absolute flex justify-center" style={{ left: 0, width: mm(panel), bottom: mm(24) }}>
        <Mark height={9} color={C.navy} />
      </div>
      <div className="absolute" style={{ left: mm(panel), top: 0, width: mm(spine), height: mm(h), background: "rgba(0,6,29,0.06)" }} />
      <div className="absolute" style={{ left: mm(panel + spine), top: 0, width: mm(panel), height: mm(h) }}>
        <div className="absolute" style={{ left: 0, right: 0, bottom: 0, height: mm(210), background: C.paper, borderTop: `0.3mm solid ${C.brassDeep}` }}>
          {[34, 118].map((x) => (
            <div key={x} className="absolute" style={{ left: mm(x), top: mm(30), width: mm(78), height: mm(2.2), background: "#e6dfcc", border: `0.2mm solid ${C.brassDeep}` }} />
          ))}
          <p className="absolute" dir="rtl" style={{ left: mm(34), width: mm(78), top: mm(36), margin: 0, textAlign: "center", fontSize: mm(2.6), color: C.brassDeep }}>بطاقة التعريف</p>
          <p className="absolute" dir="rtl" style={{ left: mm(118), width: mm(78), top: mm(36), margin: 0, textAlign: "center", fontSize: mm(2.6), color: C.brassDeep }}>بطاقة الموعد</p>
          <div className="absolute" style={{ left: mm(20), right: mm(20), bottom: mm(18) }}>
            <Rule />
            <p className="flex justify-between" dir="rtl" style={{ margin: `${mm(3)} 0 0`, fontSize: mm(2.4), color: C.body }}>
              <span>رخصة مزاولة المحاماة {firm.licenseNumber}</span>
              <span>السجل الموحد {firm.unifiedNumber}</span>
            </p>
          </div>
        </div>
      </div>
    </Face>
  );
}

/** Cutting file: the inside only (the front needs no die: the mark is blind-embossed). Card slits in magenta, folds in cyan. */
export function FolderDieline({ guides }: G) {
  const { panel, spine, h } = FP;
  const W = panel * 2 + spine;
  const ox = panel + spine;
  const note: CSSProperties = { fontFamily: "sans-serif" };
  return (
    <Face w={W} h={h} bg="#ffffff" dir="ltr" guides={guides} style={note}>
      <svg width={mm(W)} height={mm(h)} viewBox={`0 0 ${W} ${h}`} className="absolute inset-0" aria-hidden>
        <rect x="0" y="0" width={W} height={h} fill="none" stroke="#000" strokeWidth="0.3" />
        <g fill="none" stroke="#00a0e0" strokeWidth="0.3" strokeDasharray="3 2">
          <line x1={panel} y1="0" x2={panel} y2={h} />
          <line x1={ox} y1="0" x2={ox} y2={h} />
        </g>
        <g fill="none" stroke="#e5007d" strokeWidth="0.35">
          {[34, 118].map((x) => (
            <line key={x} x1={ox + x} y1={h - 210 + 31.1} x2={ox + x + 78} y2={h - 210 + 31.1} />
          ))}
        </g>
        <g fontSize="4" fill="#000">
          <text x="6" y="9">INSIDE · magenta = two card slits (78 mm each), cyan dashed = folds. The pocket is the right-hand panel.</text>
          <text x="6" y="14">Outside: no die. The mark on the front is a blind emboss (no ink); the lockup is brass foil. Flat size {W} x {h} mm.</text>
        </g>
      </svg>
    </Face>
  );
}

export { Qr, qrUrl };
