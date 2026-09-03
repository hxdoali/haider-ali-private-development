import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/data/site";
import { getFeaturedDevelopments, getFeaturedInsights, getFeaturedResidences } from "@/lib/content";
import { Figure } from "@/components/figure";
import { DevelopmentEntry } from "@/components/development-entry";
import { ResidenceEntry } from "@/components/residence-entry";
import { InsightEntry } from "@/components/insight-entry";
import { ContactCta } from "@/components/contact-cta";
import { Eyebrow, Section, SectionTitle, TextLink } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: `${site.wordmark} — ${site.descriptor} — ${site.region}`,
  description: site.description,
  path: "/",
  keywords: site.keywords,
});

const ADVISORY = [
  "Development positioning",
  "Market intelligence",
  "Product strategy and unit mix",
  "Pricing and release sequencing",
  "Pre-launch and developer representation",
  "Sellout strategy",
];

export default function HomePage() {
  const developments = getFeaturedDevelopments(3);
  const residences = getFeaturedResidences(3);
  const insights = getFeaturedInsights(3);
  const lead = developments[0];

  return (
    <>
      {/* ------------------------------------------------------------ Hero */}
      <section className="gutter flex min-h-[calc(100dvh-4rem)] flex-col justify-between pb-8 pt-10 md:min-h-[calc(100dvh-5rem)] md:pb-12 md:pt-16">
        <div>
          <h1 className="display text-[clamp(3.25rem,13vw,10.5rem)] uppercase tracking-[0.02em] text-ink">
            {site.wordmark}
          </h1>
          <p className="display mt-6 text-[clamp(1.75rem,4.5vw,3.75rem)] italic text-charcoal md:mt-8">
            {site.descriptor}
          </p>
          <p className="eyebrow mt-6 md:mt-10">{site.region}</p>
        </div>
        <div className="mt-16 grid gap-8 border-t hairline pt-6 md:grid-cols-12">
          <p className="measure text-[15px] leading-[1.75] text-charcoal md:col-span-5 md:text-[16px]">
            Boutique new development, developer representation and development advisory. A small number of
            residences and projects, handled privately and carefully.
          </p>
          <ul className="flex flex-wrap gap-x-8 gap-y-3 md:col-span-7 md:justify-end md:self-end">
            {site.nav.slice(0, 4).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="eyebrow transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------- Lead image */}
      {lead ? (
        <section className="gutter">
          <Link href={`/developments/${lead.slug}`} className="img-hover block" aria-label={lead.name}>
            <Figure
              src={lead.heroImage}
              alt={`${lead.name}, ${lead.location}`}
              ratio="16/9"
              priority
              sizes="100vw"
              caption={`${lead.name}  ·  ${lead.location}`}
            />
          </Link>
        </section>
      ) : null}

      {/* --------------------------------------------------------- Statement */}
      <Section className="!pb-8 md:!pb-12">
        <div className="grid gap-8 md:grid-cols-12">
          <Eyebrow className="md:col-span-3">Practice</Eyebrow>
          <p className="display text-[1.85rem] leading-[1.15] text-ink md:col-span-8 md:text-[2.75rem]">
            We work with developers, investors, family offices and private owners on residential projects in New
            Jersey and New York, from the first site conversation to the last contract.
          </p>
        </div>
      </Section>

      {/* ------------------------------------------------ Selected Developments */}
      <Section id="developments">
        <div className="mb-12 flex items-end justify-between gap-6 md:mb-20">
          <SectionTitle eyebrow="Selected Developments" title="Current and recent work" />
          <TextLink href="/developments" className="hidden shrink-0 md:inline-block">
            All developments
          </TextLink>
        </div>
        <div className="space-y-20 md:space-y-32">
          {developments.map((d, i) => (
            <DevelopmentEntry key={d.slug} development={d} index={i} />
          ))}
        </div>
        <TextLink href="/developments" className="mt-12 inline-block md:hidden">
          All developments
        </TextLink>
      </Section>

      {/* ------------------------------------------------- Development Advisory */}
      <section className="bg-linen">
        <div className="gutter grid gap-10 py-20 md:grid-cols-12 md:py-32">
          <div className="md:col-span-6">
            <SectionTitle eyebrow="Development Advisory" title="Positioning, product and pricing for new development." />
            <p className="measure mt-8 text-[15px] leading-[1.75] text-charcoal md:text-[16px]">
              We advise developers before the design is fixed and represent them through pre-launch and sellout. The
              work is analytical and quiet: the right product, in the right sequence, at the right number.
            </p>
            <TextLink href="/advisory" className="mt-8 inline-block">
              Advisory
            </TextLink>
          </div>
          <ul className="md:col-span-5 md:col-start-8">
            {ADVISORY.map((item, i) => (
              <li key={item} className="flex items-baseline gap-6 border-t hairline py-4 text-[15px] text-ink md:text-[16px]">
                <span className="eyebrow w-6 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* -------------------------------------------------- Private Residential */}
      <Section id="residences">
        <div className="mb-12 grid gap-8 md:mb-20 md:grid-cols-12">
          <SectionTitle eyebrow="Private Residential" title="Selected residences" className="md:col-span-7" />
          <div className="flex flex-col justify-end md:col-span-5">
            <p className="measure text-[15px] leading-[1.75] text-charcoal md:text-[16px]">
              A curated group of individual homes within our developments and beyond them. Some are listed. Others are
              shared privately, by introduction.
            </p>
            <div className="mt-6 flex flex-wrap gap-8">
              <TextLink href="/residences">All residences</TextLink>
              <TextLink href="/private">Private access</TextLink>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {residences.map((r) => (
            <ResidenceEntry key={r.slug} residence={r} />
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------ Insights */}
      <Section id="insights" className="!pt-0">
        <div className="mb-10 flex items-end justify-between gap-6 md:mb-14">
          <SectionTitle eyebrow="Insights" title="Notes on development" size="sm" />
          <TextLink href="/insights" className="shrink-0">
            All insights
          </TextLink>
        </div>
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {insights.map((i) => (
            <InsightEntry key={i.slug} insight={i} />
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------- Contact */}
      <ContactCta />
    </>
  );
}
