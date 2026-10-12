import { corePillars, firm } from "@/lib/site";
import { ADDRESS_AR, EMAIL, PHONE, Qr, qrUrl } from "@/components/stationery/cards";
import { C, Face, Lockup, Mark, Rule, disp, latin, mm } from "@/components/stationery/parts";

type G = { guides?: boolean };

/**
 * Billboard, 12 × 4 m, drawn at 1:10. One sentence, as large as the board allows, and the lockup in brass. It is the only piece in the set that
 * carries the line.
 */
export function Billboard({ guides }: G) {
  return (
    <Face w={1200} h={400} bg={C.ink} guides={guides}>
      <div className="absolute" style={{ right: mm(84), top: mm(48), ...disp(), fontSize: mm(116), lineHeight: 1.12, color: "#fff", textAlign: "right" }}>
        <div>فهمٌ يُسابق</div>
        <div style={{ color: C.brass }}>الرأْي</div>
      </div>
      <div className="absolute" style={{ left: mm(84), bottom: mm(72) }}>
        <Lockup mm={236} tone="brass" />
      </div>
      <p className="absolute" dir="ltr" style={{ ...latin, left: mm(84), bottom: mm(30), margin: 0, fontSize: mm(22), letterSpacing: "0.12em", color: "rgba(255,255,255,0.85)" }}>taap.sa</p>
    </Face>
  );
}

/** City-light panel, 120 × 180 cm, drawn at 1:5 (240 × 360 mm). */
export async function Mupi({ guides }: G) {
  return (
    <Face w={240} h={360} bg={C.ink} guides={guides}>
      <div className="absolute flex justify-center" style={{ left: 0, right: 0, top: mm(58) }}>
        <Mark height={104} />
      </div>
      <div className="absolute flex justify-center" style={{ left: 0, right: 0, top: mm(200) }}>
        <Lockup mm={118} tone="brass" />
      </div>
      <p className="absolute" style={{ left: 0, right: 0, top: mm(262), margin: 0, textAlign: "center", fontSize: mm(7.4), color: "rgba(255,255,255,0.88)" }}>استشارات قانونية للشركات</p>
      <div className="absolute flex items-end justify-between" style={{ left: mm(22), right: mm(22), bottom: mm(20) }}>
        <p dir="ltr" style={{ ...latin, margin: 0, fontSize: mm(9), letterSpacing: "0.12em", color: C.brass }}>taap.sa</p>
        <Qr url={qrUrl("mupi")} size={28} light={C.bone} pad={1.6} />
      </div>
    </Face>
  );
}

/** Roll-up banner, 85 × 200 cm, drawn at 1:5 (170 × 400 mm). The lowest 25 cm is hidden by its base: nothing important sits there. */
export async function RollUp({ guides }: G) {
  return (
    <Face w={170} h={400} bg={C.ink} guides={guides}>
      <div className="absolute flex justify-center" style={{ left: 0, right: 0, top: mm(38) }}>
        <Lockup mm={106} tone="brass" />
      </div>
      <ol className="absolute m-0 list-none p-0" style={{ left: mm(22), right: mm(22), top: mm(110) }}>
        {corePillars.map((p, i) => (
          <li key={p.slug} className="flex items-center" style={{ gap: mm(5), height: mm(28), borderTop: `0.25mm solid ${C.hairOnInk}` }}>
            <span style={{ ...latin, fontSize: mm(7), color: C.brass, width: mm(10), flex: "none", letterSpacing: "0.06em" }}>{String(i + 1).padStart(2, "0")}</span>
            <span style={{ fontSize: mm(7.6), color: "#fff", lineHeight: 1.35 }}>{p.title}</span>
          </li>
        ))}
        <li style={{ borderTop: `0.25mm solid ${C.hairOnInk}` }} />
      </ol>
      <div className="absolute flex items-end justify-between" style={{ left: mm(22), right: mm(22), top: mm(316) }}>
        <div>
          <p style={{ margin: 0, fontSize: mm(5.6), color: "rgba(255,255,255,0.8)" }}>أرسل موجز مسألتك</p>
          <p dir="ltr" style={{ ...latin, margin: `${mm(2)} 0 0`, fontSize: mm(8.4), letterSpacing: "0.1em", color: C.brass }}>taap.sa</p>
        </div>
        <Qr url={qrUrl("roll-up")} size={30} light={C.bone} pad={1.4} />
      </div>
    </Face>
  );
}

