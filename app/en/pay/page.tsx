import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online payment",
  robots: { index: false, follow: false },
  alternates: { canonical: "/en/pay", languages: { ar: "/pay", en: "/en/pay" } },
};
import { PayLookup } from "@/components/pages/PayViews";

export const dynamic = "force-dynamic";

export default async function PayPage({ searchParams }: { searchParams: Promise<{ e?: string }> }) {
  const { e } = await searchParams;
  return <PayLookup locale="en" error={e} />;
}
