import type { Metadata } from "next";
import "../globals.css";
import { blogFont, brandFont, fallbackFont } from "../fonts";
import Header from "@/components/Header";
import SmoothScroll from "@/components/SmoothScroll";
import CursorGlow from "@/components/CursorGlow";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import WhatsAppContext from "@/components/WhatsAppContext";
import Footer from "@/components/Footer";
import { firm } from "@/lib/site";
import { homeDescription, homeTitle, siteJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(firm.website),
  title: {
    default: homeTitle.ar,
    template: `%s | ${firm.nameShortAr}`,
  },
  description: homeDescription.ar,
  alternates: { canonical: "/", languages: { ar: "/", en: "/en", "x-default": "/" } },
  icons: {
    icon: "/favicon.ico",
    apple: "/brand/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: firm.nameShortAr,
    title: homeTitle.ar,
    description: homeDescription.ar,
    url: firm.website,
    images: [{ url: "/brand/riyadh-kafd.jpg", width: 1920, height: 1080, alt: firm.nameAr }],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle.ar,
    description: homeDescription.ar,
    images: ["/brand/riyadh-kafd.jpg"],
  },
};

const jsonLd = siteJsonLd("ar");

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${brandFont.variable} ${fallbackFont.variable} ${blogFont.variable} h-full antialiased`}
    >
      <head>
        <meta property="og:locale" content="ar_SA" />
        <meta property="og:locale:alternate" content="en_US" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll />
        <WhatsAppContext />
        <CursorGlow />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat label="تواصل عبر واتساب" />
      </body>
    </html>
  );
}
