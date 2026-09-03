import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDevelopment, getDevelopments, getResidencesForDevelopment } from "@/lib/content";
import { Figure } from "@/components/figure";
import { Gallery } from "@/components/gallery";
import { FloorPlans } from "@/components/floor-plans";
import { PrivateNotice } from "@/components/private-notice";
import { ResidenceEntry } from "@/components/residence-entry";
import { ContactCta } from "@/components/contact-cta";
import { DemoTag } from "@/components/demo-tag";
import { BreadcrumbJsonLd, DevelopmentJsonLd } from "@/components/json-ld";
import { ButtonLink, Eyebrow, FactList, Prose, Section, SectionTitle } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getDevelopments().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const d = getDevelopment(slug);
  if (!d) return {};
  if (d.private) {
    return pageMetadata({
      title: `${d.name} — Private Development`,
      description: `A private residential development in ${d.location}. Details available upon request.`,
      path: `/developments/${d.slug}`,
      image: d.heroImage,
      noIndex: true,
    });
  }
  return pageMetadata({
    title: `${d.name} — New Development in ${d.location}`,
    description: `${d.name}: ${d.projectType.toLowerCase()} of ${d.residenceCount} residences in ${d.location}. ${d.overview[0]}`,
    path: `/developments/${d.slug}`,
    image: d.heroImage,
    keywords: [`${d.location} new development`, `${d.name}`, "New Jersey new development", "new construction condos"],
  });
}

export default async function DevelopmentPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const d = getDevelopment(slug);
  if (!d) notFound();

  const residences = getResidencesForDevelopment(d.slug);
  const contactHref = `/contact?inquiry=${encodeURIComponent(
    d.private ? "Private access" : "Residence inquiry",
  )}&subject=${encodeURIComponent(d.name)}`;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Developments", path: "/developments" },
          { name: d.name, path: `/developments/${d.slug}` },
        ]}
      />
      <DevelopmentJsonLd development={d} />

      <header className="gutter pt-32 pb-12 md:pt-48 md:pb-16">
        <p className="eyebrow flex flex-wrap items-center gap-3">
          <Link href="/developments" className="hover:text-ink">
            Developments
          </Link>
          <span aria-hidden="true">/</span>
          <span>{d.private ? "Private" : d.status}</span>
          {d.demo ? <DemoTag /> : null}
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-12 md:items-end">
          <h1 className="display text-[3rem] text-ink md:col-span-8 md:text-[4.5rem] lg:text-[5.5rem]">{d.name}</h1>
          <div className="md:col-span-4 md:text-right">
            <p className="text-[15px] text-charcoal md:text-[16px]">{d.location}</p>
            <p className="eyebrow mt-2">
              {d.residenceCount} residences{d.private ? "" : `  ·  ${d.projectType}`}
            </p>
          </div>
        </div>
      </header>

      <Figure
        src={d.heroImage}
        alt={d.private ? `${d.name}, private development` : `${d.name}, ${d.location}`}
        ratio="21/9"
        mobileRatio="4/5"
        priority
        sizes="100vw"
      />

      {d.private ? (
        <Section>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-7">
              <PrivateNotice kind="development" subject={d.name} />
            </div>
            <div className="md:col-span-4 md:col-start-9">
              <FactList
                items={[
                  { label: "Location", value: d.location },
                  { label: "Type", value: d.projectType },
                  { label: "Residences", value: d.residenceCount },
                  { label: "Status", value: d.status },
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
                <Eyebrow className="mb-6">Overview</Eyebrow>
                <Prose paragraphs={d.overview} lede />
                <div className="mt-10 flex flex-wrap items-center gap-6">
                  <ButtonLink href={contactHref}>Inquire</ButtonLink>
                  {d.status === "Pre-Launch" || d.status === "Pre-Development" ? (
                    <Link
                      href={`/contact?inquiry=${encodeURIComponent("Private access")}&subject=${encodeURIComponent(d.name)}`}
                      className="link-quiet text-[15px] text-ink"
                    >
                      Register for pre-launch
                    </Link>
                  ) : null}
                </div>
              </div>
              <div className="md:col-span-4 md:col-start-9">
                <FactList
                  items={[
                    { label: "Location", value: d.location },
                    { label: "Address", value: d.address },
                    { label: "Developer", value: d.developer },
                    { label: "Architect", value: d.architect },
                    { label: "Interiors", value: d.interiors },
                    { label: "Type", value: d.projectType },
                    { label: "Residences", value: d.residenceCount },
                    { label: "Status", value: d.status },
                    { label: "Completion", value: d.completion },
                  ]}
                />
              </div>
            </div>
          </Section>

          {d.amenities.length > 0 ? (
            <Section className="!pt-0">
              <div className="grid gap-8 md:grid-cols-12">
                <Eyebrow className="md:col-span-3">Amenities</Eyebrow>
                <ul className="grid gap-x-8 sm:grid-cols-2 md:col-span-8">
                  {d.amenities.map((a) => (
                    <li key={a} className="border-t hairline py-3 text-[15px] text-ink">
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </Section>
          ) : null}

          {d.gallery.length > 0 ? (
            <Section className="!pt-0">
              <Eyebrow className="mb-8">Gallery</Eyebrow>
              <Gallery images={d.gallery} alt={d.name} />
            </Section>
          ) : null}

          {d.floorPlans.length > 0 ? (
            <Section className="!pt-0">
              <SectionTitle eyebrow="Floor plans" title="Representative plans" size="sm" className="mb-10 md:mb-14" />
              <FloorPlans plans={d.floorPlans} />
              <p className="mt-8 text-[12px] text-ash">
                Plans are illustrative. Dimensions and layouts are approximate and subject to change.
              </p>
            </Section>
          ) : null}
        </>
      )}

      {residences.length > 0 ? (
        <Section className="!pt-0">
          <SectionTitle eyebrow="Residences" title={`Residences at ${d.name}`} size="sm" className="mb-10 md:mb-14" />
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {residences.map((r) => (
              <ResidenceEntry key={r.slug} residence={r} />
            ))}
          </div>
        </Section>
      ) : null}

      <ContactCta
        title={d.private ? "Access is by introduction." : `Inquire about ${d.name}.`}
        body={
          d.private
            ? "Request access and we will be in touch to understand what you are looking for before sharing particulars."
            : "For availability, pricing and a private appointment, write directly or use the form."
        }
        cta={d.private ? "Request Private Access" : "Inquire"}
        href={contactHref}
      />
    </>
  );
}
