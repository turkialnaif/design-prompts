"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const tagline = {
  ar: { quote: "«ما يمكننا فعله هو تشجيع قوة القانون»", by: "سمو ولي العهد الأمير محمد بن سلمان، حفظه الله" },
  en: { quote: "“What we can do is to encourage the power of law.”", by: "HRH Crown Prince Mohammed bin Salman" },
};

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
        <p className="mx-auto mt-7 max-w-3xl text-xl font-light leading-[1.7] text-white/95 md:text-4xl">{tagline[locale].quote}</p>
        <p className="mt-4 text-base font-light text-[#f6e2b3] md:text-xl">{tagline[locale].by}</p>
        <span className="preloader-count" dir="ltr" />
      </div>
    </div>
  );
}
