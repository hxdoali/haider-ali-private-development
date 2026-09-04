import type { Metadata } from "next";
import { site } from "@/data/site";
import { PageIntro } from "@/components/page-intro";
import { Eyebrow } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Legal & Licensing",
  description: "Licensing, brokerage, fair housing and legal disclosures.",
  path: "/legal",
  noIndex: true,
});

/*
 * PLACEHOLDER DISCLOSURES.
 * Every block below is drawn from /data/site.ts. Replace the bracketed text
 * with the language supplied by your brokerage and counsel before launch.
 */
const SECTIONS: { label: string; body: string[] }[] = [
  { label: "Brokerage", body: [site.legal.brokerage, site.legal.brokerageAddress] },
  { label: "Licensing", body: [site.legal.license] },
  { label: "Fair housing", body: [site.legal.fairHousing, site.legal.equalHousingLine] },
  { label: "New York", body: [site.legal.nyStandardOperatingProcedures] },
  { label: "New Jersey", body: [site.legal.njConsumerInformation] },
  { label: "Disclaimer", body: [site.legal.disclaimer] },
  {
    label: "Privacy",
    body: [
      "Information submitted through the contact form is used solely to respond to your inquiry and is not sold or shared with third parties for marketing. Form submissions are processed by the form provider named in the site configuration. This site does not use advertising cookies. [PLACEHOLDER — replace with your privacy policy]",
    ],
  },
  {
    label: "Demonstration content",
    body: [
      "Projects and residences marked “Demo” on this site are fictional placeholders provided to demonstrate the site's layout. They do not represent real properties, developers, architects, prices or offerings.",
    ],
  },
];

export default function LegalPage() {
  return (
    <>
      <PageIntro eyebrow="Legal" title="Disclosures." intro={<p>Licensing, brokerage, fair housing and legal information.</p>} />
      <div className="gutter pb-8">
        <dl className="max-w-3xl">
          {SECTIONS.map((s) => (
            <div key={s.label} className="grid gap-3 border-t hairline py-8 md:grid-cols-12 md:gap-8">
              <dt className="md:col-span-3">
                <Eyebrow>{s.label}</Eyebrow>
              </dt>
              <dd className="space-y-3 text-[14px] leading-relaxed text-charcoal md:col-span-9">
                {s.body.filter(Boolean).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}
