import type { Metadata } from "next";
import "../globals.css";
import { arabicFont, brandFont, fallbackFont } from "../fonts";

export const metadata: Metadata = {
  title: { default: "نظام إدارة المكتب", template: "%s | نظام إدارة المكتب" },
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${arabicFont.variable} ${brandFont.variable} ${fallbackFont.variable} h-full antialiased`}>
      <body className="min-h-full bg-[linear-gradient(160deg,#f3ead2_0%,#fbf9f3_40%,#eceff2_100%)] bg-fixed text-ink">{children}</body>
    </html>
  );
}
