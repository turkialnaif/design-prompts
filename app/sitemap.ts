import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { attorneys, corePillars, firm, specializedLines } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = firm.website;
  const staticRoutes = ["", "/about", "/services", "/corporate-clients", "/contact", "/blog", "/privacy"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const enRoutes = ["/en", "/en/about", "/en/services", "/en/corporate-clients", "/en/contact", "/en/privacy"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const serviceRoutes = [...corePillars, ...specializedLines].map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: new Date(),
  }));

  const teamRoutes = attorneys.map((a) => ({
    url: `${base}/team/${a.slug}`,
    lastModified: new Date(),
  }));

  const teamRoutesEn = attorneys.map((a) => ({
    url: `${base}/en/team/${a.slug}`,
    lastModified: new Date(),
  }));

  const articleRoutes = articles.map((a) => ({
    url: `${base}/blog/${a.slug}`,
    lastModified: new Date(a.updatedAt),
  }));

  return [...staticRoutes, ...enRoutes, ...serviceRoutes, ...teamRoutes, ...teamRoutesEn, ...articleRoutes];
}
