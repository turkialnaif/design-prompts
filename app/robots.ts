import type { MetadataRoute } from "next";
import { firm } from "@/lib/site";

/**
 * Only the API is closed to crawlers. The private areas (/admin, /portal) and the printable profile (/profile) are kept out of
 * search with noindex (a meta tag and, for /admin and /portal, an X-Robots-Tag header), and a crawler can only obey a noindex
 * it is allowed to read: blocking those paths here is what made Google index them "though blocked by robots.txt".
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${firm.website}/sitemap.xml`,
  };
}
