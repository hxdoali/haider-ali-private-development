import { ButtonLink, Eyebrow } from "@/components/ui";
import { site } from "@/data/site";

/**
 * Closing contact section reused across pages.
 */
export function ContactCta({
  eyebrow = "Contact",
  title = "Conversations begin privately.",
  body = "For developments, residences, representation or advisory, write directly or use the form. Inquiries are answered personally.",
  cta = "Get in touch",
  href = "/contact",
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  cta?: string;
  href?: string;
}) {
  return (
    <section className="bg-ink text-bone">
      <div className="gutter grid gap-10 py-20 md:grid-cols-12 md:py-32">
        <div className="md:col-span-7">
          <Eyebrow className="!text-clay">{eyebrow}</Eyebrow>
          <h2 className="display mt-5 text-[2.5rem] text-bone md:text-[4rem]">{title}</h2>
        </div>
        <div className="flex flex-col justify-end gap-8 md:col-span-5">
          <p className="measure text-[15px] leading-relaxed text-sand md:text-[16px]">{body}</p>
          <div className="flex flex-wrap items-center gap-6">
            <ButtonLink href={href} tone="light">
              {cta}
            </ButtonLink>
            <a href={`mailto:${site.contact.email}`} className="link-quiet text-[15px] text-bone">
              {site.contact.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
