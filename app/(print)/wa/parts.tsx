import type { ReactNode } from "react";
import { Cairo, IBM_Plex_Sans_Arabic } from "next/font/google";
import { BONE, BRASS, BRASS_DEEP, INK, NAVY } from "../tips/parts";

/**
 * WhatsApp statuses on the new Enforcement Law (نظام التنفيذ, Royal Decree M/237 of 3/11/1447, published in Umm Al-Qura on 14/11/1447, in force
 * 180 days after publication). Ten self-contained cards, 1080 x 1920, made to be screenshotted and kept: one subject each, plain words, the
 * numbers large, the article it comes from underneath. Every figure was read from the official text (uqn.gov.sa/…/4000869) and checked against
 * a second source; see docs/whatsapp/sources.md. The top 190 px and the bottom 230 px are left clear for WhatsApp's own interface.
 */
const cairo = Cairo({ subsets: ["arabic"], weight: ["700", "800", "900"], display: "swap" });
const plex = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500", "600", "700"], display: "swap" });

export const W = 1080;
export const H = 1920;
export const TOTAL = 10;
const WARN = "#a63d2b";
const ar = (n: number) => String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[+d]);

function Card({ n, kicker, title, source, children }: { n: number; kicker: string; title: ReactNode; source: string; children: ReactNode }) {
  return (
    <div className={plex.className} dir="rtl" style={{ position: "relative", width: W, height: H, background: BONE, color: NAVY, overflow: "hidden" }}>
      {/* the lintel, as on the firm's other pieces */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 22, background: BRASS }} />
      <div style={{ position: "absolute", top: 196, right: 72, left: 72, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 32, fontWeight: 700 }}>
        <div style={{ color: BRASS_DEEP, display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ width: 16, height: 16, background: BRASS, display: "inline-block" }} />
          {kicker}
        </div>
        <div style={{ color: "rgba(0,18,74,0.55)", fontWeight: 600 }}>{ar(n)} من {ar(TOTAL)}</div>
      </div>
      <h1 className={cairo.className} style={{ position: "absolute", top: 280, right: 72, left: 72, margin: 0, fontSize: 86, fontWeight: 900, lineHeight: 1.22, textWrap: "balance" as never }}>
        {title}
      </h1>
      <div style={{ position: "absolute", top: 620, right: 72, left: 72, bottom: 232 }}>{children}</div>
      <div style={{ position: "absolute", right: 72, left: 72, bottom: 128, display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24 }}>
        <div style={{ fontSize: 25, lineHeight: 1.55, color: "rgba(0,18,74,0.7)", fontWeight: 500 }}>
          <div>{source}</div>
          <div>معلومات عامة للتوعية وليست استشارة قانونية.</div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/profile/lockup-navy.png" alt="" style={{ width: 250, height: "auto", flex: "none" }} />
      </div>
    </div>
  );
}

const box: React.CSSProperties = { background: "#fffdf7", border: "2px solid rgba(0,18,74,0.14)", padding: "30px 36px" };
const Tick = ({ color = BRASS_DEEP, x = false }: { color?: string; x?: boolean }) => (
  <svg width="46" height="46" viewBox="0 0 46 46" style={{ flex: "none", marginTop: 4 }}>
    <rect x="2" y="2" width="42" height="42" fill="none" stroke={color} strokeWidth="4" />
    {x ? <path d="M13 13 L33 33 M33 13 L13 33" stroke={color} strokeWidth="5" strokeLinecap="square" /> : <path d="M11 24 L20 33 L36 13" fill="none" stroke={color} strokeWidth="5" strokeLinecap="square" />}
  </svg>
);
function Row({ children, x, color, size = 44 }: { children: ReactNode; x?: boolean; color?: string; size?: number }) {
  return (
    <div style={{ display: "flex", gap: 26, alignItems: "flex-start", padding: "20px 0", borderTop: "2px solid rgba(0,18,74,0.12)", fontSize: size, lineHeight: 1.5, fontWeight: 500 }}>
      <Tick x={x} color={color} />
      <div>{children}</div>
    </div>
  );
}
const Big = ({ children, color = BRASS_DEEP, size = 130 }: { children: ReactNode; color?: string; size?: number }) => (
  <span className={cairo.className} style={{ fontSize: size, fontWeight: 900, lineHeight: 1, color }}>{children}</span>
);

