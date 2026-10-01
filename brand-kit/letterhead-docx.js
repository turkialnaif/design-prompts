const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, ImageRun, Header, Footer, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, WidthType, ShadingType, VerticalAlign,
} = require("docx");

const ROOT = "/Users/airm1/tnz-law-website";
const logo = fs.readFileSync(`${ROOT}/public/brand/logo-lockup.png`);
const F = {
  addr_ar: "حي الياسمين، الرياض 13326", addr_en: "Al Yasmin District, Riyadh 13326",
  phone: "+966 56 677 0888", email: "turki@taap.sa", web: "taap.sa", lic: "4477", uni: "7030708403",
};
const GOLD = "D0A751", INK = "0B1626", SOFT = "2A3849";
const FONT = "Tahoma";

function build(lang) {
  const ar = lang === "ar";
  const run = (text, o = {}) => new TextRun({ text, font: FONT, size: 16, color: SOFT, rightToLeft: ar, ...o });
  const align = ar ? AlignmentType.RIGHT : AlignmentType.LEFT;

  const header = new Header({
    children: [
      new Paragraph({
        alignment: align,
        bidirectional: ar,
        spacing: { after: 120 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: GOLD, space: 8 } },
        children: [new ImageRun({ type: "png", data: logo, transformation: { width: 235, height: 69 }, altText: { title: "logo", description: "Firm logo", name: "logo" } })],
      }),
    ],
  });

  const bar = { style: BorderStyle.NONE, size: 0, color: INK };
  const barBorders = { top: { style: BorderStyle.SINGLE, size: 12, color: GOLD }, bottom: bar, left: bar, right: bar };
  const line = (text, o = {}) => new Paragraph({ alignment: AlignmentType.CENTER, bidirectional: ar, spacing: { before: 40, after: 40 }, children: [new TextRun({ text, font: FONT, size: 15, color: "FFFFFF", rightToLeft: ar, ...o })] });
  const contacts = ar
    ? `${F.addr_ar}   |   ${F.phone}   |   ${F.email}   |   ${F.web}`
    : `${F.addr_en}   |   ${F.phone}   |   ${F.email}   |   ${F.web}`;
  const licence = ar ? `رخصة مزاولة المحاماة رقم ${F.lic} · السجل الموحد ${F.uni}` : `Law Practice Licence No. ${F.lic} · Unified No. ${F.uni}`;

  const footer = new Footer({
    children: [
      new Table({
        width: { size: 9638, type: WidthType.DXA },
        columnWidths: [9638],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: { size: 9638, type: WidthType.DXA },
                borders: barBorders,
                shading: { type: ShadingType.CLEAR, fill: INK, color: "auto" },
                margins: { top: 110, bottom: 110, left: 160, right: 160 },
                verticalAlign: VerticalAlign.CENTER,
                children: [line(contacts), line(licence, { color: "E6C988", size: 14 })],
              }),
            ],
          }),
        ],
      }),
    ],
  });

  const meta = ar ? ["الرقم:", "التاريخ:", "المرفقات:"] : ["Ref:", "Date:", "Encl.:"];
  const body = [
    ...meta.map(
      (m) =>
        new Paragraph({
          alignment: ar ? AlignmentType.LEFT : AlignmentType.RIGHT,
          bidirectional: ar,
          spacing: { after: 60 },
          children: [run(m, { bold: true, color: "A9843C" }), run("  ..........................", { color: "9AA5B1" })],
        }),
    ),
    new Paragraph({ children: [], spacing: { after: 300 } }),
    new Paragraph({ alignment: align, bidirectional: ar, children: [run(ar ? "السادة / ………………………………………" : "Dear Sirs / Madam,", { size: 22, color: INK })] }),
    new Paragraph({ children: [] }),
    new Paragraph({ alignment: align, bidirectional: ar, children: [run(ar ? "اكتب نص الخطاب هنا." : "Type the body of the letter here.", { size: 22, color: INK })] }),
  ];

  return new Document({
    creator: "Turki AlNaif & Partners",
    title: ar ? "ورقة رسمية" : "Letterhead",
    styles: { default: { document: { run: { font: FONT, size: 22 } } } },
    sections: [
      {
        properties: {
          page: {
            size: { width: 11906, height: 16838 },
            margin: { top: 2000, bottom: 1700, left: 1134, right: 1134, header: 500, footer: 450 },
          },
        },
        headers: { default: header },
        footers: { default: footer },
        children: body,
      },
    ],
  });
}

(async () => {
  for (const lang of ["ar", "en"]) {
    const buf = await Packer.toBuffer(build(lang));
    fs.writeFileSync(`${ROOT}/brand-kit/out/letterhead-${lang}.docx`, buf);
    console.log("wrote", lang, buf.length);
  }
})();
