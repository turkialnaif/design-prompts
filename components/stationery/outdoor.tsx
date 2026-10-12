import type { CSSProperties } from "react";
import { corePillars, firm } from "@/lib/site";
import { ADDRESS_AR, PHONE, Qr, qrUrl } from "@/components/stationery/cards";
import { Lockup } from "@/components/stationery/paper";
import { BLEED, C, Diamond, EngravedFrame, Face, Mark, Rosette, WaveBand, disp, foilBg, latin, plateBg } from "@/components/stationery/parts";

type G = { guides?: boolean };
const mm = (n: number) => `${n}mm`;
const wash = (x: string, y: string, a = 0.4) => `radial-gradient(ellipse 55% 70% at ${x} ${y}, rgba(40,84,220,${a}), transparent 72%)`;
const goldRule = (extra?: CSSProperties): CSSProperties => ({ position: "absolute", height: "0.25mm", ...foilBg, ...extra });

/** Gold-gradient vector text (SVG, so a gradient fill prints evenly). `width` and `height` are in mm; text is anchored by the caller's `x`/`y`. */
function FoilText({ text, size, x = 0, y, id, width, height, family = "var(--font-brand-raw), sans-serif", spacing = 0, weight = 400 }: { text: string; size: number; x?: number; y: number; id: string; width: number; height: number; family?: string; spacing?: number; weight?: number }) {
  return (
    <svg width={mm(width)} height={mm(height)} viewBox={`0 0 ${width} ${height}`} direction="ltr" style={{ display: "block", overflow: "visible", direction: "ltr" }} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8f6a22" />
          <stop offset="0.25" stopColor="#d9b25c" />
          <stop offset="0.45" stopColor="#fff3c6" />
          <stop offset="0.65" stopColor="#d4a747" />
          <stop offset="1" stopColor="#a77c2a" />
        </linearGradient>
      </defs>
      <text x={x} y={y} fill={`url(#${id})`} style={{ fontFamily: family, fontSize: size, letterSpacing: spacing, fontWeight: weight }}>
        {text}
      </text>
    </svg>
  );
}

/** Outline-only text: a large numeral drawn as a gold hairline, hollow. */
function OutlineText({ text, size, y, width, height, color = "rgba(185,138,53,0.9)", stroke = 0.5, family = "var(--font-brand-raw), sans-serif" }: { text: string; size: number; y: number; width: number; height: number; color?: string; stroke?: number; family?: string }) {
  return (
    <svg width={mm(width)} height={mm(height)} viewBox={`0 0 ${width} ${height}`} direction="ltr" style={{ display: "block", overflow: "visible", direction: "ltr" }} aria-hidden>
      <text x="0" y={y} fill="none" stroke={color} strokeWidth={stroke} style={{ fontFamily: family, fontSize: size }}>
        {text}
      </text>
    </svg>
  );
}

/** The mark inside a rosette: the identity's signature composition for large formats. */
function Medallion({ size, markH, id, lines = 30, color = "rgba(216,174,85,0.4)" }: { size: number; markH: number; id: string; lines?: number; color?: string }) {
  return (
    <div className="relative" style={{ width: mm(size), height: mm(size) }}>
      <Rosette size={size} lines={lines} turns={14} color={color} weight={Math.max(0.07, size / 2200)} id={id} />
      <div className="absolute flex items-center justify-center" style={{ inset: 0 }}>
        <Mark height={markH} />
      </div>
    </div>
  );
}

/**
 * Billboard, 12 × 4 m, drawn at 1:10. One idea, said once: the line «فهمٌ يُسابق الرأْي» set as large as the board allows, the mark standing
 * inside an engraved rosette, and a single address. The only place in the set that carries the line.
 */
