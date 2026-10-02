import type { MetadataRoute } from "next";
import { firm } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: firm.nameAr,
    short_name: "TAAP",
    description: "مكتب محاماة واستشارات قانونية في الرياض",
    start_url: "/",
    display: "standalone",
    lang: "ar",
    dir: "rtl",
    background_color: "#00061d",
    theme_color: "#00124a",
    icons: [{ src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" }],
  };
}