/** Poster A3, «Five questions before you sign». Bone, set in type alone. */
export async function Poster({ guides }: G) {
  const qs = ["من الأطراف بالضبط، وهل لكل منهم صفةُ التوقيع؟", "ما الذي يلتزم به كل طرف، ومتى؟", "ما المدد والغرامات وأثر التأخير؟", "كيف يُنهى العقد، وماذا يترتب على إنهائه؟", "أين تُحَلّ الخلافات: قضاءً أم تحكيمًا؟"];
  return (
    <Face w={297} h={420} bg={C.bone} guides={guides}>
      <p className="absolute" style={{ top: mm(34), right: mm(28), margin: 0, fontSize: mm(8), color: C.brassDeep }}>قبل أن توقّع</p>
      <div className="absolute flex items-end" style={{ top: mm(44), right: mm(28), gap: mm(10) }}>
        <span style={{ ...disp(true), fontSize: mm(96), lineHeight: 1, color: C.navy }}>5</span>
        <span style={{ ...disp(), fontSize: mm(42), lineHeight: 1.1, color: C.navy, paddingBottom: mm(8) }}>أسئلة</span>
      </div>
      <ol className="absolute m-0 list-none p-0" style={{ top: mm(172), left: mm(28), right: mm(28) }}>
        {qs.map((q, i) => (
          <li key={q} className="flex items-baseline" style={{ gap: mm(7), padding: `${mm(4)} 0`, borderTop: `0.25mm solid ${C.hair}` }}>
            <span style={{ ...latin, fontSize: mm(8), color: C.brassDeep, width: mm(10), flex: "none" }}>{i + 1}</span>
            <span style={{ fontSize: mm(8.6), color: C.navy, lineHeight: 1.45 }}>{q}</span>
          </li>
        ))}
        <li style={{ borderTop: `0.25mm solid ${C.hair}` }} />
      </ol>
      <div className="absolute flex items-end justify-between" style={{ left: mm(28), right: mm(28), bottom: mm(26) }}>
        <Lockup mm={74} />
        <div className="flex items-end" dir="ltr" style={{ gap: mm(6) }}>
          <div style={{ ...latin, fontSize: mm(5.2), lineHeight: 1.7, letterSpacing: "0.06em", color: C.navy }}>
            <p style={{ margin: 0 }}>{PHONE}</p>
            <p style={{ margin: 0, color: C.brassDeep }}>taap.sa</p>
          </div>
          <Qr url={qrUrl("poster")} size={24} light="transparent" dark={C.navy} pad={0} />
        </div>
      </div>
    </Face>
  );
}

/**
 * The office sign beside the corridor door. Matte ink slate; the letters are brass, cut out and held 3 mm off the panel. The reference is a black
 * slate with a single metal number above and the name below; here the same restraint carries the particulars of the old sign (hours, licence,
 * contacts, the QR). SIZE IS AN ESTIMATE from the photograph (about 100 × 65 cm): confirm against the old sign before it is made.
 */
export async function OfficeSign({ guides }: G) {
  const row = (label: string, value: string, en = false) => (
    <div className="flex items-baseline justify-between" dir={en ? "ltr" : "rtl"} style={{ gap: mm(10), height: mm(30), borderBottom: `0.4mm solid ${C.hairOnInk}` }}>
      <span style={{ fontSize: mm(15), color: "rgba(255,255,255,0.7)", ...(en ? latin : {}) }}>{label}</span>
      <span style={{ fontSize: mm(17), color: "#fff", ...(en ? { ...latin, letterSpacing: "0.02em" } : {}) }}>{value}</span>
    </div>
  );
  const head = (t: string, en = false) => (
    <p dir={en ? "ltr" : "rtl"} style={{ margin: `0 0 ${mm(6)}`, fontSize: mm(en ? 12 : 16.5), letterSpacing: en ? "0.26em" : 0, textTransform: en ? "uppercase" : "none", color: C.brass, ...(en ? latin : {}) }}>
      {t}
    </p>
  );
  return (
    <Face w={1000} h={650} bg={C.ink} guides={guides}>
      {/* top: the number, and the name */}
      <div className="absolute" dir="ltr" style={{ left: mm(64), top: mm(66), ...latin, fontSize: mm(176), lineHeight: 0.9, color: C.brass, letterSpacing: "-0.02em" }}>14</div>
      <p className="absolute" style={{ left: mm(70), top: mm(214), margin: 0, fontSize: mm(16), color: "rgba(255,255,255,0.8)" }}>الدور الأول</p>
      <div className="absolute" style={{ right: mm(64), top: mm(80) }}>
        <Lockup mm={400} tone="brass" />
      </div>
      <div className="absolute" style={{ left: mm(64), right: mm(64), top: mm(276) }}>
        <Rule color={C.hairOnInk} />
      </div>
      {/* the particulars */}
      <div className="absolute" style={{ right: mm(64), top: mm(322), width: mm(330) }}>
        {head("أوقات العمل")}
        {row("الأحد – الخميس", "٨ ص – ٥ م")}
        {row("السبت", "١٠ ص – ٢ م")}
        {row("الجمعة", "مغلق")}
        <div style={{ height: mm(26) }} />
        {head("التراخيص")}
        {row("رخصة المحاماة", String(firm.licenseNumber))}
        {row("السجل الموحد", String(firm.unifiedNumber))}
      </div>
      <div className="absolute flex flex-col items-center" style={{ left: mm(500 - 55), top: mm(326) }}>
        <Qr url={qrUrl("office-sign")} size={110} light={C.bone} pad={5} />
        <p style={{ margin: `${mm(8)} 0 0`, fontSize: mm(10), color: "rgba(255,255,255,0.75)", whiteSpace: "nowrap" }}>أرسل موجز مسألتك</p>
      </div>
      <div className="absolute" dir="ltr" style={{ left: mm(64), top: mm(322), width: mm(330) }}>
        {head("Working hours", true)}
        {row("Sun – Thu", "8:00 AM – 5:00 PM", true)}
        {row("Sat", "10:00 AM – 2:00 PM", true)}
        {row("Fri", "Closed", true)}
        <div style={{ height: mm(26) }} />
        {head("Contact", true)}
        {row("Tel", PHONE, true)}
        {row("Email", EMAIL, true)}
      </div>
    </Face>
  );
}

