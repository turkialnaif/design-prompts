import type { LeadTier } from "@/lib/db/schema";

/**
 * يقيّم موجز المسألة من 100 نقطة بقواعد ظاهرة ومفسَّرة: كل نقطة لها سبب يُعرض للمحامي. الأوزان تقديرية أولى،
 * وتُعايَر بما يظهره التحويل الفعلي (لوحة «الفرص»: أي مصدر وأي درجة انتهت بعقد).
 */
export type ScoreInput = { name: string; org?: string | null; email: string; phone?: string | null; matterType?: string | null; description?: string | null };
export type ScoreResult = { score: number; tier: LeadTier; reasons: string[]; urgent: boolean; amount: number | null };

const FREE_MAIL = /@(gmail|hotmail|outlook|yahoo|icloud|live|msn|aol|proton|protonmail)\./i;
const STRONG = ["عقد", "عقود", "شراكة", "شركاء", "تحكيم", "نزاع", "مطالبة", "مديونية", "تحصيل", "استثمار", "حوكمة", "امتثال", "تأسيس", "استحواذ", "اندماج", "مناقصة", "امتياز", "تنفيذ", "إفلاس", "توريد", "مقاولات", "contract", "arbitration", "dispute", "shareholder", "acquisition", "investment", "compliance", "enforcement"];
const URGENT = ["عاجل", "مهلة", "إنذار", "جلسة", "تبليغ", "دعوى", "حجز", "منع سفر", "خلال", "ضرورة", "urgent", "deadline", "hearing", "notice"];
const OUT_OF_FOCUS = ["طلاق", "حضانة", "ميراث", "تركة", "خلع", "مخالفة مرورية", "divorce", "custody", "inheritance"];

const AR_DIGITS = "٠١٢٣٤٥٦٧٨٩";
const norm = (s: string) => s.replace(/[٠-٩]/g, (d) => String(AR_DIGITS.indexOf(d))).replace(/[,،٬]/g, "").toLowerCase();

/** أكبر مبلغ مذكور في الوصف (ريال)، من أرقام أو عبارات مثل «مليونين». */
export function largestAmount(text: string): number | null {
  const t = norm(text);
  let best = 0;
  for (const m of t.matchAll(/(\d+(?:\.\d+)?)\s*(مليون|ملايين|الف|ألف|k|m)?/g)) {
    let n = parseFloat(m[1]);
    const u = m[2];
    if (u === "مليون" || u === "ملايين" || u === "m") n *= 1_000_000;
    else if (u === "الف" || u === "ألف" || u === "k") n *= 1_000;
    if (n >= 10_000 && n > best) best = n;
  }
  if (!best) {
    if (/مليونين/.test(t)) best = 2_000_000;
    else if (/مليون/.test(t)) best = 1_000_000;
  }
  return best || null;
}

export function scoreLead(i: ScoreInput): ScoreResult {
  const reasons: string[] = [];
  let s = 0;
  const add = (n: number, why: string) => {
    s += n;
    reasons.push(`${n > 0 ? "+" : ""}${n} ${why}`);
  };
  const text = `${i.matterType ?? ""} ${i.description ?? ""}`;
  const low = text.toLowerCase();

  if (i.org && i.org.trim().length >= 3) add(12, "ذكر منشأة");
  if (!FREE_MAIL.test(i.email)) add(12, "بريد بنطاق منشأة");
  if (i.phone && /\d{7,}/.test(norm(i.phone))) add(8, "رقم جوال");
  if (i.matterType) add(6, "حدد نوع المسألة");

  const hits = STRONG.filter((k) => low.includes(k.toLowerCase())).length;
  if (hits) add(Math.min(16, hits * 4), `مفردات ضمن اختصاصنا (${hits})`);

  const amount = largestAmount(text);
  if (amount) add(amount >= 1_000_000 ? 20 : amount >= 100_000 ? 14 : 8, `مبلغ مذكور نحو ${Math.round(amount).toLocaleString("en-US")} ريال`);

  const urgent = URGENT.some((k) => low.includes(k.toLowerCase()));
  if (urgent) add(10, "إشارة استعجال أو مهلة");

  const len = (i.description ?? "").trim().length;
  if (len >= 200) add(10, "وصف مفصّل");
  else if (len >= 80) add(5, "وصف كافٍ");
  else if (len < 30) add(-10, "وصف قصير جدًا");

  if (OUT_OF_FOCUS.some((k) => low.includes(k.toLowerCase()))) add(-10, "خارج التركيز المعلن (الشركات)");

  const score = Math.max(0, Math.min(100, s));
  const tier: LeadTier = score >= 60 ? "hot" : score >= 35 ? "warm" : "cold";
  return { score, tier, reasons, urgent, amount };
}

export const tierLabel: Record<LeadTier, string> = { hot: "حار", warm: "دافئ", cold: "بارد" };
