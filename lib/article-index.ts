import { articles } from "@/lib/articles";

/** Stable entry numbers for the journal: oldest article is 01, numbering grows with each new article. */
const chronological = [...articles].sort((a, b) => a.publishedAt.localeCompare(b.publishedAt));

export const entryNumbers: Record<string, string> = Object.fromEntries(
  chronological.map((a, i) => [a.slug, String(i + 1).padStart(2, "0")]),
);

export const entryNumber = (slug: string) => entryNumbers[slug] ?? "00";

/** Newest first, ties broken by entry number so the highest number always leads. */
export const newestFirst = [...chronological].reverse();
