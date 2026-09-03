import type { Metadata } from "next";
import { site } from "@/data/site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: readonly string[];
  noIndex?: boolean;
};

/** Build consistent per-page metadata with canonical URL and Open Graph. */
export function pageMetadata({ title, description, path, image, keywords, noIndex }: PageMeta): Metadata {
  const url = new URL(path, site.url).toString();
  const ogImage = image ?? "/og.jpg";
  return {
    title,
    description,
    keywords: keywords ? [...keywords] : undefined,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: `${title} — ${site.wordmark}`,
      description,
      url,
      siteName: `${site.wordmark} — ${site.descriptor}`,
      type: "website",
      locale: "en_US",
      images: [{ url: ogImage, width: 1600, height: 900, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${site.wordmark}`,
      description,
      images: [ogImage],
    },
  };
}
