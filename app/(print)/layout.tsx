import type { Metadata } from "next";
import { Zain, Aref_Ruqaa } from "next/font/google";
import "../globals.css";

const brandFont = Zain({
  variable: "--font-brand-raw",
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "700", "800", "900"],
});

const ruqaaFont = Aref_Ruqaa({
  variable: "--font-ruqaa",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "الملف التعريفي",
  robots: { index: false, follow: false },
};

export default function PrintLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" className={`${brandFont.variable} ${ruqaaFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
