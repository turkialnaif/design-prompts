import { notFound } from "next/navigation";
import { Compliments, Continuation, EnvelopeFront, EnvelopeLiner, FolderSpread, Letterhead, Notepad, Seal } from "@/components/stationery/paper";
import { AppointmentBack, AppointmentFront, CardBack, CardFront, QuestionsBack, QuestionsFront } from "@/components/stationery/cards";

/** Print proofs of the stationery. Present in development only: the files for the printer are made from this route and kept in docs/stationery. */
const pieces: Record<string, { w: number; h: number; faces: (g: boolean) => React.ReactNode }> = {
  "business-card": { w: 90, h: 55, faces: (g) => (<><CardFront guides={g} /><CardBack guides={g} /></>) },
  "questions-card": { w: 90, h: 55, faces: (g) => (<><QuestionsFront guides={g} /><QuestionsBack guides={g} /></>) },
  letterhead: { w: 210, h: 297, faces: (g) => (<><Letterhead guides={g} /><Continuation guides={g} /></>) },
  envelope: { w: 220, h: 110, faces: (g) => (<><EnvelopeFront guides={g} /><EnvelopeLiner guides={g} /></>) },
  compliments: { w: 210, h: 99, faces: (g) => <Compliments guides={g} /> },
  notepad: { w: 148, h: 210, faces: (g) => <Notepad guides={g} /> },
  folder: { w: 448, h: 310, faces: (g) => <FolderSpread guides={g} /> },
  seal: { w: 40, h: 40, faces: (g) => <Seal guides={g} /> },
  "appointment-card": { w: 90, h: 55, faces: (g) => (<><AppointmentFront guides={g} /><AppointmentBack guides={g} /></>) },
};

export function generateStaticParams() {
  return Object.keys(pieces).map((piece) => ({ piece }));
}

export default async function StationeryPiece({ params, searchParams }: { params: Promise<{ piece: string }>; searchParams: Promise<{ guides?: string }> }) {
  if (process.env.NODE_ENV === "production") notFound();
  const { piece } = await params;
  const spec = pieces[piece];
  if (!spec) notFound();
  const { guides } = await searchParams;
  const b = 3;
  return (
    <main>
      <style>{`
        @page { size: ${spec.w + b * 2}mm ${spec.h + b * 2}mm; margin: 0; }
        html, body { margin: 0; padding: 0; background: #2b3042; }
        * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .stn-face { box-sizing: border-box; }
        .stn-face:last-child { break-after: auto !important; page-break-after: auto !important; }
        main { display: block; }
        @media screen { .stn-face { margin: 12px auto; box-shadow: 0 10px 40px rgba(0,0,0,0.5); } }
        /* Foil text is a gradient clipped to the glyphs on screen; in the print file it is set in the flat gold the printer foils over,
           because a clipped gradient is rasterised unevenly by some PDF viewers and RIPs. */
        @media print { [style*="clip: text"] { background: none !important; color: #c9a24a !important; -webkit-text-fill-color: #c9a24a !important; } }
        @media print { html, body { background: none; } .stn-face { margin: 0; box-shadow: none; } }
        main :where(p, h1, h2, h3) { margin: 0; }
      `}</style>
      {spec.faces(guides === "1")}
    </main>
  );
}
