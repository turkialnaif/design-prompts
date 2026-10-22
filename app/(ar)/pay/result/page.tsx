import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الدفع الإلكتروني",
  robots: { index: false, follow: false },
  alternates: { canonical: "/pay", languages: { ar: "/pay", en: "/en/pay" } },
};
import { PayResult } from "@/components/pages/PayViews";
import { settleOrder } from "@/lib/pay";

export const dynamic = "force-dynamic";

/** The gateway returns the client here with ?ref=<order>. We never trust the URL: the order is read back from the API. */
export default async function PayResultPage({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  const { ref } = await searchParams;
  let r: Awaited<ReturnType<typeof settleOrder>> = { ok: false, invoiceId: null, number: null, amount: 0, state: "UNKNOWN" };
  if (ref) {
    try {
      r = await settleOrder(ref);
    } catch {
      /* the gateway or the database was unreachable: show the neutral "not completed" page, the daily /api/cron/payments settles orders whose client never came back */
    }
  }
  return <PayResult locale="ar" ok={r.ok} number={r.number} amount={r.amount} invoiceId={r.invoiceId} />;
}
