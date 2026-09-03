import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getInsight, getInsights } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { Figure } from "@/components/figure";
import { InsightEntry } from "@/components/insight-entry";
import { ContactCta } from "@/components/contact-cta";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { Prose, Section, SectionTitle } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getInsights().map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const i = getInsight(slug);
  if (!i) return {};
  return pageMetadata({
    title: i.title,
    description: i.excerpt,
    path: `/insights/${i.slug}`,
    image: i.image,
  });
}

export default async function InsightPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();
  const others = getInsights().filter((i) => i.slug !== insight.slug).slice(0, 3);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
          { name: insight.title, path: `/insights/${insight.slug}` },
        ]}
      />
      <article>
        <header className="gutter pt-12 pb-10 md:pt-24 md:pb-14">
          <p className="eyebrow flex flex-wrap items-center gap-3">
            <Link href="/insights" className="hover:text-ink">
              Insights
            </Link>
            <span aria-hidden="true">/</span>
            <span>{insight.category}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={insight.date}>{formatDate(insight.date)}</time>
          </p>
          <h1 className="display mt-6 max-w-5xl text-[2.5rem] text-ink md:text-[3.75rem] lg:text-[4.5rem]">{insight.title}</h1>
        </header>
        {insight.image ? (
          <div className="gutter">
            <Figure src={insight.image} alt="" ratio="21/9" priority sizes="100vw" />
          </div>
        ) : null}
        <Section>
          <div className="grid gap-8 md:grid-cols-12">
            <p className="display text-[1.5rem] leading-[1.3] text-charcoal md:col-span-4 md:text-[1.75rem]">{insight.excerpt}</p>
            <div className="md:col-span-7 md:col-start-6">
              <Prose paragraphs={insight.body} className="!max-w-[38rem] md:!text-[17px]" />
            </div>
          </div>
        </Section>
      </article>

      {others.length > 0 ? (
        <Section className="!pt-0">
          <SectionTitle eyebrow="Further reading" title="More notes" size="sm" className="mb-10" />
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {others.map((i) => (
              <InsightEntry key={i.slug} insight={i} />
            ))}
          </div>
        </Section>
      ) : null}

      <ContactCta />
    </>
  );
}
