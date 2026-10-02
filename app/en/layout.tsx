import type { Metadata } from "next";
import { Zain, Aref_Ruqaa } from "next/font/google";
import "../globals.css";
import HeaderEn from "@/components/HeaderEn";
import SmoothScroll from "@/components/SmoothScroll";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import FooterEn from "@/components/FooterEn";
import { firm } from "@/lib/site";
import { firmEn } from "@/lib/site.en";

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
  metadataBase: new URL(firm.website),
  title: {
    default: `${firmEn.nameShort} | Corporate & Commercial Lawyers in Riyadh`,
    template: `%s | ${firmEn.nameShort}`,
  },
  description: firmEn.description,
  alternates: { canonical: "/en", languages: { ar: "/", en: "/en" } },
  icons: {
    icon: "/favicon.ico",
    apple: "/brand/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: firmEn.nameShort,
    title: `${firmEn.nameShort} | Corporate & Commercial Lawyers in Riyadh`,
    description: firmEn.description,
    url: `${firm.website}/en`,
    images: [{ url: "/brand/riyadh-kafd.jpg", width: 1920, height: 1080, alt: firmEn.nameShort }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${firmEn.nameShort} | Corporate & Commercial Lawyers in Riyadh`,
    description: firmEn.description,
    images: ["/brand/riyadh-kafd.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: firmEn.nameShort,
  alternateName: firm.nameAr,
  description: firmEn.tagline,
  url: `${firm.website}/en`,
  email: firm.email,
  telephone: firm.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Riyadh",
    addressCountry: "SA",
  },
  areaServed: "SA",
};

export default function RootLayoutEn({ children }: LayoutProps<"/en">) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${brandFont.variable} ${ruqaaFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll />
        <HeaderEn />
        <main className="flex-1">{children}</main>
        <FooterEn />
        <WhatsAppFloat label="Chat on WhatsApp" topLabel="Back to top" />
      </body>
    </html>
  );
}
