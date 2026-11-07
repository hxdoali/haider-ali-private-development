import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";
import { PageIntro } from "@/components/page-intro";
import { Eyebrow } from "@/components/ui";
import { publishedNewsletterFormId } from "@/data/newsletter";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "The Ali Brief",
  description: "Real estate insights and local updates from Haider Ali, shaped around your interests in New Jersey and New York.",
  path: "/brief",
});

export default function BriefPage() {
  const formId = publishedNewsletterFormId();
  return (
    <>
      <PageIntro
        eyebrow="A note from Haider"
        title="The Ali Brief."
        intro={<p>Useful real estate insights, local perspective, and questions worth asking before your next move.</p>}
      />
      <section className="gutter pb-8" aria-labelledby="brief-signup-heading">
        <div className="grid gap-12 border-t hairline pt-10 md:grid-cols-12 md:gap-16 md:pt-14">
          <aside className="space-y-8 md:col-span-4">
            <div>
              <Eyebrow>Your interests</Eyebrow>
              <p className="mt-3 text-[15px] leading-relaxed text-charcoal">Buying, selling, renting, investing, new developments, and local market news. Choose the topics that matter to you.</p>
            </div>
            <div>
              <Eyebrow>Your areas</Eyebrow>
              <p className="mt-3 text-[15px] leading-relaxed text-charcoal">Jersey City, Hoboken, Edgewater, nearby New Jersey, and New York City.</p>
            </div>
            <p className="text-[13px] leading-relaxed text-ash">Subscription is optional. A property inquiry does not sign you up. You can unsubscribe at any time.</p>
          </aside>
          <div className="md:col-span-8">
            <h2 id="brief-signup-heading" className="display mb-8 text-[2rem] leading-[1.1] text-ink md:text-[2.5rem]">A brief for your next chapter.</h2>
            {formId ? <NewsletterForm formId={formId} /> : (
              <p className="max-w-xl text-[16px] leading-relaxed text-charcoal">Newsletter signup is opening soon. Please check back here.</p>
            )}
            <p className="mt-8 max-w-xl text-[13px] leading-relaxed text-ash">
              {formId ? "Provide your email, choose at least one interest and area, and confirm your newsletter consent. First name is optional." : "When signup opens, provide your email, choose at least one interest and area, and confirm your newsletter consent. First name is optional."}{" "}
              <Link href="/legal#ali-brief-privacy" className="link-quiet text-charcoal">Read the newsletter privacy notice.</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
