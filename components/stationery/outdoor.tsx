import type { CSSProperties } from "react";
import { corePillars, firm } from "@/lib/site";
import { ADDRESS_AR, PHONE, Qr, qrUrl } from "@/components/stationery/cards";
import { Lockup } from "@/components/stationery/paper";
import { BLEED, C, Diamond, Face, Mark, MarkField, Thread, disp, foilBg, latin } from "@/components/stationery/parts";

type G = { guides?: boolean };
const mm = (n: number) => `${n}mm`;
const tip = 0.9618; // the longest column's tip, as a fraction of the mark's height

/** Gold gradient numerals or letters, as vector text (a gradient clipped to HTML glyphs prints unevenly; SVG text does not). */
function FoilText({ text, size, x = 0, y, id, width, height, anchor = "start", family = "var(--font-brand-raw), sans-serif", spacing = 0 }: { text: string; size: number; x?: number; y: number; id: string; width: number; height: number; anchor?: "start" | "middle" | "end"; family?: string; spacing?: number }) {
  return (
    <svg width={mm(width)} height={mm(height)} viewBox={`0 0 ${width} ${height}`} direction="ltr" style={{ display: "block", overflow: "visible", direction: "ltr" }} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8a6420" />
          <stop offset="0.25" stopColor="#d9b25c" />
          <stop offset="0.45" stopColor="#fff3c6" />
          <stop offset="0.65" stopColor="#d4a747" />
          <stop offset="1" stopColor="#a77c2a" />
        </linearGradient>
      </defs>
      <text x={x} y={y} textAnchor={anchor} fill={`url(#${id})`} style={{ fontFamily: family, fontSize: size, letterSpacing: spacing }}>
        {text}
      </text>
    </svg>
  );
}

/** The headline, in two lines, the second in gold. */
function Headline({ size, align = "right", lh = 1.2, style }: { size: number; align?: "right" | "left" | "center"; lh?: number; style?: CSSProperties }) {
  return (
    <div style={{ ...disp(), fontSize: mm(size), lineHeight: lh, color: "#fff", textAlign: align, ...style }}>
      <div>فهمٌ يُسابق</div>
      <div style={{ color: "#e0b35a" }}>الرأْي</div>
    </div>
  );
}

const glow = (x: string, y: string, a = 0.4) => `radial-gradient(ellipse 55% 70% at ${x} ${y}, rgba(40,84,220,${a}), transparent 72%)`;

/**
 * Billboard, 12 × 4 m, drawn at 1:10 (1200 × 400 mm): the mark stands at monumental scale, its longest column landing on the thread, and
 * the headline is set as large as the board allows. Seven words, no phone number, one address: taap.sa.
 */
export function Billboard({ guides }: G) {
  const H = 262;
  return (
    <Face w={1200} h={400} bg={C.deep} dir="rtl" guides={guides} bleed={<><div className="absolute inset-0" style={{ background: glow("26%", "40%", 0.5) }} /><Thread y={BLEED + 300} from={-4} to="end" foilLine weight={1.7} /></>}>
      <div className="absolute" style={{ left: mm(74), top: mm(300 - tip * H) }}>
        <Mark height={H} />
      </div>
      <div className="absolute" style={{ right: mm(70), top: mm(34) }}>
        <Headline size={96} lh={1.16} />
      </div>
      <div className="absolute flex items-center gap-[10mm]" style={{ right: mm(70), top: mm(320) }}>
        <Lockup mm={262} fill="foil" />
      </div>
      <div className="absolute flex items-center gap-[12mm]" dir="ltr" style={{ left: mm(74), top: mm(327) }}>
        <span style={{ ...latin, fontSize: mm(40), letterSpacing: "0.06em", color: "#fff", lineHeight: 1 }}>taap.sa</span>
        <Diamond size={9} color={C.goldBright} />
      </div>
    </Face>
  );
}

