"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ children, className = "", pendingText = "جارٍ الحفظ…" }: { children: React.ReactNode; className?: string; pendingText?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#12233a] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#d0a751] hover:text-[#0a1420] disabled:opacity-60 ${className}`}
    >
      {pending ? pendingText : children}
    </button>
  );
}
