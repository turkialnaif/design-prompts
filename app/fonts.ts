import localFont from "next/font/local";
import { Zain } from "next/font/google";

/**
 * The site's Arabic face: Watad (watad.otf), one weight. It is declared for Arabic and its punctuation only (the
 * unicode-range below), so Latin letters and digits come from the next face in the stack. Because it has no bold
 * cut, browsers must not synthesise one: globals.css sets `font-synthesis: none` and adds a hairline stroke
 * where text is meant to be heavier.
 */
export const arabicFont = localFont({
  src: [{ path: "./fonts/watad.otf", weight: "100 900", style: "normal" }],
  variable: "--font-ar",
  display: "swap",
  declarations: [
    {
      prop: "unicode-range",
      value: "U+0600-06FF, U+0750-077F, U+08A0-08FF, U+FB50-FDFF, U+FE70-FEFF, U+00AB, U+00BB, U+2013-2014",
    },
  ],
});

/** Latin letters and digits (English pages, and numbers and names inside Arabic text): Zain, variable cut. */
export const brandFont = localFont({
  src: [{ path: "./fonts/zain-vf.ttf", weight: "100 900", style: "normal" }],
  variable: "--font-brand-raw",
  display: "swap",
});

/** Google's Zain stays behind both as a quiet fallback for any glyph they lack (arrows, Persian letters). */
export const fallbackFont = Zain({
  variable: "--font-brand-fallback",
  subsets: ["arabic", "latin"],
  weight: ["400"],
  preload: false,
});

/**
 * Hail Elastic: the blog's own face, for the blog hero, the blog band on the home page, and article titles and cards only.
 * Everything else stays on Watad. Watad stays behind it in the stack for any glyph Hail lacks.
 */
export const blogFont = localFont({
  src: [{ path: "./fonts/hail-elastic-light.ttf", weight: "200 900", style: "normal" }],
  variable: "--font-blog",
  display: "swap",
});