/** City-light / mupi panel, 120 × 180 cm, drawn at 1:5 (240 × 360 mm). */
export async function Mupi({ guides }: G) {
  const H = 205;
  return (
    <Face w={240} h={360} bg={C.deep} dir="rtl" guides={guides} bleed={<><div className="absolute inset-0" style={{ background: glow("50%", "25%", 0.42) }} /><Thread y={BLEED + 272} from={-4} to="end" foilLine weight={0.5} /></>}>
      <div className="absolute" style={{ left: mm((240 - (H * 420) / 340) / 2), top: mm(272 - tip * H) }}>
        <Mark height={H} />
      </div>
      <div className="absolute" style={{ right: mm(18), top: mm(14) }}>
        <Headline size={22} lh={1.16} />
      </div>
      <div className="absolute" style={{ right: mm(18), top: mm(290) }}>
        <Lockup mm={140} fill="foil" />
      </div>
      <div className="absolute" style={{ left: mm(18), top: mm(290) }}>
        <Qr url={qrUrl("mupi")} mm={30} light="#f6f1e6" pad={1.6} />
      </div>
      <p className="absolute" dir="ltr" style={{ ...latin, left: mm(18), top: mm(325), width: mm(30), margin: 0, textAlign: "center", fontSize: mm(3.4), letterSpacing: "0.12em", color: C.goldBright }}>taap.sa</p>
    </Face>
  );
}

/** Roll-up banner, 85 × 200 cm, drawn at 1:5 (170 × 400 mm). The lowest 25 cm of a roll-up is hidden by its base: nothing important sits there. */
export async function RollUp({ guides }: G) {
  return (
    <Face w={170} h={400} bg={C.deep} dir="rtl" guides={guides} bleed={<><MarkField w={176} h={406} tile={22} size={6.5} id="ru" color="rgba(60,110,235,0.14)" /><div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,6,29,0.0) 0%, rgba(0,6,29,0.55) 40%, #00061d 78%)" }} /><div className="absolute inset-0" style={{ background: glow("50%", "0%", 0.5) }} /></>}>
      <div className="absolute flex justify-center" style={{ top: mm(20), insetInline: 0 }}>
        <Lockup mm={118} fill="foil" />
      </div>
      <Thread y={BLEED + 66} from={-4} to="end" foilLine weight={0.5} />
      <p className="absolute" style={{ ...disp(), top: mm(76), insetInline: mm(16), margin: 0, textAlign: "right", fontSize: mm(15.5), lineHeight: 1.2, color: "#fff" }}>
        منظومة الخدمات
        <span style={{ display: "block", ...latin, fontSize: mm(4), letterSpacing: "0.3em", color: C.goldBright, marginTop: mm(3), textTransform: "uppercase" }}>Practice architecture</span>
      </p>
      <ol className="absolute m-0 list-none p-0" style={{ top: mm(110), insetInline: mm(16) }}>
        {corePillars.map((p, i) => (
          <li key={p.slug} className="flex items-baseline gap-[5mm]" style={{ padding: `${mm(5.6)} 0`, borderBottom: i === corePillars.length - 1 ? "none" : "0.3mm solid rgba(216,174,85,0.4)" }}>
            <span style={{ ...latin, fontSize: mm(7.4), color: C.goldBright, width: mm(10), flex: "none" }}>{String(i + 1).padStart(2, "0")}</span>
            <span style={{ fontSize: mm(7.8), color: "#fff", lineHeight: 1.4 }}>{p.title}</span>
          </li>
        ))}
      </ol>
      <div className="absolute flex items-end justify-between" style={{ top: mm(306), insetInline: mm(16) }}>
        <div>
          <p style={{ margin: 0, fontSize: mm(6), color: C.goldBright }}>أرسل موجز مسألتك</p>
          <p dir="ltr" style={{ ...latin, margin: `${mm(2)} 0 0`, fontSize: mm(8.4), letterSpacing: "0.05em", color: "#fff" }}>taap.sa</p>
        </div>
        <Qr url={qrUrl("roll-up")} mm={38} light="#f6f1e6" pad={2} />
      </div>
    </Face>
  );
}

