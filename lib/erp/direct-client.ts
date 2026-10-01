import { DIRECT_OVERHEAD } from "@/lib/erp/direct-config";

const b64 = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

async function aesKey(keyB64: string, usage: "encrypt" | "decrypt") {
  return crypto.subtle.importKey("raw", b64(keyB64), "AES-GCM", false, [usage]);
}

/** Encrypts in the browser (iv | ciphertext+tag) and PUTs the result to the signed URL, reporting progress. */
export async function encryptAndUpload(file: File, url: string, keyB64: string, onProgress: (pct: number) => void) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const enc = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, await aesKey(keyB64, "encrypt"), await file.arrayBuffer()));
  const body = new Uint8Array(12 + enc.length);
  body.set(iv, 0);
  body.set(enc, 12);
  if (body.length !== file.size + DIRECT_OVERHEAD) throw new Error("size");
  await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", url);
    xhr.setRequestHeader("Content-Type", "application/octet-stream");
    xhr.upload.onprogress = (e) => e.lengthComputable && onProgress(Math.round((e.loaded / e.total) * 100));
    xhr.onload = () => (xhr.status >= 200 && xhr.status < 300 ? resolve() : reject(new Error(`put ${xhr.status}`)));
    xhr.onerror = () => reject(new Error("network"));
    xhr.send(body);
  });
}

/** Downloads ciphertext from the signed URL and returns the decrypted file as a Blob. */
export async function decryptFromBucket(url: string, keyB64: string, mime: string, onProgress?: (pct: number) => void): Promise<Blob> {
  const res = await fetch(url);
  if (!res.ok || !res.body) throw new Error(`get ${res.status}`);
  const total = Number(res.headers.get("content-length")) || 0;
  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let got = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    got += value.length;
    if (total && onProgress) onProgress(Math.round((got / total) * 100));
  }
  const all = new Uint8Array(got);
  let o = 0;
  for (const c of chunks) {
    all.set(c, o);
    o += c.length;
  }
  const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: all.subarray(0, 12) }, await aesKey(keyB64, "decrypt"), all.subarray(12));
  return new Blob([plain], { type: mime });
}
