import "server-only";
import { and, eq, ilike, ne, or } from "drizzle-orm";
import { db } from "@/lib/db";
import { clients, matterParties, matters } from "@/lib/db/schema";

export type Conflict = { kind: "party" | "client"; name: string; matterId?: string; matterNumber?: string; matterTitle?: string; clientName?: string; clientId?: string; role?: string };

const norm = (s: string) => s.trim().replace(/\s+/g, " ");

/** يبحث عن أسماء/هويات في خصوم القضايا الأخرى وفي العملاء. */
export async function findConflicts(names: { name: string; identifier?: string }[], excludeMatterId?: string, excludeClientId?: string): Promise<Conflict[]> {
  const d = await db();
  const out: Conflict[] = [];
  for (const n of names) {
    const name = norm(n.name);
    if (name.length < 3) continue;
    const like = `%${name}%`;
    const parties = await d
      .select({ p: matterParties, m: matters, c: clients })
      .from(matterParties)
      .innerJoin(matters, eq(matterParties.matterId, matters.id))
      .innerJoin(clients, eq(matters.clientId, clients.id))
      .where(
        and(
          excludeMatterId ? ne(matterParties.matterId, excludeMatterId) : undefined,
          or(ilike(matterParties.name, like), n.identifier ? eq(matterParties.identifier, n.identifier) : undefined),
        ),
      )
      .limit(10);
    for (const r of parties) {
      out.push({ kind: "party", name: r.p.name, role: r.p.role, matterId: r.m.id, matterNumber: r.m.number, matterTitle: r.m.title, clientName: r.c.name, clientId: r.c.id });
    }
    const cl = await d
      .select()
      .from(clients)
      .where(and(excludeClientId ? ne(clients.id, excludeClientId) : undefined, or(ilike(clients.name, like), n.identifier ? eq(clients.identifier, n.identifier) : undefined)))
      .limit(10);
    for (const c of cl) out.push({ kind: "client", name: c.name, clientId: c.id });
  }
  return out;
}
