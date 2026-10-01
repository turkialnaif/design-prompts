import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { documents, matters } from "@/lib/db/schema";
import { getClientUser } from "@/lib/auth/session";
import { storeGet } from "@/lib/erp/storage";
import { audit } from "@/lib/audit";

export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
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
  if (!row) return new Response("Not found", { status: 404 });
  if (row.doc.storageKind === "s3e") return Response.redirect(new URL(`/portal/documents/open/${id}`, req.url), 307);
  const bytes = await storeGet(row.doc.storageKind, row.doc.storageKey);
  await audit({ id: cu.id, name: cu.fullName, kind: "client" }, "document_viewed", "document", id, { name: row.doc.name });
  return new Response(new Uint8Array(bytes), {
    headers: {
      "Content-Type": row.doc.mimeType,
      "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(row.doc.name)}`,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-store",
    },
  });
}
