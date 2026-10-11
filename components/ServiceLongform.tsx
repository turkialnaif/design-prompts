import Link from "next/link";
import type { ServiceCopy } from "@/lib/service-copy";
import type { ServiceExtra } from "@/lib/service-extra";

type Props = {
  copy: { groups: ServiceCopy["groups"] };
  extra: ServiceExtra;
  links: { href: string; label: string }[];
  /** The page already carries its own FAQ block (and FAQPage schema), so the long-form one is left out. */
  skipFaq?: boolean;
  locale?: "ar" | "en";
};

const txt = {
  ar: {
    label: "تفاصيل الخدمة",
    mistakes: "أخطاء شائعة نراها في هذا النوع من الملفات",
    how: "كيف يسير العمل",
    need: "ما الذي نحتاجه لنبدأ",
    needLead: "لا يلزم أن تكتمل الوثائق قبل التواصل معنا، لكن توفر ما يلي يختصر وقت التقييم الأول:",
    faq: "أسئلة شائعة",
    more: "اقرأ أيضًا",
    note: "المعلومات في هذه الصفحة عامة وليست رأيًا قانونيًا في حالة بعينها؛ يختلف الجواب بحسب الوقائع والنظام المنطبق وقت الواقعة.",
  },
  en: {
    label: "Service details",
    mistakes: "Mistakes we see most often in this kind of matter",
    how: "How the work runs",
    need: "What we need to start",
    needLead: "You do not need every document before you contact us, but having the following shortens the first assessment:",
    faq: "Frequently asked questions",
    more: "Read also",
    note: "The information on this page is general and is not a legal opinion on a specific matter; the answer depends on the facts and on the law in force at the time.",
  },
};

const h2 = "font-display !text-2xl !font-light leading-snug text-[#00124a] md:!text-3xl";
const body = "mt-4 text-base font-light leading-9 text-[#1b2646]";

function Group({ group, first }: { group: ServiceCopy["groups"][number]; first: boolean }) {
  const lead = group.intro[0]?.startsWith("# ") ? group.intro[0].slice(2) : null;
  const intro = lead ? group.intro.slice(1) : group.intro;
  return (
    <div className={first ? "" : "mt-20 border-t border-[#00124a]/12 pt-16"}>
      {group.label && <p className="gold-eyebrow text-xs">{group.label}</p>}
      {lead && <h2 className={`${h2} mt-2`}>{lead}</h2>}
      {intro.map((t) => (
        <p key={t} className={body}>{t}</p>
      ))}
      {group.sections.map((s) => (
        <section key={s.h} className="mt-12">
          <h3 className="font-display text-xl font-semibold text-[#00124a]">{s.h}</h3>
          {s.p.map((t) => (
            <p key={t} className={body}>{t}</p>
          ))}
        </section>
      ))}
    </div>
  );
}

export default function ServiceLongform({ copy, extra, links, skipFaq, locale = "ar" }: Props) {
  const t = txt[locale];
  return (
    <section className="bg-white py-20 md:py-28" aria-label={t.label}>
      <div className="mx-auto max-w-3xl px-5">
        {copy.groups.map((g, i) => (
          <Group key={g.label ?? i} group={g} first={i === 0} />
        ))}

        <div className="mt-20 border-t border-[#00124a]/12 pt-16">
          <h2 className={h2}>{t.mistakes}</h2>
          <ul className="mt-6 space-y-5">
            {extra.mistakes.map((m) => (
              <li key={m.t} className="flex gap-4">
                <span aria-hidden className="mt-3 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#e0b35a]" />
                <p className="text-base font-light leading-9 text-[#1b2646]">
                  <strong className="font-semibold text-[#00124a]">{m.t}.</strong> {m.d}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16">
          <h2 className={h2}>{t.how}</h2>
          <ol className="mt-6 divide-y divide-[#00124a]/10 border-y border-[#00124a]/10">
            {extra.process.map((s, i) => (
              <li key={s.t} className="flex gap-5 py-5">
                <span className="font-display w-9 shrink-0 text-3xl font-extralight text-[#8a5d0e]" dir="ltr">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-base font-light leading-9 text-[#1b2646]">
                  <strong className="font-semibold text-[#00124a]">{s.t}.</strong> {s.d}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-16">
          <h2 className={h2}>{t.need}</h2>
          <p className={body}>{t.needLead}</p>
          <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {extra.docs.map((d) => (
              <li key={d} className="flex items-start gap-3 text-base font-light leading-8 text-[#1b2646]">
                <span aria-hidden className="mt-3 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#e0b35a]" />
                {d}
              </li>
            ))}
          </ul>
        </div>

        {!skipFaq && (
          <div className="mt-16">
            <h2 className={h2}>{t.faq}</h2>
            <div className="mt-6 divide-y divide-[#00124a]/10 border-y border-[#00124a]/10">
              {extra.faq.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-[#00124a]">
                    <span>{f.q}</span>
                    <span aria-hidden className="text-xl text-[#8a5d0e] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-base font-light leading-9 text-[#1b2646]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        )}

        {links.length > 0 && (
          <div className="mt-16">
            <h2 className={h2}>{t.more}</h2>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="chamfer-btn inline-block border border-[#00124a]/20 px-4 py-2 text-sm font-light text-[#00124a] transition-colors hover:border-[#e0b35a] hover:bg-[#f4f5fe]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="mt-14 text-xs leading-6 text-[#1b2646]/80">
          {t.note}
        </p>
      </div>
    </section>
  );
}
