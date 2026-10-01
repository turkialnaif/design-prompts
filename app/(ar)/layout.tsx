import type { Metadata } from "next";
import { Alexandria, Aref_Ruqaa } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import SmoothScroll from "@/components/SmoothScroll";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Footer from "@/components/Footer";
import { firm } from "@/lib/site";

// One geometric multi-weight family for the whole site — the closest
// license-free match to the "Tanseek"-style corporate identity type
// referenced by the firm (Tanseek itself is a proprietary commercial
// font and can't be legally embedded).
const brandFont = Alexandria({
  variable: "--font-brand-raw",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const ruqaaFont = Aref_Ruqaa({
  variable: "--font-ruqaa",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(firm.website),
  title: {
    default: `${firm.nameAr} | محاماة واستشارات قانونية في الرياض`,
    template: `%s | ${firm.nameShortAr}`,
  },
  description: firm.tagline,
  alternates: { canonical: "/", languages: { ar: "/", en: "/en" } },
  icons: {
    icon: "/favicon.ico",
    apple: "/brand/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: firm.nameShortAr,
    title: `${firm.nameAr} | محاماة واستشارات قانونية في الرياض`,
    description: firm.tagline,
    url: firm.website,
    images: [{ url: "/brand/riyadh-kafd.jpg", width: 1920, height: 1080, alt: firm.nameAr }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${firm.nameAr} | محاماة واستشارات قانونية في الرياض`,
    description: firm.tagline,
    images: ["/brand/riyadh-kafd.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: firm.nameAr,
  alternateName: firm.nameEn,
  description: firm.tagline,
  url: firm.website,
  email: firm.email,
  telephone: firm.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "الرياض",
    addressCountry: "SA",
  },
  areaServed: "SA",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${brandFont.variable} ${ruqaaFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat label="تواصل عبر واتساب" />
      </body>
    </html>
  );
}
