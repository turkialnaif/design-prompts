"use client";

export default function PrintButton() {
  return (
    <button onClick={() => window.print()} className="rounded-xl bg-[#12233a] px-5 py-2.5 text-sm font-semibold text-white">
      طباعة / حفظ PDF
    </button>
  );
}
