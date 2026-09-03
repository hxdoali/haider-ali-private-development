import type { Metadata } from "next";
import { getDevelopments } from "@/lib/content";
import { DevelopmentEntry } from "@/components/development-entry";
import { PageIntro } from "@/components/page-intro";
import { ContactCta } from "@/components/contact-cta";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Developments — New Development in Jersey City, Hoboken and New Jersey",
  description:
    "Boutique new development in Jersey City, Hoboken and across New Jersey and New York. A portfolio of small, carefully made residential buildings, represented from pre-launch through sellout.",
  path: "/developments",
  keywords: [
    "NJ new development",
    "Jersey City new development",
    "Hoboken new development",
    "new construction condos New Jersey",
    "boutique condominium Jersey City",
  ],
});

export default function DevelopmentsPage() {
  const developments = getDevelopments();
  return (
    <>
      <PageIntro
        eyebrow="Developments"
        title="A portfolio of boutique residential buildings."
        intro={
          <p>
            New development in Jersey City, Hoboken and the Hudson waterfront, with select work in New York. Small
            buildings, considered plans, and a limited number of residences in each.
          </p>
        }
      />
      <div className="gutter space-y-20 pb-8 md:space-y-32">
        {developments.map((d, i) => (
          <DevelopmentEntry key={d.slug} development={d} index={i} priority={i === 0} />
        ))}
      </div>
      <div className="mt-24 md:mt-40">
        <ContactCta
          eyebrow="Developers"
          title="Representing a project from the first drawing to the last contract."
          body="If you are planning, entitling or preparing to launch a residential development in New Jersey or New York, we would welcome a conversation."
          cta="Developer representation"
          href={`/contact?inquiry=${encodeURIComponent("Developer representation")}`}
        />
      </div>
    </>
  );
}
