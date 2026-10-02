import Image from "next/image";
import Link from "next/link";
import ArrowButton from "@/components/ArrowButton";
import MatterBriefCTA from "@/components/MatterBriefCTA";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Band, BandHead, HeroHead, Numbered, Wrap } from "@/components/ui";
import { corePillars, firm } from "@/lib/site";

export type Attorney = {
  slug: string;
  name: string;
  role: string;
  bio: string[];
  experience: { title: string; description: string; href: string }[];
  credentials: { title: string; body: string }[];
  approach: string[];
  hoursNote: string;
  practiceAreas: { label: string; href: string }[];
};

const photos: Record<string, string> = { "turki-alnayef": "/brand/attorney-turki.jpg" };

const ui = {
  ar: {
    facts: [
      { label: "رخصة المحاماة", value: firm.licenseNumber },
      { label: "المقر", value: "الرياض، المملكة العربية السعودية" },
      { label: "العضوية", value: "الهيئة السعودية للمحامين" },
    ],
    book: "احجز استشارة أولية",
    experience: { number: "01", eyebrow: "Professional Experience", title: "الخبرة المهنية" },
    credentials: { number: "02", eyebrow: "Credentials", title: "الاعتمادات المهنية" },
    approach: { number: "03", eyebrow: "Approach", title: "منهجه في العمل" },
    practice: { number: "04", eyebrow: "Practice Areas", title: "مجالات الممارسة" },
    more: "اقرأ المزيد ←",
    others: "مجالات أخرى بحسب طبيعة التكليف",
    servicesHref: "/services",
  },
  en: {
    facts: [
      { label: "License No.", value: firm.licenseNumber },
      { label: "Based in", value: "Riyadh, Saudi Arabia" },
      { label: "Membership", value: "Saudi Bar Association" },
    ],
    book: "Book an Initial Consultation",
    experience: { number: "01", eyebrow: "Professional Experience", title: "Professional Experience" },
    credentials: { number: "02", eyebrow: "Credentials", title: "Professional Credentials" },
    approach: { number: "03", eyebrow: "Approach", title: "His Approach" },
    practice: { number: "04", eyebrow: "Practice Areas", title: "Practice Areas" },
    more: "Read more →",
    others: "Other areas depending on the engagement",
    servicesHref: "/en/services",
  },
};

export default function TeamView({ attorney, locale }: { attorney: Attorney; locale: "ar" | "en" }) {
  const t = ui[locale];
  const ar = locale === "ar";
  const [lead, ...restBio] = attorney.bio;
  const photo = photos[attorney.slug];
  return (
    <div>
      <PageHero wide mark={false} panel>
        <div className="grid items-center gap-10 p-6 md:grid-cols-[0.8fr_1.2fr] md:p-12">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl">
            {photo ? (
              <Image src={photo} alt={attorney.name} fill sizes="(min-width: 768px) 30vw, 90vw" className="object-cover object-top" priority />
            ) : (
              <div className="h-full w-full bg-[#00124a]" />
            )}
          </div>
          <HeroHead eyebrow={attorney.role} title={attorney.name} lead={lead}>
            <div className="mx-auto mt-5 max-w-2xl space-y-4">
              {restBio.map((p, i) => (
                <p key={i} className="text-base font-light leading-8 text-white/75">{p}</p>
              ))}
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {t.facts.map((f) => (
                <div key={f.label} className="chamfer border border-white/12 bg-white/[0.06] px-3 py-4 text-center">
                  <span className="block text-xs font-light text-white/65">{f.label}</span>
                  <span className="mt-1 block text-sm text-white">{f.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <ArrowButton href={firm.whatsapp} external ltr={!ar}>{t.book}</ArrowButton>
              <MatterBriefCTA locale={locale} matterTypes={corePillars.map((s) => (ar ? s.title : s.titleEn))} tone="onDark" />
            </div>
          </HeroHead>
        </div>
      </PageHero>

      <Band tone="white">
        <Wrap max="5xl">
          <BandHead {...t.experience} />
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {attorney.experience.map((item, i) => (
              <Reveal key={item.title} delay={(i % 2) * 90} className="h-full">
                <Link href={item.href} className="group glass-card block h-full rounded-2xl p-7">
                  <h3 className="font-display text-2xl font-light text-[#00124a]">{item.title}</h3>
                  <p className="mt-3 text-[15px] font-light leading-8 text-ink-soft">{item.description}</p>
                  <span className="mt-4 inline-block text-sm text-[#012696] opacity-70 transition-opacity group-hover:opacity-100">{t.more}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </Band>

      <Band tone="dark">
        <Wrap max="6xl">
          <BandHead {...t.credentials} tone="onDark" />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {attorney.credentials.map((c, i) => (
              <Reveal key={c.title} delay={(i % 4) * 70} className="h-full">
                <div className="chamfer h-full border border-white/12 bg-white/[0.05] p-6 backdrop-blur-md">
                  <h3 className="font-display text-xl font-light text-white">{c.title}</h3>
                  <p className="mt-2 text-sm font-light leading-7 text-white/70">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </Band>

      <Band tone="tint">
        <Wrap max="6xl">
          <BandHead {...t.approach} />
          <div className="mt-14">
            <Numbered items={attorney.approach.map((text) => ({ text }))} />
          </div>
          <Reveal>
            <div className="glass-card mx-auto mt-10 max-w-3xl rounded-2xl p-6 text-center">
              <p className="text-[15px] font-light leading-8 text-ink-soft">{attorney.hoursNote}</p>
            </div>
          </Reveal>
        </Wrap>
      </Band>

      <Band tone="white">
        <Wrap max="5xl">
          <BandHead {...t.practice} />
          <Reveal>
            <ul className="mt-12 flex flex-wrap justify-center gap-3">
              {attorney.practiceAreas.map((p) => (
                <li key={p.label}>
                  <Link href={p.href} className="chamfer-btn inline-block border border-[#00124a]/20 px-5 py-2.5 text-sm font-light text-[#00124a] transition-colors hover:border-[#e0b35a] hover:bg-[#f4f5fe]">
                    {p.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={t.servicesHref} className="chamfer-btn inline-block border border-dashed border-[#e0b35a]/60 px-5 py-2.5 text-sm font-light text-ink-soft/70 transition-colors hover:text-[#012696]">
                  {t.others}
                </Link>
              </li>
            </ul>
          </Reveal>
        </Wrap>
      </Band>
    </div>
  );
}
