import type { Metadata } from "next";
import { Suspense } from "react";
import { site } from "@/data/site";
import { PageIntro } from "@/components/page-intro";
import { ContactForm } from "@/components/contact-form";
import { Eyebrow } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Haider Ali for new development, developer representation, development advisory and private residences in New Jersey and New York.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Begin a conversation."
        intro={<p>For developments, residences, representation or advisory. Inquiries are answered personally and held in confidence.</p>}
      />
      <section className="gutter pb-8">
        <div className="grid gap-14 md:grid-cols-12">
          <aside className="md:col-span-4">
            <dl className="space-y-8">
              <div>
                <Eyebrow>Email</Eyebrow>
                <dd className="mt-2 text-[16px]">
                  <a href={`mailto:${site.contact.email}`} className="link-quiet text-ink">
                    {site.contact.email}
                  </a>
                </dd>
              </div>
              {site.contact.phone ? (
                <div>
                  <Eyebrow>Telephone</Eyebrow>
                  <dd className="mt-2 text-[16px]">
                    <a href={site.contact.phoneHref} className="link-quiet text-ink">
                      {site.contact.phone}
                    </a>
                  </dd>
                </div>
              ) : null}
              <div>
                <Eyebrow>Instagram</Eyebrow>
                <dd className="mt-2 text-[16px]">
                  <a href={site.contact.instagram} target="_blank" rel="noopener noreferrer" className="link-quiet text-ink">
                    {site.contact.instagramHandle}
                  </a>
                </dd>
              </div>
              <div>
                <Eyebrow>Region</Eyebrow>
                <dd className="mt-2 text-[16px] text-ink">{site.region}</dd>
              </div>
              <div>
                <Eyebrow>Office</Eyebrow>
                <dd className="mt-2 text-[15px] leading-relaxed text-charcoal">
                  {site.brokerage.name} {site.brokerage.office}
                  <br />
                  {site.brokerage.address}
                  <br />
                  {site.brokerage.city}
                  <br />
                  <a href={site.brokerage.phoneHref} className="link-quiet text-ink">
                    {site.brokerage.phone}
                  </a>
                </dd>
              </div>
            </dl>
          </aside>
          <div className="md:col-span-7 md:col-start-6">
            <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
