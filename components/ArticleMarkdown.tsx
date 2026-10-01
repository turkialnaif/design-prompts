function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

type Block =
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] }
  | { kind: "quote"; lines: string[] }
  | { kind: "table"; rows: string[][] };

function parse(markdown: string): Block[] {
  const lines = markdown.trim().split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (line === "") {
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push({ kind: "h3", text: line.slice(4) });
      i++;
    } else if (line.startsWith("## ")) {
      blocks.push({ kind: "h2", text: line.slice(3) });
      i++;
    } else if (line.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      blocks.push({ kind: "quote", lines: quoteLines });
    } else if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      blocks.push({ kind: "ul", items });
    } else if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ""));
        i++;
      }
      blocks.push({ kind: "ol", items });
    } else if (line.startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(
          lines[i]
            .trim()
            .replace(/^\||\|$/g, "")
            .split("|")
            .map((c) => c.trim())
        );
        i++;
      }
      blocks.push({ kind: "table", rows });
    } else {
      blocks.push({ kind: "p", text: line });
      i++;
    }
  }

  return blocks;
}

export function getArticleHeadings(content: string) {
  return parse(content).flatMap((b, i) => (b.kind === "h2" ? [{ id: `section-${i}`, text: b.text }] : []));
}

export default function ArticleMarkdown({ content }: { content: string }) {
  const blocks = parse(content);
  const firstP = blocks.findIndex((b) => b.kind === "p");

  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        if (block.kind === "h2") {
          return (
            <h2 key={i} id={`section-${i}`} className="font-display scroll-mt-28 border-t border-[#d0a751]/40 pt-10 text-2xl font-bold leading-[1.5] text-ink md:text-[2rem]">
              {block.text}
            </h2>
          );
        }
        if (block.kind === "h3") {
          return (
            <h3 key={i} className="font-display pt-3 text-xl font-bold text-ink">
              {block.text}
            </h3>
          );
        }
        if (block.kind === "p") {
          return (
            <p key={i} className={i === firstP ? "text-xl font-medium leading-[2.1] text-ink md:text-[1.4rem]" : "text-[1.06rem] leading-[2.15] text-ink-soft md:text-[1.12rem]"}>
              {renderInline(block.text)}
            </p>
          );
        }
        if (block.kind === "ul") {
          return (
            <ul key={i} className="space-y-3 text-[1.06rem] leading-[2.05] text-ink-soft">
              {block.items.map((item, j) => (
                <li key={j} className="flex gap-3.5">
                  <span aria-hidden className="mt-[0.95rem] h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                  <span>{renderInline(item)}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (block.kind === "ol") {
          return (
            <ol key={i} className="space-y-3.5 text-[1.06rem] leading-[2.05] text-ink-soft">
              {block.items.map((item, j) => (
                <li key={j} className="flex gap-4">
                  <span className="font-display mt-1 w-7 shrink-0 text-lg font-extrabold text-gold-deep">{String(j + 1).padStart(2, "0")}</span>
                  <span>{renderInline(item)}</span>
                </li>
              ))}
            </ol>
          );
        }
        if (block.kind === "quote") {
          return (
            <aside key={i} className="rounded-2xl border-r-4 border-r-[#e6c988] bg-[#0a1626] px-6 py-6 text-white shadow-[0_24px_50px_-30px_rgba(6,13,21,0.7)] md:px-8">
              {block.lines.map((line, j) =>
                line.startsWith("- ") ? (
                  <ul key={j} className="list-disc space-y-1.5 pr-5 text-[0.98rem] leading-8 text-white/85">
                    <li>{renderInline(line.slice(2))}</li>
                  </ul>
                ) : (
                  <p key={j} className="text-[1.02rem] leading-[2] text-white/90 [&_strong]:text-[#e6c988]">
                    {renderInline(line)}
                  </p>
                )
              )}
            </aside>
          );
        }
        if (block.kind === "table") {
          const [header, ...rows] = block.rows;
          return (
            <div key={i} className="overflow-x-auto rounded-2xl ring-1 ring-[#d0a751]/40" data-lenis-prevent>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#0a1626] text-[#e6c988]">
                    {header.map((cell, j) => (
                      <th key={j} className="p-4 text-right font-bold">
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, j) => (
                    <tr key={j} className="border-t border-line odd:bg-white even:bg-[#f4efe2]/60">
                      {row.map((cell, k) => (
                        <td key={k} className="p-4 align-top leading-7 text-ink-soft">
                          {renderInline(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
