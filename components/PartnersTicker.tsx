import Image from "next/image";
import { partners } from "@/lib/partners";

const copy = {
  ar: { label: "شركاء النجاح", note: "نعتز بثقة شركائنا" },
  en: { label: "Success Partners", note: "Proud to be trusted by" },
};

/** A small, slow ticker of partner logos. Two identical tracks make the loop seamless; the copy is hidden from assistive tech. */
export default function PartnersTicker({ locale }: { locale: "ar" | "en" }) {
  const t = copy[locale];
  const row = (hidden: boolean) =>
    partners.map((p, i) => (
      <li key={`${hidden ? "b" : "a"}${i}`} className="mx-2 shrink-0" aria-hidden={hidden || undefined}>
        <Image src={p.src} alt={hidden ? "" : p.name} width={104} height={104} sizes="104px" className="h-[4.5rem] w-[4.5rem] md:h-[5.25rem] md:w-[5.25rem]" />
      </li>
    ));
  return (
    <section aria-label={t.label} className="relative bg-[#f4f5fe] py-9 md:py-12">
      <div className="mx-auto mb-6 flex max-w-6xl items-center gap-4 px-5">
        <span aria-hidden className="h-px flex-1 bg-gradient-to-l from-transparent to-[#e0b35a]/50" />
        <h2 className="font-display !text-lg !font-normal text-[#00124a] md:!text-2xl">{t.label}</h2>
        <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-transparent to-[#e0b35a]/50" />
      </div>
      <div dir="ltr" className="ticker overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <ul className="ticker-track">
          {row(false)}
          {row(true)}
        </ul>
      </div>
    </section>
  );
}
