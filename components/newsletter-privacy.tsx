import type { ReactNode } from "react";
import { newsletterPrivacy } from "@/data/newsletter-privacy";

function linkedParagraph(text: string): ReactNode[] {
  return text.split(/(https:\/\/[^\s,]+|Haider\.Ali@serhant\.com)/g).map((part, index) => {
    if (part === "Haider.Ali@serhant.com") {
      return <a key={index} href={`mailto:${part}`} className="link-quiet break-words">{part}</a>;
    }
    if (part.startsWith("https://")) {
      const url = part.replace(/[.)]+$/, "");
      return <span key={index}><a href={url} className="link-quiet break-words">{url}</a>{part.slice(url.length)}</span>;
    }
    return part;
  });
}

export function NewsletterPrivacy() {
  return (
    <section id="ali-brief-privacy" aria-labelledby="ali-brief-privacy-heading" className="max-w-3xl scroll-mt-28 border-t hairline pt-12 md:pt-16">
      <h2 id="ali-brief-privacy-heading" className="display max-w-2xl text-[2.25rem] leading-[1.1] text-ink md:text-[3rem]">
        {newsletterPrivacy.title}
      </h2>
      <p className="eyebrow mt-6">{newsletterPrivacy.revised}</p>
      <p className="mt-5 pb-8 text-[14px] leading-relaxed text-charcoal">{newsletterPrivacy.scope}</p>
      {newsletterPrivacy.sections.map((section) => (
        <div key={section.heading} className="grid gap-3 border-t hairline py-8 md:grid-cols-12 md:gap-8">
          <h3 className="eyebrow leading-relaxed md:col-span-3">{section.heading}</h3>
          <div className="space-y-3 text-[14px] leading-relaxed text-charcoal md:col-span-9">
            {section.paragraphs.map((paragraph, index) => <p key={index}>{linkedParagraph(paragraph)}</p>)}
          </div>
        </div>
      ))}
    </section>
  );
}
