import { resolveMx, resolve4, resolve6 } from "node:dns/promises";

/** صناديق الأقسام: ليست شخصًا، فلا تُراسَل آليًا ولا تبقى في القاعدة. (legal وcontracts وcompliance مقصودة فتبقى.) */
const DEPT = [
  "info", "information", "contact", "contacts", "contactus", "contcatus", "conatct", "contac", "inq", "inquiry", "inquiries", "enquiry", "enquiries", "enq", "query",
  "bd", "bizdev", "business", "exhibition", "exhibitions", "printing", "print", "sales", "sale", "marketing", "mktg", "hr", "jobs", "job", "careers", "career", "recruitment", "recruiting",
  "support", "help", "helpdesk", "service", "services", "customer", "customers", "customercare", "customerservice", "cs", "care", "admin", "administration", "office", "mail", "mailbox", "hello", "hi",
  "reception", "secretary", "secretariat", "board", "bod", "bodirectores", "bodirectors", "ir", "i.r", "investor", "investors", "investorrelations", "invest", "shareholder", "shareholders",
  "media", "pr", "press", "accounts", "account", "accounting", "finance", "procurement", "purchase", "purchasing", "tender", "tenders", "orders", "order", "booking", "bookings", "reservation", "reservations",
  "quotes", "quotation", "rfq", "billing", "noreply", "no-reply", "donotreply", "webmaster", "general", "team", "export", "logistics", "operations", "ops", "shipping", "projects", "production", "store", "stores",
  "warehouse", "ask", "feedback", "complaints", "suggestions", "newsletter", "subscribe", "enquire", "hse", "it", "tech", "design",
];
const DEPT_SET = new Set(DEPT);
const DEPT_PREFIX = /^(info|contact|customer|enquir|inquir|invest|shareholder|sales|support|service|careers?|hr)[\w.\-]*$/i;

export const localPart = (e: string) => e.split("@")[0].toLowerCase();
export const domainOf = (e: string) => (e.split("@")[1] ?? "").toLowerCase();

export function isDeptMailbox(email: string): boolean {
  const l = localPart(email);
  return DEPT_SET.has(l) || DEPT_SET.has(l.replace(/[._-]/g, "")) || DEPT_PREFIX.test(l);
}

/** نطاق دولة غير السعودية (fr، de، uk…): القائمة قوائم الرياض والمنطقة الشرقية، فمثل هذا العنوان أغلب الظن بيانات خاطئة أو فرع أجنبي. */
export function isForeignCountryDomain(email: string): boolean {
  const tld = domainOf(email).split(".").pop() ?? "";
  // co / io / me / ai… تُستعمل نطاقات تجارية عامة (وكثير من الشركات السعودية عليها)، فلا تُعدّ أجنبية
  const generic = ["co", "io", "me", "ai", "tv", "cc", "ws", "so", "ly", "to", "fm"];
  return /^[a-z]{2}$/.test(tld) && tld !== "sa" && !generic.includes(tld);
}

const cache = new Map<string, boolean>();
/** هل للنطاق خادم بريد؟ (MX، وإلا سجل A كما في RFC 5321). يمنع الارتداد من نطاقات مكتوبة خطأ أو منتهية. */
export async function hasMailServer(domain: string): Promise<boolean> {
  const d = domain.toLowerCase();
  if (!d || !d.includes(".")) return false;
  if (cache.has(d)) return cache.get(d)!;
  let ok = false;
  try {
    ok = (await resolveMx(d)).length > 0;
  } catch (e) {
    const code = (e as NodeJS.ErrnoException).code;
    if (code === "ENODATA" || code === "ENOTFOUND") {
      try { ok = (await resolve4(d)).length > 0; } catch { try { ok = (await resolve6(d)).length > 0; } catch { ok = false; } }
    } else {
      ok = true; // خطأ مؤقت في DNS (مهلة…): لا نظلم العنوان
    }
  }
  cache.set(d, ok);
  return ok;
}

/** سبب استبعاد العنوان من الإرسال والقاعدة، أو null إن كان سليمًا. */
export async function addressProblem(email: string): Promise<null | "dept" | "foreign" | "no_mail_server"> {
  if (isDeptMailbox(email)) return "dept";
  if (isForeignCountryDomain(email)) return "foreign";
  if (!(await hasMailServer(domainOf(email)))) return "no_mail_server";
  return null;
}