export function Billboard({ guides }: G) {
  return (
    <Face w={1200} h={400} bg={C.deep} dir="rtl" guides={guides} bleed={<><div className="absolute inset-0" style={{ background: wash("22%", "50%", 0.55) }} /><div className="absolute" style={{ left: 0, right: 0, bottom: 0, height: mm(BLEED + 54), background: "linear-gradient(180deg, rgba(0,18,74,0), rgba(0,18,74,0.7))" }} /></>}>
      <div className="absolute" style={{ left: mm(66), top: mm(8) }}>
        <Medallion size={326} markH={108} id="bb" lines={34} color="rgba(216,174,85,0.5)" />
      </div>
      <div className="absolute" style={{ right: mm(80), top: mm(40) }}>
        <div style={{ ...disp(), fontSize: mm(112), lineHeight: 1.12, color: "#fff", textAlign: "right" }}>
          <div>فهمٌ يُسابق</div>
          <div style={{ color: "#e0b35a" }}>الرأْي</div>
        </div>
      </div>
      <div className="absolute" style={{ left: mm(56), right: mm(56), bottom: mm(24), display: "flex", alignItems: "center", gap: mm(14) }}>
        <Lockup mm={186} fill="foil" />
        <span style={{ flex: 1, height: "0.8mm", ...foilBg }} />
        <span dir="ltr" style={{ ...latin, fontSize: mm(36), letterSpacing: "0.08em", color: "#fff", lineHeight: 1 }}>taap.sa</span>
      </div>
    </Face>
  );
}

/** City-light panel, 120 × 180 cm, drawn at 1:5 (240 × 360 mm). Navy above, ivory below: the practical half. No tagline. */
export async function Mupi({ guides }: G) {
  const split = 214;
  return (
    <Face w={240} h={360} bg={C.paper} dir="rtl" guides={guides} bleed={<><div className="absolute inset-x-0" style={{ top: 0, height: mm(BLEED + split), background: C.deep }}><div className="absolute inset-0" style={{ background: wash("50%", "40%", 0.5) }} /></div><div style={goldRule({ left: 0, right: 0, top: mm(BLEED + split) })} /></>}>
      <div className="absolute flex justify-center" style={{ left: 0, right: 0, top: mm(30) }}>
        <Medallion size={170} markH={58} id="mp" lines={30} color="rgba(216,174,85,0.5)" />
      </div>
      <div className="absolute flex justify-center" style={{ left: 0, right: 0, top: mm(14) }}>
        <Lockup mm={80} fill="foil" />
      </div>
      <div className="absolute" style={{ left: mm(20), right: mm(20), top: mm(226) }}>
        <p style={{ margin: 0, fontSize: mm(6.8), color: C.goldText }}>استشارات قانونية للشركات</p>
        <p style={{ ...disp(), margin: `${mm(3)} 0 0`, fontSize: mm(17), lineHeight: 1.3, color: C.ink }}>عقود · شراكات<br />تحكيم · امتثال</p>
      </div>
      <div className="absolute flex items-end justify-between" style={{ left: mm(20), right: mm(20), bottom: mm(16) }}>
        <div>
          <p style={{ margin: 0, fontSize: mm(6.2), color: C.body }}>أرسل موجز مسألتك</p>
          <p dir="ltr" style={{ ...latin, margin: `${mm(1.6)} 0 0`, fontSize: mm(10), letterSpacing: "0.04em", color: C.ink }}>taap.sa</p>
        </div>
        <div style={{ background: C.deep, padding: mm(2) }}>
          <Qr url={qrUrl("mupi")} mm={30} light="#f6f1e6" pad={1.4} />
        </div>
      </div>
    </Face>
  );
}

