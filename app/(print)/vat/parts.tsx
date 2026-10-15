import type { ReactNode } from "react";
import { BRASS, BRASS_DEEP, NAVY, BONE } from "../tips/parts";
import { Big, Card as BaseCard, Row, WARN, ar, box, cairo } from "../wa/parts";

/**
 * WhatsApp statuses on the VAT refund for individuals' real-estate sales made between 1/1/2018 and 4/10/2020.
 * Source: the General Secretariat of the Zakat, Tax and Customs Committees' announcement, and the "Mechanisms and procedures" for Royal Order
 * 54152 of 5/7/1447 (ZATCA Board decision 10-04-26 of 3/3/1448), published in Umm Al-Qura on 13 October 2026 (2 Jumada I 1448);
 * the 30 days run from that publication. Dates checked on the Umm al-Qura calendar: 13/10/2026 = 2/5/1448; + 30 days = 12/11/2026 = 2/6/1448.
 */
export const TOTAL = 8;
const KICKER = "استرداد ضريبة بيع العقار";
const SRC = "الأمانة العامة للجان الزكوية والضريبية والجمركية · الآليات والإجراءات (أم القرى ١٣/١٠/٢٠٢٦م)";

const Card = (p: { n: number; kicker?: string; title: ReactNode; source?: string; children: ReactNode }) => (
  <BaseCard total={TOTAL} kicker={p.kicker ?? KICKER} source={p.source ?? SRC} n={p.n} title={p.title}>
    {p.children}
  </BaseCard>
);

const Step = ({ n, children }: { n: number; children: ReactNode }) => (
  <div style={{ display: "flex", gap: 28, alignItems: "flex-start", padding: "22px 0", borderTop: n > 1 ? "2px solid rgba(0,18,74,0.12)" : "none" }}>
    <div className={cairo.className} style={{ flex: "none", width: 76, height: 76, background: BRASS, color: NAVY, fontSize: 48, fontWeight: 900, display: "grid", placeItems: "center" }}>{ar(n)}</div>
    <div style={{ fontSize: 44, lineHeight: 1.5, fontWeight: 500 }}>{children}</div>
  </div>
);

