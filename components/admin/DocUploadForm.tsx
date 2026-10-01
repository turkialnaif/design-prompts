"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Field, Input, Select, SubmitButton } from "@/components/admin/ui";
import { DIRECT_MAX_BYTES, SERVER_MAX_BYTES } from "@/lib/erp/direct-config";
import { encryptAndUpload } from "@/lib/erp/direct-client";
import { finalizeDirectUploadAction, initDirectUploadAction } from "@/lib/erp/direct-actions";
import { uploadDocumentAction } from "@/lib/erp/work-actions";

const MIME_BY_EXT: Record<string, string> = {
  pdf: "application/pdf", png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", webp: "image/webp",
  doc: "application/msword", docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel", xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", txt: "text/plain",
};
const mimeOf = (f: File) => f.type || MIME_BY_EXT[f.name.split(".").pop()?.toLowerCase() ?? ""] || "";

/** Small files use the ordinary server action; larger ones (up to 100 MB) are encrypted here and sent straight to the bucket. */
export default function DocUploadForm({
  matterId,
  clientId,
  direct,
  categories,
}: {
  matterId?: string;
  clientId?: string;
  direct: boolean;
  categories: [string, string][];
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [pct, setPct] = useState(0);
  const [note, setNote] = useState<{ ok: boolean; text: string } | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    const form = e.currentTarget;
    const file = (form.elements.namedItem("file") as HTMLInputElement).files?.[0];
    if (!file || file.size <= SERVER_MAX_BYTES) return; // ordinary path
    e.preventDefault();
    if (!direct) return setNote({ ok: false, text: "الحد الأقصى لهذا النوع من الرفع 4 ميغابايت." });
    if (file.size > DIRECT_MAX_BYTES) return setNote({ ok: false, text: "الحد الأقصى 100 ميغابايت." });

    const fd = new FormData(form);
    setBusy(true);
    setPct(0);
    setNote(null);
    try {
      const mimeType = mimeOf(file);
      const init = await initDirectUploadAction({ matterId, clientId, name: file.name, mimeType, size: file.size });
      if (!init.ok) throw new Error(init.error);
      await encryptAndUpload(file, init.url, init.key, setPct);
      const fin = await finalizeDirectUploadAction({
        docId: init.docId,
        token: init.token,
        matterId,
        clientId,
        name: String(fd.get("name") || "") || file.name,
        mimeType,
        size: file.size,
        category: String(fd.get("category") || "general"),
        sharedWithClient: fd.get("sharedWithClient") === "on",
      });
      if (!fin.ok) throw new Error(fin.error);
      form.reset();
      setNote({ ok: true, text: "تم الرفع والتشفير." });
      router.refresh();
    } catch (err) {
      const m = err instanceof Error ? err.message : "";
      setNote({ ok: false, text: /^(put|network)/.test(m) ? "تعذّر الرفع إلى المخزن. تحقق من إعدادات CORS لمخزن Cloudflare ثم أعد المحاولة." : m || "تعذّر الرفع، أعد المحاولة." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form action={uploadDocumentAction} onSubmit={onSubmit} className="grid gap-3 md:grid-cols-4">
      {matterId && <input type="hidden" name="matterId" value={matterId} />}
      {clientId && <input type="hidden" name="clientId" value={clientId} />}
      <Field label={`الملف (حتى ${direct ? "١٠٠" : "٤"} ميغابايت: PDF، صور، Word، Excel)`} span={2}>
        <input type="file" name="file" required accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx,.xls,.xlsx,.txt" className="w-full rounded-xl border border-dashed border-[#d0a751] bg-[#faf7ef] px-3 py-2 text-sm" />
      </Field>
      <Field label="الاسم (اختياري)"><Input name="name" /></Field>
      <Field label="التصنيف">
        <Select name="category" defaultValue="general">{categories.map(([k, l]) => <option key={k} value={k}>{l}</option>)}</Select>
      </Field>
      <label className="flex items-end gap-2 pb-2.5 text-sm md:col-span-3"><input type="checkbox" name="sharedWithClient" /> مشاركة مع العميل في البوابة</label>
      <div className="flex items-end"><SubmitButton>رفع وتشفير</SubmitButton></div>
      {busy && (
        <div className="md:col-span-4" role="status">
          <div className="h-2 overflow-hidden rounded-full bg-[#e3ddcb]"><div className="h-full bg-[#d0a751] transition-all" style={{ width: `${pct}%` }} /></div>
          <p className="mt-1 text-xs text-ink-soft/70">{pct < 100 ? `جارٍ التشفير والرفع… ${pct}%` : "جارٍ التحقق من الملف…"}</p>
        </div>
      )}
      {note && <p className={`md:col-span-4 text-sm font-semibold ${note.ok ? "text-emerald-700" : "text-red-700"}`}>{note.text}</p>}
    </form>
  );
}