/** Roll-up banner, 85 × 200 cm, drawn at 1:5 (170 × 400 mm). The lowest 25 cm is hidden by the base: nothing important sits there. */
export async function RollUp({ guides }: G) {
  return (
    <Face w={170} h={400} bg={C.deep} dir="rtl" guides={guides} bleed={<><div className="absolute inset-0" style={{ background: wash("50%", "12%", 0.5) }} /><div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,18,74,0.0) 55%, rgba(0,18,74,0.6) 100%)" }} /></>}>
      <div className="absolute" style={{ left: 0, top: 0 }}>
        <EngravedFrame w={170} h={400} inset={7} gap={1.1} cut={3.4} />
      </div>
      <div className="absolute flex justify-center" style={{ left: 0, right: 0, top: mm(22) }}>
        <Lockup mm={104} fill="foil" />
      </div>
      <div className="absolute" style={{ left: mm(7), top: mm(60) }}>
        <WaveBand w={156} h={5} lines={8} wave={12} color="rgba(216,174,85,0.65)" weight={0.08} />
      </div>
      <p className="absolute" style={{ ...disp(), left: mm(18), right: mm(18), top: mm(76), margin: 0, textAlign: "right", fontSize: mm(15), lineHeight: 1.2, color: "#fff" }}>منظومة الخدمات</p>
      <ol className="absolute m-0 list-none p-0" style={{ left: mm(18), right: mm(18), top: mm(106) }}>
        {corePillars.map((p, i) => (
          <li key={p.slug} className="flex items-center gap-[5mm]" style={{ height: mm(30), borderTop: i === 0 ? "0.3mm solid rgba(216,174,85,0.8)" : "0.2mm solid rgba(216,174,85,0.35)" }}>
            <span style={{ ...latin, fontSize: mm(10), color: C.goldBright, width: mm(14), flex: "none", letterSpacing: "0.04em" }}>{String(i + 1).padStart(2, "0")}</span>
            <span style={{ fontSize: mm(7.8), color: "#fff", lineHeight: 1.35 }}>{p.title}</span>
          </li>
        ))}
        <li style={{ borderTop: "0.3mm solid rgba(216,174,85,0.8)" }} />
      </ol>
      <div className="absolute flex items-end justify-between" style={{ left: mm(18), right: mm(18), top: mm(318) }}>
        <div>
          <p style={{ margin: 0, fontSize: mm(6), color: C.goldBright }}>أرسل موجز مسألتك</p>
          <p dir="ltr" style={{ ...latin, margin: `${mm(2)} 0 0`, fontSize: mm(9), letterSpacing: "0.05em", color: "#fff" }}>taap.sa</p>
        </div>
        <div style={{ background: C.deep, padding: mm(1.4), outline: "0.25mm solid rgba(216,174,85,0.7)", outlineOffset: mm(1.4) }}>
          <Qr url={qrUrl("roll-up")} mm={34} light="#f6f1e6" pad={1.4} />
        </div>
      </div>
    </Face>
  );
}

/** Poster A3, «Five questions before you sign». Ivory, with the numeral drawn as a hollow gold outline. */
export async function Poster({ guides }: G) {
  const qs = ["من الأطراف بالضبط، وهل لكل منهم صفةُ التوقيع؟", "ما الذي يلتزم به كل طرف، ومتى؟", "ما المدد والغرامات وأثر التأخير؟", "كيف يُنهى العقد، وماذا يترتب على إنهائه؟", "أين تُحَلّ الخلافات: قضاءً أم تحكيمًا؟"];
  const foot = 322;
  return (
    <Face w={297} h={420} bg={C.paper} dir="rtl" guides={guides} bleed={<><div className="absolute inset-x-0" style={{ bottom: 0, height: mm(BLEED + 420 - foot), background: C.deep }}><div className="absolute inset-0" style={{ background: wash("86%", "0%", 0.4) }} /></div><div style={goldRule({ left: 0, right: 0, top: mm(BLEED + foot), height: "0.6mm" })} /></>}>
      <div className="absolute" style={{ left: mm(10), top: mm(8) }}>
        <OutlineText text="5" size={150} y={132} width={120} height={150} color="rgba(185,138,53,0.95)" stroke={0.6} />
      </div>
      <div className="absolute" style={{ right: mm(24), top: mm(32) }}>
        <p style={{ margin: 0, fontSize: mm(8.4), color: C.goldText }}>قبل أن توقّع</p>
        <p style={{ ...disp(), margin: `${mm(2)} 0 0`, fontSize: mm(48), lineHeight: 1.1, color: C.ink }}>أسئلة</p>
        <p style={{ margin: `${mm(6)} 0 0`, fontSize: mm(6.4), lineHeight: 1.85, color: C.body, maxWidth: mm(112) }}>اقلب العقد، ثم اسأل. إن كان جوابٌ منها غامضًا فذلك موضع المراجعة.</p>
      </div>
      <ol className="absolute m-0 list-none p-0" style={{ top: mm(150), left: mm(24), right: mm(24) }}>
        {qs.map((q, i) => (
          <li key={q} className="flex items-baseline gap-[6mm]" style={{ padding: `${mm(3.6)} 0`, borderBottom: i === qs.length - 1 ? "none" : `0.25mm solid ${C.hair}` }}>
            <span style={{ ...latin, fontSize: mm(11), color: C.gold, width: mm(12), flex: "none", lineHeight: 1 }}>{i + 1}</span>
            <span style={{ fontSize: mm(9), color: C.ink, lineHeight: 1.45 }}>{q}</span>
          </li>
        ))}
      </ol>
      <div className="absolute flex items-center justify-between" style={{ left: mm(24), right: mm(24), top: mm(foot + 16) }}>
        <Lockup mm={92} fill="foil" />
        <div className="flex items-center gap-[6mm]">
          <div style={{ textAlign: "left" }}>
            <p dir="ltr" style={{ ...latin, margin: 0, fontSize: mm(6.2), letterSpacing: "0.06em", color: "#fff" }}>{PHONE}</p>
            <p dir="ltr" style={{ ...latin, margin: `${mm(1.4)} 0 0`, fontSize: mm(6.2), letterSpacing: "0.06em", color: C.goldBright }}>taap.sa</p>
          </div>
          <Qr url={qrUrl("poster")} mm={28} light="#f6f1e6" pad={1.4} />
        </div>
      </div>
    </Face>
  );
}

