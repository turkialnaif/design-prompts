import type { ReactNode } from "react";
import { Cairo, IBM_Plex_Sans_Arabic } from "next/font/google";
import { BONE, BRASS, BRASS_DEEP, INK, NAVY } from "../tips/parts";

/**
 * A LinkedIn document post (carousel): six portrait pages, 1080 x 1350. A cover, four questions a company should be able to answer,
 * and a page to score the answers. Same language as the rest of the identity: deep ink, bone, flat brass, the lockup, a great deal of space.
 */
const cairo = Cairo({ subsets: ["arabic"], weight: ["700", "800", "900"], display: "swap" });
const plex = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500", "600", "700"], display: "swap" });

export const W = 1080;
export const H = 1350;
const PAD = 84;
const ar = (n: number) => String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[+d]);
export const TOTAL = 6;

export type Q = { word: string; q: string; risk: string; ask: string[]; yes: string };
export const questions: Q[] = [
  {
    word: "التوقيع",
    q: "من يملك صلاحية التوقيع باسم شركتك؟",
    risk: "عقد وقّعه من لا صلاحية له قد يُنازَع فيه بعد أشهر، وعقد يتجدد تلقائيًا قد يلزمك سنة أخرى دون أن ينتبه أحد.",
    ask: ["من يحق له التوقيع، وبأي حدّ لقيمة العقد؟", "أين سجل العقود السارية وتواريخ انتهائها؟", "متى يتجدد كل عقد، وما مدة إشعار عدم التجديد؟"],
    yes: "لديك سجل عقود محدَّث، وصلاحيات توقيع مكتوبة.",
  },
  {
    word: "الانسحاب",
    q: "ماذا يحدث لعملك إذا انسحب أهم مورّد أو شريك غدًا؟",
    risk: "الاعتماد على علاقة واحدة دون بنود إنهاء وانتقال يجعل الخروج مكلفًا، وقد يوقف التشغيل قبل أن تجد البديل.",
    ask: ["هل مدة الإشعار كافية لإيجاد بديل؟", "هل يلتزم الطرف الآخر بتسليم البيانات والمستندات؟", "هل في العقد خطة انتقال أو استمرارية للخدمة؟"],
    yes: "أهم ثلاثة عقود لديك فيها إنهاء متبادل وإشعار كافٍ.",
  },
  {
    word: "النزاع",
    q: "لو نشأ نزاع غدًا: هل ملفك جاهز؟",
    risk: "قد يضعف موقف صاحب الحق، لا لأنه على باطل، بل لأن إثباته غير مرتب أو لأن جهة الفصل لم تُحدَّد في العقد.",
    ask: ["أين تُحال الخلافات: تحكيم أم قضاء، وأي مركز؟", "هل المراسلات والفواتير ومحاضر التسليم في مكان واحد؟", "من يحتفظ بنسخ العقود الموقّعة؟"],
    yes: "بند الخلافات محدد، ومستندات أكبر ثلاثة عملاء مرتبة.",
  },
  {
    word: "الامتثال",
    q: "هل تعرف الالتزامات النظامية التي تنطبق على نشاطك؟",
    risk: "ترخيص انتهى، أو سجل لم يُحدَّث، أو بيانات عملاء تُعالَج بلا سياسة: تفاصيل إدارية قد تتحول إلى غرامة أو توقف نشاط.",
    ask: ["ما التراخيص والسجلات المطلوبة، ومتى تنتهي؟", "هل لديك سياسة لحماية البيانات الشخصية؟", "من المسؤول عن متابعة الامتثال في شركتك؟"],
    yes: "لديك جدول بمواعيد التراخيص، وشخص مسؤول عن الامتثال.",
  },
];

function Check({ color, size = 44 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 46 46" style={{ flex: "none" }}>
      <rect x="2" y="2" width="42" height="42" fill="none" stroke={color} strokeWidth="4" />
      <path d="M11 24 L20 33 L36 13" fill="none" stroke={color} strokeWidth="5" strokeLinecap="square" />
    </svg>
  );
}

