import type { Metadata } from "next";
import "../globals.css";
import { arabicFont, brandFont, fallbackFont } from "../fonts";

export const metadata: Metadata = {
  title: { default: "عرض الأتعاب", template: "%s | تركي النايف وشركاؤه" },
  robots: { index: false, follow: false, nocache: true },
};

export default function ProposalRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${arabicFont.variable} ${brandFont.variable} ${fallbackFont.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#f4efe4] text-[#00124a]">{children}</body>
    </html>
  );
}
