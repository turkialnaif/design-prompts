export const matterStatusLabel = { open: "مفتوحة", pending: "قيد الانتظار", on_hold: "معلّقة", closed: "مغلقة", archived: "مؤرشفة" } as const;
export const eventKindLabel = { hearing: "جلسة", deadline: "موعد نهائي", meeting: "اجتماع", filing: "إيداع", other: "أخرى" } as const;
export const eventStatusLabel = { scheduled: "مجدولة", done: "منتهية", postponed: "مؤجلة", cancelled: "ملغاة" } as const;
export const priorityLabel = { low: "منخفضة", normal: "عادية", high: "عالية", urgent: "عاجلة" } as const;
export const taskStatusLabel = { todo: "للتنفيذ", doing: "قيد التنفيذ", done: "منجزة" } as const;
export const clientTypeLabel = { individual: "فرد", company: "شركة", institution: "مؤسسة" } as const;
export const billingTypeLabel = { hourly: "بالساعة", fixed: "مبلغ مقطوع", retainer: "اتفاق مستمر", contingency: "نسبة نجاح" } as const;
export const partyRoleLabel = { opposing: "الخصم", co_party: "شريك في الدعوى", opposing_counsel: "وكيل الخصم", witness: "شاهد", other: "أخرى" } as const;
export const invoiceStatusLabel = { draft: "مسودة", issued: "صادرة", partial: "مدفوعة جزئيًا", paid: "مدفوعة", void: "ملغاة" } as const;
export const docCategoryLabel: Record<string, string> = {
  general: "عام", pleading: "مذكرة/لائحة", contract: "عقد", evidence: "مستند إثبات", judgment: "حكم/قرار",
  correspondence: "مراسلات", id: "هويات", invoice: "فواتير", other: "أخرى",
};
export const practiceAreas = [
  "العقود والصفقات", "الشركات والحوكمة", "التقاضي التجاري", "التحكيم", "العمل والعمال", "العقار والمقاولات",
  "الامتياز التجاري", "الملكية الفكرية", "الامتثال", "البيانات والتقنية", "التنفيذ والتحصيل", "التركات", "أخرى",
];
export const courts = [
  "المحكمة التجارية", "المحكمة العمالية", "محكمة الاستئناف التجارية", "المحكمة العامة", "محكمة التنفيذ",
  "ديوان المظالم (القضاء الإداري)", "المحكمة العليا", "مركز التحكيم", "لجنة تسوية المنازعات", "جهة أخرى",
];
