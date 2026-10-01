import PageHero from "@/components/PageHero";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ArrowButton from "@/components/ArrowButton";
import MatterBriefCTA from "@/components/MatterBriefCTA";
import Reveal from "@/components/Reveal";
import CornerField from "@/components/CornerField";
import SectionHeading from "@/components/SectionHeading";
import TiltCard from "@/components/TiltCard";
import { attorneys, corePillars, firm, matterMethod, serviceStandard } from "@/lib/site";

export const metadata: Metadata = {
  title: "من نحن",
  description: `${firm.nameAr} — شريك قانوني يربط الحُكم المهني بسياق الأعمال، في الرياض، المملكة العربية السعودية.`,
  alternates: { canonical: "/about", languages: { ar: "/about", en: "/en/about" } },
  openGraph: {
    title: "من نحن",
    description: `${firm.nameAr} — شريك قانوني يربط الحُكم المهني بسياق الأعمال، في الرياض، المملكة العربية السعودية.`,
    images: [{ url: "/brand/attorney-turki.jpg" }],
  },
  twitter: { card: "summary_large_image" },
};

const principles = [
  { n: "1", title: "نفهم السياق وتفاصيل العمل", body: "يبدأ العمل من قراءة الوقائع والمخاطر والهدف التجاري." },
  { n: "2", title: "نبني الموقف القانوني", body: "نربط النص النظامي بالحجة والدليل والنتيجة المتوقعة." },
  { n: "3", title: "نواصل إلى ما بعد التنفيذ", body: "نهتم بما بعد: الرأي أو الحكم أو الإجراء أو المدد أو المخاطر." },
];
const standard = serviceStandard;
const leader = { name: attorneys[0].name, role: attorneys[0].role, href: `/team/${attorneys[0].slug}`, lead: attorneys[0].bio[0] };
const stepTitle = (s: (typeof matterMethod)[number]) => s.titleAr;
const stepSub = (s: (typeof matterMethod)[number]) => s.title;

export default function AboutPage() {
  const facts = [
    { label: "رخصة المحاماة", value: firm.licenseNumber },
    { label: "المقر", value: "الرياض، المملكة العربية السعودية" },
    { label: "السجل الموحد", value: firm.unifiedNumber },
  ];

  return (
    <div>
            <PageHero photo="/brand/riyadh-kafd.jpg" focus="center 40%">
          <div className="relative flex flex-col items-center px-6 py-14 text-center md:px-16 md:py-20">
            <Image src="/brand/logo-mark.png" alt="" width={44} height={35} className="mb-4" />
            <SectionHeading eyebrow="Who We Are" title="من نحن" tone="onDark" />
            <p className="font-display mt-8 max-w-2xl text-xl font-bold leading-10 text-white md:text-2xl">شريك قانوني يربط الحُكم المهني بسياق الأعمال</p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/85">{`يقدّم ${firm.nameShortAr} للمحاماة والاستشارات القانونية خدمات قانونية مركّزة للمسائل التي تتطلب دقة في التحليل، وجودة في الصياغة، وانضباطًا في إدارة الملف حتى الوصول إلى أثر عملي.`}</p>

            <div className="mt-8 grid w-full max-w-2xl gap-3 sm:grid-cols-3">
              {facts.map((f) => (
                <div key={f.label} className="border border-white/25 bg-white/10 flex flex-col items-center justify-center rounded-2xl px-3 py-4 text-center">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-white/70">{f.label}</span>
                  <span className="mt-1 text-sm font-bold text-white">{f.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <ArrowButton href={firm.whatsapp} external>
                احجز استشارة أولية
              </ArrowButton>
              <MatterBriefCTA locale="ar" matterTypes={corePillars.map((s) => s.title)} tone="onDark" />
            </div>
          </div>
      </PageHero>

      <div className="relative isolate overflow-hidden">
        <CornerField tone="gold" corner="tr" opacity={0.1} size={150} className="absolute -top-6 -right-6 h-[24rem] w-[30rem] md:h-[28rem] md:w-[36rem]" />
        <CornerField tone="gold" corner="bl" opacity={0.08} size={150} className="absolute -bottom-6 -left-6 h-[22rem] w-[28rem] md:h-[26rem] md:w-[32rem]" />

      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-5">
          <Reveal>
            <SectionHeading number="01" eyebrow="Principles" title="كيف نفكّر" tone="onLight" />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal key={p.n} delay={i * 90}>
                <TiltCard className="h-full rounded-2xl" maxTilt={6}>
                  <div className="glass-card flex h-full flex-col items-center rounded-2xl p-7 text-center">
                    <span className="glass-number-light font-display text-5xl font-extrabold leading-none">{p.n}</span>
                    <h3 className="font-display mt-4 text-base font-bold text-ink">{p.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-ink-soft/80">{p.body}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <SectionHeading number="02" eyebrow="The Matter Method" title="منهجنا في إدارة المسألة" tone="onLight" />
            <p className="mx-auto mt-6 max-w-xl text-center text-sm leading-7 text-ink-soft/80">
              نظام عمل مختصر وقابل للتكرار يمنح العميل رؤية واضحة لمسار التكليف.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {matterMethod.map((step, i) => (
              <Reveal key={step.step} delay={(i % 3) * 70}>
                <TiltCard className="h-full rounded-2xl" maxTilt={8}>
                  <div className="glass-card flex h-full flex-col items-center justify-center rounded-2xl p-6 text-center">
                    <span className="glass-number-light font-display text-4xl font-extrabold leading-none">{step.step}</span>
                    <h3 className="font-display mt-3 text-sm font-bold text-ink">{stepTitle(step)}</h3>
                    <p className="gold-eyebrow mt-1 text-[10px]">{stepSub(step)}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-5">
          <Reveal>
            <SectionHeading number="03" eyebrow="Leadership" title="القيادة المهنية" tone="onLight" />
          </Reveal>
          <Reveal>
            <Link
              href={leader.href}
              className="group glass-card mt-12 grid items-center gap-6 rounded-3xl p-6 text-center transition-transform duration-300 hover:-translate-y-1 md:grid-cols-[14rem_1fr] md:p-8"
            >
              <div className="relative mx-auto aspect-[4/5] w-44 overflow-hidden rounded-2xl ring-1 ring-white/90 shadow-[0_24px_50px_-24px_rgba(120,90,30,0.55)] md:w-full">
                <Image src="/brand/attorney-turki.jpg" alt={leader.name} fill sizes="224px" className="object-cover object-top" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-ink">{leader.name}</h3>
                <p className="mt-1 text-sm font-medium text-gold-deep">{leader.role}</p>
                <p className="mx-auto mt-4 max-w-xl text-sm leading-8 text-ink-soft/85">{leader.lead}</p>
                <span className="mt-5 inline-block text-sm font-semibold text-gold-deep opacity-0 transition-opacity group-hover:opacity-100">
                  الملف الشخصي ←
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <SectionHeading number="04" eyebrow="Service Standard" title="معيار الخدمة" tone="onLight" />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {standard.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 80}>
                <TiltCard className="h-full rounded-2xl" maxTilt={6}>
                  <div className="glass-card flex h-full flex-col items-center justify-center rounded-2xl p-6 text-center">
                    <h3 className="font-display text-base font-bold text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-ink-soft/80">{item.description}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      </div>
    </div>
  );
}
