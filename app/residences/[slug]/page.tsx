import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDevelopment, getResidence, getResidences, getResidencesForDevelopment } from "@/lib/content";
import { formatBaths, formatPrice, formatSquareFeet, formatUSD, residenceSummary } from "@/lib/format";
import { Hero } from "@/components/hero";
import { Gallery } from "@/components/gallery";
import { FloorPlans } from "@/components/floor-plans";
import { PrivateNotice } from "@/components/private-notice";
import { ResidenceEntry } from "@/components/residence-entry";
import { ContactCta } from "@/components/contact-cta";
import { DemoTag } from "@/components/demo-tag";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { ButtonLink, Eyebrow, FactList, Prose, Section, SectionTitle } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { residenceSlides } from "@/lib/slides";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getResidences().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const r = getResidence(slug);
  if (!r) return {};
  if (r.private) {
    return pageMetadata({
      title: "Private Residence",
      description: `A private residence in ${r.location}. Details available upon request.`,
      path: `/residences/${r.slug}`,
      image: r.heroImage,
      noIndex: true,
    });
  }
  return pageMetadata({
    title: `${r.name} — ${r.propertyType} in ${r.location}`,
    description: `${r.name}: ${residenceSummary(r)}. ${formatPrice(r)}. ${r.description[0]}`,
    path: `/residences/${r.slug}`,
    image: r.heroImage,
    keywords: [`${r.location} ${r.propertyType.toLowerCase()}`, "new development condo", "New Jersey new development"],
  });
}

export default async function ResidencePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const r = getResidence(slug);
  if (!r) notFound();

  const development = r.developmentSlug ? getDevelopment(r.developmentSlug) : undefined;
  const siblings = r.developmentSlug
    ? getResidencesForDevelopment(r.developmentSlug).filter((s) => s.slug !== r.slug)
    : [];
  const title = r.private ? "Private Residence" : r.name;
  const contactHref = `/contact?inquiry=${encodeURIComponent(
    r.private ? "Private access" : "Residence inquiry",
  )}&subject=${encodeURIComponent(r.name)}`;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Residences", path: "/residences" },
          { name: title, path: `/residences/${r.slug}` },
        ]}
      />

      <Hero
        src={r.heroImage}
        alt={r.private ? "Private residence" : `${r.name}, ${r.location}`}
        transitionName={`res-${r.slug}`}
        eyebrow={
          <>
            <Link href="/residences" className="transition-colors hover:text-bone">
              Residences
            </Link>
            <span aria-hidden="true">/</span>
            <span>{r.private ? "Private" : r.status}</span>
            {r.demo ? <DemoTag /> : null}
          </>
        }
        title={title}
        meta={
          <>
            <p className="text-[15px] md:text-[17px]">{r.location}</p>
            <p className="eyebrow mt-2 !text-bone/60">
              {r.propertyType}  ·  {residenceSummary(r)}
            </p>
            {!r.private ? <p className="display mt-4 text-[1.6rem] leading-none md:text-[2rem]">{formatPrice(r)}</p> : null}
            {development && !development.private ? (
              <p className="mt-3 text-[14px]">
                <Link href={`/developments/${development.slug}`} className="link-quiet text-bone/80">
                  {development.name}
                </Link>
              </p>
            ) : null}
          </>
        }
        slides={residenceSlides(r)}
        presentLabel="Present"
      />

      {r.private ? (
        <Section>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-7">
              <PrivateNotice kind="residence" subject={r.name} />
            </div>
            <div className="md:col-span-4 md:col-start-9">
              <FactList
                items={[
                  { label: "Location", value: r.location },
                  { label: "Type", value: r.propertyType },
                  { label: "Bedrooms", value: r.beds },
                  { label: "Bathrooms", value: formatBaths(r.baths) },
                  { label: "Status", value: r.status },
                ]}
              />
            </div>
          </div>
        </Section>
      ) : (
        <>
          <Section>
            <div className="grid gap-12 md:grid-cols-12">
              <div className="md:col-span-7">
                <Eyebrow className="mb-6">The residence</Eyebrow>
                <Prose paragraphs={r.description} lede />
                <div className="mt-10">
                  <ButtonLink href={contactHref}>Inquire</ButtonLink>
                </div>
              </div>
              <div className="md:col-span-4 md:col-start-9">
                <FactList
                  items={[
                    { label: "Price", value: formatPrice(r) },
                    { label: "Status", value: r.status },
                    { label: "Type", value: r.propertyType },
                    { label: "Bedrooms", value: r.beds },
                    { label: "Bathrooms", value: formatBaths(r.baths) },
                    { label: "Interior", value: r.squareFeet ? formatSquareFeet(r.squareFeet) : undefined },
                    { label: "Exposure", value: r.exposure },
                    {
                      label: "Monthly charges",
                      value: r.monthlyCharges ? `${formatUSD(r.monthlyCharges)} / month` : undefined,
                    },
                    { label: "Address", value: r.address },
                    {
                      label: "Development",
                      value: development ? (
                        <Link href={`/developments/${development.slug}`} className="link-quiet">
                          {development.name}
                        </Link>
                      ) : undefined,
                    },
                  ]}
                />
              </div>
            </div>
          </Section>

          {r.gallery.length > 0 ? (
            <Section className="!pt-0">
              <Eyebrow className="mb-8">Gallery</Eyebrow>
              <Gallery images={r.gallery} alt={r.name} />
            </Section>
          ) : null}

          {r.floorPlan ? (
            <Section className="!pt-0">
              <SectionTitle eyebrow="Floor plan" title="Plan" size="sm" className="mb-10 md:mb-14" />
              <FloorPlans
                plans={[
                  {
                    name: r.name,
                    image: r.floorPlan,
                    beds: r.beds,
                    baths: r.baths,
                    squareFeet: r.squareFeet ?? undefined,
                  },
                ]}
              />
              <p className="mt-8 text-[12px] text-ash">
                Plan is illustrative. Dimensions are approximate and subject to change.
              </p>
            </Section>
          ) : null}
        </>
      )}

      {siblings.length > 0 && development ? (
        <Section className="!pt-0">
          <SectionTitle
            eyebrow={development.name}
            title="Other residences in the building"
            size="sm"
            className="mb-10 md:mb-14"
          />
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {siblings.map((s) => (
              <ResidenceEntry key={s.slug} residence={s} />
            ))}
          </div>
        </Section>
      ) : null}

      <ContactCta
        title={r.private ? "Access is by introduction." : `Inquire about ${r.name}.`}
        body={
          r.private
            ? "Request access and we will be in touch to understand what you are looking for before sharing particulars."
            : "For a private appointment, floor plans and the offering documents, write directly or use the form."
        }
        cta={r.private ? "Request Private Access" : "Inquire"}
        href={contactHref}
      />
    </>
  );
}
