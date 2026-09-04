import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { OrganizationJsonLd } from "@/components/json-ld";
import { RevealObserver } from "@/components/reveal";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.wordmark} — ${site.descriptor}`,
    template: `%s — ${site.wordmark}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  applicationName: `${site.wordmark} — ${site.descriptor}`,
  authors: [{ name: site.name }],
  creator: site.name,
  category: "Real Estate",
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: `${site.wordmark} — ${site.descriptor}`,
    title: `${site.wordmark} — ${site.descriptor}`,
    description: site.description,
    images: [{ url: "/og.jpg", width: 1600, height: 900, alt: `${site.wordmark} — ${site.descriptor}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.wordmark} — ${site.descriptor}`,
    description: site.description,
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: site.url },
};

export const viewport: Viewport = {
  themeColor: "#f3f0ea",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <body className="min-h-dvh flex flex-col">
        {/*
          Marks the document as scripted before first paint. Without this the
          server HTML shows every reveal at full opacity, hydration then hides
          the ones below the fold, and the visitor sees a flash.
        */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-ink focus:text-bone focus:px-3 focus:py-2 eyebrow"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <OrganizationJsonLd />
        <RevealObserver />
      </body>
    </html>
  );
}
