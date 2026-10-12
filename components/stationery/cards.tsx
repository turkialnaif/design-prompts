import QRCode from "qrcode";
import { firm } from "@/lib/site";
import { C, Diamond, Face, GhostMark, Mark, Thread, disp, foil, latin } from "@/components/stationery/parts";

export const PHONE = "+966 56 677 0888";
export const ADDRESS_AR = ["الدور الأول · مكتب 14", "طريق أبي بكر الصديق الفرعي", "حي الياسمين · الرياض 13326"];
export const ADDRESS_EN = ["Floor 1 · Office 14", "Abu Bakr Al Siddiq Branch Rd", "Al Yasmin · Riyadh 13326"];

/** The QR on every piece carries its own campaign tag, so Analytics shows which printed piece brought a visitor. */
export const qrUrl = (piece: string) => `${firm.website}/contact?utm_source=stationery&utm_medium=${piece}&utm_campaign=print`;

export async function Qr({ url, mm, dark = C.ink, light = "#f6f1e6", pad = 1.6 }: { url: string; mm: number; dark?: string; light?: string; pad?: number }) {
  const svg = await QRCode.toString(url, { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark, light: "#0000" } });
  return (
    <div style={{ width: `${mm}mm`, height: `${mm}mm`, background: light, padding: `${pad}mm` }} dangerouslySetInnerHTML={{ __html: svg.replace("<svg", '<svg style="width:100%;height:100%;display:block"') }} />
  );
}

type G = { guides?: boolean };

/**
 * Business card, side A (Arabic). Deep navy; the city rises from the foot of the card; the name in light, the title in gold, and the thread
 * leaves the card through the opposite edge. Nothing else: the card is meant to be held, and read slowly.
 */
export function CardFront({ guides }: G) {
  return (
    <Face
      w={90}
      h={55}
      bg={C.deep}
      guides={guides}
      bleed={
        <>
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 90% at 100% 0%, rgba(40,84,220,0.42), transparent 70%)" }} />
          <img src="/brand/profile/city-fade.png" alt="" className="absolute" style={{ left: 0, bottom: "-21mm", width: "100%", height: "auto", opacity: 0.9 }} />
          <Thread y={3 + 29.6} from={-4} to={3 + 8 + 9.4} nodes={[]} foilLine weight={0.3} />
        </>
      }
    >
      <div className="absolute" style={{ top: "8.2mm", insetInlineStart: "8mm" }}>
        <p style={{ ...disp(), fontSize: "21pt", lineHeight: 1.12, color: "#fff", margin: 0 }}>تركي النايف</p>
        <p style={{ margin: "1.7mm 0 0", fontSize: "7.2pt", color: C.goldBright, letterSpacing: 0 }}>محامٍ · مؤسس ومدير</p>
      </div>
      <div className="absolute" style={{ top: "6.6mm", insetInlineEnd: "8mm" }}>
        <Mark height={7.6} />
      </div>
      {/* the thread ends in the three diamonds, set on it where it stops */}
      <div className="absolute flex items-center gap-[2.2mm]" style={{ top: "28.9mm", insetInlineEnd: "8mm" }}>
        <Diamond size={1.4} color={C.goldBright} />
        <Diamond size={1.4} color={C.goldBright} />
        <Diamond size={1.4} color={C.goldBright} />
      </div>
    </Face>
  );
}

/**
 * Business card, side B (English and the details). A navy panel at the start carries the foil mark and the QR; the thread leaves the panel
 * across the ivory, past the name, and out through the edge.
 */
