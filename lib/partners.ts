export type Partner = { src: string; name: string };

/** Success partners — logos shown with the partners' permission. Order follows the supplied sheet. */
export const partners: Partner[] = [
  "ساري", "D360", "La Belle", "Three Bees Hotels", "علي الفوزان وأولاده للعقارات", "زد", "Life Lines", "شريك نجاح",
  "Açaí Kitchen", "أماس AMAAS", "Café Lilou", "SO RS", "بلسم Balsam", "محبوب Mahboob", "ريبال Ribal", "FlyAkeed",
  "ريفي Reefi", "Direct", "جاذر إن Gathern", "MNAF3 Arabia", "بندر المنصور معماريون", "قويم Qaweem", "10X", "PAN Home",
  "ART Center", "جاذر إن Gathern", "سبرينغ روز", "سلاسة Salasa", "Fumedco", "دومينوز", "ULB", "أروماتك Aromatic",
].map((name, i) => ({ src: `/partners/${String(i + 1).padStart(2, "0")}.webp`, name }));
