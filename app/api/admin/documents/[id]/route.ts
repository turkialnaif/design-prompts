import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { documents } from "@/lib/db/schema";
import { getStaff } from "@/lib/auth/session";
import { can } from "@/lib/auth/perms";
import { canSeeMatter } from "@/lib/erp/queries";
import { storeGet } from "@/lib/erp/storage";
import { audit } from "@/lib/audit";

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const user = await getStaff();
  if (!user || !can(user.role, "docs:read")) return new Response("Unauthorized", { status: 401 });
  const { id } = await ctx.params;
  const d = await db();
  const [doc] = await d.select().from(documents).where(eq(documents.id, id)).limit(1);
  if (!doc) return new Response("Not found", { status: 404 });
  if (doc.matterId && !(await canSeeMatter(user, doc.matterId))) return new Response("Forbidden", { status: 403 });
  if (doc.storageKind === "s3e") return Response.redirect(new URL(`/admin/documents/open/${id}`, _req.url), 307);
  const bytes = await storeGet(doc.storageKind, doc.storageKey);
  await audit({ id: user.id, name: user.fullName }, "document_viewed", "document", id, { name: doc.name });
  const inline = /^(application\/pdf|image\/)/.test(doc.mimeType);
  return new Response(new Uint8Array(bytes), {
    headers: {
      "Content-Type": doc.mimeType,
      "Content-Disposition": `${inline ? "inline" : "attachment"}; filename*=UTF-8''${encodeURIComponent(doc.name)}`,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-store",
    },
  });
}
