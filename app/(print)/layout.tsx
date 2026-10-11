import type { Metadata } from "next";
import "../globals.css";
import { arabicFont, brandFont, fallbackFont } from "../fonts";

export const metadata: Metadata = {
  title: "الملف التعريفي",
  robots: { index: false, follow: false },
};

export default function PrintLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" className={`${arabicFont.variable} ${brandFont.variable} ${fallbackFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
