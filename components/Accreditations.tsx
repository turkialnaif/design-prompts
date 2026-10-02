import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { attorneys } from "@/lib/site";
import { attorneyEn } from "@/lib/site.en";
import { accreditations, type Accreditation } from "@/lib/accreditations";

const copy = {
  ar: {
    title: "الاعتمادات والتراخيص",
    intro: "تراخيص واعتمادات رسمية في الترافع والاستشارة والتحكيم.",
  },
  en: {
    title: "Accreditations & Licences",
    intro: "Official licences and accreditations in advocacy, advice and arbitration.",
  },
};

function Card({ a, locale, index }: { a: Accreditation; locale: "ar" | "en"; index: number }) {
  const c = a[locale];
  return (
    <Reveal delay={(index % 5) * 60} className="h-full">
      <div
        title={c.body}
        className="group flex h-full flex-col items-center rounded-2xl border border-white/35 bg-[linear-gradient(140deg,rgba(255,255,255,0.2),rgba(255,255,255,0.06))] px-3.5 pb-4 pt-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#f6e2b3]/70 hover:bg-white/20"
      >
        <div className="flex h-14 w-full items-center justify-center rounded-xl bg-white/90 px-3">
          {a.logos?.map((l) => (
            <Image key={l.src} src={l.src} alt="" width={l.width} height={l.height} className="max-h-9 w-auto max-w-full object-contain" unoptimized={l.src.endsWith(".svg")} />
          ))}
        </div>
        <h3 className="font-display mt-3 text-[13px] font-semibold leading-6 text-white">{c.title}</h3>
      </div>
    </Reveal>
  );
}

/** One full photograph of Riyadh behind the whole section; each accreditation is just a logo and a title on clear glass. */
export default function Accreditations({ locale }: { locale: "ar" | "en" }) {
  const t = copy[locale];
  const en = locale === "en";
  const lead = en ? attorneyEn : attorneys[0];
  const arbitration = accreditations.find((a) => a.key === "arbitration");
  const rest = accreditations.filter((a) => a.key !== "arbitration");
  return (
    <section data-glow className="relative isolate overflow-hidden bg-[#00061d] pb-40 pt-36 md:pb-52 md:pt-44">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_40%_at_50%_0%,rgba(30,70,200,0.24),transparent_70%),linear-gradient(180deg,#00061d_0%,#00124a_50%,#00061d_100%)]" />

      <div className="relative mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <SectionHeading title={t.title} eyebrow="Accreditations" lead={t.intro} tone="onDark" />
          <p className="mx-auto mt-5 inline-block chamfer-btn border border-[#f6e2b3]/50 bg-white/10 px-5 py-2 text-xs font-bold text-[#f6e2b3]">
            {accreditations.length} {en ? "accreditations and licences held" : "اعتمادًا وترخيصًا رسميًا"}
          </p>
        </Reveal>

        <div className="mx-auto mt-12 flex max-w-[58rem] flex-col items-center gap-3.5">
          <div className="w-[calc(50%-0.4rem)] sm:w-[calc(25%-0.65rem)] sm:min-w-[12rem]">{arbitration && <Card a={arbitration} locale={locale} index={0} />}</div>
          <div className="grid w-full grid-cols-2 gap-3.5 lg:grid-cols-4">
            {rest.slice(0, 4).map((a, i) => (
              <Card key={a.key} a={a} locale={locale} index={i + 1} />
            ))}
          </div>
          <div className="grid w-full grid-cols-2 gap-3.5 lg:grid-cols-4">
            {rest.slice(4).map((a, i) => (
              <Card key={a.key} a={a} locale={locale} index={i + 5} />
            ))}
          </div>
        </div>

        <Reveal delay={80}>
          <Link
            href={en ? `/en/team/${lead.slug}` : `/team/${lead.slug}`}
            className="group mx-auto mt-3.5 grid max-w-[58rem] items-center gap-6 rounded-3xl border border-white/35 bg-[linear-gradient(140deg,rgba(255,255,255,0.2),rgba(255,255,255,0.06))] p-6 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#f6e2b3]/70 md:grid-cols-[11rem_1fr] md:p-7"
          >
            <div className="relative mx-auto aspect-[4/5] w-36 overflow-hidden rounded-2xl ring-1 ring-white/60 md:w-full">
              <Image src="/brand/attorney-turki.jpg" alt={lead.name} fill sizes="176px" className="object-cover object-top" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f6e2b3]">{en ? "Leadership" : "القيادة المهنية"}</p>
              <h3 className="font-display mt-2 text-2xl font-bold text-white">{lead.name}</h3>
              <p className="mt-1 text-sm font-medium text-[#f6e2b3]">{lead.role}</p>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-8 text-white/80">{lead.bio[0]}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-[#f6e2b3] opacity-0 transition-opacity group-hover:opacity-100">
                {en ? "View profile →" : "الملف الشخصي ←"}
              </span>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
