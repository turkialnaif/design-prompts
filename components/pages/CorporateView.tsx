import ArrowButton from "@/components/ArrowButton";
import MatterBriefCTA from "@/components/MatterBriefCTA";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Band, BandHead, HeroHead, Numbered, RowList, Wrap } from "@/components/ui";
import { corePillars, firm } from "@/lib/site";

const modelsAr = [
  { tag: "مسألة محددة", title: "تكليف بنطاق ومخرجات محددة", body: "تكليف بنطاق ومخرجات متفق عليها: رأي قانوني، أو صياغة عقد، أو صفقة، أو تمثيل في نزاع. يُتفق على المطلوب والمخرجات والافتراضات قبل بدء العمل." },
  { tag: "اتفاق مستمر", title: "علاقة قانونية متصلة", body: "علاقة قانونية قائمة تغطي احتياجات المنشأة المتكررة: الاستشارات، ومراجعة العقود، ودعم قرارات الإدارة، بنطاق وآلية عمل متفق عليهما مسبقًا." },
];

const commitmentsAr = [
  { title: "زمن الرد", body: "نرد على الطلبات الجديدة وموجزات المسائل خلال يوم عمل واحد." },
  { title: "السرية", body: "تداول المعلومات بقدر الحاجة المهنية، وما تفصحون عنه لنا يبقى سريًا." },
  { title: "فحص تعارض المصالح", body: "قبل قبول أي تكليف نفحص أي تعارض محتمل مع عملائنا الحاليين." },
  { title: "آلية التقارير", body: "تحديث عند نقاط القرار لا عند السؤال فقط، مع ملخص مكتوب للحالة والخطوات التالية في المسائل الممتدة، وتقارير دورية في الاتفاقات المستمرة." },
];

const stepsAr = [
  { n: "1", title: "أرسل موجز المسألة", body: "الأطراف والوقائع الأساسية والهدف، ونبذة مختصرة تكفي." },
  { n: "2", title: "نراجع ونرد", body: "نفحص تعارض المصالح ونرد خلال يوم عمل واحد." },
  { n: "3", title: "نتفق على النطاق", body: "يُتفق على النطاق والمخرجات والافتراضات قبل بدء العمل." },
];

const modelsEn = [
  { tag: "Matter-based", title: "A defined matter", body: "An engagement with an agreed scope and deliverables: a legal opinion, a contract, a transaction, or representation in a dispute. The ask, the deliverables, and the assumptions are agreed before work begins." },
  { tag: "Ongoing arrangement", title: "A continuing relationship", body: "A standing legal relationship for the organization’s recurring needs: advisory, contract review, and support for management decisions, on a scope and working method agreed in advance." },
];

const commitmentsEn = [
  { title: "Response time", body: "We respond to new requests and matter briefs within one business day." },
  { title: "Confidentiality", body: "Information is shared strictly on a professional need-to-know basis, and what you disclose to us stays confidential." },
  { title: "Conflict check", body: "Before accepting any engagement we check for any potential conflict with our existing clients." },
  { title: "Reporting", body: "Updates at decision points, not only when asked; a written summary of status and next steps on longer matters, and periodic reporting in ongoing arrangements." },
];

const stepsEn = [
  { n: "1", title: "Send a matter brief", body: "The parties, the key facts, and the goal — a short summary is enough." },
  { n: "2", title: "We review and respond", body: "We check for conflicts and respond within one business day." },
  { n: "3", title: "We agree the scope", body: "The scope, deliverables, and assumptions are agreed before work starts." },
];


const ui = {
  ar: {
    eyebrow: "Corporate Clients",
    title: "العمل مع الشركات",
    lead: "نموذجان واضحان للتعاقد والتزامات نعلنها منذ البداية، ليعرف فريقكم القانوني وإدارتكم ما يتوقعونه من أول تواصل.",
    models: { number: "01", eyebrow: "Engagement Models", title: "كيف نتعاقد" },
    commitments: { number: "02", eyebrow: "Our Commitments", title: "ما يمكنكم الاعتماد عليه" },
    steps: { number: "03", eyebrow: "Getting Started", title: "كيف تبدأ العلاقة" },
    note: "إرسال الموجز لا ينشئ علاقة محاماة (محامٍ–موكل) إلا بعد قبول المكتب للتكليف رسميًا.",
    book: "احجز استشارة أولية",
  },
  en: {
    eyebrow: "Corporate Clients",
    title: "Working With Corporate Clients",
    lead: "Two clear engagement models and commitments we state upfront, so your legal team and management know what to expect from the first contact.",
    models: { number: "01", eyebrow: "Engagement Models", title: "How we engage" },
    commitments: { number: "02", eyebrow: "Our Commitments", title: "What you can rely on" },
    steps: { number: "03", eyebrow: "Getting Started", title: "How the relationship starts" },
    note: "Submitting a brief does not create a lawyer–client relationship until the firm formally accepts the engagement.",
    book: "Book an Initial Consultation",
  },
};

export default function CorporateView({ locale }: { locale: "ar" | "en" }) {
  const t = ui[locale];
  const ar = locale === "ar";
  const models = ar ? modelsAr : modelsEn;
  const commitments = ar ? commitmentsAr : commitmentsEn;
  const steps = ar ? stepsAr : stepsEn;
  return (
    <div>
      <PageHero>
        <HeroHead eyebrow={t.eyebrow} title={t.title} lead={t.lead}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <ArrowButton href={firm.whatsapp} external ltr={!ar}>{t.book}</ArrowButton>
            <MatterBriefCTA locale={locale} matterTypes={corePillars.map((s) => (ar ? s.title : s.titleEn))} tone="onDark" />
          </div>
        </HeroHead>
      </PageHero>

      <Band tone="white">
        <Wrap max="5xl">
          <BandHead {...t.models} />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {models.map((m, i) => (
              <Reveal key={m.tag} delay={i * 90} className="h-full">
                <div className="glass-card h-full rounded-3xl p-8 md:p-10">
                  <span className="chamfer-btn inline-block bg-[#f4f5fe] px-4 py-1 text-xs text-[#012696]">{m.tag}</span>
                  <h3 className="font-display mt-5 text-3xl font-light text-[#00124a]">{m.title}</h3>
                  <p className="mt-4 text-[15px] font-light leading-8 text-ink-soft">{m.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </Band>

      <Band tone="dark">
        <Wrap max="5xl">
          <BandHead {...t.commitments} tone="onDark" />
          <div className="mt-14">
            <RowList tone="dark" items={commitments.map((c) => ({ title: c.title, text: c.body }))} />
          </div>
        </Wrap>
      </Band>

      <Band tone="tint">
        <Wrap max="6xl">
          <BandHead {...t.steps} />
          <div className="mt-14">
            <Numbered items={steps.map((s) => ({ title: s.title, text: s.body }))} />
          </div>
          <p className="mx-auto mt-14 max-w-lg text-center text-xs leading-6 text-ink-soft/70">{t.note}</p>
        </Wrap>
      </Band>
    </div>
  );
}
