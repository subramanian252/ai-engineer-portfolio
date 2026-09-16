import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteUrl();
  // No placeholder domain is published before a deployment URL is configured.
  return origin
    ? [{ url: origin + "/", changeFrequency: "monthly", priority: 1 }]
    : [];
}
