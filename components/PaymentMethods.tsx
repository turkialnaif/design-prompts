import Image from "next/image";

const methods = [
  { src: "/payments/visa.svg", alt: "Visa" },
  { src: "/payments/mastercard.svg", alt: "Mastercard" },
  { src: "/payments/mada.svg", alt: "mada" },
];

/**
 * The cards accepted by the secure payment page (Visa, Mastercard, mada). The logos are plain files in
 * /public/payments so the official artwork can replace them without touching code.
 */
export default function PaymentMethods({ locale, label = true, className = "" }: { locale: "ar" | "en"; label?: boolean; className?: string }) {
  const ar = locale === "ar";
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`} role="group" aria-label={ar ? "وسائل الدفع المقبولة: فيزا وماستركارد ومدى" : "Accepted payment methods: Visa, Mastercard and mada"}>
      {label && <span className="text-[0.8rem] text-white/60">{ar ? "ندعم الدفع عبر" : "We accept"}</span>}
      <ul className="flex items-center gap-2">
        {methods.map((m) => (
          <li key={m.alt}>
            <Image src={m.src} alt={m.alt} width={52} height={33} unoptimized className="h-8 w-auto rounded-[5px]" />
          </li>
        ))}
      </ul>
    </div>
  );
}