/** Entrance sign, 400 × 800 mm portrait slate: the number above, the lockup below. Brass letters, 3 mm stand-off. */
export function EntranceSign({ guides }: G) {
  return (
    <Face w={400} h={800} bg={C.ink} guides={guides}>
      <div className="absolute flex justify-center" dir="ltr" style={{ left: 0, right: 0, top: mm(96), ...latin, fontSize: mm(250), lineHeight: 0.9, color: C.brass, letterSpacing: "-0.02em" }}>14</div>
      <p className="absolute" style={{ left: 0, right: 0, top: mm(352), margin: 0, textAlign: "center", fontSize: mm(24), color: "rgba(255,255,255,0.85)" }}>الدور الأول</p>
      <div className="absolute flex justify-center" style={{ left: 0, right: 0, bottom: mm(70) }}>
        <Lockup mm={252} tone="brass" />
      </div>
    </Face>
  );
}

/** Desk nameplate, 220 × 60 mm. */
export function NamePlate({ guides }: G) {
  return (
    <Face w={220} h={60} bg={C.ink} guides={guides}>
      <div className="absolute" style={{ right: mm(14), top: mm(14) }}>
        <p style={{ ...disp(), margin: 0, fontSize: mm(15), lineHeight: 1.1, color: C.brass }}>تركي النايف</p>
        <p style={{ margin: `${mm(3)} 0 0`, fontSize: mm(5.2), color: "rgba(255,255,255,0.8)" }}>محامٍ · مؤسس ومدير</p>
      </div>
      <div className="absolute" dir="ltr" style={{ left: mm(14), top: mm(16) }}>
        <p style={{ ...latin, margin: 0, fontSize: mm(8.4), color: C.brass }}>Turki AlNaif</p>
        <p style={{ ...latin, margin: `${mm(3.4)} 0 0`, fontSize: mm(3.4), letterSpacing: "0.26em", color: "rgba(255,255,255,0.8)", textTransform: "uppercase" }}>Lawyer · Founding partner</p>
      </div>
    </Face>
  );
}

/** Reception wall, 240 × 90 cm drawn at 1:10 (240 × 90 mm): brass letters on an ink panel. */
export function ReceptionWall({ guides }: G) {
  return (
    <Face w={240} h={90} bg={C.ink} guides={guides}>
      <div className="absolute inset-0 flex items-center justify-center">
        <Lockup mm={128} tone="brass" />
      </div>
    </Face>
  );
}

