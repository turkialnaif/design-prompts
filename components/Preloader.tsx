"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const tagline = { ar: "القانون وُجد لتنظيم الحياة لا لتعقيدها", en: "Law exists to organise life, not to complicate it" };

/** Short branded intro, once per browser session. It is pure CSS timing (see .preloader), so it hides itself and never blocks the page content. */
// Module scope survives client-side navigations, so coming back to the home page never replays the intro.
let played = false;

export default function Preloader({ locale }: { locale: "ar" | "en" }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const seen = played;
    played = true;
    try {
      if (seen || sessionStorage.getItem("taap-intro")) {
        if (ref.current) ref.current.style.display = "none";
      } else sessionStorage.setItem("taap-intro", "1");
    } catch {}
  }, []);
  if (played) return null;
  return (
    <div ref={ref} aria-hidden className="preloader">
      <div className="preloader-inner px-6">
        <Image src="/brand/logo-lockup.png" alt="" width={326} height={96} priority className="mx-auto h-16 w-auto md:h-20" />
        <p className="mt-6 text-lg font-light text-white/90 md:text-2xl">{tagline[locale]}</p>
        <span className="preloader-count" dir="ltr" />
      </div>
    </div>
  );
}