export async function CardBack({ guides }: G) {
  return (
    <Face
      w={90}
      h={55}
      bg={C.paper}
      dir="ltr"
      guides={guides}
      bleed={
        <>
          <div className="absolute" style={{ left: 0, top: 0, bottom: 0, width: "29mm", background: C.deep }}>
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 120% 70% at 50% 0%, rgba(40,84,220,0.38), transparent 70%)" }} />
          </div>
          <Thread y={3 + 21.2} from={29} to="end" foilLine={false} weight={0.3} />
        </>
      }
    >
      {/* panel */}
      <div className="absolute flex flex-col items-center" style={{ left: 0, top: 0, width: "26mm", height: "55mm" }}>
        <div style={{ marginTop: "7.2mm" }}>
          <Mark height={11.4} />
        </div>
        <p style={{ ...latin, margin: "2.4mm 0 0", fontSize: "5.2pt", letterSpacing: "0.5em", color: C.goldBright, paddingLeft: "0.5em" }}>TAAP</p>
        <div style={{ marginTop: "auto", marginBottom: "5.4mm", background: C.paper, padding: "0.9mm" }}>
          <Qr url={qrUrl("business-card")} mm={14} light="#f6f1e6" pad={0} />
        </div>
      </div>
      <p className="absolute" style={{ ...latin, left: 0, width: "26mm", bottom: "2.2mm", margin: 0, textAlign: "center", fontSize: "3.3pt", letterSpacing: "0.26em", textTransform: "uppercase", color: C.goldBright }}>
        Send your brief
      </p>

      {/* details */}
      <div className="absolute" style={{ top: "6.4mm", left: "33mm" }}>
        <p style={{ ...disp(true), fontSize: "14.5pt", lineHeight: 1.1, color: C.ink, margin: 0 }}>Turki AlNaif</p>
        <p style={{ ...latin, margin: "1.3mm 0 0", fontSize: "5.1pt", letterSpacing: "0.2em", textTransform: "uppercase", color: C.goldText }}>Lawyer · Founding Partner</p>
      </div>
      <div className="absolute" style={{ top: "24.4mm", left: "33mm", ...latin, fontSize: "6pt", lineHeight: 1.75, color: C.ink, letterSpacing: "0.05em" }}>
        {[PHONE, "info@taap.sa", "taap.sa"].map((t) => (
          <p key={t} className="flex items-center gap-[1.7mm]" style={{ margin: 0 }}>
            <Diamond size={1} />
            {t}
          </p>
        ))}
      </div>
      <div className="absolute" style={{ top: "36mm", left: "33mm", ...latin, fontSize: "5pt", lineHeight: 1.6, color: C.body, letterSpacing: "0.03em" }}>
        {ADDRESS_EN.map((l) => (
          <p key={l} style={{ margin: 0 }}>
            {l}
          </p>
        ))}
      </div>
      <p className="absolute" dir="ltr" style={{ ...latin, left: "33mm", bottom: "3.4mm", margin: 0, fontSize: "3.9pt", letterSpacing: "0.04em", color: "rgba(44,53,80,0.85)" }}>
        Licence No. {firm.licenseNumber} · Unified No. {firm.unifiedNumber}
      </p>
    </Face>
  );
}

/** "Five questions before you sign": a leave-behind that is useful on its own and carries the firm. Side one. */
export function QuestionsFront({ guides }: G) {
  return (
    <Face
      w={90}
      h={55}
      bg={C.deep}
      guides={guides}
      bleed={
        <>
          <div className="absolute" style={{ left: "-10mm", bottom: "-12mm" }}>
            <GhostMark height={48} color="rgba(40,84,220,0.14)" />
          </div>
          <Thread y={3 + 36} from={3 + 8} nodes={[0, 4.2, 8.4]} foilLine />
        </>
      }
    >
      <p className="absolute" style={{ top: "8mm", insetInlineStart: "8mm", fontSize: "6.4pt", letterSpacing: 0, color: C.goldBright }}>قبل أن توقّع</p>
      <div className="absolute flex items-end gap-[3mm]" style={{ top: "12.5mm", insetInlineStart: "8mm" }}>
        <span style={{ ...disp(true), ...foil, fontSize: "56pt", lineHeight: 1.05, display: "inline-block", padding: "0 1mm" }}>5</span>
        <span style={{ ...disp(), fontSize: "17pt", lineHeight: 1.1, color: "#fff", paddingBottom: "1.4mm" }}>أسئلة</span>
      </div>
      <p className="absolute" style={{ top: "40.5mm", insetInlineStart: "8mm", insetInlineEnd: "8mm", fontSize: "5.6pt", lineHeight: 1.8, color: "rgba(255,255,255,0.78)" }}>
        اقلب البطاقة. إن كان جوابٌ منها غامضًا فذلك موضع المراجعة.
      </p>
      <p className="absolute" style={{ ...latin, bottom: "4mm", insetInlineStart: "8mm", margin: 0, fontSize: "4.6pt", letterSpacing: "0.22em", textTransform: "uppercase", color: C.goldBright }}>TAAP · taap.sa</p>
    </Face>
  );
}

