"use client";

import { OPEN_SETTINGS_EVENT } from "@/lib/gtag";

/** Lets a visitor reopen the cookie notice from the privacy page and change their choice. */
export default function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))}
      className="min-h-11 rounded-md border border-[#00124a]/40 px-5 text-sm font-normal text-[#00124a] transition-colors hover:bg-[#00124a]/5"
    >
      {label}
    </button>
  );
}
