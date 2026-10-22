import { Mail, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import ArrowButton from "@/components/ArrowButton";
import MatterBriefCTA from "@/components/MatterBriefCTA";
import NewsletterSignup from "@/components/NewsletterSignup";
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
    mail: "راسلنا",
    subscribeTitle: "التنبيهات القانونية",
    subscribeBody: "رسالة موجزة عند نشر مقال جديد أو صدور تعديل نظامي يهم منشأتك.",
    source: "footer",
    seal: "TURKI ALNAIF & PARTNERS · LAWYERS & LEGAL CONSULTANTS · RIYADH · ",
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
    mail: "Email us",
    subscribeTitle: "Legal alerts",
    subscribeBody: "A short note when we publish a new article or a regulatory change affects your business.",
    source: "footer-en",
    seal: "TURKI ALNAIF & PARTNERS · LAWYERS & LEGAL CONSULTANTS · RIYADH · ",
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
  const types = corePillars.map((x) => (ar ? x.title : x.titleEn));
  return (
    <div data-footer-cta className="relative mx-auto max-w-7xl px-5">
      {/* the passage: a gold thread comes down out of the blog band above and lands on this panel */}
      <span aria-hidden className="pointer-events-none absolute -top-28 start-1/2 h-28 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#e0b35a]/45 to-[#e0b35a] md:-top-36 md:h-36" />
      <span aria-hidden className="pointer-events-none absolute -top-1 start-1/2 z-20 h-2.5 w-2.5 -translate-x-1/2 rotate-45 bg-[#e0b35a] shadow-[0_0_0_5px_#00061d,0_0_22px_3px_rgba(224,179,90,0.65)]" />

      <div className="cta-stage chamfer-lg relative isolate overflow-hidden border border-white/12 bg-[linear-gradient(120deg,#00164f_0%,#000d33_62%,#00061d_100%)]">
        <div aria-hidden className="cta-aurora cta-aurora-a pointer-events-none absolute -top-1/3 end-[-10%] -z-10 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(40,84,220,0.4),transparent)]" />
        <div aria-hidden className="cta-aurora cta-aurora-b pointer-events-none absolute -bottom-1/2 start-[-8%] -z-10 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,rgba(224,179,90,0.22),transparent)]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-50 [background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1.2px)] [background-size:30px_30px] [mask-image:radial-gradient(ellipse_80%_80%_at_70%_30%,#000,transparent_75%)]" />
        <span aria-hidden className="cta-sweep absolute inset-x-0 top-0 h-px" />

        <div className="relative p-7 md:p-12 lg:p-14">
          {/* 1 — the invitation (7 columns) beside the first three steps (5 columns); both stretch to one height */}
          <div className="grid gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-12 [&>*]:min-w-0">
            <div className="flex flex-col text-center lg:col-span-7 lg:justify-center lg:text-start">
              <div>
                <p className="gold-eyebrow !text-[#f6e2b3] text-xs md:text-sm">{t.eyebrow}</p>
                <h2 className="font-display grad-text mt-4 text-4xl leading-[1.3] sm:text-5xl md:text-6xl">{t.title}</h2>
                <p className="mx-auto mt-5 max-w-xl text-base font-light leading-8 text-white/80 md:text-lg lg:mx-0">{t.body}</p>
              </div>
              <div className="mt-8 lg:mt-12">
                <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                  <ArrowButton href={firm.whatsapp} external ltr={!ar}>
                    {t.whatsapp}
                  </ArrowButton>
                  <MatterBriefCTA locale={locale} matterTypes={types} tone="onDark" />
                  <a href={`tel:${firm.phone}`} className={pill}>
                    <Phone className="h-4 w-4 text-[#f6e2b3]" aria-hidden />
                    {t.call}
                  </a>
                </div>
                <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-white/12 pt-5 text-xs font-light text-white/70 lg:justify-start">
                  {t.chips.map((c) => (
                    <li key={c} className="flex items-center gap-2">
                      <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-[#e0b35a]" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="chamfer-lg relative isolate flex flex-col overflow-hidden border border-white/12 bg-white/[0.06] p-6 backdrop-blur-xl md:p-8 lg:col-span-5">
              {/* the seal: the mark inside a slowly turning ring of text, the firm's stamp behind the glass */}
        <div aria-hidden className="pointer-events-none absolute -bottom-20 -end-20 -z-10 h-72 w-72 opacity-[0.14]">
                <svg viewBox="0 0 200 200" className="cta-seal absolute inset-0 h-full w-full">
                  <defs><path id="sealPath" d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" /></defs>
                  <circle cx="100" cy="100" r="96" fill="none" stroke="#e0b35a" strokeOpacity="0.55" strokeWidth="0.6" />
                  <circle cx="100" cy="100" r="68" fill="none" stroke="#e0b35a" strokeOpacity="0.3" strokeWidth="0.5" strokeDasharray="1 3" />
                  <text fill="#f6e2b3" fontSize="9.2" letterSpacing="2.6" fontFamily="var(--font-brand-raw), sans-serif">
                    <textPath href="#sealPath">{t.seal.repeat(2)}</textPath>
                  </text>
                </svg>
                <Image src="/brand/logo-mark.png" alt="" width={512} height={420} className="absolute inset-0 m-auto w-28 md:w-40" />
              </div>

              <OpenStatus locale={locale} />
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#f6e2b3]">{t.stepsTitle}</p>
              <ol className="mt-5 flex flex-1 flex-col justify-between gap-7">
                {t.steps.map((s, i) => (
                  <li key={s.t} className="relative flex gap-5">
                    {i < t.steps.length - 1 && <span aria-hidden className="absolute start-[1.5rem] top-14 -bottom-7 w-px bg-gradient-to-b from-[#e0b35a]/70 to-[#e0b35a]/10" />}
                    <span className="font-display flex h-12 w-12 shrink-0 items-center justify-center border border-[#e0b35a]/70 bg-[#e0b35a]/10 text-xl text-[#f6e2b3] [clip-path:polygon(0_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%)]" dir="ltr">
                      0{i + 1}
                    </span>
                    <div>
                      <p className="text-lg font-normal text-white">{s.t}</p>
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
            </aside>
          </div>

          {/* 2 — the legal alerts: a full-width strip, text on one side and the form on the other (same 12-column grid) */}
          <div className="mt-10 grid items-center gap-6 border-t border-white/12 pt-9 lg:mt-12 lg:grid-cols-12 lg:gap-12 [&>*]:min-w-0">
            <div className="text-center lg:col-span-5 lg:text-start">
              <p className="font-blog text-2xl font-bold text-[#f6e2b3]">{t.subscribeTitle}</p>
              <p className="mx-auto mt-2 max-w-md text-sm font-light leading-7 text-white/75 lg:mx-0">{t.subscribeBody}</p>
            </div>
            <div className="lg:col-span-7">
              <NewsletterSignup source={t.source} compact locale={locale} onDark />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
