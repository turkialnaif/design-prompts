# Turki AlNaif & Partners — stationery

**Direction: restraint.** The reference is a black slate panel with thin metal letters: one number above, one name below, nothing else.
Every piece follows it. Two surfaces (**matte deep ink** `#00061D` and **warm bone** `#F4EFE4` / paper `#FAF7F0`), one metal (**flat brass** `#C4A04E`, and `#8A6D25`
for small type on bone), the logo, and a great deal of empty space. No frames, patterns, gradients or ornaments.

The golden thread, the guilloché and the engraved borders of the earlier versions were removed on purpose.

## What is in the set

| Piece | Notes |
|---|---|
| `business-card` | 90 × 55. Side A: ink and the brass lockup, nothing else. Side B: bone, the name in both languages, contacts, address, a small QR («Send your brief», tagged `utm_medium=business-card`). |
| `questions-card` | «5 questions before you sign»: a leave-behind that is useful on its own. |
| `appointment-card` | Written on by hand; the back lists what to bring. |
| `letterhead` | A4. The lockup, one hairline and one line of particulars at the foot. Three small ticks on the left edge mark the third-folds (99 and 198 mm) and the filing punch (148.5 mm); the continuation page carries the mark only. |
| `envelope` | DL. The inside is solid ink with the mark once. |
| `compliments` | DL slip, a clear page for the handwritten note. |
| `notepad` | A5, ruled. |
| `folder` | Outside: matte soft-touch ink. The mark is a **blind emboss** (no ink or foil: it is felt, and seen in raking light) and the lockup is brass foil. Inside: bone, with a pocket and two slits for the cards. `folder-dieline` is the cutting file for the slits and folds. |
| `seal` | 40 mm round sticker: ink and the mark. |
| `office-sign` | The sign beside the corridor door, redesigned from the old white acrylic one on the model of a slate with brass letters: «14 / الدور الأول» and the lockup above; hours, licences and contacts below in Arabic and English, the QR in the middle. **The size (100 × 65 cm) is an estimate from the photograph. Confirm it.** |
| `entrance-sign` | 40 × 80 cm portrait slate: the number above, the lockup below. No direction is written. |
| `nameplate` | 220 × 60 mm desk plate. |
| `reception-wall` | The lockup in brass letters on an ink panel (240 × 90 cm, drawn at 1:10). |
| `billboard` | 12 × 4 m (1:10). The line «فهمٌ يُسابق الرأْي» as large as the board allows, and the lockup. **The only piece that carries the line.** |
| `mupi` | City-light panel 120 × 180 cm (1:5). |
| `roll-up` | 85 × 200 cm (1:5): the six service pillars and a QR; the lowest 25 cm is hidden by the base. |
| `poster` | A3, the five questions set in type alone. |
| `badge` | Staff card CR80 portrait (54 × 86). The 24 mm circle is for the photograph. |
| `lanyard` | 20 × 900 mm. |
| `notebook` | Hard-cover A5, flat. Ink cloth and the mark in brass foil. |

## Files

- `print-ready/*.pdf` — for the printer. **Each page = trim size + 3 mm bleed on every side.** Fonts are embedded. One page per face (front, then back).
- `proofs-with-guides/*-guides.pdf` — the same with the **trim (cyan)** and a **4 mm safe margin (red)** drawn on. For checking only; never print these.
- `presentation/board-1…4.png` — the four boards (1920 × 1200).

Large pieces are drawn at a reduced scale (noted above); a large-format printer enlarges the vector PDF to full size. The QR codes are vector.

## What to tell the printer

- **Stock:** business cards and small cards on **uncoated, warm-white 400–450 gsm**; the ink side with a **soft-touch laminate**. Letterhead, notepad, slip: **120 gsm uncoated** (paper tone `#FAF7F0`).
- **Brass foil** on: the lockup on the folder, the notebook's mark, and the business card's lockup if foil is wanted there. In the PDFs brass is the flat colour `#C4A04E`: **give the printer one spot colour (Pantone 871 C or their house brass)** and ask them to separate it.
- **Blind emboss** (folder front): no ink; the shape is the grey mark drawn in the PDF.
- **Signs:** brass letters, cut out, **held 3 mm off an ink-painted panel**. The reference is a slate; the identity's ink is a deep navy-black, so ask for a swatch.
- **Ink:** `#00061D`. On uncoated paper a deep ink moves the most between press and proof: ask for a **hard proof**. Printed from a screen-RGB PDF: ask the printer to convert to their CMYK profile and show the proof before the run.
- The QR is dark on light (or on a bone tile), never in foil.

## Facts on the pieces (change them in `components/stationery/` if they change)

Name, role, phone `+966 56 677 0888`, `info@taap.sa`, `taap.sa`, address (Floor 1, Office 14, Abu Bakr Al Siddiq Branch Road, Al Yasmin, Riyadh 13326), licence 4477, unified no. 7030708403, hours (Sun – Thu 8 AM – 5 PM, Sat 10 AM – 2 PM, Fri closed).
**The old office sign said «Saturday to Thursday, 8:00 AM to 8:00 PM»; the new one uses the hours on the website. Confirm which is right.**
The business card carries one person (Turki AlNaif); copy the component for another partner.

## Regenerating

With the development server running (`npm run dev`), print each page from `/stationery/<piece>` (`?guides=1` for the proof) with headless Chrome:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-pdf-header-footer \
  --print-to-pdf=docs/stationery/print-ready/business-card.pdf http://localhost:3000/stationery/business-card
```

`/stationery` shows the four boards. These routes exist **only in development** (404 in production).
