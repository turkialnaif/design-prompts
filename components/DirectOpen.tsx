"use client";

import { useEffect, useState } from "react";
import { decryptFromBucket } from "@/lib/erp/direct-client";

/** Fetches the encrypted file straight from the bucket and decrypts it here; nothing readable passes through the server. */
export default function DirectOpen({ api }: { api: string }) {
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [msg, setMsg] = useState("جارٍ تنزيل الملف وفكّ تشفيره…");
  const [blobUrl, setBlobUrl] = useState<string>("");
  const [file, setFile] = useState({ name: "", mime: "" });

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const meta = await (await fetch(api, { cache: "no-store" })).json().catch(() => null);
        if (!meta?.url) throw new Error("meta");
        const blob = await decryptFromBucket(meta.url, meta.key, meta.mime, (p) => alive && setMsg(`جارٍ التنزيل… ${p}%`));
        if (!alive) return;
        const url = URL.createObjectURL(blob);
        setBlobUrl(url);
        setFile({ name: meta.name, mime: meta.mime });
        setState("ready");
        if (/^(application\/pdf|image\/)/.test(meta.mime)) window.location.replace(url);
        else {
          const a = document.createElement("a");
          a.href = url;
          a.download = meta.name;
          a.click();
        }
      } catch {
        if (alive) {
          setState("error");
          setMsg("تعذّر فتح الملف. تأكد من اتصالك، وإن تكرر الخطأ فتحقق من إعدادات CORS للمخزن.");
        }
      }
    })();
    return () => {
      alive = false;
    };
  }, [api]);

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-[#e3ddcb] bg-white p-8 text-center">
      <p className={`text-sm font-semibold ${state === "error" ? "text-red-700" : "text-[#12233a]"}`}>{state === "ready" ? "تم فكّ التشفير." : msg}</p>
      {state === "ready" && blobUrl && (
        <a href={blobUrl} download={file.name} className="mt-4 inline-block rounded-xl bg-[#12233a] px-5 py-2.5 text-sm font-semibold text-white">
          تنزيل {file.name}
        </a>
      )}
    </div>
  );
}
