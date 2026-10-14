import "server-only";

/**
 * إثراء اختياري بـ Claude: خلاصة من سطرين وتقدير للإلحاح والمجال، للمحامي فقط (لا يُرسل شيء منه للعميل).
 * يعمل فقط إن وُجد ANTHROPIC_API_KEY. نص الموجز سري: لا يُرسل إلى أي خدمة خارجية ما لم يُفعَّل المفتاح عمدًا.
 */
export type Enrichment = { summary: string; area?: string; urgency?: "low" | "medium" | "high" };

export async function enrichLead(input: { matterType?: string | null; description?: string | null; org?: string | null }): Promise<Enrichment | null> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key || !input.description) return null;
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 9000);
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      signal: ctrl.signal,
      headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5",
        max_tokens: 400,
        system: "أنت مساعد داخلي في مكتب محاماة سعودي. تقرأ موجز مسألة أرسلها عميل محتمل وتعيد JSON فقط بالحقول: summary (جملتان بالعربية بلا أي استنتاج غير مذكور)، area (مجال قانوني واحد)، urgency (low|medium|high بحسب ما ورد في النص فقط). لا تضف معلومات من عندك ولا تقدّم رأيًا قانونيًا.",
        messages: [{ role: "user", content: `المنشأة: ${input.org ?? "—"}\nنوع المسألة: ${input.matterType ?? "—"}\nالوصف:\n${input.description.slice(0, 3500)}` }],
      }),
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    const data = (await res.json()) as { content?: { type: string; text?: string }[] };
    const text = data.content?.find((c) => c.type === "text")?.text ?? "";
    const json = JSON.parse(text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1));
    if (typeof json.summary !== "string") return null;
    return { summary: json.summary.slice(0, 600), area: typeof json.area === "string" ? json.area.slice(0, 80) : undefined, urgency: ["low", "medium", "high"].includes(json.urgency) ? json.urgency : undefined };
  } catch {
    return null;
  }
}
