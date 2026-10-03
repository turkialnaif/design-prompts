import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@electric-sql/pglite", "pg"],
  images: { qualities: [75, 90] },
  experimental: { serverActions: { bodySizeLimit: "5mb" } },
  async redirects() {
    return [
      { source: "/sectors", destination: "/services#sectors", permanent: true },
      { source: "/en/sectors", destination: "/en/services#sectors", permanent: true },
      {
        source: "/:path*",
        has: [{ type: "host", value: "tnz-law-website.vercel.app" }],
        destination: "https://taap.sa/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.taap.sa" }],
        destination: "https://taap.sa/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/(admin|portal)/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
          { key: "Cache-Control", value: "no-store" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};

export default nextConfig;
