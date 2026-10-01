import { MessageCircle } from "lucide-react";
import HeroSeal from "@/components/HeroSeal";
import { firm } from "@/lib/site";

export default function WhatsAppFloat({ label, topLabel = "العودة إلى الأعلى" }: { label: string; topLabel?: string }) {
  return (
    <div className="fixed bottom-5 left-5 z-40 flex items-center gap-3">
      <a
        href={firm.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="group flex items-center gap-2 rounded-full bg-gradient-to-b from-[#f0d894] to-[#cfa64e] p-3.5 text-ink shadow-[inset_0_1.5px_0_rgba(255,255,255,0.8),0_14px_28px_-10px_rgba(169,132,60,0.8)] ring-1 ring-white/80 transition-transform duration-200 hover:-translate-y-0.5"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:max-w-[10rem] group-hover:pe-2 group-hover:opacity-100 md:inline">
          {label}
        </span>
      </a>
      <div className="hidden md:block">
        <HeroSeal label={topLabel} />
      </div>
    </div>
  );
}
