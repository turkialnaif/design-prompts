import { createCipheriv, createDecipheriv, createHash, createHmac, hkdfSync, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

let cachedKey: Buffer | null = null;

function getKey(): Buffer {
  if (cachedKey) return cachedKey;
  const env = process.env.APP_ENC_KEY;
  if (env) {
    const k = Buffer.from(env, "base64");
    if (k.length !== 32) throw new Error("APP_ENC_KEY must be 32 bytes (base64).");
    cachedKey = k;
    return k;
  }
  if (process.env.NODE_ENV === "production" && !process.env.ALLOW_LOCAL_DB) throw new Error("APP_ENC_KEY is required in production.");
  const dir = path.join(process.cwd(), ".data");
  const file = path.join(dir, "dev.key");
  fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(file)) fs.writeFileSync(file, randomBytes(32).toString("base64"), { mode: 0o600 });
  cachedKey = Buffer.from(fs.readFileSync(file, "utf8"), "base64");
  return cachedKey;
}

/** AES-256-GCM. Output layout: iv(12) | tag(16) | ciphertext */
export function encryptBytes(plain: Buffer): Buffer {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", getKey(), iv);
  const enc = Buffer.concat([cipher.update(plain), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), enc]);
}

export function decryptBytes(blob: Buffer): Buffer {
  const iv = blob.subarray(0, 12);
  const tag = blob.subarray(12, 28);
  const data = blob.subarray(28);
  const decipher = createDecipheriv("aes-256-gcm", getKey(), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(data), decipher.final()]);
}

export const encryptText = (s: string) => encryptBytes(Buffer.from(s, "utf8")).toString("base64");
export const decryptText = (s: string) => decryptBytes(Buffer.from(s, "base64")).toString("utf8");

export function hmac(data: string): string {
  return createHmac("sha256", getKey()).update(data).digest("base64url");
}

/** A distinct 32-byte key per context (e.g. one document), derived from the master key — nothing extra to store. */
export function deriveKey(context: string): Buffer {
  return Buffer.from(hkdfSync("sha256", getKey(), Buffer.from("tnz-doc-v1"), Buffer.from(context), 32));
}

export const sha256 = (s: string) => createHash("sha256").update(s).digest("hex");
export const randomToken = (bytes = 32) => randomBytes(bytes).toString("base64url");

const N = 16384;
const R = 8;
const P = 1;

function scryptAsync(password: string, salt: Buffer, len: number): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, len, { N, r: R, p: P, maxmem: 64 * 1024 * 1024 }, (err, key) => (err ? reject(err) : resolve(key)));
  });
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const key = await scryptAsync(password, salt, 64);
  return `scrypt$${N}$${R}$${P}$${salt.toString("base64")}$${key.toString("base64")}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [algo, , , , saltB64, keyB64] = stored.split("$");
  if (algo !== "scrypt" || !saltB64 || !keyB64) return false;
  const expected = Buffer.from(keyB64, "base64");
  const actual = await scryptAsync(password, Buffer.from(saltB64, "base64"), expected.length);
  return timingSafeEqual(actual, expected);
}

export function passwordProblems(password: string): string | null {
  if (password.length < 10) return "كلمة المرور يجب ألا تقل عن ١٠ أحرف.";
  if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) return "يجب أن تحتوي كلمة المرور على حروف وأرقام.";
  return null;
}
