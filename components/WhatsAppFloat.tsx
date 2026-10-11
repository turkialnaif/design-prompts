import HeroSeal from "@/components/HeroSeal";

/** The floating quick action: back to top. (The WhatsApp button that used to sit beside it was removed on request.) */
export default function WhatsAppFloat({ topLabel = "العودة إلى الأعلى" }: { topLabel?: string }) {
  return (
    <aside aria-label={topLabel === "Back to top" ? "Quick actions" : "إجراءات سريعة"} className="fixed bottom-5 left-5 z-40 flex items-center gap-3">
      <HeroSeal label={topLabel} />
    </aside>
  );
}
