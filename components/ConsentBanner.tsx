"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { CONSENT_KEY, GOOGLE_TAG_ID, OPEN_SETTINGS_EVENT } from "@/lib/gtag";

type Choice = "granted" | "denied";

const copy = {
  ar: {
    title: "ملفات تعريف الارتباط",
    body: "نستخدم وسم قوقل لقياس أداء حملاتنا الإعلانية، وهو يضع ملفات ارتباط. لن نفعّله إلا بموافقتكم.",
    accept: "أوافق",
    reject: "أرفض",
    more: "سياسة الخصوصية",
    href: "/privacy",
    label: "موافقة على ملفات تعريف الارتباط",
  },
  en: {
    title: "Cookies",
    body: "We use the Google tag to measure our advertising campaigns; it sets cookies. We switch it on only with your consent.",
    accept: "Accept",
    reject: "Reject",
    more: "Privacy policy",
    href: "/en/privacy",
    label: "Cookie consent",
  },
};

/** Removes the cookies the Google tag set, when consent is withdrawn. */
function clearGoogleCookies() {
  const host = location.hostname;
  const domains = [host, `.${host}`, `.${host.replace(/^www\./, "")}`];
  for (const part of document.cookie.split("; ")) {
    const name = part.split("=")[0];
    if (!/^(_ga|_gid|_gcl|_gac)/.test(name)) continue;
    for (const d of domains) document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${d}`;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
}

/**
 * The cookie notice and the loader of the Google tag. The tag is not requested at all until the visitor presses Accept;
 * a stored "denied" keeps it off. Consent Mode starts denied and is updated to granted before the tag is configured.
 */
const CHANGED = "taap:cookie-consent-changed";
const subscribe = (cb: () => void) => {
  window.addEventListener(CHANGED, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(CHANGED, cb);
    window.removeEventListener("storage", cb);
  };
};
const readChoice = (): Choice | null => {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
};

export default function ConsentBanner() {
  const t = copy[usePathname()?.startsWith("/en") ? "en" : "ar"];
  // undefined on the server and during hydration, so nothing flashes before the stored choice is read
  const choice = useSyncExternalStore<Choice | null | undefined>(subscribe, readChoice, () => undefined);
  const [reopened, setReopened] = useState(false);
  // The first-visit notice waits until the page has loaded and settled, so it never competes with the hero for first paint.
  const [settled, setSettled] = useState(false);
  const open = (settled && choice === null) || reopened;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const arm = () => {
      timer = setTimeout(() => setSettled(true), 2500);
    };
    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });
    return () => {
      window.removeEventListener("load", arm);
      if (timer) clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const reopen = () => setReopened(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, reopen);
  }, []);

  const decide = (c: Choice) => {
    try {
      localStorage.setItem(CONSENT_KEY, c);
    } catch {}
    if (c === "denied") {
      (window as unknown as Record<string, unknown>)[`ga-disable-${GOOGLE_TAG_ID}`] = true;
      const g = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
      if (g) g("consent", "update", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied" });
      clearGoogleCookies();
    } else {
      delete (window as unknown as Record<string, unknown>)[`ga-disable-${GOOGLE_TAG_ID}`];
    }
    setReopened(false);
    window.dispatchEvent(new Event(CHANGED));
  };

  return (
    <>
      {choice === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`} strategy="afterInteractive" />
          <Script id="google-tag" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});
gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});
gtag('js',new Date());gtag('config','${GOOGLE_TAG_ID}');`}
          </Script>
        </>
      )}
      {open && (
        <div
          role="dialog"
          aria-label={t.label}
          className="fixed inset-x-2 bottom-2 z-[60] rounded-xl border border-white/15 bg-[#00124a] p-3 text-white shadow-2xl sm:inset-x-auto sm:bottom-5 sm:left-24 sm:w-[25rem] sm:p-5"
        >
          <p className="text-[12px] font-light leading-5 text-white/90 sm:text-[13px] sm:leading-6">
            <span className="font-normal text-[#f6e2b3]">{t.title}. </span>
            {t.body}{" "}
            <Link href={t.href} className="inline-flex min-h-6 items-center underline underline-offset-4 hover:text-white">
              {t.more}
            </Link>
          </p>
          <div className="mt-2 flex gap-2 sm:mt-3 sm:gap-3">
            <button
              type="button"
              onClick={() => decide("granted")}
              className="min-h-11 flex-1 rounded-md bg-[#e0b35a] px-5 text-sm font-normal text-[#00124a] transition-colors hover:bg-[#f6e2b3] sm:flex-none sm:px-6"
            >
              {t.accept}
            </button>
            <button
              type="button"
              onClick={() => decide("denied")}
              className="min-h-11 flex-1 rounded-md border border-white/40 px-5 text-sm font-normal text-white transition-colors hover:bg-white/10 sm:flex-none sm:px-6"
            >
              {t.reject}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
