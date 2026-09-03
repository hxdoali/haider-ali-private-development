import type { Metadata } from "next";
import { getInsights } from "@/lib/content";
import { PageIntro } from "@/components/page-intro";
import { InsightEntry } from "@/components/insight-entry";
import { ContactCta } from "@/components/contact-cta";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Insights — Notes on New Development in New Jersey and New York",
  description:
    "Short notes on new development, pricing, positioning and the market in Jersey City, Hoboken and New York.",
  path: "/insights",
  keywords: ["Jersey City new development market", "Hoboken new development", "condo pricing strategy", "development advisory NJ"],
});

export default function InsightsPage() {
  const insights = getInsights();
  return (
    <>
      <PageIntro
        eyebrow="Insights"
        title="Notes on development."
        intro={<p>Brief, occasional writing on how boutique residential buildings are planned, priced and sold in our market.</p>}
      />
      <div className="gutter grid gap-10 md:grid-cols-3 md:gap-8">
        {insights.map((i) => (
          <InsightEntry key={i.slug} insight={i} />
        ))}
      </div>
      <div className="mt-24 md:mt-40">
        <ContactCta />
      </div>
    </>
  );
}
