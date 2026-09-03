import type { Metadata } from "next";
import { getPrivateDevelopments, getPrivateResidences } from "@/lib/content";
import { PageIntro } from "@/components/page-intro";
import { Figure } from "@/components/figure";
import { ResidenceEntry } from "@/components/residence-entry";
import { DevelopmentEntry } from "@/components/development-entry";
import { ContactCta } from "@/components/contact-cta";
import { ButtonLink, Eyebrow, Section, SectionTitle } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Private — Off-Market Residences and Developments, NJ / NY",
  description:
    "Off-market residences and private developments in New Jersey and New York, shared by introduction. Request private access to homes not offered publicly.",
  path: "/private",
  image: "/private/hero.jpg",
  keywords: ["off-market residences New Jersey", "private listings Hoboken", "off-market Jersey City condos", "private new development NJ"],
});

const STEPS = [
  {
    label: "Request",
    body: "Tell us briefly what you are looking for, or what you are considering selling. A name and a way to reach you is enough.",
  },
  {
    label: "Conversation",
    body: "We speak directly, before anything is shared, to understand the brief and confirm that what we hold is relevant.",
  },
  {
    label: "Introduction",
    body: "Particulars are provided personally. Nothing is circulated, and nothing is shown that has not been agreed with its owner.",
  },
];

const requestHref = `/contact?inquiry=${encodeURIComponent("Private access")}`;

export default function PrivatePage() {
  const residences = getPrivateResidences();
  const developments = getPrivateDevelopments();
  return (
    <>
      <PageIntro
        eyebrow="Private"
        title="Residences and developments shared by introduction."
        intro={
          <p>
            Some homes are never listed. Some buildings are released to a small number of buyers before, or instead
            of, a public offering. This is where they are held.
          </p>
        }
        aside={<ButtonLink href={requestHref}>Request Private Access</ButtonLink>}
      />
      <Figure src="/private/hero.jpg" alt="Architectural detail" ratio="21/9" mobileRatio="4/5" priority sizes="100vw" />

      <Section>
        <div className="grid gap-12 md:grid-cols-12">
          <SectionTitle eyebrow="How it works" title="Three steps. Nothing public." className="md:col-span-5" />
          <ol className="md:col-span-6 md:col-start-7">
            {STEPS.map((s, i) => (
              <li key={s.label} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t hairline py-6">
                <Eyebrow>{String(i + 1).padStart(2, "0")}</Eyebrow>
                <div>
                  <p className="text-[16px] text-ink">{s.label}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-charcoal">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {developments.length > 0 ? (
        <Section className="!pt-0">
          <SectionTitle eyebrow="Private developments" title="Held privately" size="sm" className="mb-10 md:mb-14" />
          <div className="space-y-20 md:space-y-32">
            {developments.map((d, i) => (
              <DevelopmentEntry key={d.slug} development={d} index={i} />
            ))}
          </div>
        </Section>
      ) : null}

      {residences.length > 0 ? (
        <Section className="!pt-0">
          <SectionTitle eyebrow="Private residences" title="Currently held" size="sm" className="mb-10 md:mb-14" />
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {residences.map((r) => (
              <ResidenceEntry key={r.slug} residence={r} />
            ))}
          </div>
        </Section>
      ) : null}

      <section className="bg-linen">
        <div className="gutter grid gap-10 py-20 md:grid-cols-12 md:py-32">
          <SectionTitle eyebrow="Owners" title="Selling without listing." className="md:col-span-6" />
          <div className="measure flex flex-col justify-end space-y-5 text-[15px] leading-[1.75] text-charcoal md:col-span-5 md:col-start-8 md:text-[16px]">
            <p>
              Owners who prefer not to market a home publicly can place it with us quietly. It is shown only to
              qualified parties, on terms agreed in advance.
            </p>
            <p>Confidentiality is the default, not a request.</p>
          </div>
        </div>
      </section>

      <ContactCta
        eyebrow="Private access"
        title="Request access."
        body="A brief note is sufficient. We respond personally and treat every inquiry as confidential."
        cta="Request Private Access"
        href={requestHref}
      />
    </>
  );
}
