import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { getInsights, getPublicDevelopments, getPublicResidences } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const now = new Date();
  const statics: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/developments`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/residences`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/advisory`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/private`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/insights`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
  const developments = getPublicDevelopments().map((d) => ({
    url: `${base}/developments/${d.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  const residences = getPublicResidences().map((r) => ({
    url: `${base}/residences/${r.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));
  const insights = getInsights().map((i) => ({
    url: `${base}/insights/${i.slug}`,
    lastModified: new Date(i.date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));
  return [...statics, ...developments, ...residences, ...insights];
}
