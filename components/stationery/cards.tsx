import QRCode from "qrcode";
import { firm } from "@/lib/site";
import { C, Face, Lockup, Mark, Rule, disp, latin, mm } from "@/components/stationery/parts";

export const PHONE = "+966 56 677 0888";
export const EMAIL = "info@taap.sa";
export const ADDRESS_AR = ["الدور الأول · مكتب 14", "طريق أبي بكر الصديق الفرعي", "حي الياسمين · الرياض 13326"];
export const ADDRESS_EN = ["Floor 1 · Office 14", "Abu Bakr Al Siddiq Branch Rd", "Al Yasmin · Riyadh 13326"];

/** The QR on a piece carries its own campaign tag, so Analytics shows which printed piece brought a visitor. */
export const qrUrl = (piece: string) => `${firm.website}/contact?utm_source=stationery&utm_medium=${piece}&utm_campaign=print`;

export async function Qr({ url, size, dark = C.ink, light = C.bone, pad = 1.2 }: { url: string; size: number; dark?: string; light?: string; pad?: number }) {
  const svg = await QRCode.toString(url, { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark, light: "#0000" } });
  return <div style={{ width: mm(size), height: mm(size), background: light, padding: mm(pad) }} dangerouslySetInnerHTML={{ __html: svg.replace("<svg", '<svg style="width:100%;height:100%;display:block"') }} />;
}

type G = { guides?: boolean };

/** Business card, side A: matte ink and the lockup in brass. Nothing else. */
export function CardFront({ guides }: G) {
  return (
    <Face w={90} h={55} bg={C.ink} guides={guides}>
      <div className="absolute inset-0 flex items-center justify-center">
        <Lockup mm={46} tone="brass" />
      </div>
    </Face>
  );
}

/** Business card, side B: bone, the name in both languages, three lines of contact, the address, a small QR. */
export async function CardBack({ guides }: G) {
  return (
    <Face w={90} h={55} bg={C.bone} guides={guides}>
      <div className="absolute" style={{ top: mm(8), right: mm(9) }}>
        <p style={{ ...disp(), margin: 0, fontSize: "15pt", lineHeight: 1.15, color: C.navy }}>تركي النايف</p>
        <p style={{ margin: `${mm(1.2)} 0 0`, fontSize: "6.4pt", color: C.brassDeep }}>محامٍ · مؤسس ومدير</p>
      </div>
      <div className="absolute" dir="ltr" style={{ top: mm(9), left: mm(9) }}>
        <p style={{ ...latin, margin: 0, fontSize: "7.6pt", color: C.navy }}>Turki AlNaif</p>
        <p style={{ ...latin, margin: `${mm(1.2)} 0 0`, fontSize: "4.4pt", letterSpacing: "0.22em", textTransform: "uppercase", color: C.brassDeep }}>Lawyer · Founding Partner</p>
      </div>
      <div className="absolute" style={{ top: mm(24.6), left: mm(9), right: mm(9) }}>
        <Rule />
      </div>
      <div className="absolute flex items-end" dir="ltr" style={{ left: mm(9), bottom: mm(8), gap: mm(3.4) }}>
        <Qr url={qrUrl("business-card")} size={11.4} light="transparent" dark={C.navy} pad={0} />
        <div style={{ ...latin, fontSize: "5.8pt", lineHeight: 1.7, color: C.navy, letterSpacing: "0.04em" }}>
          <p style={{ margin: 0 }}>{PHONE}</p>
          <p style={{ margin: 0 }}>{EMAIL}</p>
          <p style={{ margin: 0 }}>taap.sa</p>
        </div>
      </div>
      <div className="absolute" style={{ right: mm(9), bottom: mm(8), textAlign: "right", fontSize: "5.4pt", lineHeight: 1.75, color: C.body }}>
        {ADDRESS_AR.map((l) => (
          <p key={l} style={{ margin: 0 }}>{l}</p>
        ))}
      </div>
    </Face>
  );
}

/** "Five questions before you sign": front. */
export function QuestionsFront({ guides }: G) {
  return (
    <Face w={90} h={55} bg={C.ink} guides={guides}>
      <p className="absolute" style={{ top: mm(9), right: mm(9), margin: 0, fontSize: "6.4pt", color: C.brass }}>قبل أن توقّع</p>
      <div className="absolute flex items-end" style={{ top: mm(15), right: mm(9), gap: mm(3.4) }}>
        <span style={{ ...disp(true), fontSize: "46pt", lineHeight: 1, color: C.brass }}>5</span>
        <span style={{ ...disp(), fontSize: "16pt", lineHeight: 1.1, color: "#fff", paddingBottom: mm(1.2) }}>أسئلة</span>
      </div>
      <div className="absolute" style={{ left: mm(9), bottom: mm(8) }}>
        <Mark height={5.4} />
      </div>
    </Face>
  );
}