export const cards: ((p: object) => ReactNode)[] = [
  // 1
  () => (
    <Card n={1} title={<>بعتَ عقارًا بين<br />٢٠١٨ و٢٠٢٠؟<br />ودفعتَ ضريبة عليه؟</>}>
      <div className={cairo.className} style={{ fontSize: 78, fontWeight: 900, lineHeight: 1.3, color: BRASS_DEEP }}>قد يحق لك استرداد<br />ما دفعت.</div>
      <div style={{ ...box, marginTop: 40 }}>
        <div style={{ fontSize: 40, lineHeight: 1.6, fontWeight: 500 }}>
          بدأت <b>الأمانة العامة للجان الزكوية والضريبية والجمركية</b> استقبال دعاوى استرداد <b>ضريبة القيمة المضافة</b> عن التوريدات العقارية للأفراد.
        </div>
      </div>
      <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 28, background: NAVY, color: BONE, padding: "30px 38px" }}>
        <Big color="#f6e2b3" size={118}>٣٠</Big>
        <div style={{ fontSize: 40, lineHeight: 1.5, fontWeight: 600 }}>يومًا فقط من ١٣ أكتوبر ٢٠٢٦م<br />لتقديم المطالبة</div>
      </div>
      <div style={{ marginTop: 34, fontSize: 36, fontWeight: 600, color: "rgba(0,18,74,0.8)" }}>اقرأ البطاقات التالية لتعرف هل تنطبق عليك ←</div>
    </Card>
  ),
  // 2
  () => (
    <Card n={2} title={<>هل تنطبق عليك؟<br />خمسة شروط أساسية</>}>
      <div style={box}>
        <Row size={44}>بعتَ العقار <b>بصفتك فردًا</b> (شخصًا طبيعيًا)، لا منشأة.</Row>
        <Row size={44}>كان البيع ونقل الملكية بين <b>١ يناير ٢٠١٨م</b> و<b>٤ أكتوبر ٢٠٢٠م</b> (نفاذ ضريبة التصرفات العقارية).</Row>
        <Row size={44}><b>ورّدتَ ضريبة القيمة المضافة</b> عن البيع إلى هيئة الزكاة والضريبة والجمارك.</Row>
        <Row size={44}><b>لم تخصم</b> ضريبة المدخلات المرتبطة بالعقار.</Row>
        <Row size={44}><b>لم تسترد</b> المبلغ من جهة حكومية أخرى.</Row>
      </div>
      <div style={{ marginTop: 30, fontSize: 35, lineHeight: 1.55, fontWeight: 500, color: "rgba(0,18,74,0.85)" }}>
        ولا يكفي استيفاؤها وحدها: تُراجَع ضوابط أخرى في البطاقة التالية.
      </div>
    </Card>
  ),
  // 3
  () => (
    <Card n={3} title={<>من لا تشمله<br />هذه الآلية؟</>}>
      <div style={{ ...box, borderColor: "rgba(166,61,43,0.4)" }}>
        <Row x color={WARN} size={42}>من <b>يمارس بيع العقارات باستمرار وانتظام</b> بقصد تحقيق الدخل.</Row>
        <Row x color={WARN} size={42}>من نفّذ <b>أكثر من عملية توريد عقاري خلال ١٢ شهرًا متتالية</b> يتجاوز مجموع قيمها حدّ التسجيل الإلزامي في ضريبة القيمة المضافة.</Row>
        <Row x color={WARN} size={42}>من <b>خصم ضريبة المدخلات</b> المرتبطة بالعقار.</Row>
        <Row x color={WARN} size={42}>من <b>استرد المبلغ</b> من جهة حكومية أخرى.</Row>
      </div>
      <div style={{ marginTop: 30, fontSize: 34, lineHeight: 1.55, fontWeight: 500 }}>
        من خصم ضريبة المدخلات قد يستفيد من <b>إلغاء الغرامات غير المسددة</b> فقط، بحسب شروطها.
      </div>
    </Card>
  ),
  // 4
  () => (
    <Card n={4} title={<>كم المدة المتاحة<br />لتقديم المطالبة؟</>} source="الآليات والإجراءات · أم القرى ١٣/١٠/٢٠٢٦م (٢ جمادى الأولى ١٤٤٨هـ)">
      <div style={{ display: "flex", alignItems: "center", gap: 34 }}>
        <Big size={190}>٣٠</Big>
        <div style={{ fontSize: 44, lineHeight: 1.5, fontWeight: 600 }}>يومًا من تاريخ نشر الآليات<br />في «أم القرى»</div>
      </div>
      <div style={{ ...box, marginTop: 36 }}>
        {[
          ["١ يناير ٢٠١٨م", "بداية الفترة التي يشملها البيع"],
          ["٤ أكتوبر ٢٠٢٠م", "نفاذ ضريبة التصرفات العقارية: نهاية الفترة"],
          ["١٣ أكتوبر ٢٠٢٦م", "نشر الآليات وبدء احتساب الثلاثين يومًا"],
          ["نحو ١٢ نوفمبر ٢٠٢٦م", "انتهاء المدة بحسب الحساب"],
        ].map(([d, t], i) => (
          <div key={d} style={{ display: "flex", justifyContent: "space-between", gap: 24, alignItems: "baseline", padding: "20px 0", borderTop: i ? "2px solid rgba(0,18,74,0.12)" : "none" }}>
            <div className={cairo.className} style={{ fontSize: 46, fontWeight: 900, color: i === 3 ? WARN : BRASS_DEEP, flex: "none" }}>{d}</div>
            <div style={{ fontSize: 36, lineHeight: 1.45, fontWeight: 500, textAlign: "left" }}>{t}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 28, fontSize: 34, lineHeight: 1.55, fontWeight: 600 }}>لا تنتظر آخر يوم: تجهيز المستندات والدعوى يحتاج وقتًا.</div>
    </Card>
  ),
  // 5
  () => (
    <Card n={5} title={<>ماذا يشمل<br />الاسترداد؟</>}>
      <div style={box}>
        <div className={cairo.className} style={{ fontSize: 44, fontWeight: 900, color: BRASS_DEEP }}>إن كنتَ سدّدتَ</div>
        <Row size={43}>ضريبة القيمة المضافة التي ورّدتها عن البيع، إن كانت غير مستحقة.</Row>
        <Row size={43}>الغرامات المرتبطة بها التي سدّدتها.</Row>
      </div>
      <div style={{ ...box, marginTop: 26 }}>
        <div className={cairo.className} style={{ fontSize: 44, fontWeight: 900, color: BRASS_DEEP }}>وإن لم تُسدّد بعد</div>
        <Row size={41}>الضريبة غير المستحقة تُلغى مع غراماتها.</Row>
        <Row size={41}>الغرامات غير المسدّدة على التوريدات العقارية تُلغى بشروط الأمر الملكي، <b>عدا غرامات التهرب الضريبي</b>.</Row>
      </div>
      <div style={{ marginTop: 26, fontSize: 32, lineHeight: 1.55, fontWeight: 500, color: "rgba(0,18,74,0.8)" }}>
        ويقتصر الاسترداد على ما لم تستردّه من جهة حكومية أخرى.
      </div>
    </Card>
  ),
  // 6
  () => (
    <Card n={6} title={<>كيف تُقدَّم<br />المطالبة؟</>}>
      <div style={box}>
        <Step n={1}>راجع هل تنطبق عليك الشروط، وجهّز مستنداتك.</Step>
        <Step n={2}>تُقدَّم <b>دعوى طلب الاسترداد</b> عبر بوابة التقاضي في الموقع الإلكتروني للأمانة العامة.</Step>
        <Step n={3}>ضمن <b>٣٠ يومًا</b> من نشر الآليات في «أم القرى».</Step>
        <Step n={4}>تتحقق الهيئة من عدم الاستحقاق ومن عدم استرداده من جهة أخرى.</Step>
      </div>
      <div style={{ marginTop: 26, fontSize: 32, lineHeight: 1.55, fontWeight: 500, color: "rgba(0,18,74,0.85)" }}>
        وإن ثبت لاحقًا أنك لم تكن مستحقًا، فللهيئة اتخاذ الإجراءات النظامية لاسترداد ما صُرف.
      </div>
    </Card>
  ),
  // 7
  () => (
    <Card n={7} title={<>ما المستندات<br />التي تُجهّزها؟</>}>
      <div style={box}>
        <Row size={44}><b>صك البيع أو الإفراغ</b> وتاريخه.</Row>
        <Row size={44}><b>ما يثبت توريد الضريبة</b> للهيئة: إقرار أو إشعار سداد أو فاتورة.</Row>
        <Row size={44}><b>قرارات الهيئة أو المطالبات أو الغرامات</b> المتعلقة بالبيع، إن وُجدت.</Row>
        <Row size={44}>ما يبيّن <b>عدم خصم ضريبة المدخلات</b> وعدم استرداد المبلغ من جهة أخرى.</Row>
        <Row size={44}>هويتك، وبياناتك لدى الهيئة.</Row>
      </div>
      <div style={{ marginTop: 28, fontSize: 34, lineHeight: 1.55, fontWeight: 500 }}>
        ما ينقصك منها تبحث عنه مبكرًا: بعضها يحتاج وقتًا للحصول عليه.
      </div>
    </Card>
  ),
  // 8
  () => (
    <Card n={8} title={<>نبدأ بفحص ملفك<br />قبل انتهاء المدة</>} source="يخضع الاستحقاق لدراسة الحالة والمستندات واستيفاء الضوابط، ولا تعني مراجعة الملف ضمان قبول الدعوى أو استرداد المبلغ.">
      <div style={{ fontSize: 42, lineHeight: 1.6, fontWeight: 500 }}>
        أرسل كلمة <b className={cairo.className} style={{ color: BRASS_DEEP, fontSize: 56, fontWeight: 900 }}>«استرداد»</b> على واتساب، ومعها:
      </div>
      <div style={{ ...box, marginTop: 26 }}>
        <Row size={44}>تاريخ البيع.</Row>
        <Row size={44}>هل ورّدتَ الضريبة للهيئة؟</Row>
        <Row size={44}>ما لديك من مستندات.</Row>
      </div>
      <div style={{ marginTop: 40, background: NAVY, color: BONE, padding: "34px 40px", textAlign: "center" }}>
        <div style={{ fontSize: 34, fontWeight: 500, color: "#f6e2b3" }}>تركي النايف وشركاؤه للمحاماة</div>
        <div dir="ltr" className={cairo.className} style={{ fontSize: 84, fontWeight: 900, marginTop: 8, letterSpacing: 2 }}>+966 56 677 0888</div>
      </div>
      <div style={{ marginTop: 28, fontSize: 33, lineHeight: 1.55, fontWeight: 600, color: "rgba(0,18,74,0.85)" }}>
        المدة تنتهي نحو ١٢ نوفمبر ٢٠٢٦م.
      </div>
    </Card>
  ),
];
