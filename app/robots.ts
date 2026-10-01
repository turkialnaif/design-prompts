import type { MetadataRoute } from "next";
import { firm } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/portal", "/profile", "/api/"] },
    sitemap: `${firm.website}/sitemap.xml`,
  };
}
