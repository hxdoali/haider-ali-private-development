import type { Metadata } from "next";
import { getDevelopments } from "@/lib/content";
import { DevelopmentEntry } from "@/components/development-entry";
import { PageIntro } from "@/components/page-intro";
import { ContactCta } from "@/components/contact-cta";
import { TextLink } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Developments — New Jersey & New York",
  description:
    "Boutique new development across New Jersey and New York: the Hudson waterfront, Bergen County and the Shore; Manhattan, Brooklyn, Westchester and the Hamptons. Small, carefully made residential buildings, represented from pre-launch through sellout.",
  path: "/developments",
  keywords: [
    "New Jersey new development",
    "New York new development",
    "boutique condominium New Jersey",
    "boutique condominium Brooklyn",
    "Manhattan boutique new development",
    "Bergen County new construction",
    "Jersey Shore new construction",
    "Westchester new development",
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
            New development on both sides of the Hudson: the waterfront, Bergen County and the Shore in New Jersey;
            Manhattan, Brooklyn, Westchester and the Hamptons in New York. Small buildings, considered plans, and a
            limited number of residences in each.
          </p>
        }
        aside={<TextLink href="/present">Tour the portfolio</TextLink>}
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
