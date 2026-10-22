import type { Metadata } from "next";
import { PayQuick } from "@/components/pages/PayViews";

export const metadata: Metadata = {
  title: "Pay the firm an amount",
  robots: { index: false, follow: false },
  alternates: { canonical: "/en/pay/quick", languages: { ar: "/pay/quick", en: "/en/pay/quick" } },
};

export const dynamic = "force-dynamic";

export default async function PayQuickPage({ searchParams }: { searchParams: Promise<{ e?: string; amount?: string; purpose?: string }> }) {
  const { e, amount, purpose } = await searchParams;
  return <PayQuick locale="en" error={e} amount={amount} purpose={purpose} />;
}
