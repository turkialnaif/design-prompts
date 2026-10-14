"use client";

import { useState } from "react";

export default function CopyButton({ text, label = "نسخ" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 1800);
        } catch {
          window.prompt("انسخ النص:", text);
        }
      }}
      className="rounded-xl border border-[#d0a751] bg-[#d0a751]/15 px-4 py-2 text-sm font-bold text-[#7a5a14] transition hover:bg-[#d0a751]/30"
    >
      {done ? "تم النسخ ✓" : label}
    </button>
  );
}
