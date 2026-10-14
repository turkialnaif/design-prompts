"use client";

import { useEffect } from "react";

const KEY = "taap_first_touch";

/** يحفظ أول زيارة للمتصفح (UTM وصفحة الدخول والمُحيل) ليُرفق بالموجز: هكذا نعرف أي محتوى أو حملة جلب العميل. لا يخزن شيئًا شخصيًا. */
export default function Attribution() {
  useEffect(() => {
    try {
      if (localStorage.getItem(KEY)) return;
      const q = new URLSearchParams(location.search);
      const utm: Record<string, string> = {};
      for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
        const v = q.get(k);
        if (v) utm[k] = v.slice(0, 120);
      }
      let referrer = "";
      try {
        const r = new URL(document.referrer);
        if (r.hostname !== location.hostname) referrer = r.hostname;
      } catch {}
      localStorage.setItem(KEY, JSON.stringify({ utm, path: location.pathname, referrer, t: Date.now() }));
    } catch {}
  }, []);
  return null;
}

export function readAttribution(): { utm?: Record<string, string>; path?: string; referrer?: string } | undefined {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}
