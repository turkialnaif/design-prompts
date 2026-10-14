import { suppressEmail } from "@/lib/prospects/engine";

export const dynamic = "force-dynamic";

/**
 * خطّاف Resend: ارتداد البريد أو الشكوى يوقف الجهة فورًا ويحمي سمعة النطاق.
 * أضف في Resend ← Webhooks العنوان /api/outreach/webhook?secret=… واختر email.bounced وemail.complained،
 * وضع القيمة نفسها في OUTREACH_WEBHOOK_SECRET.
 */
export async function POST(req: Request) {
  const secret = process.env.OUTREACH_WEBHOOK_SECRET;
  if (!secret || new URL(req.url).searchParams.get("secret") !== secret) return new Response("Unauthorized", { status: 401 });
  const ev = (await req.json().catch(() => null)) as { type?: string; data?: { to?: string[] | string } } | null;
  if (!ev?.type || !["email.bounced", "email.complained"].includes(ev.type)) return Response.json({ ok: true, ignored: true });
  const to = ([] as string[]).concat(ev.data?.to ?? []);
  let n = 0;
  for (const e of to) n += await suppressEmail(e, ev.type === "email.bounced" ? "bounce" : "complaint");
  return Response.json({ ok: true, updated: n });
}
