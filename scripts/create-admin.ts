import { eq } from "drizzle-orm";
import { db } from "../lib/db";
import { users } from "../lib/db/schema";
import { hashPassword, passwordProblems } from "../lib/auth/crypto";

const [username, password, ...nameParts] = process.argv.slice(2);
const fullName = nameParts.join(" ") || username;
if (!username || !password) {
  console.error("Usage: tsx scripts/create-admin.ts <username> <password> [full name]");
  process.exit(1);
}
const problem = passwordProblems(password);
if (problem) {
  console.error(problem);
  process.exit(1);
}
async function main() {
  const d = await db();
  const [exists] = await d.select({ id: users.id }).from(users).where(eq(users.username, username)).limit(1);
  if (exists) {
    console.error("Username already exists.");
    process.exit(1);
  }
  await d.insert(users).values({ username, fullName, role: "admin", passwordHash: await hashPassword(password), mustChangePassword: true });
  console.log(`Admin "${username}" created. Password change is required at first login.`);
  process.exit(0);
}
main();