/** Entrance sign, 600 × 300 mm: a brushed-gold plate with the text engraved in navy. No direction is written: the arrow is the only guide. */
export function EntranceSign({ guides }: G) {
  return (
    <Face w={600} h={300} bg={C.deep} dir="rtl" guides={guides} bleed={<div className="absolute inset-0" style={plateBg} />}>
      <div className="absolute" style={{ left: 0, top: 0 }}>
        <EngravedFrame w={600} h={300} inset={12} gap={2.2} cut={9} color="rgba(0,18,74,0.85)" weight={0.55} />
      </div>
      <div className="absolute" style={{ right: mm(54), top: mm(66) }}>
        <p style={{ margin: 0, fontSize: mm(15), color: "rgba(0,18,74,0.85)" }}>المكتب · الدور الأول</p>
        <p style={{ ...disp(), margin: `${mm(3)} 0 0`, fontSize: mm(62), lineHeight: 1.05, color: C.ink }}>مكتب 14</p>
      </div>
      <div className="absolute" dir="ltr" style={{ left: mm(56), top: mm(86) }}>
        <svg width={mm(104)} height={mm(104)} viewBox="0 0 104 104" aria-hidden>
          <path d="M92 52H16M44 24L16 52l28 28" fill="none" stroke={C.ink} strokeWidth="7" strokeLinecap="square" strokeLinejoin="miter" />
        </svg>
      </div>
      <div className="absolute flex items-end justify-between" style={{ bottom: mm(34), left: mm(56), right: mm(54) }}>
        <p dir="ltr" style={{ ...latin, margin: 0, fontSize: mm(8.6), letterSpacing: "0.3em", color: "rgba(0,18,74,0.85)", textTransform: "uppercase" }}>Office 14 · First floor</p>
        <Lockup mm={80} />
      </div>
    </Face>
  );
}

/** Desk nameplate, 220 × 60 mm: brushed gold, the name engraved in navy. */
export function NamePlate({ guides }: G) {
  return (
    <Face w={220} h={60} bg={C.deep} dir="rtl" guides={guides} bleed={<div className="absolute inset-0" style={plateBg} />}>
      <div className="absolute" style={{ left: 0, top: 0 }}>
        <EngravedFrame w={220} h={60} inset={3.4} gap={1} cut={3} color="rgba(0,18,74,0.85)" weight={0.22} />
      </div>
      <div className="absolute" style={{ right: mm(14), top: mm(12) }}>
        <p style={{ ...disp(), margin: 0, fontSize: mm(15.4), lineHeight: 1.1, color: C.ink }}>تركي النايف</p>
        <p style={{ margin: `${mm(2.6)} 0 0`, fontSize: mm(5.4), color: "rgba(0,18,74,0.85)" }}>محامٍ · مؤسس ومدير</p>
      </div>
      <div className="absolute" dir="ltr" style={{ left: mm(14), top: mm(14) }}>
        <p style={{ ...latin, margin: 0, fontSize: mm(8.6), color: C.ink }}>Turki AlNaif</p>
        <p style={{ ...latin, margin: `${mm(2.6)} 0 0`, fontSize: mm(3.6), letterSpacing: "0.26em", color: "rgba(0,18,74,0.85)", textTransform: "uppercase" }}>Lawyer · Founding partner</p>
      </div>
      <div className="absolute" style={{ left: "50%", top: mm(11), bottom: mm(11), width: "0.3mm", marginLeft: mm(-0.15), background: "rgba(0,18,74,0.7)" }} />
    </Face>
  );
}