export function QuestionsBack({ guides }: G) {
  const qs = ["من الأطراف بالضبط، وهل لكل منهم صفةُ التوقيع؟", "ما الذي يلتزم به كل طرف، ومتى؟", "ما المدد والغرامات وأثر التأخير؟", "كيف يُنهى العقد، وماذا يترتب على إنهائه؟", "أين تُحَلّ الخلافات: قضاءً أم تحكيمًا؟"];
  return (
    <Face w={90} h={55} bg={C.bone} guides={guides}>
      <ol className="absolute m-0 list-none p-0" style={{ top: mm(8), left: mm(9), right: mm(9) }}>
        {qs.map((q, i) => (
          <li key={q} className="flex items-baseline" style={{ gap: mm(2.6), padding: `${mm(1)} 0`, borderBottom: i === qs.length - 1 ? "none" : `0.2mm solid ${C.hair}` }}>
            <span style={{ ...latin, fontSize: "7pt", color: C.brassDeep, width: mm(3), flex: "none" }}>{i + 1}</span>
            <span style={{ fontSize: "6.4pt", lineHeight: 1.55, color: C.navy }}>{q}</span>
          </li>
        ))}
      </ol>
      <div className="absolute flex items-center justify-between" dir="ltr" style={{ left: mm(9), right: mm(9), bottom: mm(6) }}>
        <span style={{ ...latin, fontSize: "4.8pt", letterSpacing: "0.2em", color: C.brassDeep }}>TAAP.SA</span>
        <span style={{ ...latin, fontSize: "4.8pt", letterSpacing: "0.06em", color: C.body }}>{PHONE}</span>
      </div>
    </Face>
  );
}

/** Appointment card. */
export function AppointmentFront({ guides }: G) {
  const line = (label: string) => (
    <div className="flex items-end" style={{ gap: mm(2), marginTop: mm(4.2) }}>
      <span style={{ fontSize: "6pt", color: C.brassDeep, width: mm(11), flex: "none" }}>{label}</span>
      <span style={{ flex: 1, borderBottom: `0.2mm solid ${C.navy}`, height: mm(3.4), opacity: 0.5 }} />
    </div>
  );
  return (
    <Face w={90} h={55} bg={C.bone} guides={guides}>
      <div className="absolute" style={{ top: mm(8.4), left: mm(9), right: mm(9) }}>
        <p style={{ ...disp(), margin: 0, fontSize: "15pt", lineHeight: 1.15, color: C.navy }}>موعدكم معنا</p>
        {line("التاريخ")}
        {line("الوقت")}
        {line("مع")}
      </div>
      <p className="absolute" style={{ bottom: mm(6), right: mm(9), margin: 0, fontSize: "5.2pt", color: C.body }}>إن تعذّر الحضور فنرجو إشعارنا قبل الموعد بيوم عمل.</p>
    </Face>
  );
}

export function AppointmentBack({ guides }: G) {
  const items = ["الهوية الوطنية أو الإقامة", "العقود والمستندات ذات الصلة", "ملخّص مكتوب للوقائع والمطلوب"];
  return (
    <Face w={90} h={55} bg={C.ink} guides={guides}>
      <p className="absolute" style={{ top: mm(8), right: mm(9), margin: 0, fontSize: "6.4pt", color: C.brass }}>ما تحضره معك</p>
      <ul className="absolute m-0 list-none p-0" style={{ top: mm(13), right: mm(9), fontSize: "6.6pt", lineHeight: 1.95, color: "#fff" }}>
        {items.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <div className="absolute" style={{ left: mm(9), bottom: mm(8), fontSize: "5.4pt", lineHeight: 1.75, color: "rgba(255,255,255,0.85)" }}>
        {ADDRESS_AR.map((l) => (
          <p key={l} style={{ margin: 0 }}>{l}</p>
        ))}
      </div>
      <p className="absolute" dir="ltr" style={{ ...latin, right: mm(9), bottom: mm(8), margin: 0, fontSize: "5.4pt", letterSpacing: "0.1em", color: C.brass }}>RMJ5+P9F</p>
    </Face>
  );
}
