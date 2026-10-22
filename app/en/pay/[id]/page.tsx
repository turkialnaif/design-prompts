import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online payment",
  robots: { index: false, follow: false },
  alternates: { canonical: "/en/pay", languages: { ar: "/pay", en: "/en/pay" } },
};
import { notFound } from "next/navigation";
import { PayInvoice } from "@/components/pages/PayViews";
import { payableInvoice } from "@/lib/pay";

export const dynamic = "force-dynamic";

export default async function PayInvoicePage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ e?: string }> }) {
  const [{ id }, { e }] = await Promise.all([params, searchParams]);
  const invoice = await payableInvoice(id);
  if (!invoice) notFound();
  return <PayInvoice locale="en" invoice={invoice} error={e} />;
}
