import Link from "next/link";
import { formatDate } from "@/lib/format";
import type { Insight } from "@/lib/types";

export function InsightEntry({ insight }: { insight: Insight }) {
  return (
    <article className="border-t hairline pt-6" data-reveal>
      <p className="eyebrow">
        {insight.category}  ·  {formatDate(insight.date)}
      </p>
      <h3 className="display mt-3 text-[1.6rem] text-ink md:text-[1.9rem]">
        <Link href={`/insights/${insight.slug}`} className="hover:text-charcoal">
          {insight.title}
        </Link>
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-charcoal">{insight.excerpt}</p>
      <Link href={`/insights/${insight.slug}`} className="link-quiet mt-4 inline-block text-[15px] text-ink">
        Read
      </Link>
    </article>
  );
}
