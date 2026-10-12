import QRCode from "qrcode";
import { firm } from "@/lib/site";
import { C, Diamond, Face, GhostMark, Thread, disp, foil, latin } from "@/components/stationery/parts";

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

/** Business card, Arabic side: paper, the name, and the thread leaving the card toward the opposite edge. */
export function CardFront({ guides }: G) {
  return (
    <Face
      w={90}
      h={55}
      bg={C.paper}
      guides={guides}
      bleed={
        <>
          <Thread y={3 + 24.4} from={3 + 8} nodes={[0, 4.2, 8.4]} />
        </>
      }
    >
      <div className="absolute" style={{ top: "7.6mm", insetInlineStart: "8mm" }}>
        <p style={{ ...disp(), fontSize: "17.5pt", lineHeight: 1.15, color: C.ink, margin: 0 }}>تركي النايف</p>
        <p style={{ margin: "1.6mm 0 0", fontSize: "6.8pt", color: C.goldText, letterSpacing: 0 }}>محامٍ · مؤسس ومدير</p>
      </div>

      <div className="absolute" style={{ top: "29.2mm", insetInlineStart: "8mm", fontSize: "6.7pt", lineHeight: 1.95, color: C.body }}>
        {[
          [PHONE, true],
          ["info@taap.sa", true],
          ["taap.sa", true],
        ].map(([t, ltr]) => (
          <p key={String(t)} className="flex items-center gap-[1.6mm]" style={{ margin: 0 }}>
            <Diamond size={1.1} />
            <span dir={ltr ? "ltr" : undefined} style={{ ...latin, letterSpacing: "0.04em" }}>
              {t}
            </span>
          </p>
        ))}
      </div>

      <div className="absolute" style={{ top: "29.2mm", insetInlineEnd: "8mm", fontSize: "5.9pt", lineHeight: 1.85, color: C.body, textAlign: "end" }}>
        {ADDRESS_AR.map((l) => (
          <p key={l} style={{ margin: 0 }}>
            {l}
          </p>
        ))}
      </div>

      <p className="absolute" style={{ bottom: "3.6mm", insetInlineStart: "8mm", insetInlineEnd: "8mm", margin: 0, fontSize: "4.7pt", color: "rgba(44,53,80,0.75)", letterSpacing: "0.02em" }}>
        رخصة مزاولة المحاماة رقم {firm.licenseNumber} · السجل الموحد {firm.unifiedNumber}
      </p>
    </Face>
  );
}

/** Business card, English side: deep navy, a tone-on-tone mark, the foil name and the QR. */
export async function CardBack({ guides }: G) {
  return (
    <Face
      w={90}
      h={55}
      bg={C.deep}
      dir="ltr"
      guides={guides}
      bleed={
        <>
          <div className="absolute" style={{ right: "-14mm", top: "-9mm" }}>
            <GhostMark height={46} color="rgba(40,84,220,0.14)" />
          </div>
          <Thread y={3 + 24.4} from={3 + 8 + 12} to="end" nodes={[]} foilLine />
        </>
      }
    >
      <div className="absolute" style={{ top: "7.4mm", left: "8mm" }}>
        <p style={{ ...disp(true), ...foil, fontSize: "16pt", lineHeight: 1.25, margin: 0, display: "inline-block", paddingRight: "0.6mm" }}>Turki AlNaif</p>
        <p style={{ ...latin, margin: "1.6mm 0 0", fontSize: "6.2pt", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(246,226,179,0.92)" }}>Lawyer · Founding Partner</p>
      </div>

      <div className="absolute" style={{ top: "29.2mm", left: "8mm", ...latin, fontSize: "6.2pt", lineHeight: 1.95, color: "rgba(255,255,255,0.88)", letterSpacing: "0.05em" }}>
        <p style={{ margin: 0 }}>{PHONE}</p>
        <p style={{ margin: 0 }}>info@taap.sa</p>
        <p style={{ margin: 0 }}>taap.sa</p>
      </div>

      <div className="absolute" style={{ right: "8mm", bottom: "6.5mm" }}>
        <Qr url={qrUrl("business-card")} mm={13.5} light="#f6f1e6" />
      </div>
      <p className="absolute" style={{ ...latin, right: "8mm", bottom: "3.1mm", width: "13.5mm", margin: 0, textAlign: "center", fontSize: "3.6pt", letterSpacing: "0.12em", textTransform: "uppercase", color: C.goldBright, whiteSpace: "nowrap" }}>
        Send your brief
      </p>
      <div className="absolute" style={{ left: "8mm", bottom: "4.4mm" }}>
        <p style={{ ...latin, margin: 0, fontSize: "4.9pt", letterSpacing: "0.04em", color: "rgba(246,226,179,0.85)" }}>Understanding that runs ahead of opinion</p>
      </div>
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