/** Reception wall, 240 × 90 cm drawn at 1:10 (240 × 90 mm): brass letters on a navy panel under a guilloché band. */
export function ReceptionWall({ guides }: G) {
  return (
    <Face w={240} h={90} bg={C.deep} dir="rtl" guides={guides} bleed={<><div className="absolute inset-0" style={{ background: wash("50%", "40%", 0.4) }} /></>}>
      <div className="absolute" style={{ left: 0, top: 0 }}>
        <EngravedFrame w={240} h={90} inset={4} gap={1.1} cut={3.6} />
      </div>
      <div className="absolute" style={{ left: mm(14), top: mm(8) }}>
        <WaveBand w={212} h={4} lines={8} wave={14} color="rgba(216,174,85,0.6)" weight={0.07} />
      </div>
      <div className="absolute flex justify-center" style={{ left: 0, right: 0, top: mm(24) }}>
        <Lockup mm={124} fill="foil" />
      </div>
      <div className="absolute" style={{ left: mm(14), top: mm(78) }}>
        <WaveBand w={212} h={4} lines={8} wave={14} color="rgba(216,174,85,0.6)" weight={0.07} />
      </div>
    </Face>
  );
}

/** Staff card, CR80 portrait (54 × 86 mm). Front: ivory, the person. Back: navy, the firm and the QR. */
export async function BadgeFront({ guides }: G) {
  return (
    <Face w={54} h={86} bg={C.paper} dir="rtl" guides={guides} bleed={<div style={goldRule({ left: 0, right: 0, top: mm(BLEED + 56) })} />}>
      <div className="absolute" style={{ left: 0, top: 0 }}>
        <EngravedFrame w={54} h={86} inset={2.4} gap={0.7} cut={2} color="rgba(185,138,53,0.9)" weight={0.15} />
      </div>
      <div className="absolute flex justify-center" style={{ top: mm(8), insetInline: 0 }}>
        <Mark height={7.4} />
      </div>
      <div className="absolute flex justify-center" style={{ top: mm(20), insetInline: 0 }}>
        {/* the photograph goes here: 24 mm circle */}
        <div style={{ width: mm(24), height: mm(24), borderRadius: "50%", border: "0.4mm solid #b98a35", background: "#ebe4d2" }} />
      </div>
      <div className="absolute" style={{ top: mm(60), insetInline: mm(3), textAlign: "center" }}>
        <p style={{ ...disp(), margin: 0, fontSize: mm(5.6), color: C.ink, lineHeight: 1.3, whiteSpace: "nowrap" }}>تركي النايف</p>
        <p style={{ margin: `${mm(1.4)} 0 0`, fontSize: mm(2.8), color: C.goldText, whiteSpace: "nowrap" }}>محامٍ · مؤسس ومدير</p>
      </div>
      <p className="absolute" dir="ltr" style={{ ...latin, bottom: mm(6.4), insetInline: 0, margin: 0, textAlign: "center", fontSize: mm(2.1), letterSpacing: "0.34em", color: "rgba(44,53,80,0.8)" }}>TAAP.SA</p>
    </Face>
  );
}

export async function BadgeBack({ guides }: G) {
  return (
    <Face w={54} h={86} bg={C.deep} dir="rtl" guides={guides} bleed={<div className="absolute inset-0" style={{ background: wash("50%", "10%", 0.5) }} />}>
      <div className="absolute" style={{ left: 0, top: 0 }}>
        <EngravedFrame w={54} h={86} inset={2.4} gap={0.7} cut={2} color="rgba(216,174,85,0.8)" weight={0.15} />
      </div>
      <div className="absolute flex justify-center" style={{ top: mm(6.4), insetInline: 0 }}>
        <Lockup mm={32} fill="foil" />
      </div>
      <div className="absolute flex justify-center" style={{ top: mm(24), insetInline: 0 }}>
        <div style={{ background: C.deep, padding: mm(1), outline: "0.2mm solid rgba(216,174,85,0.8)", outlineOffset: mm(1) }}>
          <Qr url={qrUrl("staff-card")} mm={21} light="#f6f1e6" pad={0.6} />
        </div>
      </div>
      <p className="absolute" style={{ top: mm(55), insetInline: 0, margin: 0, textAlign: "center", fontSize: mm(2.6), color: C.goldBright }}>امسح للتواصل مع المكتب</p>
      <div className="absolute" style={{ top: mm(61), insetInline: mm(5), textAlign: "center", fontSize: mm(2.3), lineHeight: 1.6, color: "rgba(255,255,255,0.9)" }}>
        {ADDRESS_AR.map((l) => (
          <p key={l} style={{ margin: 0 }}>{l}</p>
        ))}
        <p dir="ltr" style={{ ...latin, margin: `${mm(0.8)} 0 0`, letterSpacing: "0.06em", color: C.goldBright }}>{PHONE}</p>
      </div>
      <p className="absolute" style={{ bottom: mm(4.4), insetInline: mm(5), margin: 0, textAlign: "center", fontSize: mm(1.8), lineHeight: 1.5, color: "rgba(255,255,255,0.65)" }}>
        إن عثرتَ على هذه البطاقة فنرجو إعادتها إلى المكتب. رخصة المحاماة {firm.licenseNumber}
      </p>
    </Face>
  );
}

