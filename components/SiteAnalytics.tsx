"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";
import { Analytics } from "@vercel/analytics/next";
import GoogleTag from "@/components/GoogleTag";
import { gtagEvent } from "@/lib/gtag";

/**
 * Visit measurement: Vercel Web Analytics (no cookies, no cross-site tracking, no visitor profile) plus five events
 * for what matters to the firm: a WhatsApp, phone or email button pressed, the profile PDF opened, and a matter brief sent
 * (that last one is sent from the form itself). Events carry only the page path, never anything typed by the visitor.
 * The Google tag (campaign measurement) is separate (GoogleTag) and receives the same events.
 */
export default function SiteAnalytics() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") ?? a.href;
      const page = location.pathname;
      if (href.includes("wa.me/")) {
        track("whatsapp_click", { page });
        gtagEvent("whatsapp_click", { page });
      } else if (href.startsWith("tel:")) {
        track("phone_click", { page });
        gtagEvent("phone_click", { page });
      } else if (href.startsWith("mailto:")) {
        track("email_click", { page });
        gtagEvent("email_click", { page });
      } else if (/\.pdf($|\?)/i.test(href)) {
        const file = href.split("/").pop() ?? "";
        track("pdf_download", { page, file });
        gtagEvent("pdf_download", { page, file });
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return (
    <>
      <Analytics />
      <GoogleTag />
    </>
  );
}
