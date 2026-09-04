import { Eyebrow } from "@/components/ui";
import { territoryByState } from "@/lib/territory";

/** Two columns, one per state, each region with its places beneath. */
export function TerritoryList({ className = "" }: { className?: string }) {
  return (
    <div className={`grid gap-12 md:grid-cols-2 ${className}`}>
      {(["New Jersey", "New York"] as const).map((state) => (
        <div key={state} data-reveal>
          <p className="display text-[1.6rem] text-ink md:text-[1.9rem]">{state}</p>
          <ul className="mt-6">
            {territoryByState(state).map((t) => (
              <li key={t.region} className="grid gap-1 border-t hairline py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <Eyebrow className="pt-0.5">{t.region}</Eyebrow>
                <p className="text-[15px] leading-relaxed text-charcoal">{t.places.join("  ·  ")}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
