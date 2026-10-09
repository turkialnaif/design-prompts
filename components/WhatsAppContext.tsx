"use client";

import { useEffect } from "react";

const BASE = "https://wa.me/966566770888";

/**
 * Every WhatsApp button on the site opens a blank chat, so the firm cannot tell which page the visitor came from.
 * When a visitor presses one, this adds a short opening message that names the page, so the first message in the
 * chat arrives with its context. It sets nothing before the press, stores nothing and sends nothing anywhere itself.
 */
export default function WhatsAppContext() {
  useEffect(() => {
    const add = (e: Event) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || !a.href.startsWith(BASE) || a.href.includes("text=")) return;
      const en = document.documentElement.lang === "en";
      const title = document.title.split("|")[0].trim();
      const text = en
        ? `Hello, I would like to ask about a legal matter. I am writing from this page: ${title} — ${location.href}`
        : `السلام عليكم، أود الاستفسار عن مسألة قانونية. أتواصل معكم من هذه الصفحة: ${title} — ${location.href}`;
      a.href = `${BASE}?text=${encodeURIComponent(text)}`;
    };
    // capture phase and pointerdown, so the address is final before the browser follows the link or copies it
    document.addEventListener("pointerdown", add, true);
    document.addEventListener("click", add, true);
    document.addEventListener("keydown", add, true);
    return () => {
      document.removeEventListener("pointerdown", add, true);
      document.removeEventListener("click", add, true);
      document.removeEventListener("keydown", add, true);
    };
  }, []);
  return null;
}
