import type { Metadata } from "next";
import { getResidences } from "@/lib/content";
import { ResidenceEntry } from "@/components/residence-entry";
import { PageIntro } from "@/components/page-intro";
import { ContactCta } from "@/components/contact-cta";
import { TextLink } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Residences — Luxury Homes, Penthouses and Townhouses in New Jersey and New York",
  description:
    "A curated selection of individual residences across New Jersey and New York: new development condominiums, penthouses, townhouses and estates, from the Hudson waterfront and Bergen County to Manhattan, Brooklyn, Westchester and the Hamptons.",
  path: "/residences",
  keywords: [
    "luxury condos New Jersey",
    "luxury condos New York",
    "Jersey City penthouse",
    "Hoboken penthouse",
    "Manhattan penthouse",
    "Brooklyn townhouse",
    "Bergen County estate",
    "Jersey Shore waterfront home",
    "Hamptons house for sale",
    "Westchester estate",
  ],
});

export default function ResidencesPage() {
  const residences = getResidences();
  return (
    <>
      <PageIntro
        eyebrow="Residences"
        title="A small number of homes, chosen individually."
        intro={
          <p>
            Residences within our developments and a few beyond them, across New Jersey and New York. Where a home is shared privately, the address
            and pricing are withheld here and provided on request.
          </p>
        }
        aside={<TextLink href="/private">Request private access</TextLink>}
      />
      <div className="gutter grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {residences.map((r, i) => (
          <ResidenceEntry key={r.slug} residence={r} priority={i < 2} />
        ))}
      </div>
      <div className="mt-24 md:mt-40">
        <ContactCta />
      </div>
    </>
  );
}
