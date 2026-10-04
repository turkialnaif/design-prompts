import localFont from "next/font/local";
import { Zain } from "next/font/google";

/**
 * The site's official face: Zain, variable cut (zain-vf.ttf). It has one weight and one axis, `long` (0–800),
 * which stretches the connecting strokes of Arabic letters; 0 is the compact default, and the home hero
 * animates it. The file is declared for the whole 100–900 range, so bold text renders in this same cut instead
 * of the browser faking a heavier one. Google's Zain stays behind it as a quiet fallback for any glyph it lacks.
 */
export const brandFont = localFont({
  src: [{ path: "./fonts/zain-vf.ttf", weight: "100 900", style: "normal" }],
  variable: "--font-brand-raw",
  display: "swap",
});

export const fallbackFont = Zain({
  variable: "--font-brand-fallback",
  subsets: ["arabic", "latin"],
  weight: ["400"],
});

/** Hail Elastic: only the blog's hero and article titles (the blog hero, article headings and article cards). */
export const blogFont = localFont({
  src: [{ path: "./fonts/hail-elastic-light.ttf", weight: "200 900", style: "normal" }],
  variable: "--font-blog",
  display: "swap",
});
