import type { ReactNode } from "react";
import { Amiri, Cairo, IBM_Plex_Sans_Arabic } from "next/font/google";
import { BONE, BRASS, BRASS_DEEP, INK, NAVY } from "../tips/parts";

/**
 * «قبل خط التوقيع»: a LinkedIn document post of six pages, 1080 x 1350. One brass line runs across every page at the same height (the line
 * you sign on). The cover starts it with a cross, each of the four clause pages stamps a seal on it, and the last page ends at the signature.
 * Swiping follows the line, so the pages read as one document. Same identity as the rest: ink, bone, flat brass, the lockup.
 */
const cairo = Cairo({ subsets: ["arabic"], weight: ["700", "800", "900"], display: "swap" });
const plex = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500", "600", "700"], display: "swap" });
const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"], display: "swap" });

export const W = 1080;
export const H = 1350;
export const TOTAL = 6;
const PAD = 84;
const Y = 540; // the height of the line on every page
const SX = 230; // where the seal (or the cross) sits
const ar = (n: number) => String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[+d]);

export type Clause = { name: string; ask: string; write: string; else: string };
export const clauses: Clause[] = [
  {
    name: "الأطراف والصفة",
    ask: "هل تعرف من تتعاقد معه فعلًا؟",
    write: "الاسم الكامل للطرف كما في سجله التجاري، ورقم السجل، وعنوانه، ومن يوقّع عنه بصفته وبموجب أي مستند.",
    else: "قد تكتشف لاحقًا أنك تعاقدت مع كيان لا يملك الصلاحية، أو لا يمكن الوصول إليه.",
  },
  {
    name: "الثمن والدفع",
    ask: "متى يُدفع كل ريال، ومقابل ماذا؟",
    write: "دفعات مربوطة بمراحل تسليم محددة، وطريقة الدفع، ومواعيد الفواتير، وما يترتب على التأخر.",
    else: "يصير الخلاف على المال خلافًا على الإنجاز، ويصعب إثبات ما استُحق وما لم يُستحق.",
  },
  {
    name: "المسؤولية والتعويض",
    ask: "إلى أي حدّ تتحمل الخسارة؟",
    write: "سقفًا واضحًا للتعويض، واستثناءات محددة منه، وتحديدًا لما يُعدّ إخلالًا جوهريًا.",
    else: "قد يتحول خطأ واحد إلى التزام مفتوح لا تحدّه قيمة العقد.",
  },
  {
    name: "الخلافات والقانون",
    ask: "أين وكيف تُحسم الخلافات؟",
    write: "القانون الواجب التطبيق، وجهة الفصل (قضاء أو تحكيم)، والمقر واللغة، وخطوات التسوية الودية قبلها.",
    else: "تبدأ المعركة الأولى على الاختصاص قبل أن تصل إلى أصل الحق.",
  },
];

function Seal({ n }: { n: number }) {
  // the ring text is set letter by letter (a text-on-path is not reliable in print)
  const ring = Array.from(`TURKI ALNAIF & PARTNERS · CLAUSE 0${n} OF 04 · RIYADH · `);
  const step = 360 / ring.length;
  return (
    <svg width="300" height="300" viewBox="0 0 300 300" style={{ transform: "rotate(-9deg)" }}>
      <circle cx="150" cy="150" r="140" fill={INK} stroke={BRASS} strokeWidth="6" />
      <circle cx="150" cy="150" r="78" fill="none" stroke={BRASS} strokeWidth="2.5" />
      {ring.map((ch, i) => (
        <text key={i} x="150" y="52" textAnchor="middle" transform={`rotate(${(i * step).toFixed(2)} 150 150)`} fontFamily="Helvetica, Arial, sans-serif" fontSize="21" fontWeight="700" fill={BRASS}>
          {ch}
        </text>
      ))}
      <text x="150" y="172" textAnchor="middle" fontFamily="Cairo, sans-serif" fontSize="74" fontWeight="900" fill={BRASS}>0{n}</text>
      <text x="150" y="208" textAnchor="middle" fontFamily="Cairo, sans-serif" fontSize="22" fontWeight="700" fill="#fff">بند</text>
    </svg>
  );
}

