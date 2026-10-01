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
      { href: "/corporate-clients", label: "للشركات" },
      { href: "/team/turki-alnayef", label: "القيادة المهنية" },
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
      { href: "/en/corporate-clients", label: "Corporate Clients" },
      { href: "/en/team/turki-alnayef", label: "Leadership" },
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
 * Fixed glass header. On the home page it starts transparent over the hero and
 * turns into a shrunken frosted bar once the page is scrolled; on inner pages it
 * is always the frosted bar (sticky), and it shrinks the same way on scroll.
 */
export default function SiteHeader({ locale }: { locale: "ar" | "en" }) {
  const t = copy[locale];
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;
  const light = !solid; // transparent over the hero photograph, on every page
  const isActive = (href: string) => (href === t.home ? pathname === href : pathname.startsWith(href));
  const switchHref = locale === "ar" ? arToEnHref(pathname) : enToArHref(pathname);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        solid ? "bg-white/75 shadow-[0_14px_34px_-24px_rgba(20,30,50,0.55)] backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 transition-[padding] duration-300 ${scrolled ? "py-2" : "py-3.5 md:py-5"}`}>
        <Link href={t.home} className="group flex items-center">
          <span
            className="inline-block shrink-0 transition-transform duration-500 ease-out group-hover:[transform:perspective(400px)_rotateY(6deg)_scale(1.03)]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <Image
              src="/brand/logo-lockup.png"
              alt={t.alt}
              width={163}
              height={48}
              className={`w-auto transition-[height] duration-300 ${scrolled ? "h-9" : "h-11 md:h-14"}`}
              priority
            />
          </span>
        </Link>

        <nav className="hidden items-center gap-4 whitespace-nowrap xl:gap-6 lg:flex">
          {t.nav.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative whitespace-nowrap py-1 text-[13px] font-medium transition-colors xl:text-sm after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-center after:rounded-full after:bg-gold-deep after:transition-transform ${
                  active
                    ? `${light ? "text-[#f0d894]" : "text-gold-deep"} after:scale-x-100`
                    : `${light ? "text-white/90 hover:text-[#f0d894]" : "text-ink/80 hover:text-gold-deep"} after:scale-x-0 hover:after:scale-x-100`
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex xl:gap-3">
          <LoginMenu locale={locale} floating={!light} />
          <Link
            href={switchHref}
            className={`whitespace-nowrap rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors ${light ? "border-white/40 text-white/90 hover:text-[#f0d894]" : "border-ink/20 text-ink/70 hover:text-gold-deep"}`}
          >
            {t.switchLabel}
          </Link>
          <a
            href={firm.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={`whitespace-nowrap rounded-full px-4 py-2.5 text-[13px] font-semibold transition-colors xl:px-5 xl:text-sm ${light ? "bg-white text-ink hover:bg-[#f0d894]" : "bg-ink text-white hover:bg-gold-deep"}`}
          >
            {t.book}
          </a>
        </div>

        <button aria-label={t.menu} aria-expanded={open} className="flex flex-col gap-1.5 p-1 lg:hidden" onClick={() => setOpen((v) => !v)}>
          <span className={`h-0.5 w-6 ${light ? "bg-white" : "bg-gold-deep"} transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 ${light ? "bg-white" : "bg-gold-deep"} transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 ${light ? "bg-white" : "bg-gold-deep"} transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-gold/20 bg-white/95 px-5 py-4 lg:hidden">
          {t.nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-gold/10 ${isActive(link.href) ? "text-gold-deep" : "text-ink/85"}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={firm.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 rounded-full bg-ink px-5 py-2.5 text-center text-sm font-semibold text-white"
          >
            {t.book}
          </a>
          <a href="/admin/login" className="mt-1 rounded-lg px-3 py-2.5 text-center text-sm font-medium text-gold-deep hover:bg-gold/10">{t.adminLong}</a>
          <a href="/portal/login" className="rounded-lg px-3 py-2.5 text-center text-sm font-medium text-ink/70 hover:bg-gold/10">{t.portalLong}</a>
          <Link href={switchHref} className="mt-1 rounded-lg px-3 py-2.5 text-center text-sm font-medium text-ink/60 hover:bg-gold/10" onClick={() => setOpen(false)}>
            {t.switchLong}
          </Link>
        </nav>
      )}
    </header>
  );
}
