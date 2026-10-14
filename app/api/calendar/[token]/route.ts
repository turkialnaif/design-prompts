import { buildIcs, userByToken } from "@/lib/calendar/ics";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const user = await userByToken(token.replace(/\.ics$/i, ""));
  if (!user) return new Response("Not found", { status: 404, headers: { "x-robots-tag": "noindex" } });
  return new Response(await buildIcs(user), {
    headers: { "content-type": "text/calendar; charset=utf-8", "content-disposition": 'inline; filename="taap-calendar.ics"', "cache-control": "private, max-age=300", "x-robots-tag": "noindex, nofollow" },
  });
}
