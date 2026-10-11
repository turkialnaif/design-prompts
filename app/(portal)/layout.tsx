import type { Metadata } from "next";
import "../globals.css";
import { arabicFont, brandFont, fallbackFont } from "../fonts";

export const metadata: Metadata = {
  title: { default: "بوابة العملاء", template: "%s | بوابة العملاء" },
  robots: { index: false, follow: false, nocache: true },
};

export default function PortalRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${arabicFont.variable} ${brandFont.variable} ${fallbackFont.variable} h-full antialiased`}>
      <body className="min-h-full bg-[linear-gradient(160deg,#f3ead2_0%,#fbf9f3_45%,#eceff2_100%)] text-ink">{children}</body>
    </html>
  );
}
