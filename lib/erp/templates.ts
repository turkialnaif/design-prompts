import "server-only";
import { AlignmentType, Document, HeadingLevel, Packer, Paragraph, TextRun } from "docx";

export const PLACEHOLDERS: [string, string][] = [
  ["{{client.name}}", "اسم العميل"],
  ["{{client.identifier}}", "هوية/سجل العميل"],
  ["{{client.address}}", "عنوان العميل"],
  ["{{client.phone}}", "جوال العميل"],
  ["{{client.email}}", "بريد العميل"],
  ["{{matter.number}}", "رقم القضية"],
  ["{{matter.title}}", "عنوان القضية"],
  ["{{matter.court}}", "الجهة القضائية"],
  ["{{matter.courtCaseNumber}}", "رقم الدعوى"],
  ["{{matter.claimValue}}", "قيمة المطالبة"],
  ["{{opposing}}", "أسماء الخصوم"],
  ["{{lawyer.name}}", "المحامي المسؤول"],
  ["{{lawyer.barNumber}}", "رقم ترخيص المحامي"],
  ["{{firm.name}}", "اسم المكتب"],
  ["{{firm.address}}", "عنوان المكتب"],
  ["{{firm.phone}}", "هاتف المكتب"],
  ["{{firm.licenseNumber}}", "رقم رخصة المكتب"],
  ["{{date}}", "تاريخ اليوم (ميلادي)"],
  ["{{hijri_date}}", "تاريخ اليوم (هجري)"],
];

export function fillTemplate(body: string, ctx: Record<string, string | null | undefined>): string {
  return body.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_m, key: string) => ctx[key] ?? "________");
}

const fmt = (locale: string) => new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Riyadh" }).format(new Date());
export const todayGregorian = () => fmt("ar-SA-u-nu-latn-ca-gregory");
export const todayHijri = () => fmt("ar-SA-u-nu-latn-ca-islamic-umalqura");

const run = (text: string, extra: { bold?: boolean; size?: number } = {}) => new TextRun({ text, rightToLeft: true, font: "Arial", size: extra.size ?? 26, bold: extra.bold });

/** سطر يبدأ بـ «# » = عنوان، «## » = عنوان فرعي، وغيره فقرة. */
export async function buildDocx(text: string): Promise<Buffer> {
  const children = text.split("\n").map((line) => {
    if (line.startsWith("## ")) return new Paragraph({ heading: HeadingLevel.HEADING_2, bidirectional: true, alignment: AlignmentType.START, spacing: { before: 200, after: 100 }, children: [run(line.slice(3), { bold: true, size: 28 })] });
    if (line.startsWith("# ")) return new Paragraph({ heading: HeadingLevel.HEADING_1, bidirectional: true, alignment: AlignmentType.CENTER, spacing: { before: 240, after: 160 }, children: [run(line.slice(2), { bold: true, size: 34 })] });
    return new Paragraph({ bidirectional: true, alignment: AlignmentType.START, spacing: { after: 120, line: 360 }, children: [run(line)] });
  });
  const doc = new Document({ sections: [{ properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1300, bottom: 1300, left: 1300, right: 1300 } } }, children }] });
  return Buffer.from(await Packer.toBuffer(doc));
}
