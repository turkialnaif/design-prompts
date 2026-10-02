import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { SITE_UPDATED } from "@/lib/seo";
import { sectors } from "@/lib/sectors";
import { attorneys, corePillars, firm, specializedLines } from "@/lib/site";

type Entry = MetadataRoute.Sitemap[number];

const abs = (path: string) => `${firm.website}${path === "/" ? "" : path}`;
const modified = new Date(SITE_UPDATED);

/** A page that exists in both languages: one entry per language, each pointing at the other (hreflang). */
function pair(ar: string, en: string, priority: number): Entry[] {
  const languages = { ar: abs(ar), en: abs(en), "x-default": abs(ar) };
  return [
    { url: abs(ar), lastModified: modified, changeFrequency: "monthly", priority, alternates: { languages } },
    { url: abs(en), lastModified: modified, changeFrequency: "monthly", priority: priority - 0.1, alternates: { languages } },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPairs = [
    pair("/", "/en", 1),
    pair("/about", "/en/about", 0.8),
    pair("/services", "/en/services", 0.9),
    pair("/corporate-clients", "/en/corporate-clients", 0.6),
    pair("/contact", "/en/contact", 0.7),
    pair("/privacy", "/en/privacy", 0.3),
  ].flat();

  const sectorPairs = sectors.flatMap((s) => pair(`/sectors/${s.slug}`, `/en/sectors/${s.slug}`, 0.8));
  const teamPairs = attorneys.flatMap((a) => pair(`/team/${a.slug}`, `/en/team/${a.slug}`, 0.6));

  const services: Entry[] = [...corePillars, ...specializedLines].map((s) => ({
    url: abs(`/services/${s.slug}`),
    lastModified: modified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blog: Entry[] = [
    { url: abs("/blog"), lastModified: modified, changeFrequency: "weekly", priority: 0.8 },
    ...articles.map((a): Entry => ({ url: abs(`/blog/${a.slug}`), lastModified: new Date(a.updatedAt), changeFrequency: "monthly", priority: 0.7 })),
  ];

  return [...staticPairs, ...sectorPairs, ...teamPairs, ...services, ...blog];
}