/** Poster A3: «Five questions before you sign», a lobby piece that is also a leave-behind in giant form. */
export async function Poster({ guides }: G) {
  const qs = ["من الأطراف بالضبط، وهل لكل منهم صفةُ التوقيع؟", "ما الذي يلتزم به كل طرف، ومتى؟", "ما المدد والغرامات وأثر التأخير؟", "كيف يُنهى العقد، وماذا يترتب على إنهائه؟", "أين تُحَلّ الخلافات: قضاءً أم تحكيمًا؟"];
  return (
    <Face w={297} h={420} bg={C.deep} dir="rtl" guides={guides} bleed={<><MarkField w={303} h={426} tile={26} size={8} id="po" color="rgba(60,110,235,0.12)" /><div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,6,29,0.0) 0%, rgba(0,6,29,0.7) 50%, #00061d 90%)" }} /><div className="absolute inset-0" style={{ background: glow("20%", "18%", 0.55) }} /><Thread y={BLEED + 168} from={-4} to="end" foilLine weight={0.5} /></>}>
      <div className="absolute" style={{ left: mm(14), top: mm(12) }}>
        <FoilText text="5" size={196} x={0} y={150} id="po5" width={150} height={170} family="var(--font-brand-raw), sans-serif" />
      </div>
      <div className="absolute" style={{ right: mm(22), top: mm(30) }}>
        <p style={{ margin: 0, fontSize: mm(8.4), color: C.goldBright }}>قبل أن توقّع</p>
        <p style={{ ...disp(), margin: `${mm(3)} 0 0`, fontSize: mm(42), lineHeight: 1.1, color: "#fff" }}>أسئلة</p>
        <p style={{ margin: `${mm(6)} 0 0`, fontSize: mm(6.6), lineHeight: 1.8, color: "rgba(255,255,255,0.8)", maxWidth: mm(120) }}>اقلب العقد، ثم اسأل. إن كان جوابٌ منها غامضًا فذلك موضع المراجعة.</p>
      </div>
      <ol className="absolute m-0 list-none p-0" style={{ top: mm(190), insetInline: mm(22) }}>
        {qs.map((q, i) => (
          <li key={q} className="flex items-baseline gap-[6mm]" style={{ padding: `${mm(3.2)} 0`, borderBottom: i === qs.length - 1 ? "none" : "0.3mm solid rgba(216,174,85,0.35)" }}>
            <span style={{ fontSize: mm(10), color: C.goldBright, width: mm(9), flex: "none", lineHeight: 1 }}>{["١", "٢", "٣", "٤", "٥"][i]}</span>
            <span style={{ fontSize: mm(8.6), color: "#fff", lineHeight: 1.45 }}>{q}</span>
          </li>
        ))}
      </ol>
      <div className="absolute flex items-end justify-between" style={{ bottom: mm(16), insetInline: mm(22) }}>
        <Lockup mm={96} fill="foil" />
        <div className="flex items-end gap-[5mm]">
          <div style={{ textAlign: "left" }}>
            <p dir="ltr" style={{ ...latin, margin: 0, fontSize: mm(6.4), letterSpacing: "0.06em", color: "#fff" }}>{PHONE}</p>
            <p dir="ltr" style={{ ...latin, margin: `${mm(1.2)} 0 0`, fontSize: mm(6.4), letterSpacing: "0.06em", color: C.goldBright }}>taap.sa</p>
          </div>
          <Qr url={qrUrl("poster")} mm={26} light="#f6f1e6" pad={1.4} />
        </div>
      </div>
    </Face>
  );
}

