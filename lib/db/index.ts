import path from "node:path";
import { drizzle as drizzlePg, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "@/lib/db/schema";

export type DB = NodePgDatabase<typeof schema>;

const g = globalThis as unknown as { __tnzDb?: Promise<DB> };

// Neon's Vercel integration prefixes its variables (here "storage_"), so accept those too.
const dbUrl = () => process.env.DATABASE_URL || process.env.storage_DATABASE_URL || process.env.storage_POSTGRES_URL || process.env.POSTGRES_URL;

async function create(): Promise<DB> {
  const url = dbUrl();
  if (url) {
    const pool = new Pool({ connectionString: url, max: 5 });
    return drizzlePg(pool, { schema });
  }
  if (process.env.NODE_ENV === "production" && !process.env.ALLOW_LOCAL_DB) {
    throw new Error("DATABASE_URL is required in production.");
  }
  // Local development only: embedded Postgres (PGlite), persisted under .data/
  const { PGlite } = await import("@electric-sql/pglite");
  const { drizzle } = await import("drizzle-orm/pglite");
  const { migrate } = await import("drizzle-orm/pglite/migrator");
  const dataDir = path.join(process.cwd(), ".data", "pglite");
  (await import("node:fs")).mkdirSync(path.dirname(dataDir), { recursive: true });
  const client = new PGlite(dataDir);
  const lite = drizzle(client, { schema });
  await migrate(lite, { migrationsFolder: path.join(process.cwd(), "drizzle") });
  return lite as unknown as DB;
}

export const dbConfigured = () => !!dbUrl() || process.env.NODE_ENV !== "production" || !!process.env.ALLOW_LOCAL_DB;

export function db(): Promise<DB> {
  g.__tnzDb ??= create();
  return g.__tnzDb;
}

export { schema };
