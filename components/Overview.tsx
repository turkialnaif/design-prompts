import Reveal from "@/components/Reveal";
import { Eye, Route, Target } from "lucide-react";
import { firm } from "@/lib/site";

const copy = {
  ar: {
    paragraphs: [
      `تركي النايف وشركاؤه مكتب محاماة واستشارات قانونية في الرياض، مرخّص من وزارة العدل برقم ${firm.licenseNumber}، وعضو أساسي في الهيئة السعودية للمحامين. نخدم الأفراد والشركات والمؤسسات، ونؤمن بأن القيمة القانونية الحقيقية هي التي تُبنى قبل القرار لا بعده.`,
      "نقدّم خدمات مركّزة للمسائل التي تتطلب دقة في التحليل وجودة في الصياغة وانضباطًا في إدارة الملف حتى الوصول إلى أثر عملي. وتقوم منظومتنا على المشورة والرأي القانوني، والعقود والصفقات، والتقاضي والتحكيم والتسوية، والامتثال وحوكمة الأعمال، والقانون الرقمي والبيانات، والتنفيذ والتحصيل.",
      "يقود المكتب المحامي تركي النايف الشمري، وهو محامٍ ومدرب قانوني مرخّص، ومحكّم معتمد لدى مركز هيئة المحامين للتسوية والتحكيم، وخبير معتمد لدى منصة «خبرة»، ووسيط امتياز تجاري معتمد من «منشآت».",
      "نضع تجربة العميل أولًا: نتفق منذ البداية على نطاق العمل والمخرجات، ونُبقيه مطّلعًا على سير ملفه عبر بوابة العملاء، ونُسلّم ما يُقرأ ويُراجع ويُطبّق. ونعمل بما يتوافق مع أنظمة المملكة ومستهدفات رؤية 2030 في بيئة أعمال أوضح وأكثر شفافية.",
    ],
    pillars: [
      { k: "دقة", v: "في التحليل والصياغة" },
      { k: "وضوح", v: "في النطاق والمخرجات" },
      { k: "متابعة", v: "حتى يكتمل الأثر" },
    ],
  },
  en: {
    paragraphs: [
      `Turki AlNaif & Partners is a law and legal consultancy firm in Riyadh, licensed by the Ministry of Justice under No. ${firm.licenseNumber} and a core member of the Saudi Bar Association. We serve individuals, companies and institutions, and believe legal value is built before a decision, not after it.`,
      "We offer focused services for matters that demand precision in analysis, quality in drafting and discipline in managing every file through to a practical outcome. Our system spans advice and legal opinion, contracts and transactions, litigation, arbitration and settlement, compliance and governance, digital and data law, and enforcement and recovery.",
      "The firm is led by Turki AlNaif, a licensed lawyer and legal trainer, an accredited arbitrator at the Saudi Bar Association Settlement and Arbitration Centre, an accredited expert on the Ministry of Justice's Khebra platform, and an accredited franchise broker with Monsha'at.",
      "We put the client experience first: agreeing the scope and deliverables at the outset, keeping you informed on your file through the client portal, and delivering work that can be read, reviewed and applied. We work within the Kingdom's laws and in line with Vision 2030's aim of a clearer, more transparent business environment.",
    ],
    pillars: [
      { k: "Precision", v: "in analysis and drafting" },
      { k: "Clarity", v: "in scope and deliverables" },
      { k: "Follow-through", v: "until the effect is complete" },
    ],
  },
};

const icons = [Target, Eye, Route];

/** The reading text — who the firm is, how it works, who leads it — and three working principles. No headline of its own: it reads straight on from the facts panel above it. */
export default function Overview({ locale }: { locale: "ar" | "en" }) {
  const t = copy[locale];
  const [first, ...rest] = t.paragraphs;
  return (
    <div className="relative py-20 md:py-28">
      <div className="relative mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="mx-auto max-w-5xl">
            <p className="font-display text-lg font-bold leading-[2.1] text-ink md:text-2xl md:leading-[2.1]">{first}</p>
            <div className="mt-8 gap-14 border-t border-gold/35 pt-8 text-[15px] leading-[2.15] text-ink-soft md:columns-2 md:[column-rule:1px_solid_rgba(208,167,81,0.35)]">
              {rest.map((p) => (
                <p key={p.slice(0, 24)} className="mb-5 break-inside-avoid-column">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {t.pillars.map((p, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={p.k} delay={i * 90}>
                <div className="glass-card flex h-full flex-col items-center rounded-3xl px-6 py-8 text-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-[#0a1626] text-[#e6c988] ring-1 ring-gold/60">
                    <Icon className="h-6 w-6" strokeWidth={1.6} />
                  </span>
                  <h3 className="font-display mt-4 text-2xl font-bold text-ink">{p.k}</h3>
                  <p className="mt-1 text-sm text-ink-soft/80">{p.v}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
