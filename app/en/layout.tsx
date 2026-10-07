import type { Metadata } from "next";
import "../globals.css";
import { brandFont, fallbackFont } from "../fonts";
import HeaderEn from "@/components/HeaderEn";
import SmoothScroll from "@/components/SmoothScroll";
import CursorGlow from "@/components/CursorGlow";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import FooterEn from "@/components/FooterEn";
import { firm } from "@/lib/site";
import { homeDescription, siteJsonLd } from "@/lib/seo";
import { firmEn } from "@/lib/site.en";

export const metadata: Metadata = {
  metadataBase: new URL(firm.website),
  title: {
    default: `${firmEn.nameShort} | Corporate & Commercial Lawyers in Riyadh`,
    template: `%s | ${firmEn.nameShort}`,
  },
  description: homeDescription.en,
  alternates: { canonical: "/en", languages: { ar: "/", en: "/en", "x-default": "/" } },
  icons: {
    icon: "/favicon.ico",
    apple: "/brand/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: firmEn.nameShort,
    title: `${firmEn.nameShort} | Corporate & Commercial Lawyers in Riyadh`,
    description: homeDescription.en,
    url: `${firm.website}/en`,
    images: [{ url: "/brand/riyadh-kafd.jpg", width: 1920, height: 1080, alt: firmEn.nameShort }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${firmEn.nameShort} | Corporate & Commercial Lawyers in Riyadh`,
    description: homeDescription.en,
    images: ["/brand/riyadh-kafd.jpg"],
  },
};

const jsonLd = siteJsonLd("en");

export default function RootLayoutEn({ children }: LayoutProps<"/en">) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${brandFont.variable} ${fallbackFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll />
        <CursorGlow />
        <HeaderEn />
        <main className="flex-1">{children}</main>
        <FooterEn />
        <WhatsAppFloat label="Chat on WhatsApp" topLabel="Back to top" />
      </body>
    </html>
  );
}
