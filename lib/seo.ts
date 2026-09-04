import type { Metadata } from "next";
import { site } from "@/data/site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: readonly string[];
  noIndex?: boolean;
  /** Use the title exactly as given, without the "— HAIDER ALI" suffix (home page). */
  absolute?: boolean;
};

/** Build consistent per-page metadata with canonical URL and Open Graph. */
export function pageMetadata({ title, description, path, image, keywords, noIndex, absolute }: PageMeta): Metadata {
  const url = new URL(path, site.url).toString();
  const ogImage = image ?? "/og.jpg";
  const shareTitle = absolute ? title : `${title} — ${site.wordmark}`;
  return {
    title: absolute ? { absolute: title } : title,
    description,
    keywords: keywords ? [...keywords] : undefined,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: shareTitle,
      description,
      url,
      siteName: `${site.wordmark} — ${site.descriptor}`,
      type: "website",
      locale: "en_US",
      images: [{ url: ogImage, width: 1600, height: 900, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [ogImage],
    },
  };
}