/** Office door plate, 300 × 100 mm: navy, a gold hairline frame, the thread running through it. */
export function DoorPlate({ guides }: G) {
  return (
    <Face w={300} h={100} bg={C.deep} dir="rtl" guides={guides} bleed={<div className="absolute inset-0" style={{ background: glow("85%", "30%", 0.45) }} />}>
      <div className="absolute" style={{ inset: mm(4), border: "0.5mm solid rgba(216,174,85,0.75)" }} />
      <div className="absolute" style={{ right: mm(16), top: mm(20) }}>
        <p style={{ ...disp(), margin: 0, fontSize: mm(24), lineHeight: 1.1, color: "#fff" }}>مكتب 14</p>
        <p style={{ margin: `${mm(3)} 0 0`, fontSize: mm(8.6), color: C.goldBright }}>الدور الأول</p>
      </div>
      <div style={{ position: "absolute", left: mm(16), right: mm(124), top: mm(46.4), height: "0.4mm", ...foilBg }} />
      <div className="absolute" dir="ltr" style={{ left: mm(16), top: mm(20) }}>
        <Mark height={14} />
      </div>
      <div className="absolute" dir="ltr" style={{ left: mm(16), top: mm(56) }}>
        <p style={{ ...latin, margin: 0, fontSize: mm(7.6), letterSpacing: "0.16em", color: "#fff", textTransform: "uppercase" }}>Office 14</p>
        <p style={{ ...latin, margin: `${mm(1.6)} 0 0`, fontSize: mm(5), letterSpacing: "0.3em", color: C.goldBright, textTransform: "uppercase" }}>First floor</p>
      </div>
    </Face>
  );
}

/** Entrance sign, 600 × 300 mm, for the building's south-facing entrance. */
export function EntranceSign({ guides }: G) {
  return (
    <Face w={600} h={300} bg={C.deep} dir="rtl" guides={guides} bleed={<><div className="absolute inset-0" style={{ background: glow("78%", "30%", 0.5) }} /><Thread y={BLEED + 196} from={-4} to="end" foilLine weight={1} /></>}>
      <div className="absolute" style={{ right: mm(46), top: mm(36) }}>
        <p style={{ margin: 0, fontSize: mm(15), color: C.goldBright }}>مدخل المكتب</p>
        <p style={{ ...disp(), margin: `${mm(4)} 0 0`, fontSize: mm(52), lineHeight: 1.1, color: "#fff" }}>الجهة الجنوبية</p>
      </div>
      <div className="absolute" dir="ltr" style={{ left: mm(46), top: mm(48) }}>
        {/* the arrow points to the entrance: turn it to match the door when it is installed */}
        <svg width={mm(96)} height={mm(96)} viewBox="0 0 96 96" aria-hidden>
          <defs>
            <linearGradient id="es-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#8a6420" /><stop offset="0.4" stopColor="#fff3c6" /><stop offset="1" stopColor="#a77c2a" /></linearGradient>
          </defs>
          <path d="M82 48H16M40 22L14 48l26 26" fill="none" stroke="url(#es-g)" strokeWidth="6" strokeLinecap="square" strokeLinejoin="miter" />
        </svg>
      </div>
      <div className="absolute flex items-end justify-between" style={{ bottom: mm(22), insetInline: mm(46) }}>
        <p dir="ltr" style={{ ...latin, margin: 0, fontSize: mm(8), letterSpacing: "0.3em", color: "#fff", textTransform: "uppercase" }}>South entrance · Office 14</p>
        <Lockup mm={86} fill="foil" />
      </div>
    </Face>
  );
}

/** Desk nameplate, 220 × 60 mm. */
export function NamePlate({ guides }: G) {
  return (
    <Face w={220} h={60} bg={C.deep} dir="rtl" guides={guides} bleed={<><div className="absolute inset-0" style={{ background: glow("85%", "0%", 0.5) }} /><div className="absolute inset-x-0" style={{ top: 0, height: mm(BLEED + 1.2), ...foilBg }} /></>}>
      <div className="absolute" style={{ right: mm(12), top: mm(11) }}>
        <p style={{ ...disp(), margin: 0, fontSize: mm(15), lineHeight: 1.1, color: "#fff" }}>تركي النايف</p>
        <p style={{ margin: `${mm(2)} 0 0`, fontSize: mm(6), color: C.goldBright }}>محامٍ · مؤسس ومدير</p>
      </div>
      <div className="absolute" dir="ltr" style={{ left: mm(12), top: mm(14) }}>
        <p style={{ ...latin, margin: 0, fontSize: mm(8.6), color: "#fff" }}>Turki AlNaif</p>
        <p style={{ ...latin, margin: `${mm(2.4)} 0 0`, fontSize: mm(3.8), letterSpacing: "0.26em", color: C.goldBright, textTransform: "uppercase" }}>Lawyer · Founding partner</p>
      </div>
      <div className="absolute" style={{ left: "50%", top: mm(10), bottom: mm(10), width: "0.3mm", marginLeft: mm(-0.15), ...foilBg }} />
    </Face>
  );
}

