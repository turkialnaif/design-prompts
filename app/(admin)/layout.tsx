import type { Metadata } from "next";
import { Alexandria } from "next/font/google";
import "../globals.css";

const font = Alexandria({
  variable: "--font-brand-raw",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: { default: "نظام إدارة المكتب", template: "%s | نظام إدارة المكتب" },
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${font.variable} h-full antialiased`}>
      <body className="min-h-full bg-[linear-gradient(160deg,#f3ead2_0%,#fbf9f3_40%,#eceff2_100%)] bg-fixed text-ink">{children}</body>
    </html>
  );
}
