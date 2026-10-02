import PageHero from "@/components/PageHero";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArrowButton from "@/components/ArrowButton";
import MatterBriefCTA from "@/components/MatterBriefCTA";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import TiltCard from "@/components/TiltCard";
import { attorneys, corePillars, firm } from "@/lib/site";

const attorneyPhotos: Record<string, string> = {
  "turki-alnayef": "/brand/attorney-turki.jpg",
};

export function generateStaticParams() {
  return attorneys.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const attorney = attorneys.find((a) => a.slug === slug);
  if (!attorney) return {};

  const photo = attorneyPhotos[slug];
  return {
    title: attorney.seoTitle,
    description: attorney.metaDescription,
    alternates: { canonical: `/team/${slug}`, languages: { ar: `/team/${slug}`, en: `/en/team/${slug}` } },
    openGraph: {
      type: "profile",
      title: attorney.seoTitle,
      description: attorney.metaDescription,
      images: photo ? [{ url: photo }] : [{ url: "/brand/riyadh-kafd.jpg" }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function AttorneyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const attorney = attorneys.find((a) => a.slug === slug);
  if (!attorney) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: attorney.name,
    alternateName: attorney.nameEn,
    jobTitle: attorney.role,
    worksFor: { "@type": "Organization", name: firm.nameShortAr },
    knowsAbout: attorney.practiceAreas.map((p) => p.label),
    url: `${firm.website}/team/${attorney.slug}`,
  };

  const [lead, ...restBio] = attorney.bio;
  const facts = [
    { label: "رخصة المحاماة", value: firm.licenseNumber },
    { label: "المقر", value: "الرياض، المملكة العربية السعودية" },
    { label: "العضوية", value: "الهيئة السعودية للمحامين" },
  ];

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <PageHero photo="/brand/riyadh-kafd.jpg" focus="center 45%" wide mark={false}>
          <div className="relative grid items-center gap-10 p-6 md:grid-cols-[0.8fr_1.2fr] md:p-12">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl shadow-[0_30px_60px_-25px_rgba(120,90,30,0.55)] ring-1 ring-white/90">
              {attorneyPhotos[attorney.slug] ? (
                <Image
                  src={attorneyPhotos[attorney.slug]}
                  alt={attorney.name}
                  fill
                  sizes="(min-width: 768px) 30vw, 90vw"
                  className="object-cover object-top"
                  priority
                />
              ) : (
                <div className="h-full w-full bg-ink" />
              )}
            </div>

            <div className="text-center">
              <SectionHeading as="h1" eyebrow={attorney.role} title={attorney.name} tone="onDark" />
              <p className="mx-auto mt-8 max-w-2xl text-lg font-medium leading-9 text-white">{lead}</p>
              <div className="mx-auto mt-5 max-w-2xl space-y-4">
                {restBio.map((paragraph, i) => (
                  <p key={i} className="text-base leading-8 text-white/85">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
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
          </div>
      </PageHero>

      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-5">
          <Reveal>
            <SectionHeading number="01" eyebrow="Professional Experience" title="الخبرة المهنية" tone="onLight" />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {attorney.experience.map((item, i) => (
              <Reveal key={item.title} delay={(i % 2) * 90}>
                <TiltCard className="h-full rounded-2xl">
                  <Link
                    href={item.href}
                    className="group flex h-full flex-col items-center rounded-2xl text-center glass-card p-7 transition-transform duration-300 hover:-translate-y-1"
                  >
                    <h3 className="font-display text-base font-bold text-ink">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-ink-soft/80">{item.description}</p>
                    <span className="mt-4 inline-block text-sm font-semibold text-gold-deep opacity-0 transition-opacity group-hover:opacity-100">
                      اقرأ المزيد ←
                    </span>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-5">
          <Reveal>
            <SectionHeading number="02" eyebrow="Credentials" title="الاعتمادات المهنية" tone="onLight" />
          </Reveal>
          <div className="mt-12 flex flex-wrap justify-center gap-5">
            {attorney.credentials.map((c, i) => (
              <Reveal key={c.title} delay={(i % 4) * 80} className="block w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(25%-0.9375rem)]">
                <TiltCard className="h-full rounded-2xl" maxTilt={7}>
                  <div className="flex h-full min-h-[9.5rem] flex-col items-center justify-center rounded-2xl text-center glass-card p-6">
                    <h3 className="font-display text-sm font-bold text-ink">{c.title}</h3>
                    <p className="mt-2 text-xs leading-6 text-ink-soft/70">{c.body}</p>
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
            <SectionHeading number="03" eyebrow="Approach" title="منهجه في العمل" tone="onLight" />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {attorney.approach.map((p, i) => (
              <Reveal key={i} delay={i * 90}>
                <TiltCard className="h-full rounded-2xl" maxTilt={6}>
                  <div className="glass-card flex h-full flex-col items-center rounded-2xl p-7 text-center">
                    <span className="glass-number-light font-display text-5xl font-extrabold leading-none">{i + 1}</span>
                    <p className="mt-4 text-sm leading-8 text-ink-soft/85">{p}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="glass-card mx-auto mt-8 max-w-3xl rounded-2xl p-6 text-center">
              <p className="text-sm leading-8 text-ink-soft/90">{attorney.hoursNote}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-5">
          <Reveal>
            <SectionHeading number="04" eyebrow="Practice Areas" title="مجالات الممارسة" tone="onLight" />
          </Reveal>
          <ul className="mt-12 flex flex-wrap justify-center gap-3">
            {attorney.practiceAreas.map((p) => (
              <li key={p.label}>
                <Link
                  href={p.href}
                  className="glass-card inline-block chamfer-btn px-5 py-2.5 text-sm font-semibold text-ink-soft transition-transform duration-300 hover:-translate-y-0.5 hover:text-gold-deep"
                >
                  {p.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/services"
                className="inline-block chamfer-btn border border-dashed border-gold/50 px-5 py-2.5 text-sm font-semibold text-ink-soft/60 transition-colors hover:text-gold-deep"
              >
                مجالات أخرى بحسب طبيعة التكليف
              </Link>
            </li>
          </ul>
        </div>
      </section>

    </div>
  );
}