function Page({ n, tone, children, foot = true }: { n: number; tone: "ink" | "bone"; children: ReactNode; foot?: boolean }) {
  const ink = tone === "ink";
  const line = ink ? "rgba(196,160,78,0.4)" : "rgba(0,18,74,0.16)";
  return (
    <div className={plex.className} dir="rtl" style={{ position: "relative", width: W, height: H, background: ink ? INK : BONE, color: ink ? "#fff" : NAVY, overflow: "hidden", breakAfter: n < TOTAL ? "page" : "auto" }}>
      <div style={{ position: "absolute", top: 64, right: PAD, left: PAD, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 28, fontWeight: 600 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, color: ink ? BRASS : BRASS_DEEP }}>
          <span style={{ width: 15, height: 15, background: BRASS, display: "inline-block" }} />
          اختبار الجاهزية القانونية
        </div>
        <div style={{ color: ink ? "rgba(255,255,255,0.7)" : "rgba(0,18,74,0.65)", fontWeight: 500 }}>صفحة {"٠" + ar(n)} من ٠٦</div>
      </div>
      <div style={{ position: "absolute", top: 118, right: PAD, left: PAD, height: 2, background: line }} />
      {children}
      {foot ? (
        <div style={{ position: "absolute", bottom: 56, right: PAD, left: PAD, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ink ? "/brand/profile/lockup-bone.png" : "/brand/profile/lockup-navy.png"} alt="" style={{ width: 290, height: "auto" }} />
          {n < TOTAL ? <div style={{ fontSize: 30, fontWeight: 600, color: ink ? BRASS : BRASS_DEEP }}>اسحب ←</div> : null}
        </div>
      ) : null}
    </div>
  );
}

export function Cover() {
  return (
    <Page n={1} tone="ink">
      <div style={{ position: "absolute", top: 190, right: PAD, left: PAD }}>
        <div style={{ fontSize: 34, fontWeight: 600, color: BRASS }}>أربعة أسئلة · دقيقتان · ورقة واحدة</div>
        <h1 className={cairo.className} style={{ margin: "34px 0 0", fontSize: 128, fontWeight: 900, lineHeight: 1.16 }}>
          هل شركتك
          <span style={{ display: "block", color: BRASS }}>مكشوفة قانونيًا؟</span>
        </h1>
        <div style={{ height: 4, width: 150, background: BRASS, marginTop: 44 }} />
        <p style={{ margin: "40px 0 0", fontSize: 42, lineHeight: 1.65, fontWeight: 400, color: "rgba(255,255,255,0.86)", maxWidth: 880 }}>
          اختبار سريع يكشف أين تتركز المخاطر في عقودك وشراكاتك والتزاماتك، قبل أن يكشفها نزاع.
        </p>
      </div>
      <div style={{ position: "absolute", right: PAD, left: PAD, bottom: 180, display: "flex", gap: 20 }}>
        {questions.map((q, i) => (
          <div key={q.word} style={{ flex: 1, borderTop: `4px solid ${BRASS}`, paddingTop: 20 }}>
            <div className={cairo.className} style={{ fontSize: 56, fontWeight: 900, color: BRASS, lineHeight: 1 }}>{"0" + (i + 1)}</div>
            <div style={{ fontSize: 34, fontWeight: 600, marginTop: 10 }}>{q.word}</div>
          </div>
        ))}
      </div>
    </Page>
  );
}

export function Question({ i }: { i: number }) {
  const q = questions[i];
  return (
    <Page n={i + 2} tone="bone">
      {/* the numeral, large and quiet, behind the question */}
      <div className={cairo.className} style={{ position: "absolute", top: 108, left: 50, fontSize: 330, fontWeight: 900, lineHeight: 1, color: "rgba(196,160,78,0.22)", letterSpacing: -6 }} dir="ltr">{"0" + (i + 1)}</div>
      <div style={{ position: "absolute", top: 170, right: PAD, left: PAD }}>
        <div style={{ fontSize: 30, fontWeight: 700, color: BRASS_DEEP }}>السؤال {ar(i + 1)} · {q.word}</div>
        <h2 className={cairo.className} style={{ margin: "22px 0 0", fontSize: 66, fontWeight: 900, lineHeight: 1.32, maxWidth: 900 }}>{q.q}</h2>
      </div>

      <div style={{ position: "absolute", top: 500, right: PAD, left: PAD }}>
        <div style={{ borderTop: "2px solid rgba(0,18,74,0.16)", paddingTop: 26 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: BRASS_DEEP }}>الخطر</div>
          <p style={{ margin: "10px 0 0", fontSize: 33, lineHeight: 1.55, fontWeight: 400, color: "rgba(0,18,74,0.86)" }}>{q.risk}</p>
        </div>
        <div style={{ borderTop: "2px solid rgba(0,18,74,0.16)", paddingTop: 24, marginTop: 24 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: BRASS_DEEP }}>اسأل فريقك</div>
          <div style={{ marginTop: 10 }}>
            {q.ask.map((t) => (
              <div key={t} style={{ display: "flex", gap: 22, alignItems: "baseline", fontSize: 33, lineHeight: 1.5, fontWeight: 500, marginTop: 8 }}>
                <span style={{ width: 14, height: 14, background: BRASS, flex: "none", transform: "translateY(-4px)" }} />
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", right: PAD, left: PAD, bottom: 160, background: INK, color: "#fff", padding: "26px 36px", display: "flex", gap: 28, alignItems: "center" }}>
        <Check color={BRASS} />
        <div style={{ fontSize: 32, lineHeight: 1.5, fontWeight: 500 }}>
          <b style={{ color: BRASS, fontWeight: 700 }}>أجب بـ«نعم» إذا: </b>
          {q.yes}
        </div>
      </div>
    </Page>
  );
}

export function Score({ qr }: { qr: string }) {
  const tiers = [
    ["٤ نعم", "جاهز", "راجع الوضع كل ربع سنة."],
    ["٢ أو ٣", "يحتاج مراجعة", "ابدأ بأكبر عقد وأقدمه."],
    ["٠ أو ١", "مكشوف", "الأولوية الآن: مراجعة العقود والصلاحيات."],
  ];
  return (
    <Page n={6} tone="ink" foot={false}>
      <div style={{ position: "absolute", top: 170, right: PAD, left: PAD }}>
        <h2 className={cairo.className} style={{ margin: 0, fontSize: 88, fontWeight: 900, lineHeight: 1.2 }}>
          كم مرة أجبت <span style={{ color: BRASS }}>بنعم؟</span>
        </h2>
        <div style={{ marginTop: 28 }}>
          {tiers.map(([n, t, d]) => (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 30, padding: "16px 0", borderTop: "2px solid rgba(196,160,78,0.4)" }}>
              <div className={cairo.className} style={{ width: 210, fontSize: 48, fontWeight: 900, color: BRASS, flex: "none" }}>{n}</div>
              <div>
                <div style={{ fontSize: 40, fontWeight: 700 }}>{t}</div>
                <div style={{ fontSize: 32, fontWeight: 400, color: "rgba(255,255,255,0.78)", marginTop: 4 }}>{d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: "absolute", right: PAD, left: PAD, bottom: 180, background: BRASS, color: INK, padding: "30px 42px", display: "flex", gap: 36, alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <div className={cairo.className} style={{ fontSize: 42, fontWeight: 900, lineHeight: 1.3 }}>اكتب رقمك في التعليقات، واحفظ الصفحات لتعيد الاختبار.</div>
          <div style={{ fontSize: 30, lineHeight: 1.6, fontWeight: 500, marginTop: 14 }}>أرسل لنا موجز مسألتك ونرد خلال يوم عمل.</div>
          <div dir="ltr" style={{ fontSize: 32, fontWeight: 700, marginTop: 10, textAlign: "right" }}>taap.sa</div>
        </div>
        <div style={{ background: BONE, padding: 14, width: 180, height: 180, flex: "none" }} dangerouslySetInnerHTML={{ __html: qr.replace("<svg", '<svg style="width:100%;height:100%"') }} />
      </div>
      <div style={{ position: "absolute", right: PAD, left: PAD, bottom: 140, fontSize: 22, color: "rgba(255,255,255,0.65)" }}>معلومات عامة للتوعية وليست استشارة قانونية لحالتك.</div>
      <div style={{ position: "absolute", bottom: 52, right: PAD, left: PAD, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/profile/lockup-bone.png" alt="" style={{ width: 290, height: "auto" }} />
        <div style={{ fontSize: 26, fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>الرياض · الدور الأول · مكتب ١٤</div>
      </div>
    </Page>
  );
}

export { INK };
