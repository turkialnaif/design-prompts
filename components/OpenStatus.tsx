"use client";

import { useSyncExternalStore } from "react";

type L = "ar" | "en";

/** Opening hours, Riyadh time (Sunday = 0): Sunday to Thursday 08:00-17:00, Saturday 10:00-14:00, Friday closed. Matches firm.hours. */
const WEEK: Record<number, [number, number] | null> = { 0: [8, 17], 1: [8, 17], 2: [8, 17], 3: [8, 17], 4: [8, 17], 5: null, 6: [10, 14] };

const DAYS = {
  ar: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
};

const hourLabel = (h: number, l: L) => (l === "ar" ? `${h > 12 ? h - 12 : h} ${h >= 12 ? "م" : "ص"}` : `${h > 12 ? h - 12 : h}:00 ${h >= 12 ? "PM" : "AM"}`);

/** "open|<closing hour>" or "closed|<day offset>|<day index>|<opening hour>"; a plain string so useSyncExternalStore can compare it. */
function snapshot(): string {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Riyadh", weekday: "short", hour: "numeric", hour12: false }).formatToParts(new Date());
  const wd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(parts.find((p) => p.type === "weekday")?.value ?? "Sun");
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0) % 24;
  const today = WEEK[wd];
  if (today && hour >= today[0] && hour < today[1]) return `open|${today[1]}`;
  for (let i = 0; i < 8; i++) {
    const d = (wd + i) % 7;
    const slot = WEEK[d];
    if (!slot) continue;
    if (i === 0 && hour >= slot[0]) continue; // today's hours are already over
    return `closed|${i}|${d}|${slot[0]}`;
  }
  return "closed|1|0|8";
}

const subscribe = (cb: () => void) => {
  const t = setInterval(cb, 60_000);
  return () => clearInterval(t);
};

/** A live "open now / opens …" line, worked out in Riyadh time in the visitor's browser (a quiet dot pulses while the office is open). */
export default function OpenStatus({ locale }: { locale: L }) {
  const snap = useSyncExternalStore(subscribe, snapshot, () => "");
  const ar = locale === "ar";
  let text = ar ? "الأحد – الخميس ٨ ص – ٥ م · السبت ١٠ ص – ٢ م" : "Sun – Thu 8 AM – 5 PM · Sat 10 AM – 2 PM";
  let open = false;
  if (snap.startsWith("open|")) {
    open = true;
    const close = Number(snap.split("|")[1]);
    text = ar ? `مكتبنا مفتوح الآن حتى ${hourLabel(close, "ar")}` : `We are open now until ${hourLabel(close, "en")}`;
  } else if (snap.startsWith("closed|")) {
    const [, off, day, from] = snap.split("|").map(Number);
    const when = off === 0 ? (ar ? "اليوم" : "today") : off === 1 ? (ar ? "غدًا" : "tomorrow") : DAYS[locale][day];
    text = ar ? `المكتب مغلق الآن · نفتح ${when} ${hourLabel(from, "ar")}` : `Closed now · we open ${when} at ${hourLabel(from, "en")}`;
  }
  return (
    <p className="flex items-center gap-2.5 text-sm font-light text-white/85" aria-live="polite">
      <span aria-hidden className="relative flex h-2.5 w-2.5">
        {open && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70 motion-reduce:hidden" />}
        <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${open ? "bg-emerald-400" : "bg-[#e0b35a]/70"}`} />
      </span>
      {text}
    </p>
  );
}
