import { and, eq, gt, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { auditLog } from "@/lib/db/schema";
import { paymentsEnabled } from "@/lib/ngenius";
import { settleOrder } from "@/lib/pay";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/** Safety net: orders created in the last 3 days whose client closed the browser before returning are read back and recorded. */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) return new Response("Unauthorized", { status: 401 });
  if (!paymentsEnabled()) return Response.json({ ok: true, skipped: "payments not configured" });
  const d = await db();
  const rows = await d
    .select({ meta: auditLog.meta })
    .from(auditLog)
    .where(and(eq(auditLog.action, "payment_order"), gt(auditLog.createdAt, sql`now() - interval '3 days'`)))
    .limit(200);
  let recorded = 0;
  let failed = 0;
  for (const r of rows) {
    const ref = (r.meta as { reference?: string } | null)?.reference;
    if (!ref) continue;
    try {
      const out = await settleOrder(ref);
      if (out.ok) recorded += 1;
    } catch {
      failed += 1;
    }
  }
  return Response.json({ ok: true, orders: rows.length, paid: recorded, failed });
}
