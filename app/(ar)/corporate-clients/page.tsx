import PageHero from "@/components/PageHero";
import type { Metadata } from "next";
import MatterBriefCTA from "@/components/MatterBriefCTA";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import TiltCard from "@/components/TiltCard";
import { corePillars } from "@/lib/site";

export const metadata: Metadata = {
  title: "العمل مع الشركات",
  description: "كيف نعمل مع الشركات والمؤسسات: نماذج التعاقد، وزمن الرد، والسرية، وفحص تعارض المصالح، وآلية التقارير.",
  alternates: { canonical: "/corporate-clients", languages: { ar: "/corporate-clients", en: "/en/corporate-clients" } },
  openGraph: {
    title: "العمل مع الشركات",
    description: "كيف نعمل مع الشركات والمؤسسات: نماذج التعاقد، وزمن الرد، والسرية، وفحص تعارض المصالح، وآلية التقارير.",
    images: [{ url: "/brand/riyadh-kafd.jpg" }],
  },
  twitter: { card: "summary_large_image" },
};

const models = [
  { tag: "مسألة محددة", title: "تكليف بنطاق ومخرجات محددة", body: "تكليف بنطاق ومخرجات متفق عليها: رأي قانوني، أو صياغة عقد، أو صفقة، أو تمثيل في نزاع. يُتفق على المطلوب والمخرجات والافتراضات قبل بدء العمل." },
  { tag: "اتفاق مستمر", title: "علاقة قانونية متصلة", body: "علاقة قانونية قائمة تغطي احتياجات المنشأة المتكررة: الاستشارات، ومراجعة العقود، ودعم قرارات الإدارة، بنطاق وآلية عمل متفق عليهما مسبقًا." },
];

const commitments = [
  { title: "زمن الرد", body: "نرد على الطلبات الجديدة وموجزات المسائل خلال يوم عمل واحد." },
  { title: "السرية", body: "تداول المعلومات بقدر الحاجة المهنية، وما تفصحون عنه لنا يبقى سريًا." },
  { title: "فحص تعارض المصالح", body: "قبل قبول أي تكليف نفحص أي تعارض محتمل مع عملائنا الحاليين." },
  { title: "آلية التقارير", body: "تحديث عند نقاط القرار لا عند السؤال فقط، مع ملخص مكتوب للحالة والخطوات التالية في المسائل الممتدة، وتقارير دورية في الاتفاقات المستمرة." },
];

const steps = [
  { n: "1", title: "أرسل موجز المسألة", body: "الأطراف والوقائع الأساسية والهدف، ونبذة مختصرة تكفي." },
  { n: "2", title: "نراجع ونرد", body: "نفحص تعارض المصالح ونرد خلال يوم عمل واحد." },
  { n: "3", title: "نتفق على النطاق", body: "يُتفق على النطاق والمخرجات والافتراضات قبل بدء العمل." },
];

export default function CorporateClientsPage() {
  return (
    <div>
            <PageHero photo="/brand/riyadh-kafd.jpg" focus="center 30%">
          <div className="relative px-6 py-14 text-center md:px-16 md:py-20">
            <SectionHeading eyebrow="Corporate Clients" title="العمل مع الشركات" tone="onDark" />
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/85">نموذجان واضحان للتعاقد والتزامات نعلنها منذ البداية، ليعرف فريقكم القانوني وإدارتكم ما يتوقعونه من أول تواصل.</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <MatterBriefCTA locale="ar" matterTypes={corePillars.map((s) => s.title)} tone="onDark" />
            </div>
          </div>
      </PageHero>

      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-5">
          <Reveal>
            <SectionHeading number="01" eyebrow="Engagement Models" title="كيف نتعاقد" tone="onLight" />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {models.map((m, i) => (
              <Reveal key={m.tag} delay={i * 90}>
                <TiltCard className="h-full rounded-2xl" maxTilt={6}>
                  <div className="glass-card flex h-full flex-col items-center rounded-2xl p-8 text-center">
                    <span className="glass-card rounded-full px-4 py-1 text-xs font-semibold text-gold-deep">{m.tag}</span>
                    <h3 className="font-display mt-4 text-lg font-bold text-ink">{m.title}</h3>
                    <p className="mt-3 text-sm leading-8 text-ink-soft/85">{m.body}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-5">
          <Reveal>
            <SectionHeading number="02" eyebrow="Our Commitments" title="ما يمكنكم الاعتماد عليه" tone="onLight" />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {commitments.map((c, i) => (
              <Reveal key={c.title} delay={(i % 2) * 80}>
                <div className="glass-card flex h-full flex-col items-center rounded-2xl p-7 text-center">
                  <h3 className="font-display text-base font-bold text-ink">{c.title}</h3>
                  <p className="mt-2 text-sm leading-8 text-ink-soft/85">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-5">
          <Reveal>
            <SectionHeading number="03" eyebrow="Getting Started" title="كيف تبدأ العلاقة" tone="onLight" />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 90}>
                <div className="glass-card flex h-full flex-col items-center rounded-2xl p-7 text-center">
                  <span className="glass-number-light font-display text-5xl font-extrabold leading-none">{s.n}</span>
                  <h3 className="font-display mt-4 text-base font-bold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-ink-soft/80">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper pb-20">
        <p className="mx-auto max-w-lg px-5 text-center text-xs leading-6 text-ink-soft/60">إرسال الموجز لا ينشئ علاقة محاماة (محامٍ–موكل) إلا بعد قبول المكتب للتكليف رسميًا.</p>
      </section>
    </div>
  );
}