/** Staff card, CR80 portrait (54 × 86 mm). Front: bone, the person. Back: ink, the firm and the QR. */
export async function BadgeFront({ guides }: G) {
  return (
    <Face w={54} h={86} bg={C.bone} guides={guides}>
      <div className="absolute flex justify-center" style={{ top: mm(9), left: 0, right: 0 }}>
        <Mark height={7.2} color={C.navy} />
      </div>
      <div className="absolute flex justify-center" style={{ top: mm(22), left: 0, right: 0 }}>
        {/* the photograph goes here: a 24 mm circle */}
        <div style={{ width: mm(24), height: mm(24), borderRadius: "50%", border: `0.3mm solid ${C.brassDeep}`, background: "#e6dfcc" }} />
      </div>
      <div className="absolute" style={{ top: mm(60), left: mm(3), right: mm(3), textAlign: "center" }}>
        <p style={{ ...disp(), margin: 0, fontSize: mm(5.8), color: C.navy, lineHeight: 1.3, whiteSpace: "nowrap" }}>تركي النايف</p>
        <p style={{ margin: `${mm(1.4)} 0 0`, fontSize: mm(2.8), color: C.brassDeep, whiteSpace: "nowrap" }}>محامٍ · مؤسس ومدير</p>
      </div>
    </Face>
  );
}

export async function BadgeBack({ guides }: G) {
  return (
    <Face w={54} h={86} bg={C.ink} guides={guides}>
      <div className="absolute flex justify-center" style={{ top: mm(10), left: 0, right: 0 }}>
        <Lockup mm={32} tone="brass" />
      </div>
      <div className="absolute flex justify-center" style={{ top: mm(28), left: 0, right: 0 }}>
        <Qr url={qrUrl("staff-card")} size={22} light={C.bone} pad={1} />
      </div>
      <div className="absolute" style={{ top: mm(58), left: mm(5), right: mm(5), textAlign: "center", fontSize: mm(2.3), lineHeight: 1.65, color: "rgba(255,255,255,0.85)" }}>
        {ADDRESS_AR.map((l) => (
          <p key={l} style={{ margin: 0 }}>{l}</p>
        ))}
        <p dir="ltr" style={{ ...latin, margin: `${mm(0.8)} 0 0`, letterSpacing: "0.06em", color: C.brass }}>{PHONE}</p>
      </div>
      <p className="absolute" style={{ bottom: mm(5), left: mm(5), right: mm(5), margin: 0, textAlign: "center", fontSize: mm(1.8), lineHeight: 1.5, color: "rgba(255,255,255,0.6)" }}>إن عثرتَ على هذه البطاقة فنرجو إعادتها إلى المكتب. رخصة المحاماة {firm.licenseNumber}</p>
    </Face>
  );
}

/** Lanyard, 20 mm × 900 mm. */
export function Lanyard({ guides }: G) {
  const unit = (
    <span className="inline-flex items-center" style={{ gap: mm(8), marginInlineEnd: mm(8) }}>
      <span style={{ ...latin, fontSize: mm(5), letterSpacing: "0.34em", color: C.brass, textTransform: "uppercase" }}>Turki AlNaif &amp; Partners</span>
      <span style={{ width: mm(6), height: "0.3mm", background: C.hairOnInk }} />
      <span style={{ fontSize: mm(5), color: "#fff" }}>تركي النايف وشركاؤه</span>
      <span style={{ width: mm(6), height: "0.3mm", background: C.hairOnInk }} />
      <span style={{ ...latin, fontSize: mm(5), letterSpacing: "0.34em", color: "#fff" }}>TAAP.SA</span>
      <span style={{ width: mm(6), height: "0.3mm", background: C.hairOnInk }} />
    </span>
  );
  return (
    <Face w={900} h={20} bg={C.ink} dir="ltr" guides={guides}>
      <div className="absolute inset-0 flex items-center overflow-hidden whitespace-nowrap" style={{ paddingLeft: mm(8) }}>
        {unit}
        {unit}
      </div>
    </Face>
  );
}

/** Hard-cover A5 notebook, flat: back, spine, front. Ink cloth, the mark in brass foil, nothing else. */
export async function Notebook({ guides }: G) {
  const W = 148;
  const SP = 10;
  return (
    <Face w={W * 2 + SP} h={210} bg={C.ink} dir="rtl" guides={guides}>
      <div className="absolute flex justify-center" style={{ right: 0, top: mm(78), width: mm(W) }}>
        <Mark height={48} />
      </div>
      <div className="absolute flex items-center justify-center" style={{ left: mm(W), top: 0, width: mm(SP), height: mm(210) }}>
        <span style={{ writingMode: "vertical-rl", ...latin, color: C.brass, fontSize: mm(2.6), letterSpacing: "0.34em", textTransform: "uppercase" }}>Turki AlNaif &amp; Partners</span>
      </div>
      <p className="absolute" dir="ltr" style={{ ...latin, left: 0, width: mm(W), bottom: mm(20), margin: 0, textAlign: "center", fontSize: mm(3), letterSpacing: "0.34em", color: C.brass }}>TAAP.SA</p>
    </Face>
  );
}
