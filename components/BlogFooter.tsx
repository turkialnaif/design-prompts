"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import SocialIcons from "@/components/SocialIcons";
import { firm } from "@/lib/site";

const copy = {
  ar: { alt: `${firm.nameShortAr} — ${firm.nameEn}`, address: firm.address, phone: "الهاتف", mail: "البريد الإلكتروني", place: "عنوان المكتب" },
  en: { alt: `${firm.nameShortAr} — ${firm.nameEn}`, address: firm.addressEn, phone: "Phone", mail: "Email", place: "Office address" },
};

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const icons = {
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.800 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
};

function Plate({ href, icon, label, children, ltr, i, external }: { href: string; icon: keyof typeof icons; label: string; children: string; ltr?: boolean; i: number; external?: boolean }) {
  return (
    <a
      href={href}
      aria-label={`${label}: ${children}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      style={{ transitionDelay: `${700 + i * 140}ms` }}
      className="bf-item bf-plate chamfer group relative flex flex-col items-center gap-4 border border-[#e0b35a]/25 bg-white/[0.035] px-6 py-8 text-center"
    >
      <span aria-hidden className="bf-plate-sheen pointer-events-none absolute inset-0" />
      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#e0b35a]/50 text-[#f6e2b3] transition-all duration-500 group-hover:scale-110 group-hover:border-[#e0b35a] group-hover:bg-[#e0b35a] group-hover:text-[#00061d]">
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden {...stroke}>{icons[icon]}</svg>
      </span>
      <span dir={ltr ? "ltr" : undefined} className="font-display text-lg font-light leading-8 text-white md:text-xl">{children}</span>
    </a>
  );
}

/**
 * The blog's footer, and nothing but what a reader needs to reach the firm: the lockup, the social accounts, the phone, the email and the address.
 * It closes the page as the mark does: a brass lintel on top, two along the bottom, a pool of light and a little gold dust rising between.
 * Everything arrives once, as the footer scrolls into view.
 */
export default function BlogFooter({ locale }: { locale: "ar" | "en" }) {
  const t = copy[locale];
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <footer ref={root} className="bf relative isolate overflow-hidden bg-[#00061d] text-white" aria-label={locale === "ar" ? "تواصل" : "Contact"}>
      {/* the light, the stars and the dust */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_50%_30%,rgba(40,84,220,0.34),transparent_72%),radial-gradient(ellipse_40%_35%_at_50%_100%,rgba(224,179,90,0.22),transparent_72%)]" />
        <div className="absolute inset-0 opacity-45 [background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1.2px)] [background-size:34px_34px] [mask-image:radial-gradient(ellipse_70%_80%_at_50%_45%,#000,transparent_78%)]" />
        {/* gold dust rising slowly, never the same twice */}
        {Array.from({ length: 16 }).map((_, i) => (
          <span
            key={i}
            className="bf-dust absolute rounded-full bg-[#f6e2b3]"
            style={{ left: `${(i * 37 + 11) % 97}%`, bottom: `${(i * 23) % 40}%`, width: 2 + (i % 3), height: 2 + (i % 3), animationDelay: `${(i * 0.9) % 7}s`, animationDuration: `${9 + (i % 5) * 2}s` }}
          />
        ))}
      </div>

      {/* the lintel on top, drawn from the middle outward, with the diamond that closes the site's headings */}
      <div aria-hidden className="relative h-px">
        <span className="bf-rule absolute inset-0 bg-gradient-to-r from-transparent via-[#e0b35a] to-transparent" />
        <span className="absolute left-1/2 top-1/2 block h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#e0b35a] shadow-[0_0_0_5px_#00061d,0_0_26px_4px_rgba(224,179,90,0.7)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pb-36 pt-20 text-center md:pb-44 md:pt-28">
        <div className="bf-item bf-logo relative mx-auto w-fit" style={{ transitionDelay: "150ms" }}>
          <Image src="/brand/logo-lockup.png" alt={t.alt} width={326} height={96} className="h-20 w-auto md:h-28" />
          <span aria-hidden className="bf-shine pointer-events-none absolute inset-0" />
        </div>

        <div className="bf-item mt-12 flex justify-center" style={{ transitionDelay: "450ms" }}>
          <SocialIcons
            tone="onDark"
            className="!gap-4 justify-center"
            iconSize={22}
            buttonClass="flex h-14 w-14 items-center justify-center rounded-full border border-[#e0b35a]/45 text-[#f6e2b3] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#e0b35a] hover:bg-[#e0b35a] hover:text-[#00061d] hover:shadow-[0_14px_30px_-10px_rgba(224,179,90,0.8)]"
          />
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-4 md:mt-16 md:grid-cols-3 md:gap-6">
          <Plate i={0} icon="phone" label={t.phone} href={`tel:${firm.phone}`} ltr>{firm.phoneDisplay}</Plate>
          <Plate i={1} icon="mail" label={t.mail} href={`mailto:${firm.email}`} ltr>{firm.email}</Plate>
          <Plate i={2} icon="pin" label={t.place} href={firm.mapsUrl} external>{t.address}</Plate>
        </div>
      </div>

      {/* the mark's two lintels, as the foot of the page */}
      <div aria-hidden className="absolute inset-x-0 bottom-0">
        <span className="bf-lintel mx-auto block h-3 w-[78%] bg-[#e0b35a]" style={{ transitionDelay: "900ms" }} />
        <span className="bf-lintel block h-5 w-full bg-gradient-to-r from-[#c99a3c] via-[#f6e2b3] to-[#c99a3c]" style={{ transitionDelay: "1050ms" }} />
      </div>
    </footer>
  );
}
