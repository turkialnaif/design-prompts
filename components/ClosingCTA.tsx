import { Mail, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import ArrowButton from "@/components/ArrowButton";
import MatterBriefCTA from "@/components/MatterBriefCTA";
import OpenStatus from "@/components/OpenStatus";
import { corePillars, firm } from "@/lib/site";

const copy = {
  ar: {
    eyebrow: "ابدأ مسألتك",
    title: "هل لديك مسألة قانونية تحتاج رأيًا دقيقًا؟",
    body: "تواصل معنا وسنحدد معك نطاق العمل والمخرجات منذ البداية.",
    whatsapp: "تواصل عبر واتساب",
    call: "اتصل بنا",
    chips: ["رد خلال يوم عمل", "سرية مهنية", `رخصة مزاولة المحاماة رقم ${firm.licenseNumber}`],
    stepsTitle: "كيف نبدأ",
    steps: [
      { t: "أرسل موجز مسألتك", d: "الأطراف، والوقائع الأساسية، والهدف المطلوب." },
      { t: "نحدد النطاق والمخرجات", d: "نرد خلال يوم عمل واحد باقتراح واضح لما سنقدّمه." },
      { t: "نبدأ العمل", d: "برأي أو صياغة أو تفاوض أو ترافع، بحسب المسألة." },
    ],
    types: corePillars.map((s) => s.title),
    mail: "راسلنا",
  },
  en: {
    eyebrow: "Start your matter",
    title: "Have a legal matter that needs a precise opinion?",
    body: "Get in touch and we'll scope the work and the deliverables from day one.",
    whatsapp: "Message on WhatsApp",
    call: "Call us",
    chips: ["Reply within one business day", "Professional confidentiality", `Law Practice Licence No. ${firm.licenseNumber}`],
    stepsTitle: "How we start",
    steps: [
      { t: "Send a short brief", d: "The parties, the key facts and the goal." },
      { t: "We scope the work", d: "Within one business day, with a clear proposal of what we will deliver." },
      { t: "We begin", d: "An opinion, a draft, a negotiation or a hearing, as the matter requires." },
    ],
    types: corePillars.map((s) => s.titleEn),
    mail: "Email us",
  },
};

const pill =
  "inline-flex min-h-11 items-center gap-2 chamfer-btn border border-white/30 px-6 py-3 text-sm font-normal text-white transition-colors hover:bg-white/10";

/**
 * The closing call to action at the foot of every page: the headline and the three ways to start on one side, and on the other a
 * glass panel with whether the office is open right now and the first three steps. The light behind it drifts slowly (CSS only).
 */
export default function ClosingCTA({ locale }: { locale: "ar" | "en" }) {
  const t = copy[locale];
  const ar = locale === "ar";
  return (
    <div data-footer-cta className="mx-auto max-w-7xl px-5">
      <div className="cta-stage chamfer-lg relative isolate overflow-hidden border border-white/12 bg-[linear-gradient(120deg,#00164f_0%,#000d33_62%,#00061d_100%)]">
        <div aria-hidden className="cta-aurora cta-aurora-a pointer-events-none absolute -top-1/3 end-[-10%] -z-10 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(40,84,220,0.4),transparent)]" />
        <div aria-hidden className="cta-aurora cta-aurora-b pointer-events-none absolute -bottom-1/2 start-[-8%] -z-10 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,rgba(224,179,90,0.22),transparent)]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-50 [background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1.2px)] [background-size:30px_30px] [mask-image:radial-gradient(ellipse_80%_80%_at_70%_30%,#000,transparent_75%)]" />
        <Image src="/brand/logo-mark.png" alt={ar ? "شعار تركي النايف وشركاؤه" : "Turki Alnaif & Partners mark"} width={512} height={420} aria-hidden className="pointer-events-none absolute -bottom-10 start-[-3rem] -z-10 w-72 opacity-[0.06] md:w-[26rem]" />
        <span aria-hidden className="cta-sweep absolute inset-x-0 top-0 h-px" />

        <div className="relative grid gap-10 p-7 md:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14 lg:p-16">
          <div className="text-center lg:text-start">
            <p className="gold-eyebrow !text-[#f6e2b3] text-xs md:text-sm">{t.eyebrow}</p>
            <h2 className="font-display grad-text mt-4 text-4xl leading-[1.3] sm:text-5xl md:text-6xl">{t.title}</h2>
            <p className="mx-auto mt-5 max-w-xl text-base font-light leading-8 text-white/80 md:text-lg lg:mx-0">{t.body}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <ArrowButton href={firm.whatsapp} external ltr={!ar}>
                {t.whatsapp}
              </ArrowButton>
              <MatterBriefCTA locale={locale} matterTypes={t.types} tone="onDark" />
              <a href={`tel:${firm.phone}`} className={pill}>
                <Phone className="h-4 w-4 text-[#f6e2b3]" aria-hidden />
                {t.call}
              </a>
            </div>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-light text-white/70 lg:justify-start">
              {t.chips.map((c) => (
                <li key={c} className="flex items-center gap-2">
                  <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-[#e0b35a]" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="chamfer-lg border border-white/12 bg-white/[0.06] p-6 backdrop-blur-xl md:p-8">
            <OpenStatus locale={locale} />
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#f6e2b3]">{t.stepsTitle}</p>
            <ol className="mt-5 space-y-6">
              {t.steps.map((s, i) => (
                <li key={s.t} className="relative flex gap-4">
                  {i < t.steps.length - 1 && <span aria-hidden className="absolute start-[1.1rem] top-10 -bottom-6 w-px bg-gradient-to-b from-[#e0b35a]/60 to-transparent" />}
                  <span className="font-display flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#e0b35a]/60 text-sm text-[#f6e2b3]">{i + 1}</span>
                  <div>
                    <p className="text-base font-normal text-white">{s.t}</p>
                    <p className="mt-1 text-sm font-light leading-7 text-white/70">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-1 border-t border-white/12 pt-5 text-sm text-white/80" dir="ltr">
              <a href={firm.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:text-[#f6e2b3]">
                <MessageCircle className="h-4 w-4 text-[#f6e2b3]" aria-hidden />
                {firm.phoneDisplay}
              </a>
              <a href={`mailto:${firm.email}`} className="inline-flex min-h-11 items-center gap-2 hover:text-[#f6e2b3]">
                <Mail className="h-4 w-4 text-[#f6e2b3]" aria-hidden />
                {firm.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