export const cards: ((p: object) => ReactNode)[] = [
  // 1
  () => (
    <Card n={1} kicker="نظام التنفيذ الجديد" title={<>ما الذي يهمّك<br />في نظام التنفيذ الجديد؟</>} source="نظام التنفيذ (م/٢٣٧) · أم القرى ١٤/١١/١٤٤٧هـ · م٦٥">
      <div style={{ ...box, padding: "34px 40px" }}>
        {[
          ["متى يبدأ؟", "بعد ١٨٠ يومًا من نشره في «أم القرى» (١٤/١١/١٤٤٧هـ)، أي نحو ١٧/٥/١٤٤٨هـ."],
          ["ماذا يحل محله؟", "نظام التنفيذ القديم (م/٥٣)."],
          ["لمن يهمّ؟", "لكل من عليه حكم أو شيك أو كمبيالة أو دين موثّق، ولكل من يطالب بحقه."],
          ["والتفاصيل؟", "ستصدر لائحة تنفيذية تفصّل كثيرًا من أحكامه."],
        ].map(([a, b], i) => (
          <div key={a} style={{ padding: "22px 0", borderTop: i ? "2px solid rgba(0,18,74,0.12)" : "none" }}>
            <div className={cairo.className} style={{ fontSize: 40, fontWeight: 900, color: BRASS_DEEP }}>{a}</div>
            <div style={{ fontSize: 42, lineHeight: 1.5, fontWeight: 500, marginTop: 4 }}>{b}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 34, fontSize: 38, lineHeight: 1.6, fontWeight: 600, color: NAVY }}>
        في الحالات التالية: راتبك · بيتك · سفرك · الحبس · الشيكات · النفقة · الاعتراض
      </div>
    </Card>
  ),
  // 2
  () => (
    <Card n={2} kicker="راتبك" title={<>كم يمكن أن يُحجز<br />من راتبك أو معاشك؟</>} source="نظام التنفيذ · م٢٦ (الفقرتان ٣ و٤)">
      {[
        ["الراتب أو الأجر", [["دين عادي", "حتى الثلث"], ["دين نفقة", "حتى النصف"]]],
        ["معاش التقاعد (مدني أو عسكري)", [["دين عادي", "حتى الربع"], ["دين نفقة", "حتى النصف"]]],
      ].map(([t, rows], i) => (
        <div key={t as string} style={{ ...box, marginTop: i ? 28 : 0 }}>
          <div className={cairo.className} style={{ fontSize: 44, fontWeight: 900 }}>{t as string}</div>
          <div style={{ display: "flex", gap: 24, marginTop: 20 }}>
            {(rows as string[][]).map(([a, b]) => (
              <div key={a} style={{ flex: 1, background: BONE, padding: "22px 26px", textAlign: "center" }}>
                <div style={{ fontSize: 34, fontWeight: 600, color: "rgba(0,18,74,0.75)" }}>{a}</div>
                <div className={cairo.className} style={{ fontSize: 66, fontWeight: 900, color: BRASS_DEEP, marginTop: 4 }}>{b}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div style={{ marginTop: 28, fontSize: 35, lineHeight: 1.55, fontWeight: 500, color: "rgba(0,18,74,0.85)" }}>
        النسبة من <b>إجمالي</b> الراتب أو المعاش. وإذا اجتمعت النفقة مع ديون أخرى: يُخصَّص النصف للنفقة، ويُوزَّع ثلث النصف الآخر (وربعه في المعاش) على الديون الأخرى.
      </div>
    </Card>
  ),
  // 3
  () => (
    <Card n={3} kicker="بيتك وسيارتك" title={<>ما الذي لا يجوز<br />الحجز عليه؟</>} source="نظام التنفيذ · م٢٥ و م٢٦ (الفقرات ١ و٢ و٥)">
      <div style={box}>
        <Row size={40}>منزلك ووسيلة نقلك، إذا كانا في حدود كفايتك وكفاية من تعولهم.</Row>
        <Row size={40}>أدوات مهنتك أو حرفتك التي تزاولها بنفسك، ومستلزماتك الشخصية.</Row>
        <Row size={40}>الإعانات الحكومية المقدَّمة لك.</Row>
        <Row size={40}>الأموال العامة.</Row>
      </div>
      <div style={{ ...box, marginTop: 26, borderColor: "rgba(166,61,43,0.4)" }}>
        <Row x color={WARN} size={40}>
          يجوز الحجز عليهما إذا كانا <b>مرهونين للدائن</b> أو كانا <b>عين مال الدائن</b>.
        </Row>
      </div>
      <div style={{ marginTop: 26, fontSize: 34, lineHeight: 1.55, fontWeight: 500 }}>
        ولا تُحجز من أموالك إلا <b>بقدر الدين</b> (ما لم يكن المال لا يقبل التجزئة)، ولك أن تحدّد المال الذي يُنفَّذ عليه أولًا إن أثبتّ أن أموالك تزيد على الحق.
      </div>
    </Card>
  ),
  // 4
  () => (
    <Card n={4} kicker="الخط الزمني" title={<>صدر عليك أمر تنفيذ:<br />ماذا يحدث بعده؟</>} source="نظام التنفيذ · م١٤ و م١٥ و م١٨ و م١٩ و م٢٣">
      {[
        ["اليوم ١", "تُبلَّغ بأمر التنفيذ (أو يُعلَن). يلزمك الإفصاح عن أموالك، وتصير أموالك ضامنة للدين."],
        ["بعد ٥ أيام عمل", "إن لم تنفّذ: يبدأ التنفيذ الجبري. (ومع ضمان بنكي كافٍ تُمهَل ١٠ أيام عمل إضافية.)"],
        ["ثم", "يُخطَر مسجّلو المعلومات الائتمانية، وتُحجز أموالك وما يرد إليك مستقبلًا، وقد تُفرض غرامة حتى ٥٬٠٠٠ ريال عن كل يوم (بحدٍّ تحدده اللائحة)."],
        ["وبعد المدة", "يجوز بطلب الدائن منعك من السفر."],
      ].map(([a, b], i) => (
        <div key={a} style={{ display: "flex", gap: 28, marginTop: i ? 22 : 0 }}>
          <div style={{ width: 250, flex: "none", background: NAVY, color: "#fff", padding: "22px 18px", textAlign: "center" }}>
            <div className={cairo.className} style={{ fontSize: 46, fontWeight: 900, lineHeight: 1.3, color: BRASS }}>{a}</div>
          </div>
          <div style={{ ...box, flex: 1, fontSize: 41, lineHeight: 1.55, fontWeight: 500, padding: "24px 30px" }}>{b}</div>
        </div>
      ))}
    </Card>
  ),
  // 5
  () => (
    <Card n={5} kicker="سفرك" title={<>منع السفر:<br />كم مدته؟ ومتى يُرفع؟</>} source="نظام التنفيذ · م١٩">
      <div style={{ display: "flex", gap: 24 }}>
        <div style={{ ...box, flex: 1, textAlign: "center" }}>
          <Big size={104}>٣ سنوات</Big>
          <div style={{ fontSize: 31, fontWeight: 600, marginTop: 8 }}>الحد الأقصى للأمر الواحد</div>
        </div>
        <div style={{ ...box, flex: 1, textAlign: "center" }}>
          <Big size={104}>٦ سنوات</Big>
          <div style={{ fontSize: 31, fontWeight: 600, marginTop: 8 }}>إجمالي التمديدات (بطلب جديد)</div>
        </div>
      </div>
      <div style={{ ...box, marginTop: 20, paddingTop: 18 }}>
        <div className={cairo.className} style={{ fontSize: 40, fontWeight: 900, color: BRASS_DEEP }}>تطلب المحكمة رفعه إذا:</div>
        <Row size={32}>احتجتَ إلى علاج خارج المملكة بتقرير طبي معتمد.</Row>
        <Row size={32}>كان الدين من المبالغ اليسيرة (تحدّدها اللائحة).</Row>
        <Row size={32}>اقتضت مهنتك أو وظيفتك السفر.</Row>
        <Row size={32}>ترتّب عليك ضرر من المنع.</Row>
        <Row size={32}>أفصحتَ عن أموال تكفي للوفاء.</Row>
      </div>
      <div style={{ marginTop: 22, fontSize: 27, lineHeight: 1.45, color: "rgba(0,18,74,0.8)", fontWeight: 500 }}>
        وينتهي المنع بانتهاء طلب التنفيذ. ولا يمنع ذلك الجهات من إنهاء إقامة غير السعودي أو إبعاده.
      </div>
    </Card>
  ),
  // 6
  () => (
    <Card n={6} kicker="الحبس" title={<>هل يُحبس المدين<br />في النظام الجديد؟</>} source="نظام التنفيذ · م٣٦ و م٣٧">
      <div style={{ background: NAVY, color: "#fff", padding: "34px 40px" }}>
        <div className={cairo.className} style={{ fontSize: 88, fontWeight: 900, lineHeight: 1.25, color: BRASS }}>ليس لمجرد أنه لم يسدّد.</div>
        <div style={{ fontSize: 42, lineHeight: 1.6, fontWeight: 400, marginTop: 16 }}>
          نصّ النظام لا يتضمن حبسًا بسبب عدم سداد دين مالي. أما الحبس للإجبار على التنفيذ فمرتبط بالتنفيذ المباشر: فعل أو امتناع عن فعل (كتسليم أو إخلاء).
        </div>
      </div>
      <div style={{ ...box, marginTop: 24 }}>
        <div style={{ fontSize: 41, lineHeight: 1.6, fontWeight: 500 }}>
          بعد <b>٣٠ يوم عمل</b> دون تنفيذ: حبس لا يزيد على <b>١٨٠ يومًا</b> (وتُمدَّد). ولا يسقط الحق بانتهاء المدة.
        </div>
        <div className={cairo.className} style={{ fontSize: 46, fontWeight: 900, color: BRASS_DEEP, marginTop: 16 }}>لا يُحبس:</div>
        <div style={{ fontSize: 40, lineHeight: 1.6, fontWeight: 500 }}>من لم يبلغ ١٨ سنة · المريض بتقرير طبي معتمد · الحامل · من لها طفل لم يبلغ سنتين · أصول الدائن وفروعه.</div>
      </div>
    </Card>
  ),
  // 7
  () => (
    <Card n={7} kicker="تحذير" title={<>أفعال عقوبتها<br />السجن فعلًا</>} source="نظام التنفيذ · م٥٠ و م٥٢ (وم٥٦ للعود)">
      <div style={{ ...box, borderColor: "rgba(166,61,43,0.45)" }}>
        <Row x color={WARN} size={46}>إخفاء أموالك أو تهريبها لمنع الدائن من حقه.</Row>
        <Row x color={WARN} size={46}>تعطيل التنفيذ: الامتناع عن الإفصاح، أو التصرف في مال محجوز، أو تجاهل الاستجواب، أو رفع دعوى لمجرد التعطيل.</Row>
        <Row x color={WARN} size={46}>تقديم بيانات مضللة للمحكمة عمدًا.</Row>
      </div>
      <div style={{ display: "flex", gap: 24, marginTop: 24 }}>
        <div style={{ flex: 1, background: NAVY, color: "#fff", padding: "28px 30px", textAlign: "center" }}>
          <div className={cairo.className} style={{ fontSize: 76, fontWeight: 900, color: BRASS, lineHeight: 1.1 }}>٣ سنوات</div>
          <div style={{ fontSize: 37, lineHeight: 1.5, marginTop: 8 }}>وغرامة حتى <b>مليون ريال</b>، أو إحداهما</div>
        </div>
        <div style={{ flex: 1, background: WARN, color: "#fff", padding: "28px 30px", textAlign: "center" }}>
          <div className={cairo.className} style={{ fontSize: 76, fontWeight: 900, lineHeight: 1.1 }}>١٥ سنة</div>
          <div style={{ fontSize: 37, lineHeight: 1.5, marginTop: 8 }}>لمن بدّد أموالًا كثيرة، ولو ثبت إعساره</div>
        </div>
      </div>
      <div style={{ marginTop: 24, fontSize: 40, lineHeight: 1.6, fontWeight: 500 }}>
        ومن ساعدك وهو يعلم يُعاقَب مثلك. وقد تُضاعَف العقوبة عند العود خلال ٣ سنوات.
      </div>
    </Card>
  ),
  // 8
  () => (
    <Card n={8} kicker="شيك · كمبيالة · عقد" title={<>ما الذي يُنفَّذ<br />مباشرة بلا دعوى؟</>} source="نظام التنفيذ م٧ و م١١ · قرار مجلس الوزراء (٧٤٦) البند خامسًا">
      <div style={box}>
        <Row size={46}>الأحكام النهائية والمعجَّلة، وأحكام المحكّمين.</Row>
        <Row size={46}>اتفاقات التسوية.</Row>
        <Row size={46}>الشيكات.</Row>
        <Row size={46}>العقود الموثّقة.</Row>
        <Row size={46}>الكمبيالات والسندات لأمر <b>المسجَّلة</b> في المنصات الوطنية.</Row>
      </div>
      <div style={{ background: NAVY, color: "#fff", padding: "26px 34px", marginTop: 22, fontSize: 41, lineHeight: 1.55 }}>
        الكمبيالات والسندات لأمر <b style={{ color: BRASS }}>الصادرة قبل نفاذ النظام</b> تبقى سندات تنفيذية <b style={{ color: BRASS }}>سنة</b> بعد النفاذ ولو لم تُسجَّل.
      </div>
      <div style={{ marginTop: 22, fontSize: 41, lineHeight: 1.55, fontWeight: 500 }}>
        ولا يُقبل طلب التنفيذ بسند مضى على استحقاقه أكثر من <b>١٠ سنوات</b>.
      </div>
    </Card>
  ),
  // 9
  () => (
    <Card n={9} kicker="الأسرة" title={<>النفقة والحضانة<br />والزيارة</>} source="نظام التنفيذ · م٢٦ و م٣٩ و م٤٠ و م٥٤">
      <div style={box}>
        <Row size={47}>النفقة: يجوز الحجز حتى <b>نصف</b> الراتب أو المعاش لدين النفقة.</Row>
        <Row size={47}>الحضانة والزيارة: تُنفَّذ جبرًا، ولو بالاستعانة بالقوة المختصة ودخول المنازل، ويُعاد التنفيذ كلما اقتضى الأمر.</Row>
        <Row size={47}>تراعي المحكمة في الزيارة <b>مصلحة المحضون</b>.</Row>
      </div>
      <div style={{ background: WARN, color: "#fff", padding: "28px 34px", marginTop: 24, fontSize: 42, lineHeight: 1.55 }}>
        الامتناع عن تنفيذ أمر الحضانة أو الولاية أو الزيارة، أو مقاومته: سجن حتى <b>٩٠ يومًا</b> وغرامة حتى <b>٣٠ ألف ريال</b>، أو إحداهما، سواء كان والدًا أو غيره.
      </div>
    </Card>
  ),
  // 10
  () => (
    <Card n={10} kicker="حقّك في الاعتراض" title={<>اعتراض على إجراء؟<br />لديك مهلة قصيرة</>} source="نظام التنفيذ · م١٠ و م٤٦ و م٤٧">
      <div style={{ ...box, textAlign: "center", padding: "36px 40px" }}>
        <Big size={150}>١٠ أيام عمل</Big>
        <div style={{ fontSize: 43, lineHeight: 1.55, fontWeight: 500, marginTop: 16 }}>
          للتظلم من الأوامر والقرارات المتعلقة بإجراءات التنفيذ (في الحالات التي تحدّدها اللائحة)، من اليوم التالي لإتاحة الاطلاع عليها.
        </div>
      </div>
      <div style={{ ...box, marginTop: 24 }}>
        <Row size={44}>يجوز إيقاف الأمر المتظلَّم منه إلى حين البتّ فيه.</Row>
        <Row size={44} x color={WARN}>لكن وجود منازعة أو تظلم لا يوقف التنفيذ تلقائيًا، ما لم يقرر المختص ذلك.</Row>
        <Row size={44}>وللمدين أن يطلب من المحكمة إلزام الدائن بالاستيفاء إذا امتنع عن قبول حقه.</Row>
      </div>
    </Card>
  ),
];

export { INK };
