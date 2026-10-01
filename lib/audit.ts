import "server-only";
import { db } from "@/lib/db";
import { auditLog } from "@/lib/db/schema";
import { requestMeta } from "@/lib/auth/session";

export async function audit(
  actor: { id?: string; name?: string; kind?: "staff" | "client" } | null,
  action: string,
  entityType?: string,
  entityId?: string,
  meta?: Record<string, unknown>,
) {
  const { ip } = await requestMeta();
  const d = await db();
  await d.insert(auditLog).values({
    actorKind: actor?.kind ?? "staff",
    actorId: actor?.id,
    actorName: actor?.name,
    action,
    entityType,
    entityId,
    meta: meta ?? null,
    ip,
  });
}