/** Reception wall, 240 × 90 cm, drawn at 1:10 (240 × 90 mm): brushed-brass letters on a deep-navy panel; the thread is a brass strip. */
export function ReceptionWall({ guides }: G) {
  return (
    <Face w={240} h={90} bg={C.deep} dir="rtl" guides={guides} bleed={<><MarkField w={246} h={96} tile={12} size={3.6} id="rw" color="rgba(60,110,235,0.12)" /><div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(0,6,29,0.0), rgba(0,6,29,0.78) 100%)" }} /><div className="absolute inset-0" style={{ background: glow("50%", "20%", 0.4) }} /><Thread y={BLEED + 66} from={-4} to="end" foilLine weight={0.9} /></>}>
      <div className="absolute flex justify-center" style={{ top: mm(14), insetInline: 0 }}>
        <Lockup mm={134} fill="foil" />
      </div>
      <p className="absolute" dir="ltr" style={{ ...latin, left: 0, right: 0, top: mm(74), margin: 0, textAlign: "center", fontSize: mm(3.4), letterSpacing: "0.5em", color: C.goldBright, textTransform: "uppercase" }}>Understanding that runs ahead of opinion</p>
    </Face>
  );
}

/** Staff card, CR80 portrait (54 × 86 mm). Side 1: the person. Side 2: the firm. */
export async function BadgeFront({ guides }: G) {
  return (
    <Face w={54} h={86} bg={C.deep} dir="rtl" guides={guides} bleed={<><div className="absolute inset-0" style={{ background: glow("50%", "0%", 0.5) }} /><Thread y={BLEED + 56} from={-4} to="end" foilLine weight={0.3} /></>}>
      <div className="absolute flex justify-center" style={{ top: mm(7), insetInline: 0 }}>
        <Mark height={9} />
      </div>
      <div className="absolute flex justify-center" style={{ top: mm(20), insetInline: 0 }}>
        {/* the photograph goes here: 24 mm circle */}
        <div style={{ width: mm(24), height: mm(24), borderRadius: "50%", border: "0.5mm solid rgba(216,174,85,0.9)", background: "rgba(40,84,220,0.18)" }} />
      </div>
      <div className="absolute" style={{ top: mm(59), insetInline: mm(3), textAlign: "center" }}>
        <p style={{ ...disp(), margin: 0, fontSize: mm(5.8), color: "#fff", lineHeight: 1.3, whiteSpace: "nowrap" }}>تركي النايف</p>
        <p style={{ margin: `${mm(1.4)} 0 0`, fontSize: mm(2.9), color: C.goldBright, whiteSpace: "nowrap" }}>محامٍ · مؤسس ومدير</p>
      </div>
      <p className="absolute" dir="ltr" style={{ ...latin, bottom: mm(4.6), insetInline: 0, margin: 0, textAlign: "center", fontSize: mm(2.2), letterSpacing: "0.34em", color: "rgba(255,255,255,0.75)" }}>TAAP.SA</p>
    </Face>
  );
}

