import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { documents, matters } from "@/lib/db/schema";
import { getClientUser } from "@/lib/auth/session";
import { deriveKey } from "@/lib/auth/crypto";
import { presignGet } from "@/lib/erp/storage";
import { audit } from "@/lib/audit";

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const cu = await getClientUser();
  if (!cu) return new Response("Unauthorized", { status: 401 });
  const { id } = await ctx.params;
  const d = await db();
  const [row] = await d
    .select({ doc: documents })
    .from(documents)
    .innerJoin(matters, eq(documents.matterId, matters.id))
    .where(and(eq(documents.id, id), eq(documents.sharedWithClient, true), eq(matters.clientId, cu.clientId)))
    .limit(1);
  if (!row || row.doc.storageKind !== "s3e") return new Response("Not found", { status: 404 });
  await audit({ id: cu.id, name: cu.fullName, kind: "client" }, "document_viewed", "document", id, { name: row.doc.name, direct: true });
  return Response.json(
    { url: await presignGet(row.doc.storageKey), key: deriveKey(`doc:${row.doc.id}`).toString("base64"), name: row.doc.name, mime: row.doc.mimeType },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
