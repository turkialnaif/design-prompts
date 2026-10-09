const BOE = "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/";

/**
 * Official texts (Experts Authority at the Council of Ministers, and Umm Al-Qura for the new Enforcement Law) for the laws
 * the articles cite. Each was matched to its law by searching the official portal; a source line gets a link only when it
 * begins with the law's own name, so a line about something else that merely mentions a law is never linked to it.
 */
const rules: [RegExp, string][] = [
  [/^اللائحة التنفيذية لنظام الإفلاس/, `${BOE}a748e485-620c-45c4-8ca8-a9f40166406d/1`],
  [/^نظام الإفلاس/, `${BOE}68204119-84f1-4789-8fad-a9ec014c3788/1`],
  [/^اللائحة التنفيذية لنظام التحكيم/, `${BOE}12752a60-2a4a-4cab-a05d-a9a700f274a5/1`],
  [/^نظام التحكيم/, `${BOE}5535039e-13da-43f6-8f53-a9a700f26485/1`],
  [/^نظام التنفيذ الجديد/, "https://www.uqn.gov.sa/decisions-and-regulations/rules-and-regulations/4000869"],
  [/^نظام التنفيذ/, `${BOE}c81ba2f1-1bf1-443b-9b1c-a9a700f27110/1`],
  [/^نظام الشركات/, `${BOE}a8376aea-1bc3-49d4-9027-aed900b555af/1`],
  [/^(المرسوم الملكي الصادر بـ?)?نظام المعاملات المدنية/, `${BOE}655fdb42-8c96-422b-b8c4-b04f0095c94c/1`],
  [/^نظام الإثبات/, `${BOE}2716057c-c097-4bad-8e1e-ae1400c678d5/1`],
  [/^نظام المحاكم التجارية/, `${BOE}38334008-3b70-4c6c-b3af-aba3016a8061/1`],
  [/^نظام العمل/, `${BOE}08381293-6388-48e2-8ad2-a9a700f2aa94/1`],
  [/^نظام التكاليف القضائية/, `${BOE}3e368087-7b31-46e7-8005-ada100b8f703/1`],
  [/^نظام التعاملات الإلكترونية/, `${BOE}6f509360-2c39-4358-ae2a-a9a700f2ed16/1`],
  [/^نظام المنافسات والمشتريات الحكومية/, `${BOE}24c563f9-7292-49c8-b0fb-aa9800b999f1/1`],
];

export function lawLink(source: string): string | undefined {
  const s = source.trim();
  return rules.find(([re]) => re.test(s))?.[1];
}
