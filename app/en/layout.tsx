import type { Metadata } from "next";
import "../globals.css";
import { arabicFont, blogFont, brandFont, fallbackFont, footerSans } from "../fonts";
import HeaderEn from "@/components/HeaderEn";
import SmoothScroll from "@/components/SmoothScroll";
import CursorGlow from "@/components/CursorGlow";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import WhatsAppContext from "@/components/WhatsAppContext";
import SiteAnalytics from "@/components/SiteAnalytics";
import Attribution from "@/components/Attribution";
import FooterEn from "@/components/FooterEn";
import FooterSwitch from "@/components/FooterSwitch";
import BlogFooter from "@/components/BlogFooter";
import { firm } from "@/lib/site";
import { homeDescription, siteJsonLd } from "@/lib/seo";
import { firmEn } from "@/lib/site.en";

export const metadata: Metadata = {
  metadataBase: new URL(firm.website),
  title: {
    default: `${firmEn.nameShort} | Riyadh Commercial Law Firm`,
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
    siteName: firmEn.nameShort,
    title: `${firmEn.nameShort} | Riyadh Commercial Law Firm`,
    description: homeDescription.en,
    url: `${firm.website}/en`,
    images: [{ url: "/brand/riyadh-kafd.jpg", width: 1920, height: 1080, alt: firmEn.nameShort }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${firmEn.nameShort} | Riyadh Commercial Law Firm`,
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
      className={`${arabicFont.variable} ${blogFont.variable} ${brandFont.variable} ${fallbackFont.variable} ${footerSans.variable} h-full antialiased`}
    >
      <head>
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="ar_SA" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll />
        <WhatsAppContext />
        <SiteAnalytics />
        <Attribution />
        <CursorGlow />
        <HeaderEn />
        <main className="flex-1">{children}</main>
        <FooterSwitch site={<FooterEn />} blog={<BlogFooter locale="en" />} />
        <WhatsAppFloat topLabel="Back to top" />
      </body>
    </html>
  );
}
