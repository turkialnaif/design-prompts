import Image from "next/image";

const methods = [
  { src: "/payments/visa.svg", alt: "Visa" },
  { src: "/payments/mastercard.svg", alt: "Mastercard" },
  { src: "/payments/mada.svg", alt: "mada" },
  { src: "/payments/apple-pay.svg", alt: "Apple Pay" },
  { src: "/payments/samsung-pay.svg", alt: "Samsung Pay" },
];

/**
 * The methods offered on the secure payment page (Visa, Mastercard, mada, Apple Pay, Samsung Pay). The logos are plain files in
 * /public/payments so the official artwork can replace them without touching code.
 */
export default function PaymentMethods({ locale, label = true, className = "" }: { locale: "ar" | "en"; label?: boolean; className?: string }) {
  const ar = locale === "ar";
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`} role="group" aria-label={ar ? "وسائل الدفع المقبولة: فيزا وماستركارد ومدى وأبل باي وسامسونج باي" : "Accepted payment methods: Visa, Mastercard, mada, Apple Pay and Samsung Pay"}>
      {label && <span className="text-[0.8rem] text-white/60">{ar ? "ندعم الدفع عبر" : "We accept"}</span>}
      <ul className="flex items-center gap-2">
        {methods.map((m) => (
          <li key={m.alt}>
            <Image src={m.src} alt={m.alt} width={52} height={33} unoptimized className="h-8 w-auto" />
          </li>
        ))}
      </ul>
    </div>
  );
}
