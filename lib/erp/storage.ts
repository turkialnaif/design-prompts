import "server-only";
import fs from "node:fs";
import path from "node:path";
import { DeleteObjectCommand, GetObjectCommand, HeadObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { del, get, put } from "@vercel/blob";
import { decryptBytes, encryptBytes, randomToken } from "@/lib/auth/crypto";

/** "s3e" = uploaded straight from the browser, already encrypted there (envelope: per-document key derived from the master key). */
export type StorageKind = "local" | "blob" | "s3" | "s3e";

export const hasS3 = () => !!(process.env.S3_BUCKET && process.env.S3_ACCESS_KEY_ID && process.env.S3_SECRET_ACCESS_KEY);
const hasBlob = () => !!process.env.BLOB_READ_WRITE_TOKEN;
const localDir = () => path.join(process.cwd(), ".data", "files");

let s3: S3Client | null = null;
function client() {
  s3 ??= new S3Client({
    region: process.env.S3_REGION || "auto",
    endpoint: process.env.S3_ENDPOINT || undefined,
    forcePathStyle: !!process.env.S3_ENDPOINT,
    // Keep presigned URLs plain: newer SDK defaults add checksum headers a browser PUT does not send.
    requestChecksumCalculation: "WHEN_REQUIRED",
    responseChecksumValidation: "WHEN_REQUIRED",
    credentials: { accessKeyId: process.env.S3_ACCESS_KEY_ID!, secretAccessKey: process.env.S3_SECRET_ACCESS_KEY! },
  });
  return s3;
}

/** كل الملفات تُشفَّر (AES-256-GCM) في الخادم قبل أن تغادره، أيًّا كان مكان التخزين. */
export async function storePut(bytes: Buffer): Promise<{ kind: StorageKind; key: string }> {
  const enc = encryptBytes(bytes);
  if (hasS3()) {
    const key = `docs/${randomToken(16)}.bin`;
    await client().send(new PutObjectCommand({ Bucket: process.env.S3_BUCKET, Key: key, Body: enc, ContentType: "application/octet-stream" }));
    return { kind: "s3", key };
  }
  if (hasBlob()) {
    const r = await put(`docs/${randomToken(12)}.bin`, enc, { access: "private", addRandomSuffix: true, contentType: "application/octet-stream" });
    return { kind: "blob", key: r.pathname };
  }
  if (process.env.NODE_ENV === "production" && !process.env.ALLOW_LOCAL_DB) {
    throw new Error("لم يُضبط مخزن الملفات (S3 أو Blob).");
  }
  fs.mkdirSync(localDir(), { recursive: true });
  const key = randomToken(16);
  fs.writeFileSync(path.join(localDir(), key), enc, { mode: 0o600 });
  return { kind: "local", key };
}

export async function storeGet(kind: StorageKind, key: string): Promise<Buffer> {
  if (kind === "s3e") throw new Error("Direct-upload documents are decrypted in the browser.");
  if (kind === "s3") {
    const res = await client().send(new GetObjectCommand({ Bucket: process.env.S3_BUCKET, Key: key }));
    if (!res.Body) throw new Error("Object not found");
    return decryptBytes(Buffer.from(await res.Body.transformToByteArray()));
  }
  if (kind === "blob") {
    const res = await get(key, { access: "private" });
    if (!res || !res.stream) throw new Error("Blob not found");
    return decryptBytes(Buffer.from(await new Response(res.stream).arrayBuffer()));
  }
  return decryptBytes(fs.readFileSync(path.join(localDir(), key.replace(/[^A-Za-z0-9_-]/g, ""))));
}

export async function storeDelete(kind: StorageKind, key: string) {
  if (kind === "s3" || kind === "s3e") {
    await client().send(new DeleteObjectCommand({ Bucket: process.env.S3_BUCKET, Key: key })).catch(() => undefined);
    return;
  }
  if (kind === "blob") {
    await del(key).catch(() => undefined);
    return;
  }
  fs.rmSync(path.join(localDir(), key.replace(/[^A-Za-z0-9_-]/g, "")), { force: true });
}

/* ---------------------------- direct (browser ⇄ bucket) ---------------------------- */
export const directUploadEnabled = () => hasS3();

/** Short-lived URL the browser PUTs the already-encrypted bytes to. The exact size and type are signed. */
export function presignPut(key: string, contentLength: number, expiresIn = 600) {
  return getSignedUrl(
    client(),
    new PutObjectCommand({ Bucket: process.env.S3_BUCKET, Key: key, ContentType: "application/octet-stream", ContentLength: contentLength }),
    { expiresIn },
  );
}

export function presignGet(key: string, expiresIn = 300) {
  return getSignedUrl(client(), new GetObjectCommand({ Bucket: process.env.S3_BUCKET, Key: key }), { expiresIn });
}

export async function headSize(key: string): Promise<number | null> {
  try {
    const r = await client().send(new HeadObjectCommand({ Bucket: process.env.S3_BUCKET, Key: key }));
    return r.ContentLength ?? null;
  } catch {
    return null;
  }
}