export async function BadgeBack({ guides }: G) {
  return (
    <Face w={54} h={86} bg={C.paper} dir="rtl" guides={guides} bleed={<Thread y={BLEED + 16} from={-4} to="end" nodes={[]} />}>
      <div className="absolute flex justify-center" style={{ top: mm(4.4), insetInline: 0 }}>
        <Lockup mm={34} />
      </div>
      <div className="absolute flex justify-center" style={{ top: mm(24), insetInline: 0 }}>
        <div style={{ background: C.deep, padding: mm(1.2) }}>
          <Qr url={qrUrl("staff-card")} mm={22} light="#f6f1e6" pad={0.6} />
        </div>
      </div>
      <p className="absolute" style={{ top: mm(54.6), insetInline: 0, margin: 0, textAlign: "center", fontSize: mm(2.8), color: C.goldText }}>امسح للتواصل مع المكتب</p>
      <div className="absolute" style={{ top: mm(61), insetInline: mm(5), textAlign: "center", fontSize: mm(2.4), lineHeight: 1.6, color: C.body }}>
        {ADDRESS_AR.map((l) => (
          <p key={l} style={{ margin: 0 }}>{l}</p>
        ))}
        <p dir="ltr" style={{ ...latin, margin: `${mm(0.8)} 0 0`, letterSpacing: "0.06em", color: C.ink }}>{PHONE}</p>
      </div>
      <p className="absolute" style={{ bottom: mm(3.6), insetInline: mm(4), margin: 0, textAlign: "center", fontSize: mm(1.9), lineHeight: 1.5, color: "rgba(44,53,80,0.8)" }}>
        إن عثرتَ على هذه البطاقة فنرجو إعادتها إلى المكتب. رخصة المحاماة {firm.licenseNumber}
      </p>
    </Face>
  );
}

/** Lanyard, 20 mm × 900 mm: one face, a pattern that repeats the name and the mark. */
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
    <Face w={900} h={20} bg={C.deep} dir="ltr" guides={guides} bleed={<><div className="absolute inset-x-0" style={{ top: mm(BLEED + 1.2), height: "0.3mm", ...foilBg }} /><div className="absolute inset-x-0" style={{ bottom: mm(BLEED + 1.2), height: "0.3mm", ...foilBg }} /></>}>
      <div className="absolute inset-0 flex items-center overflow-hidden whitespace-nowrap" style={{ paddingLeft: mm(8) }}>
        {unit}
        {unit}
      </div>
    </Face>
  );
}

/** Hard-cover A5 notebook, flat: back, spine, front. The thread crosses the whole cover. */
export async function Notebook({ guides }: G) {
  const W = 148;
  const SP = 10;
  return (
    <Face w={W * 2 + SP} h={210} bg={C.deep} dir="rtl" guides={guides} bleed={<><div className="absolute inset-0" style={{ background: glow("25%", "28%", 0.4) }} /><Thread y={BLEED + 150} from={-4} to="end" foilLine weight={0.35} /></>}>
      {/* front (right) */}
      <div className="absolute" style={{ right: 0, top: 0, width: mm(W), height: mm(210) }}>
        <div className="absolute flex justify-center" style={{ top: mm(48), insetInline: 0 }}>
          <Mark height={62} />
        </div>
        <div className="absolute flex justify-center" style={{ top: mm(168), insetInline: 0 }}>
          <Lockup mm={74} fill="foil" />
        </div>
      </div>
      {/* spine */}
      <div className="absolute flex items-center justify-center" style={{ left: mm(W), top: 0, width: mm(SP), height: mm(210), background: "rgba(0,18,74,0.6)" }}>
        <span style={{ writingMode: "vertical-rl", ...latin, color: C.goldBright, fontSize: mm(2.6), letterSpacing: "0.34em", textTransform: "uppercase" }}>Turki AlNaif &amp; Partners</span>
      </div>
      {/* back (left) */}
      <div className="absolute" style={{ left: 0, top: 0, width: mm(W), height: mm(210) }}>
        <div className="absolute" style={{ right: mm(16), top: mm(20) }}>
          <Headline size={11.6} lh={1.18} />
        </div>
        <p className="absolute" dir="ltr" style={{ ...latin, left: mm(16), bottom: mm(16), margin: 0, fontSize: mm(3.2), letterSpacing: "0.3em", color: C.goldBright }}>taap.sa</p>
      </div>
    </Face>
  );
}

