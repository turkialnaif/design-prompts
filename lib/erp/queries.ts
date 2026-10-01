import "server-only";
import { and, desc, eq, inArray, or, sql, type SQL } from "drizzle-orm";
import { db } from "@/lib/db";
import { matterTeam, matters } from "@/lib/db/schema";
import { seesAllMatters } from "@/lib/auth/perms";
import type { Staff } from "@/lib/auth/session";

/** شرط رؤية القضايا: المسؤول/الشريك/المحاسب يرون الكل، والباقون قضاياهم فقط. */
export async function matterScope(user: Staff): Promise<SQL | undefined> {
  if (seesAllMatters(user.role)) return undefined;
  const d = await db();
  const teamIds = d.select({ id: matterTeam.matterId }).from(matterTeam).where(eq(matterTeam.userId, user.id));
  return or(eq(matters.responsibleId, user.id), inArray(matters.id, teamIds));
}

export async function canSeeMatter(user: Staff, matterId: string): Promise<boolean> {
  const scope = await matterScope(user);
  const d = await db();
  const [row] = await d
    .select({ id: matters.id })
    .from(matters)
    .where(scope ? and(eq(matters.id, matterId), scope) : eq(matters.id, matterId))
    .limit(1);
  return !!row;
}

export async function nextMatterNumber(): Promise<string> {
  const d = await db();
  const year = new Date().getFullYear();
  const [row] = await d
    .select({ n: sql<number>`count(*)::int` })
    .from(matters)
    .where(sql`${matters.number} like ${year + "-%"}`);
  return `${year}-${String((row?.n ?? 0) + 1).padStart(4, "0")}`;
}

export { desc };
