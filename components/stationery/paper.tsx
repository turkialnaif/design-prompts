import { firm } from "@/lib/site";
import { EMAIL, PHONE, Qr, qrUrl } from "@/components/stationery/cards";
import { C, Face, Lockup, Mark, Rule, disp, latin, mm } from "@/components/stationery/parts";

type G = { guides?: boolean };

/** Functional marks on the left edge: the two third-folds (99, 198 mm) and the filing punch (148.5 mm). They are the only decoration on the page. */
function FoldTicks() {
  return (
    <>
      {[99, 148.5, 198].map((y) => (
        <span key={y} className="absolute" style={{ left: 0, top: mm(y), width: mm(y === 148.5 ? 6 : 4), height: "0.25mm", background: C.brassDeep }} />
      ))}
    </>
  );
}

/** Letterhead, A4. The lockup, a hairline, and one line of particulars at the foot. */
export async function Letterhead({ guides }: G) {
  const small = { fontSize: "5.6pt", lineHeight: 1.6, color: C.navy } as const;
  return (
    <Face w={210} h={297} bg={C.paper} guides={guides}>
      <FoldTicks />
      <div className="absolute" style={{ top: mm(16), right: mm(20) }}>
        <Lockup mm={60} />
      </div>
      <div className="absolute" style={{ left: mm(20), right: mm(20), bottom: mm(13) }}>
        <Rule />
        <div className="grid" style={{ marginTop: mm(3.2), gridTemplateColumns: "1.2fr 1fr 1fr", columnGap: mm(8), ...small }}>
          <div>
            <p style={{ margin: 0 }}>الدور الأول · مكتب 14 · طريق أبي بكر الصديق الفرعي</p>
            <p style={{ margin: 0 }}>حي الياسمين · الرياض 13326</p>
          </div>
          <div dir="ltr" style={{ ...latin, letterSpacing: "0.04em" }}>
            <p style={{ margin: 0 }}>{PHONE}</p>
            <p style={{ margin: 0 }}>{EMAIL} · taap.sa</p>
          </div>
          <div>
            <p style={{ margin: 0 }}>رخصة مزاولة المحاماة {firm.licenseNumber}</p>
            <p style={{ margin: 0 }}>السجل الموحد {firm.unifiedNumber}</p>
          </div>
        </div>
      </div>
    </Face>
  );
}

/** Second and later pages. */
export function Continuation({ guides }: G) {
  return (
    <Face w={210} h={297} bg={C.paper} guides={guides}>
      <FoldTicks />
      <div className="absolute" style={{ top: mm(16), right: mm(20) }}>
        <Mark height={8.6} color={C.navy} />
      </div>
      <div className="absolute flex items-center justify-between" dir="ltr" style={{ left: mm(20), right: mm(20), bottom: mm(13) }}>
        <span style={{ ...latin, fontSize: "5pt", letterSpacing: "0.26em", color: C.brassDeep }}>TURKI ALNAIF &amp; PARTNERS</span>
        <span style={{ ...latin, fontSize: "5pt", letterSpacing: "0.26em", color: C.body }}>TAAP.SA</span>
      </div>
    </Face>
  );
}

/** DL envelope, front. */
export function EnvelopeFront({ guides }: G) {
  return (
    <Face w={220} h={110} bg={C.bone} guides={guides}>
      <div className="absolute" style={{ top: mm(13), right: mm(14) }}>
        <Lockup mm={44} />
      </div>
      <p className="absolute" dir="ltr" style={{ ...latin, left: mm(14), bottom: mm(11), margin: 0, fontSize: "5pt", letterSpacing: "0.2em", color: C.body }}>TAAP.SA · {PHONE}</p>
    </Face>
  );
}

/** The inside of the envelope: solid ink and the mark, once. */
export function EnvelopeLiner({ guides }: G) {
  return (
    <Face w={220} h={110} bg={C.ink} guides={guides}>
      <div className="absolute inset-0 flex items-center justify-center">
        <Mark height={14} />
      </div>
    </Face>
  );
}

/** Compliments slip, DL. */
export async function Compliments({ guides }: G) {
  return (
    <Face w={210} h={99} bg={C.paper} guides={guides}>
      <div className="absolute" style={{ top: mm(13), right: mm(16) }}>
        <Lockup mm={48} />
      </div>
      <div className="absolute flex items-end justify-between" dir="ltr" style={{ left: mm(16), right: mm(16), bottom: mm(11) }}>
        <div style={{ ...latin, fontSize: "5.8pt", lineHeight: 1.7, letterSpacing: "0.04em", color: C.navy }}>
          <p style={{ margin: 0 }}>{PHONE}</p>
          <p style={{ margin: 0 }}>{EMAIL} · taap.sa</p>
        </div>
        <Qr url={qrUrl("compliments-slip")} size={12} light="transparent" dark={C.navy} pad={0} />
      </div>
    </Face>
  );
}

/** A5 notepad page. */
export function Notepad({ guides }: G) {
  return (
    <Face w={148} h={210} bg={C.paper} guides={guides}>
      <div className="absolute" style={{ top: mm(14), right: mm(14) }}>
        <Lockup mm={34} />
      </div>
      <div className="absolute" style={{ top: mm(38), bottom: mm(18), left: mm(14), right: mm(14), backgroundImage: `repeating-linear-gradient(to bottom, transparent 0, transparent 7.8mm, ${C.hair} 7.8mm, ${C.hair} 8mm)` }} />
      <p className="absolute" dir="ltr" style={{ ...latin, left: mm(14), bottom: mm(9), margin: 0, fontSize: "4.8pt", letterSpacing: "0.26em", color: C.brassDeep }}>TAAP.SA</p>
    </Face>
  );
}

/** Seal sticker, 40 mm, die-cut round. */
export function Seal({ guides }: G) {
  return (
    <Face w={40} h={40} bg={C.ink} guides={guides} dir="ltr">
      <div className="absolute inset-0 flex items-center justify-center">
        <Mark height={13} />
      </div>
    </Face>
  );
}

export { disp };
