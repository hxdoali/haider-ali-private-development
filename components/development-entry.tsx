import Link from "next/link";
import { Figure } from "@/components/figure";
import { DemoTag } from "@/components/demo-tag";
import type { Development } from "@/lib/types";

/**
 * Editorial portfolio entry: a large image with a restrained caption block.
 * `index` alternates the image column so a list of entries reads as a spread.
 */
export function DevelopmentEntry({
  development,
  index = 0,
  priority = false,
}: {
  development: Development;
  index?: number;
  priority?: boolean;
}) {
  const d = development;
  const flip = index % 2 === 1;
  return (
    <article className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
      <Link
        href={`/developments/${d.slug}`}
        className={`img-hover block md:col-span-8 ${flip ? "md:order-2 md:col-start-5" : ""}`}
        aria-label={d.name}
      >
        <Figure
          src={d.heroImage}
          alt={d.private ? `${d.name}, private development` : `${d.name}, ${d.location}`}
          ratio="3/2"
          priority={priority}
          sizes="(min-width: 768px) 66vw, 100vw"
        />
      </Link>
      <div className={`flex flex-col justify-end md:col-span-4 ${flip ? "md:order-1 md:col-start-1" : ""}`} data-reveal>
        <p className="eyebrow flex flex-wrap items-center gap-3">
          <span className="text-clay">{String(index + 1).padStart(2, "0")}</span>
          <span>{d.private ? "Private" : d.status}</span>
          {d.demo ? <DemoTag /> : null}
        </p>
        <h3 className="display mt-4 text-[2.25rem] text-ink md:text-[2.9rem]">
          <Link href={`/developments/${d.slug}`} className="hover:text-charcoal">
            {d.name}
          </Link>
        </h3>
        <p className="mt-2 text-[15px] text-charcoal">{d.location}</p>
        <p className="eyebrow mt-5">
          {d.residenceCount} {d.residenceCount === 1 ? "residence" : "residences"}
          {d.private ? "" : `  ·  ${d.projectType}`}
        </p>
        <Link href={`/developments/${d.slug}`} className="link-quiet mt-6 inline-block self-start text-[15px] text-ink">
          {d.private ? "Request access" : "View development"}
        </Link>
      </div>
    </article>
  );
}
