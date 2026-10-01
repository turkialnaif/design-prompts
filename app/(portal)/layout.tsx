import type { Metadata } from "next";
import { Alexandria } from "next/font/google";
import "../globals.css";

const font = Alexandria({ variable: "--font-brand-raw", subsets: ["arabic", "latin"], weight: ["300", "400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: { default: "بوابة العملاء", template: "%s | بوابة العملاء" },
  robots: { index: false, follow: false, nocache: true },
};

export default function PortalRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${font.variable} h-full antialiased`}>
      <body className="min-h-full bg-[linear-gradient(160deg,#f3ead2_0%,#fbf9f3_45%,#eceff2_100%)] text-ink">{children}</body>
    </html>
  );
}
