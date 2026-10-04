import localFont from "next/font/local";
import { Zain } from "next/font/google";

/**
 * The site's one face is Zain (mob300, the light cut) from public/… alfont. It is a single weight, so it is
 * declared for the whole 200–900 range: bold and extra-bold text renders in this same cut instead of the
 * browser faking a heavier one. Google's Zain stays behind it as a quiet fallback for any glyph the file lacks.
 */
export const brandFont = localFont({
  src: [{ path: "./fonts/zain-mob300.ttf", weight: "200 900", style: "normal" }],
  variable: "--font-brand-raw",
  display: "swap",
});

export const fallbackFont = Zain({
  variable: "--font-brand-fallback",
  subsets: ["arabic", "latin"],
  weight: ["400"],
});

/** Hail Elastic: the blog's face, for the blog hero and for article titles. */
export const blogFont = localFont({
  src: [{ path: "./fonts/hail-elastic-light.ttf", weight: "200 900", style: "normal" }],
  variable: "--font-blog",
  display: "swap",
});
