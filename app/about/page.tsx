import type { Metadata } from "next";
import { site } from "@/data/site";
import { PageIntro } from "@/components/page-intro";
import Image from "next/image";
import { Figure } from "@/components/figure";
import { ContactCta } from "@/components/contact-cta";
import { TerritoryList } from "@/components/territory-list";
import { Eyebrow, FactList, Prose, Section } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About the Practice",
  description:
    "Haider Ali is a private residential development practice in New Jersey and New York, focused on boutique new development, developer representation, development advisory and off-market residences.",
  path: "/about",
  image: "/about/practice.jpg",
});

/*
 * EDIT THIS COPY.
 * The paragraphs below describe the practice in general terms and deliberately
 * make no claims about track record, awards or sales volume. Add biography,
 * background and credentials here once they can be stated accurately.
 */
const PRACTICE = [
  "Haider Ali is a private residential development practice working across New Jersey and New York: the Hudson waterfront, Bergen County, the Shore and Princeton on one side of the river; Manhattan, Brooklyn, Westchester, the Hamptons and the Hudson Valley on the other. The focus is narrow by design: boutique new development, representation of the developers who build it, advisory for those planning it, and a small number of residences handled privately.",
  "The work sits between disciplines. Part development, part design, part market. We are most useful in the early decisions, when the site, the programme and the position of a building are still open, and we stay through launch and sellout so that those decisions are carried into the contracts.",
  "The practice is deliberately small. Fewer projects, handled directly, with the discretion that developers, investors, family offices and private owners expect.",
];

const FOCUS = [
  "Boutique new development",
  "Developer representation",
  "Development advisory",
  "Private and off-market residences",
  "Select high-end properties",
];


export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About"
        title="A private residential development practice."
        intro={<p>{site.descriptor}. {site.region}.</p>}
      />

      <Section className="!pt-0">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Figure src="/about/lead.jpg" alt="The Caliburn, Jersey City Heights" ratio="4/5" priority sizes="(min-width: 768px) 40vw, 100vw" />
            <p className="eyebrow mt-3">The Caliburn  ·  Jersey City Heights</p>
          </div>
          <div className="flex flex-col justify-between gap-12 md:col-span-6 md:col-start-7">
            <div>
              <Eyebrow className="mb-6">The practice</Eyebrow>
              <Prose paragraphs={PRACTICE} lede />
            </div>
            <div className="grid gap-x-10 sm:grid-cols-2">
              <div>
                <Eyebrow className="mb-2">Focus</Eyebrow>
                <ul>
                  {FOCUS.map((f) => (
                    <li key={f} className="border-t hairline py-3 text-[15px] text-ink">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Eyebrow className="mb-2">Clients</Eyebrow>
                <ul>
                  {["Developers", "Investors", "Family offices", "Private owners"].map((t) => (
                    <li key={t} className="border-t hairline py-3 text-[15px] text-ink">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="grid gap-8 md:grid-cols-12">
          <Eyebrow className="md:col-span-3">Territory</Eyebrow>
          <div className="md:col-span-9">
            <TerritoryList />
          </div>
        </div>
      </Section>

      <section className="bg-linen">
        <div className="gutter grid gap-10 py-20 md:grid-cols-12 md:py-32">
          <div className="md:col-span-6">
            <Eyebrow className="mb-6">Principles</Eyebrow>
            <p className="display text-[1.85rem] leading-[1.15] text-ink md:text-[2.5rem]">
              Fewer projects. Earlier involvement. Direct handling. Nothing said that cannot be shown.
            </p>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <FactList
              items={[
                { label: "Licensing", value: site.legal.license },
                { label: "Brokerage", value: site.legal.brokerage },
                { label: "Region", value: site.region },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Brokerage affiliation */}
      <Section>
        <div className="grid gap-12 md:grid-cols-12 md:items-center">
          <div className="md:col-span-6">
            <Figure src={site.brokerage.image} alt="Downtown Jersey City" ratio="3/2" sizes="(min-width: 768px) 50vw, 100vw" />
            <p className="eyebrow mt-3">Downtown Jersey City  ·  {site.brokerage.address}</p>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <Eyebrow className="mb-6">Affiliation</Eyebrow>
            <Image
              src={site.brokerage.logo}
              alt={site.brokerage.name}
              width={640}
              height={160}
              className="h-9 w-auto text-ink md:h-11"
              data-reveal
            />
            <p className="lede mt-8" data-reveal>
              {site.brokerage.blurb}
            </p>
            <FactList
              className="mt-10"
              items={[
                { label: "Office", value: `${site.brokerage.address}, ${site.brokerage.city}` },
                {
                  label: "Telephone",
                  value: (
                    <a href={site.brokerage.phoneHref} className="link-quiet">
                      {site.brokerage.phone}
                    </a>
                  ),
                },
                { label: "Broker", value: site.brokerage.legalName },
              ]}
            />
          </div>
        </div>
      </Section>

      <ContactCta />
    </>
  );
}