export function QuestionsBack({ guides }: G) {
  const qs = [
    "من الأطراف بالضبط، وهل لكل منهم صفةُ التوقيع؟",
    "ما الذي يلتزم به كل طرف، ومتى؟",
    "ما المدد والغرامات وأثر التأخير؟",
    "كيف يُنهى العقد، وماذا يترتب على إنهائه؟",
    "أين تُحَلّ الخلافات: قضاءً أم تحكيمًا؟",
  ];
  const nums = ["١", "٢", "٣", "٤", "٥"];
  return (
    <Face w={90} h={55} bg={C.paper} guides={guides} bleed={<Thread y={3 + 5.2} from={3 + 8} nodes={[0, 4.2, 8.4]} />}>
      <ol className="absolute m-0 list-none p-0" style={{ top: "9.6mm", insetInlineStart: "8mm", insetInlineEnd: "8mm" }}>
        {qs.map((q, i) => (
          <li key={q} className="flex items-baseline gap-[2.6mm]" style={{ padding: "1.05mm 0", borderBottom: i === qs.length - 1 ? "none" : `0.2mm solid ${C.hair}` }}>
            <span style={{ fontSize: "8.4pt", lineHeight: 1, color: C.goldText, width: "3.6mm", flex: "none" }}>{nums[i]}</span>
            <span style={{ fontSize: "6.5pt", lineHeight: 1.55, color: C.ink }}>{q}</span>
          </li>
        ))}
      </ol>
      <div className="absolute flex items-center justify-between" style={{ bottom: "3.4mm", insetInlineStart: "8mm", insetInlineEnd: "8mm", fontSize: "5pt", color: "rgba(44,53,80,0.82)" }}>
        <span>للمراجعة: واتساب <bdi dir="ltr" style={latin}>{PHONE}</bdi></span>
        <span dir="ltr" style={{ ...latin, letterSpacing: "0.1em" }}>taap.sa</span>
      </div>
    </Face>
  );
}

/** Appointment card: the practical card handed over at the end of a first call. Side one is written on by hand. */
export function AppointmentFront({ guides }: G) {
  const line = (label: string) => (
    <div className="flex items-end gap-[2mm]" style={{ marginTop: "3.3mm" }}>
      <span style={{ fontSize: "6pt", color: C.goldText, width: "11mm", flex: "none" }}>{label}</span>
      <span style={{ flex: 1, borderBottom: `0.2mm solid ${C.ink}`, height: "3.6mm", opacity: 0.55 }} />
    </div>
  );
  return (
    <Face w={90} h={55} bg={C.paper} guides={guides} bleed={<Thread y={3 + 40.4} from={3 + 8} nodes={[0, 4.2, 8.4]} />}>
      <div className="absolute" style={{ top: "7.6mm", insetInlineStart: "8mm", insetInlineEnd: "8mm" }}>
        <p style={{ ...disp(), fontSize: "16pt", lineHeight: 1.15, color: C.ink }}>موعدكم معنا</p>
        {line("التاريخ")}
        {line("الوقت")}
        {line("مع")}
      </div>
      <p className="absolute" style={{ bottom: "4.2mm", insetInlineStart: "8mm", fontSize: "5.4pt", color: "rgba(44,53,80,0.85)" }}>
        إن تعذّر الحضور فنرجو إشعارنا قبل الموعد بيوم عمل.
      </p>
    </Face>
  );
}

export function AppointmentBack({ guides }: G) {
  const items = ["الهوية الوطنية أو الإقامة", "العقود والمستندات ذات الصلة", "ملخّص مكتوب للوقائع والمطلوب"];
  return (
    <Face w={90} h={55} bg={C.deep} guides={guides} bleed={<Thread y={3 + 27.6} from={3 + 8 + 12} to="end" foilLine />}>
      <p className="absolute" style={{ top: "7.4mm", insetInlineStart: "8mm", fontSize: "6.4pt", color: C.goldBright }}>ما تحضره معك</p>
      <ul className="absolute m-0 list-none p-0" style={{ top: "11.6mm", insetInlineStart: "8mm", fontSize: "6.6pt", lineHeight: 1.8, color: "rgba(255,255,255,0.92)" }}>
        {items.map((t) => (
          <li key={t} className="flex items-center gap-[1.8mm]">
            <Diamond size={1.1} color={C.goldBright} />
            {t}
          </li>
        ))}
      </ul>
      <div className="absolute" style={{ top: "30.4mm", insetInlineStart: "8mm", fontSize: "5.9pt", lineHeight: 1.75, color: "rgba(255,255,255,0.86)" }}>
        {ADDRESS_AR.map((l) => (
          <p key={l}>{l}</p>
        ))}
        <p dir="ltr" style={{ ...latin, textAlign: "end", letterSpacing: "0.08em", color: C.goldBright }}>RMJ5+P9F</p>
      </div>
      <p className="absolute" style={{ bottom: "4mm", insetInlineEnd: "8mm", fontSize: "5.2pt", color: C.goldBright }}>الأحد – الخميس ٨ ص – ٥ م · السبت ١٠ ص – ٢ م</p>
    </Face>
  );
}
