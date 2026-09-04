import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/data/site";
import { getFeaturedDevelopments, getFeaturedInsights, getFeaturedResidences } from "@/lib/content";
import { DevelopmentEntry } from "@/components/development-entry";
import { ResidenceEntry } from "@/components/residence-entry";
import { InsightEntry } from "@/components/insight-entry";
import { ContactCta } from "@/components/contact-cta";
import { TerritoryList } from "@/components/territory-list";
import { ButtonLink, Eyebrow, Section, SectionTitle, TextLink } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: `${site.wordmark} — ${site.descriptor}`,
  description: site.description,
  path: "/",
  absolute: true,
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
      <section data-hero className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-charcoal text-bone">
        {lead ? (
          <Image
            src={lead.heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            quality={80}
            className="hero-drift object-cover"
          />
        ) : null}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(23,23,21,0.72)_0%,rgba(23,23,21,0.28)_45%,rgba(23,23,21,0.10)_100%)]"
        />
        <div className="gutter relative pb-10 pt-40 md:pb-14">
          <h1 className="display text-[clamp(3rem,12.5vw,11rem)] uppercase leading-[0.9] tracking-[0.03em] text-bone">
            {site.wordmark}
          </h1>
          <div className="mt-8 flex flex-col gap-6 border-t border-bone/25 pt-6 md:mt-10 md:flex-row md:items-end md:justify-between md:gap-10">
            <div>
              <p className="display text-[clamp(1.6rem,4vw,3.25rem)] italic leading-[1.05] text-bone/95">{site.descriptor}</p>
              <p className="eyebrow mt-4 !text-bone/70">{site.region}</p>
            </div>
            {lead ? (
              <Link href={`/developments/${lead.slug}`} className="eyebrow shrink-0 !text-bone/70 transition-colors hover:!text-bone">
                {lead.name}  ·  {lead.location}
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- Statement */}
      <Section className="!pb-10 md:!pb-16">
        <div className="grid gap-8 md:grid-cols-12">
          <Eyebrow className="md:col-span-3">Practice</Eyebrow>
          <p className="display text-[1.9rem] leading-[1.15] text-ink md:col-span-8 md:text-[2.9rem]" data-reveal>
            We work with developers, investors, family offices and private owners on residential projects across New
            Jersey and New York, from the first site conversation to the last contract.
          </p>
          <div className="md:col-span-8 md:col-start-4" data-reveal>
            <p className="measure mt-4 text-[15px] leading-[1.75] text-charcoal md:text-[16px]">
              Boutique new development, developer representation and development advisory, from the Hudson waterfront
              and Bergen County to the Shore, and from Manhattan and Brooklyn to Westchester and the Hamptons. A small
              number of residences and projects, handled privately and carefully.
            </p>
            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {site.nav.slice(0, 4).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="eyebrow transition-colors hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------- Territory */}
      <Section className="!pt-0">
        <div className="grid gap-8 md:grid-cols-12">
          <Eyebrow className="md:col-span-3">Territory</Eyebrow>
          <div className="md:col-span-9">
            <TerritoryList />
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------ Selected Developments */}
      <Section id="developments">
        <div className="mb-14 flex items-end justify-between gap-6 md:mb-24">
          <SectionTitle eyebrow="Selected Developments" title="Current and recent work" />
          <TextLink href="/developments" className="hidden shrink-0 md:inline-block">
            All developments
          </TextLink>
        </div>
        <div className="space-y-24 md:space-y-40">
          {developments.map((d, i) => (
            <DevelopmentEntry key={d.slug} development={d} index={i} />
          ))}
        </div>
        <TextLink href="/developments" className="mt-14 inline-block md:hidden">
          All developments
        </TextLink>
      </Section>

      {/* ------------------------------------------------- Development Advisory */}
      <section className="bg-linen">
        <div className="gutter grid gap-12 py-24 md:grid-cols-12 md:py-40">
          <div className="md:col-span-6">
            <SectionTitle eyebrow="Development Advisory" title="Positioning, product and pricing for new development." />
            <p className="lede mt-10 max-w-[28rem]" data-reveal>
              We advise developers before the design is fixed and represent them through pre-launch and sellout. The
              work is analytical and quiet: the right product, in the right sequence, at the right number.
            </p>
            <div className="mt-10" data-reveal>
              <TextLink href="/advisory">Advisory</TextLink>
            </div>
          </div>
          <ul className="md:col-span-5 md:col-start-8" data-reveal>
            {ADVISORY.map((item, i) => (
              <li key={item} className="flex items-baseline gap-6 border-t border-clay py-5 text-[15px] text-ink md:text-[16px]">
                <span className="eyebrow w-6 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------- Private band */}
      <section className="relative overflow-hidden bg-charcoal text-bone">
        <Image src="/private/hero.jpg" alt="" fill sizes="100vw" quality={70} className="object-cover opacity-60" />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_right,rgba(23,23,21,0.75),rgba(23,23,21,0.25))]" />
        <div className="gutter relative grid gap-10 py-28 md:grid-cols-12 md:py-48">
          <div className="md:col-span-7" data-reveal>
            <Eyebrow className="!text-bone/60">Private</Eyebrow>
            <h2 className="display mt-5 text-[2.5rem] text-bone md:text-[4.25rem]">Shared by introduction.</h2>
          </div>
          <div className="flex flex-col justify-end gap-8 md:col-span-4 md:col-start-9" data-reveal>
            <p className="lede !text-bone/85">
              Some homes are never listed. Some buildings are released quietly before, or instead of, a public
              offering.
            </p>
            <ButtonLink href="/private" tone="light" className="self-start">
              Request Private Access
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- Private Residential */}
      <Section id="residences">
        <div className="mb-14 grid gap-8 md:mb-24 md:grid-cols-12">
          <SectionTitle eyebrow="Private Residential" title="Selected residences" className="md:col-span-7" />
          <div className="flex flex-col justify-end md:col-span-5" data-reveal>
            <p className="lede max-w-[26rem]">
              A curated group of individual homes within our developments and beyond them. Some are listed. Others are
              shared privately.
            </p>
            <div className="mt-8 flex flex-wrap gap-8">
              <TextLink href="/residences">All residences</TextLink>
              <TextLink href="/private">Private access</TextLink>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {residences.map((r) => (
            <ResidenceEntry key={r.slug} residence={r} />
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------ Insights */}
      <Section id="insights" className="!pt-0">
        <div className="mb-12 flex items-end justify-between gap-6 md:mb-16">
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
