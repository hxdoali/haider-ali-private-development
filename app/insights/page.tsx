import type { Metadata } from "next";
import { getInsights } from "@/lib/content";
import { PageIntro } from "@/components/page-intro";
import { InsightEntry } from "@/components/insight-entry";
import { ContactCta } from "@/components/contact-cta";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Insights",
  description:
    "Short notes on new development, pricing, positioning and the market across New Jersey and New York.",
  path: "/insights",
  keywords: ["New Jersey new development market", "New York new development market", "condo pricing strategy", "development advisory NJ NY"],
});

export default function InsightsPage() {
  const insights = getInsights();
  return (
    <>
      <PageIntro
        eyebrow="Insights"
        title="Notes on development."
        intro={<p>Brief, occasional writing on how boutique residential buildings are planned, priced and sold on both sides of the Hudson.</p>}
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
