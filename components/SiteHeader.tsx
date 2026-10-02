"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LoginMenu from "@/components/LoginMenu";
import { firm } from "@/lib/site";
import { arToEnHref, enToArHref } from "@/lib/locale-switch";

const copy = {
  ar: {
    home: "/",
    nav: [
      { href: "/", label: "الرئيسية" },
      { href: "/about", label: "من نحن" },
      { href: "/services", label: "الخدمات" },
      { href: "/blog", label: "مقالات قانونية" },
      { href: "/contact", label: "تواصل معنا" },
    ],
    book: "احجز استشارة",
    menu: "فتح القائمة",
    switchLabel: "EN",
    switchLong: "English",
    alt: `${firm.nameShortAr} — ${firm.nameEn}`,
    adminLong: "دخول إدارة المكتب",
    portalLong: "بوابة العملاء",
  },
  en: {
    home: "/en",
    nav: [
      { href: "/en", label: "Home" },
      { href: "/en/about", label: "About" },
      { href: "/en/services", label: "Services" },
      { href: "/blog", label: "Legal Insights (Arabic)" },
      { href: "/en/contact", label: "Contact" },
    ],
    book: "Book a Consultation",
    menu: "Open menu",
    switchLabel: "AR",
    switchLong: "العربية",
    alt: `${firm.nameShortAr} — Turki AlNaif & Partners`,
    adminLong: "Firm management sign-in",
    portalLong: "Client portal",
  },
};

/**
 * One chamfered navy glass bar, fixed to the top on every page. At the top of a page it carries the
 * logo, the links and the actions; once scrolled it shrinks and the links fold away into a menu
 * button that opens the same links as a panel. "For companies" and "Leadership" live in the footer only.
 */
export default function SiteHeader({ locale }: { locale: "ar" | "en" }) {
  const t = copy[locale];
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => (href === t.home ? pathname === href : pathname.startsWith(href));
  const switchHref = locale === "ar" ? arToEnHref(pathname) : enToArHref(pathname);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
      <div
        className={`bar-bg mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 text-white transition-[padding] duration-300 md:px-6 ${
          scrolled ? "py-2 md:py-2.5" : "py-3 md:py-4"
        }`}
      >
        <Link href={t.home} className="group flex shrink-0 items-center">
          <span
            className="inline-block transition-transform duration-500 ease-out group-hover:[transform:perspective(400px)_rotateY(6deg)_scale(1.03)]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <Image src="/brand/logo-lockup.png" alt={t.alt} width={163} height={48} className={`w-auto transition-[height] duration-300 ${scrolled ? "h-8 md:h-9" : "h-10 md:h-12"}`} priority />
          </span>
        </Link>

        {!scrolled && (
          <nav className="hidden items-center gap-5 whitespace-nowrap xl:gap-8 lg:flex">
            {t.nav.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative whitespace-nowrap py-1 text-[14px] font-normal transition-colors xl:text-[15px] after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-center after:bg-[#f4932c] after:transition-transform ${
                    active ? "text-[#f6e2b3] after:scale-x-100" : "text-white/85 after:scale-x-0 hover:text-white hover:after:scale-x-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        )}

        <div className="flex items-center gap-2 xl:gap-3">
          <div className="hidden items-center gap-2 lg:flex xl:gap-3">
            <LoginMenu locale={locale} />
            <Link
              href={switchHref}
              className="chamfer-btn whitespace-nowrap border border-white/30 px-3.5 py-2 text-xs font-normal text-white/90 transition-colors hover:bg-white/10 hover:text-white"
              style={{ borderRadius: 0 }}
            >
              {t.switchLabel}
            </Link>
            <a
              href={firm.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="chamfer-btn flex items-center gap-2.5 whitespace-nowrap bg-white px-4 py-2.5 text-[14px] font-normal text-[#00124a] transition-colors hover:bg-[#f6e2b3] xl:px-5"
            >
              <span aria-hidden className="grid h-3.5 w-3.5 grid-cols-3 gap-px">
                {Array.from({ length: 9 }).map((_, i) => (
                  <i key={i} className="bg-[#00124a]" />
                ))}
              </span>
              {t.book}
            </a>
          </div>

          <button
            aria-label={t.menu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`chamfer-btn grid h-10 w-10 place-items-center bg-white text-[#00124a] transition-colors hover:bg-[#f6e2b3] ${scrolled ? "" : "lg:hidden"}`}
          >
            <span aria-hidden className="grid h-4 w-4 grid-cols-3 gap-[2px]">
              {Array.from({ length: 9 }).map((_, i) => (
                <i key={i} className={`bg-[#00124a] transition-opacity ${open && i % 2 ? "opacity-20" : ""}`} />
              ))}
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav className="chamfer-lg mx-auto mt-2 flex max-w-7xl flex-col gap-1 bg-[#00124a]/92 px-5 py-4 text-white backdrop-blur-xl" style={{ ["--c" as string]: "18px" }}>
          {t.nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-3 text-base font-normal hover:bg-white/10 ${isActive(link.href) ? "text-[#f6e2b3]" : "text-white/90"}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={firm.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="chamfer-btn mt-2 bg-white px-5 py-3 text-center text-sm font-normal text-[#00124a]"
          >
            {t.book}
          </a>
          <a href="/admin/login" className="mt-1 px-3 py-2.5 text-center text-sm text-[#f6e2b3] hover:bg-white/10">{t.adminLong}</a>
          <a href="/portal/login" className="px-3 py-2.5 text-center text-sm text-white/80 hover:bg-white/10">{t.portalLong}</a>
          <Link href={switchHref} className="px-3 py-2.5 text-center text-sm text-white/70 hover:bg-white/10" onClick={() => setOpen(false)}>
            {t.switchLong}
          </Link>
        </nav>
      )}
    </header>
  );
}
