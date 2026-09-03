import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { Figure } from "@/components/figure";
import { ContactCta } from "@/components/contact-cta";
import { Eyebrow, Section, SectionTitle } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Advisory — Residential Development Advisory and Developer Representation, NJ / NY",
  description:
    "Residential development advisory and developer representation in New Jersey and New York: positioning, market intelligence, product strategy, unit mix, pricing, pre-launch and sellout strategy for boutique new development.",
  path: "/advisory",
  image: "/advisory/hero.jpg",
  keywords: [
    "developer representation NJ",
    "residential development advisory NJ",
    "new development marketing New Jersey",
    "condo pricing strategy Jersey City",
    "pre-launch strategy Hoboken new development",
  ],
});

const SERVICES: { title: string; body: string }[] = [
  {
    title: "Development positioning",
    body: "What the building is, who it is for, and why it should exist on this site. Settled before the design is fixed, so every later decision has a reference.",
  },
  {
    title: "Market intelligence",
    body: "A close reading of the competitive set, absorption and the buyers actually transacting, rather than a report of averages.",
  },
  {
    title: "Product strategy",
    body: "Plan efficiency, ceiling heights, finish level and outdoor space, judged against what the target buyer will pay for and what they will not.",
  },
  {
    title: "Unit mix",
    body: "The number, size and distribution of residences across the building, tested against the sellout curve rather than the zoning envelope alone.",
  },
  {
    title: "Pricing",
    body: "A schedule built from the plan, exposure and floor, and revised as contracts are signed. Sequence first, then spread, then the number.",
  },
  {
    title: "Pre-launch",
    body: "Naming, identity and materials, a short list of the right early buyers, and a quiet release ahead of the public offering.",
  },
  {
    title: "Developer representation",
    body: "Exclusive representation of the sponsor through the offering: inquiries, appointments, negotiation and reporting, handled personally.",
  },
  {
    title: "Sellout strategy",
    body: "Release timing, inventory holds and price revisions through to the last contract, with the developer's return as the measure.",
  },
];

const PHASES = [
  {
    label: "Before design is fixed",
    body: "Site, programme, mix and positioning. The decisions that are cheapest to change and most expensive to get wrong.",
  },
  {
    label: "Before launch",
    body: "Pricing, identity, materials and the early buyer list. The offering is prepared quietly and released in sequence.",
  },
  {
    label: "Through sellout",
    body: "Representation of the sponsor from first contract to last, with reporting that a board or lender can read.",
  },
];

export default function AdvisoryPage() {
  return (
    <>
      <PageIntro
        eyebrow="Advisory"
        title="Development advisory and developer representation."
        intro={
          <p>
            We advise developers, investors and family offices on residential projects in New Jersey and New York,
            and represent them through pre-launch and sellout. The copy is short because the work is specific.
          </p>
        }
      />
      <div className="gutter">
        <Figure src="/advisory/hero.jpg" alt="Architectural study" ratio="16/9" priority sizes="100vw" />
      </div>

      <Section>
        <SectionTitle eyebrow="Services" title="Eight things, done carefully." className="mb-12 md:mb-20" />
        <ol className="grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <li key={s.title} className="border-t hairline pt-5">
              <Eyebrow>{String(i + 1).padStart(2, "0")}</Eyebrow>
              <h3 className="display mt-3 text-[1.5rem] text-ink md:text-[1.75rem]">{s.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-charcoal md:text-[15px]">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <section className="bg-linen">
        <div className="gutter py-20 md:py-32">
          <SectionTitle eyebrow="How we work" title="Three moments in a project." className="mb-12 md:mb-20" />
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {PHASES.map((p) => (
              <div key={p.label} className="border-t border-clay pt-5">
                <p className="eyebrow">{p.label}</p>
                <p className="mt-4 text-[15px] leading-relaxed text-charcoal md:text-[16px]">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 md:grid-cols-12">
          <SectionTitle eyebrow="Who we work with" title="Developers, investors, family offices, owners." className="md:col-span-7" />
          <div className="measure flex flex-col justify-end space-y-5 text-[15px] leading-[1.75] text-charcoal md:col-span-5 md:text-[16px]">
            <p>
              Sponsors planning or launching a residential building. Investors and family offices underwriting one.
              Owners of land or buildings weighing whether, and how, to develop.
            </p>
            <p>Engagements are limited in number so that each receives direct attention.</p>
          </div>
        </div>
      </Section>

      <ContactCta
        eyebrow="Advisory"
        title="Start with a site, a plan, or a question."
        body="Early conversations are the most useful. If you are considering a residential project in New Jersey or New York, we would be glad to hear about it."
        cta="Discuss a project"
        href={`/contact?inquiry=${encodeURIComponent("Development advisory")}`}
      />
    </>
  );
}
