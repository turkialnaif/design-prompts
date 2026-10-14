import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { prospectContacts } from "@/lib/db/schema";
import { verifyOutreachUnsubscribe } from "@/lib/prospects/copy";
import { suppressEmail } from "@/lib/prospects/engine";

export const dynamic = "force-dynamic";

async function stop(id: string, t: string) {
  if (!/^[0-9a-f-]{36}$/i.test(id) || !verifyOutreachUnsubscribe(id, t)) return false;
  const d = await db();
  const [c] = await d.select().from(prospectContacts).where(eq(prospectContacts.id, id)).limit(1);
  if (!c) return false;
  if (c.email) await suppressEmail(c.email, "unsubscribe");
  else await d.update(prospectContacts).set({ unsubscribed: true, emailOn: false }).where(eq(prospectContacts.id, id));
  return true;
}

const page = (ok: boolean) =>
  new Response(
    `<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>إيقاف الرسائل</title><body style="font-family:Tahoma,Arial,sans-serif;background:#f4efe4;color:#00124a;display:grid;place-items:center;min-height:100vh;margin:0"><div style="background:#fff;padding:36px 32px;max-width:420px;text-align:center;border-top:4px solid #c4a04e"><h1 style="font-size:20px;margin:0 0 12px">${ok ? "تم إيقاف الرسائل" : "الرابط غير صالح"}</h1><p style="line-height:2;margin:0">${ok ? "لن تصلك رسائل منا بعد الآن. نعتذر عن الإزعاج، ونحن في خدمتك متى احتجت: taap.sa" : "تعذّر التحقق من الرابط. راسلنا على info@taap.sa وسنوقف الرسائل فورًا."}</p></div></body></html>`,
    { status: ok ? 200 : 400, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } },
  );

export async function GET(req: Request) {
  const u = new URL(req.url);
  return page(await stop(u.searchParams.get("c") ?? "", u.searchParams.get("t") ?? ""));
}

// One-click unsubscribe (RFC 8058) from mail clients.
export async function POST(req: Request) {
  const u = new URL(req.url);
  return page(await stop(u.searchParams.get("c") ?? "", u.searchParams.get("t") ?? ""));
}
