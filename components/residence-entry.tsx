import Link from "next/link";
import { Figure } from "@/components/figure";
import { DemoTag } from "@/components/demo-tag";
import { formatPrice, residenceSummary } from "@/lib/format";
import type { Residence } from "@/lib/types";

export function ResidenceEntry({ residence, priority = false }: { residence: Residence; priority?: boolean }) {
  const r = residence;
  return (
    <article className="group">
      <Link href={`/residences/${r.slug}`} className="img-hover block" aria-label={r.name}>
        <Figure
          src={r.heroImage}
          alt={r.private ? "Private residence" : `${r.name}, ${r.location}`}
          ratio="4/5"
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </Link>
      <div className="mt-5 flex flex-col gap-1.5">
        <p className="eyebrow flex flex-wrap items-center gap-3">
          <span>{r.private ? "Private residence" : r.status}</span>
          {r.demo ? <DemoTag /> : null}
        </p>
        <h3 className="display text-[1.6rem] text-ink md:text-[1.85rem]">
          <Link href={`/residences/${r.slug}`} className="hover:text-charcoal">
            {r.private ? "Private Residence" : r.name}
          </Link>
        </h3>
        <p className="text-[14px] text-charcoal">{r.location}</p>
        <p className="eyebrow mt-2">{residenceSummary(r)}</p>
        <p className="mt-1 text-[15px] text-ink">{formatPrice(r)}</p>
      </div>
    </article>
  );
}
