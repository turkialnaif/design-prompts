# Turki AlNaif & Partners — stationery

**The idea: the golden thread.** A single hairline of gold leaves every piece *past its own edge* — the visual form of the line
«فهمٌ يُسابق الرأْي» (understanding that runs ahead of opinion). Laid side by side, the pieces read as one continuous line; each
carries three small diamonds (the three columns of the mark, in miniature). Nothing else is decorative.

Each piece also does a job, so the stationery is itself marketing:

| Piece | The job it does |
|---|---|
| Business card | Side A (Arabic): the name in light on deep navy, the city rising from the foot, the thread leaving through the edge. Side B (English and details): a navy panel with the foil mark and a QR («Send your brief») that opens `taap.sa/contact` tagged `utm_medium=business-card`, so Analytics shows which card brought a visitor. |
| "Five questions before you sign" card | A leave-behind useful on its own: five questions to ask before signing any contract. The firm is on the back of something the reader keeps. |
| Appointment card | The practical card handed over at the end of a first call: write the date, and what to bring (ID, contracts, a written summary). |
| Letterhead | The thread runs down the start edge and ends at a gold seal that turns it into the top edge of a deep-navy footer (the city, the address, the contacts, the licence numbers). Its two diamonds sit at **99 mm and 198 mm** — exactly the third-folds — so the identity doubles as the fold guide for a DL envelope; a short tick at 148.5 mm marks the filing punch. |
| Envelope (front and liner) | Front: the lockup, a small foil mark at the end of the thread. The inside is deep navy, a field of marks, the thread, and one line: «مُغلَق بسرية مهنية» / *Sealed in professional confidence*. |
| Compliments slip | Lockup, thread, and a QR tagged `utm_medium=compliments-slip`; the page is left clear for the handwritten note. |
| A5 notepad | Ruled page; the thread is its margin. |
| Matter-file folder (flat) | Front: the large foil mark and, under the thread, the firm's full lockup in gold. One thread crosses front, spine and back, above the contact panel. Back: the city, the address, a QR tagged `utm_medium=folder`. |
| Seal sticker, 40 mm | Closes an envelope or a bound document. |

## Files

- `print-ready/*.pdf` — for the printer. **Each page = trim size + 3 mm bleed on every side** (the PDF page is the bleed size; the printer trims 3 mm off each side. The files carry no separate TrimBox). Fonts are embedded. One page per face (front, then back).
- `proofs-with-guides/*-guides.pdf` — the same files with the **trim (cyan)** and a **4 mm safe margin (red dashed)** drawn on. For checking only; never print these.
- `presentation/board-1…3.png` — the three boards to show the set (1920 × 1200): the stationery, the folder and cards, and the signage and the workplace.

## Signage and the workplace

| Piece | What it is |
|---|---|
| `billboard` | 12 × 4 m (drawn at 1:10). The mark at monumental scale, its longest column landing on the thread; «فهمٌ يُسابق الرأْي» set as large as the board allows; one address: `taap.sa`. No phone number on a billboard: nobody can dial it at 80 km/h. |
| `mupi` | City-light panel 120 × 180 cm (1:5), with a QR tagged `utm_medium=mupi`. |
| `roll-up` | 85 × 200 cm (1:5): the six service pillars and a QR. The lowest 25 cm of a roll-up is hidden by its base, so nothing important is placed there. |
| `poster` | A3 «Five questions before you sign» in giant form (lobby piece and leave-behind). |
| `door-plate` | 300 × 100 mm, «مكتب 14 / الدور الأول». |
| `entrance-sign` | 600 × 300 mm, for the south-facing entrance. **Check the arrow's direction against the door before it is made**; the arrow is a drawn element and can be flipped. |
| `nameplate` | 220 × 60 mm desk plate. |
| `reception-wall` | 240 × 90 cm (1:10): the lockup in brass letters on a navy panel. |
| `badge` | Staff card, CR80 portrait 54 × 86 mm. The 24 mm circle on the front is for the photograph. |
| `lanyard` | 20 mm × 900 mm. |
| `notebook` | Hard-cover A5 notebook, flat (back, 10 mm spine, front). |

Large-format pieces are drawn at a reduced scale (noted above). A large-format printer enlarges the vector PDF to full size; there is no raster image in them except the small QR codes (vector) and, on the folder back, the photograph of the city.

## Sizes (trim)

| Piece | Trim | With bleed |
|---|---|---|
| Business card, appointment card, "five questions" card | 90 × 55 mm | 96 × 61 mm |
| Letterhead | 210 × 297 mm (A4) | 216 × 303 mm |
| Envelope (DL, flat) | 220 × 110 mm | 226 × 116 mm |
| Compliments slip | 210 × 99 mm | 216 × 105 mm |
| A5 notepad page | 148 × 210 mm | 154 × 216 mm |
| Folder, flat (front + 8 mm spine + back) | 448 × 310 mm | 454 × 316 mm |
| Seal | 40 × 40 mm (die-cut round) | 46 × 46 mm |

## What to tell the printer

- **Stock:** business cards, appointment and "five questions" cards on **uncoated, warm-white 400–450 gsm** (cotton or a soft-touch laminate on the navy side). Letterhead, notepad and slip on **120 gsm uncoated, bright white** (the file's paper tone is `#FBF9F4`). Folder on 350 gsm, matt lamination.
- **Hot-foil gold** on: the mark and the "TAAP" wordmark on the navy side of the business card; the thread on navy faces; the seal's rings and ring text; the folder's front mark and spine. In the PDFs the foil areas are drawn as a metallic gradient (to show the intent) or as a flat gold `#D8AE55` (type). **Give the printer one spot colour (Pantone 871 C or their house gold) for all foil**, and ask them to separate it from the PDF.
- **Navy:** `#00124A` (ink) and `#00061D` (deep). Ask for a navy proof on the real stock: on uncoated paper deep navy is the colour that moves most.
- **Do not** print the QR in foil; keep it ink on the paper tone (it is).
- Printed from a screen-RGB PDF: ask the printer to convert to their CMYK profile and show a **hard proof of the navy and the gold** before the run.

## Facts that are on the pieces (change them in `components/stationery/` if they change)

Name, role, phone `+966 56 677 0888`, `info@taap.sa`, `taap.sa`, address (Floor 1, Office 14, Abu Bakr Al Siddiq Branch Road, Al Yasmin, Riyadh 13326), licence no. 4477, unified no. 7030708403, opening hours.
**The business card carries one person (Turki AlNaif).** For another partner or associate, copy the card component and change the name, role and number; the QR can keep the same tag.

## Regenerating

Development server running, then print each page from `/stationery/<piece>` (add `?guides=1` for the proof) with headless Chrome:

```bash
npm run dev
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-pdf-header-footer \
  --print-to-pdf=docs/stationery/print-ready/business-card.pdf http://localhost:3000/stationery/business-card
```

Pieces: `business-card`, `questions-card`, `appointment-card`, `letterhead`, `envelope`, `compliments`, `notepad`, `folder`, `seal`, `billboard`, `mupi`, `roll-up`, `poster`, `door-plate`, `entrance-sign`, `nameplate`, `reception-wall`, `badge`, `lanyard`, `notebook`.
`/stationery` shows the two presentation boards. These routes exist **only in development** (they return 404 in production).