/** Lanyard, 20 mm × 900 mm: one face, a repeat of the name between two guilloché lines. */
export function Lanyard({ guides }: G) {
  const unit = (
    <span className="inline-flex items-center" style={{ gap: mm(8), marginInlineEnd: mm(8) }}>
      <span style={{ ...latin, fontSize: mm(5.2), letterSpacing: "0.34em", color: C.goldBright, textTransform: "uppercase" }}>Turki AlNaif &amp; Partners</span>
      <Diamond size={2.2} color={C.goldBright} />
      <span style={{ fontSize: mm(5.2), color: "#fff" }}>تركي النايف وشركاؤه</span>
      <Diamond size={2.2} color={C.goldBright} />
      <span style={{ ...latin, fontSize: mm(5.2), letterSpacing: "0.34em", color: "#fff" }}>TAAP.SA</span>
      <Diamond size={2.2} color={C.goldBright} />
    </span>
  );
  return (
    <Face w={900} h={20} bg={C.deep} dir="ltr" guides={guides} bleed={<><div className="absolute" style={{ left: 0, top: mm(BLEED + 0.8) }}><WaveBand w={906} h={2.2} lines={5} wave={9} color="rgba(216,174,85,0.6)" weight={0.07} /></div><div className="absolute" style={{ left: 0, bottom: mm(BLEED + 0.8) }}><WaveBand w={906} h={2.2} lines={5} wave={9} color="rgba(216,174,85,0.6)" weight={0.07} /></div></>}>
      <div className="absolute inset-0 flex items-center overflow-hidden whitespace-nowrap" style={{ paddingLeft: mm(8) }}>
        {unit}
        {unit}
      </div>
    </Face>
  );
}

/** Hard-cover A5 notebook, flat: back, spine, front. Navy cloth, a blind-stamped frame and a foil mark. */
export async function Notebook({ guides }: G) {
  const W = 148;
  const SP = 10;
  return (
    <Face w={W * 2 + SP} h={210} bg={C.deep} dir="rtl" guides={guides} bleed={<div className="absolute inset-0" style={{ background: wash("75%", "30%", 0.4) }} />}>
      <div className="absolute" style={{ right: 0, top: 0, width: mm(W), height: mm(210) }}>
        <EngravedFrame w={W} h={210} inset={9} gap={1.2} cut={4} />
        <div className="absolute flex justify-center" style={{ top: mm(52), insetInline: 0 }}>
          <Mark height={56} />
        </div>
        <div className="absolute flex justify-center" style={{ top: mm(164), insetInline: 0 }}>
          <Lockup mm={64} fill="foil" />
        </div>
      </div>
      <div className="absolute flex items-center justify-center" style={{ left: mm(W), top: 0, width: mm(SP), height: mm(210), background: "rgba(0,18,74,0.6)" }}>
        <span style={{ writingMode: "vertical-rl", ...latin, color: C.goldBright, fontSize: mm(2.6), letterSpacing: "0.34em", textTransform: "uppercase" }}>Turki AlNaif &amp; Partners</span>
      </div>
      <div className="absolute" style={{ left: 0, top: 0, width: mm(W), height: mm(210) }}>
        <EngravedFrame w={W} h={210} inset={9} gap={1.2} cut={4} color="rgba(216,174,85,0.55)" />
        <p className="absolute" dir="ltr" style={{ ...latin, left: 0, right: 0, bottom: mm(24), margin: 0, textAlign: "center", fontSize: mm(3.2), letterSpacing: "0.3em", color: C.goldBright }}>taap.sa</p>
      </div>
    </Face>
  );
}
