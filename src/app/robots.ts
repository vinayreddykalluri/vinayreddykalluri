import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/profile";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    host: siteUrl,
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
