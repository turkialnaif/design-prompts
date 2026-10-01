import { randomInt } from "node:crypto";
import { eq } from "drizzle-orm";
import { db } from "../lib/db";
import { users } from "../lib/db/schema";
import { hashPassword } from "../lib/auth/crypto";

// Resets a staff user's password to a fresh random one, unlocks the account and forces a change at next login.
// Run from your own terminal with the production database URL:
//   DATABASE_URL="postgres://…" npx tsx scripts/reset-admin.ts [username]
const username = process.argv[2] || "turki";

const alphabet = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no look-alike characters
const group = () => Array.from({ length: 5 }, () => alphabet[randomInt(alphabet.length)]).join("");

async function main() {
  if (!process.env.DATABASE_URL && !process.env.storage_DATABASE_URL) {
    console.error("Set DATABASE_URL to the production database connection string first.");
    process.exit(1);
  }
  const password = `${group()}-${group()}-${group()}-${group()}`;
  const d = await db();
  const [u] = await d.select({ id: users.id }).from(users).where(eq(users.username, username)).limit(1);
  const passwordHash = await hashPassword(password);
  if (u) {
    await d.update(users).set({ passwordHash, mustChangePassword: true, failedLogins: 0, lockedUntil: null, isActive: true }).where(eq(users.id, u.id));
  } else if (username === "turki") {
    await d.insert(users).values({ username, fullName: "تركي النايف الشمري", role: "admin", passwordHash, mustChangePassword: true });
  } else {
    console.error(`User "${username}" does not exist.`);
    process.exit(1);
  }
  console.log(`\nUser:      ${username}\nPassword:  ${password}\n\nThe system will ask for a new password at first login. Save this one in your password manager, then clear your terminal.\n`);
  process.exit(0);
}
main();
