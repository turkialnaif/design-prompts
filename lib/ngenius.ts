import "server-only";

/**
 * N-Genius Online (Network International, KSA) — hosted payment page.
 * The card number never reaches this site: we create an order, send the client to the bank's page,
 * and on return we read the order's state from the API (never from the redirect URL).
 *
 * Env (Vercel → Settings → Environment Variables, production):
 *   NGENIUS_API_KEY      portal → Settings → Integrations → Merchant Service accounts
 *   NGENIUS_OUTLET_REF   portal → Settings → Organisational Hierarchy → Outlet → Reference
 *   NGENIUS_API_BASE     optional, default https://api-gateway.ksa.ngenius-payments.com
 */

const BASE = (process.env.NGENIUS_API_BASE || "https://api-gateway.ksa.ngenius-payments.com").replace(/\/$/, "");

export const paymentsEnabled = () => !!(process.env.NGENIUS_API_KEY && process.env.NGENIUS_OUTLET_REF);

const outlet = () => process.env.NGENIUS_OUTLET_REF!;

async function accessToken(): Promise<string> {
  const res = await fetch(`${BASE}/identity/auth/access-token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${process.env.NGENIUS_API_KEY}`,
      "Content-Type": "application/vnd.ni-identity.v1+json",
      Accept: "application/vnd.ni-identity.v1+json",
    },
    cache: "no-store",
  });
  if (!res.ok) {
    console.error("ngenius token", res.status, (await res.text()).slice(0, 300));
    throw new Error(`ngenius token ${res.status}`);
  }
  const j = (await res.json()) as { access_token?: string };
  if (!j.access_token) throw new Error("ngenius token missing");
  return j.access_token;
}

const ni = (token: string) => ({
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/vnd.ni-payment.v2+json",
  Accept: "application/vnd.ni-payment.v2+json",
});

export type CreatedOrder = { reference: string; payUrl: string };

/** Creates a SALE order for `amountSar` (e.g. 1150.5) and returns the hosted-page URL. */
export async function createOrder(opts: {
  amountSar: number;
  merchantOrderReference: string;
  redirectUrl: string;
  cancelUrl: string;
  email?: string | null;
  language: "ar" | "en";
  data: Record<string, string>;
}): Promise<CreatedOrder> {
  const token = await accessToken();
  const body = (action: string) => ({
    action,
    amount: { currencyCode: "SAR", value: Math.round(opts.amountSar * 100) },
    merchantOrderReference: opts.merchantOrderReference,
    language: opts.language,
    ...(opts.email ? { emailAddress: opts.email } : {}),
    merchantAttributes: { redirectUrl: opts.redirectUrl, cancelUrl: opts.cancelUrl, skipConfirmationPage: true },
    merchantDefinedData: opts.data,
  });
  // the outlet decides which single-step action it allows: SALE where available, PURCHASE otherwise (never AUTH, which needs a manual capture)
  let last = 0;
  for (const action of ["SALE", "PURCHASE"]) {
    const res = await fetch(`${BASE}/transactions/outlets/${outlet()}/orders`, {
      method: "POST",
      headers: ni(token),
      body: JSON.stringify(body(action)),
      cache: "no-store",
    });
    if (res.ok) {
      const j = (await res.json()) as { reference?: string; _links?: { payment?: { href?: string } } };
      const payUrl = j._links?.payment?.href;
      if (!j.reference || !payUrl) throw new Error("ngenius order malformed");
      return { reference: j.reference, payUrl };
    }
    last = res.status;
    console.error("ngenius order", action, res.status, (await res.text()).slice(0, 400));
    if (res.status !== 422) break;
  }
  throw new Error(`ngenius order ${last}`);
}

export type OrderResult = {
  reference: string;
  state: string;
  paid: boolean;
  amountSar: number;
  currency: string;
  data: Record<string, string>;
  paymentId: string | null;
};

const PAID = new Set(["PURCHASED", "CAPTURED"]);

/** Reads an order from the gateway. `paid` is true only if the latest payment attempt succeeded. */
export async function getOrder(reference: string): Promise<OrderResult> {
  if (!/^[0-9a-f-]{20,64}$/i.test(reference)) throw new Error("bad order reference");
  const token = await accessToken();
  const res = await fetch(`${BASE}/transactions/outlets/${outlet()}/orders/${reference}`, { headers: ni(token), cache: "no-store" });
  if (!res.ok) {
    console.error("ngenius get", res.status, (await res.text()).slice(0, 300));
    throw new Error(`ngenius get ${res.status}`);
  }
  const j = (await res.json()) as {
    reference: string;
    amount?: { currencyCode?: string; value?: number };
    merchantDefinedData?: Record<string, string>;
    _embedded?: { payment?: { _id?: string; state?: string; amount?: { value?: number; currencyCode?: string } }[] };
  };
  const pays = j._embedded?.payment ?? [];
  const ok = pays.find((p) => PAID.has(String(p.state)));
  const last = ok ?? pays[pays.length - 1];
  const cents = ok?.amount?.value ?? j.amount?.value ?? 0;
  return {
    reference: j.reference,
    state: String(last?.state ?? "UNKNOWN"),
    paid: !!ok,
    amountSar: cents / 100,
    currency: ok?.amount?.currencyCode ?? j.amount?.currencyCode ?? "SAR",
    data: j.merchantDefinedData ?? {},
    paymentId: ok?._id ?? null,
  };
}