function Frame({ n, tone = "ink", children, foot = true }: { n: number; tone?: "ink" | "bone"; children: ReactNode; foot?: boolean }) {
  const ink = tone === "ink";
  return (
    <div className={plex.className} dir="rtl" style={{ position: "relative", width: W, height: H, background: ink ? INK : BONE, color: ink ? "#fff" : NAVY, overflow: "hidden", breakAfter: n < TOTAL ? "page" : "auto" }}>
      <div style={{ position: "absolute", top: 64, right: PAD, left: PAD, display: "flex", justifyContent: "space-between", fontSize: 28, fontWeight: 600 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, color: ink ? BRASS : BRASS_DEEP }}>
          <span style={{ width: 15, height: 15, background: BRASS, display: "inline-block" }} />
          قبل خط التوقيع
        </div>
        <div style={{ color: ink ? "rgba(255,255,255,0.7)" : "rgba(0,18,74,0.65)", fontWeight: 500 }}>صفحة {"٠" + ar(n)} من ٠٦</div>
      </div>
      {/* the line: the same height, edge to edge, on every page */}
      <div style={{ position: "absolute", top: Y - 2, left: 0, right: 0, height: 4, background: BRASS }} />
      {children}
      {foot ? (
        <div style={{ position: "absolute", bottom: 56, right: PAD, left: PAD, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ink ? "/brand/profile/lockup-bone.png" : "/brand/profile/lockup-navy.png"} alt="" style={{ width: 290, height: "auto" }} />
          {n < TOTAL ? <div style={{ fontSize: 30, fontWeight: 600, color: ink ? BRASS : BRASS_DEEP }}>اتبع الخط ←</div> : null}
        </div>
      ) : null}
    </div>
  );
}

const Cross = ({ color = BRASS }: { color?: string }) => (
  <svg width="104" height="104" viewBox="0 0 104 104" style={{ position: "absolute", top: Y - 112, left: SX - 52 }}>
    <path d="M14 14 L90 90 M90 14 L14 90" stroke={color} strokeWidth="14" strokeLinecap="square" />
  </svg>
);

export function Cover() {
  return (
    <Frame n={1}>
      <div style={{ position: "absolute", top: 140, right: PAD, left: PAD, height: 340, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <h1 className={cairo.className} style={{ margin: 0, fontSize: 112, fontWeight: 900, lineHeight: 1.15 }}>
          قبل أن توقّع هنا
          <span style={{ display: "block", color: BRASS, fontSize: 98 }}>٤ بنود تحميك</span>
        </h1>
      </div>
      <Cross />
      <div style={{ position: "absolute", top: Y + 26, left: SX - 110, width: 220, textAlign: "center", fontSize: 26, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>التوقيع</div>
      <div style={{ position: "absolute", top: Y + 90, right: PAD, left: PAD }}>
        <p style={{ margin: 0, fontSize: 40, lineHeight: 1.65, fontWeight: 400, color: "rgba(255,255,255,0.88)", maxWidth: 880 }}>
          كل عقد يُوقَّع على سطر واحد. وما قبل هذا السطر هو ما يحدد من يربح ومن يخسر إذا اختلفتم.
        </p>
        <div style={{ marginTop: 40 }}>
          {clauses.map((c, i) => (
            <div key={c.name} style={{ display: "flex", alignItems: "baseline", gap: 26, padding: "17px 0", borderTop: "2px solid rgba(196,160,78,0.35)", fontSize: 38, fontWeight: 600 }}>
              <span className={cairo.className} style={{ color: BRASS, width: 60, fontWeight: 900 }}>{"0" + (i + 1)}</span>
              {c.name}
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export function ClausePage({ i }: { i: number }) {
  const c = clauses[i];
  return (
    <Frame n={i + 2}>
      {/* above the line, beside the seal: which clause */}
      <div style={{ position: "absolute", top: 140, right: PAD, width: 640, height: 340, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <div style={{ fontSize: 30, fontWeight: 700, color: BRASS }}>البند {["الأول", "الثاني", "الثالث", "الرابع"][i]}</div>
        <h2 className={cairo.className} style={{ margin: "12px 0 0", fontSize: 80, fontWeight: 900, lineHeight: 1.2 }}>{c.name}</h2>
      </div>
      <div style={{ position: "absolute", top: Y - 150, left: SX - 150 }}>
        <Seal n={i + 1} />
      </div>
      {/* below the line: the question, what to write, and what happens otherwise */}
      <div style={{ position: "absolute", top: Y + 34, right: PAD, width: 600, fontSize: 36, fontWeight: 600, lineHeight: 1.5, color: "rgba(255,255,255,0.92)" }}>{c.ask}</div>
      <div style={{ position: "absolute", top: 720, right: PAD, left: PAD }}>
        <div style={{ background: BONE, color: NAVY, padding: "24px 36px 26px" }}>
          <div style={{ fontSize: 26, fontWeight: 700, color: BRASS_DEEP }}>اكتب في العقد</div>
          <p className={amiri.className} style={{ margin: "8px 0 0", fontSize: 40, lineHeight: 1.6, fontWeight: 700 }}>{c.write}</p>
        </div>
        <div style={{ marginTop: 24, borderInlineStart: `6px solid ${BRASS}`, paddingInlineStart: 28 }}>
          <div style={{ fontSize: 26, fontWeight: 700, color: BRASS }}>وإلا</div>
          <p style={{ margin: "6px 0 0", fontSize: 33, lineHeight: 1.55, fontWeight: 400, color: "rgba(255,255,255,0.9)" }}>{c.else}</p>
        </div>
      </div>
    </Frame>
  );
}

export function Sign({ qr }: { qr: string }) {
  return (
    <Frame n={6} tone="bone" foot={false}>
      <div style={{ position: "absolute", top: 140, right: PAD, width: 700, height: 340, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <h2 className={cairo.className} style={{ margin: 0, fontSize: 92, fontWeight: 900, lineHeight: 1.18 }}>
          الآن فقط
          <span style={{ display: "block", color: BRASS_DEEP }}>يمكنك التوقيع</span>
        </h2>
      </div>
      <Cross color={NAVY} />
      <div style={{ position: "absolute", top: Y + 26, left: SX - 110, width: 220, textAlign: "center", fontSize: 26, fontWeight: 600, color: "rgba(0,18,74,0.7)" }}>التوقيع</div>
      <div style={{ position: "absolute", top: 650, right: PAD, left: PAD, display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 30, rowGap: 6 }}>
        {clauses.map((c, i) => (
          <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 18, padding: "9px 0", fontSize: 33, fontWeight: 600 }}>
            <svg width="36" height="36" viewBox="0 0 46 46" style={{ flex: "none" }}>
              <rect x="2" y="2" width="42" height="42" fill="none" stroke={BRASS_DEEP} strokeWidth="4" />
              <path d="M11 24 L20 33 L36 13" fill="none" stroke={BRASS_DEEP} strokeWidth="5" strokeLinecap="square" />
            </svg>
            <span className={cairo.className} style={{ color: BRASS_DEEP, fontWeight: 900, width: 44 }}>{"0" + (i + 1)}</span>
            {c.name}
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", right: PAD, left: PAD, top: 800, background: INK, color: "#fff", padding: "24px 38px" }}>
        <div className={cairo.className} style={{ fontSize: 36, fontWeight: 900, lineHeight: 1.4 }}>اكتب رقم البند الذي <span style={{ color: BRASS }}>تتجاهله غالبًا</span> في التعليقات، واحفظ المنشور وأرسله لمن يوقّع معك.</div>
      </div>
      <div style={{ position: "absolute", right: PAD, left: PAD, bottom: 186, background: BRASS, color: INK, padding: "22px 36px", display: "flex", gap: 30, alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <div className={cairo.className} style={{ fontSize: 38, fontWeight: 900, lineHeight: 1.3 }}>أرسل لنا العقد قبل أن توقّعه.</div>
          <div style={{ fontSize: 27, lineHeight: 1.5, fontWeight: 500, marginTop: 6 }}>أرسل موجز مسألتك ونرد خلال يوم عمل.</div>
          <div dir="ltr" style={{ fontSize: 29, fontWeight: 700, marginTop: 4, textAlign: "right" }}>taap.sa</div>
        </div>
        <div style={{ background: BONE, padding: 10, width: 140, height: 140, flex: "none" }} dangerouslySetInnerHTML={{ __html: qr.replace("<svg", '<svg style="width:100%;height:100%"') }} />
      </div>
      <div style={{ position: "absolute", right: PAD, left: PAD, bottom: 140, fontSize: 21, color: "rgba(0,18,74,0.6)" }}>معلومات عامة للتوعية وليست استشارة قانونية لحالتك.</div>
      <div style={{ position: "absolute", bottom: 40, right: PAD, left: PAD, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/profile/lockup-navy.png" alt="" style={{ width: 250, height: "auto" }} />
        <div style={{ fontSize: 24, fontWeight: 500, color: "rgba(0,18,74,0.65)" }}>الرياض · الدور الأول · مكتب ١٤</div>
      </div>
    </Frame>
  );
}

export { INK };
