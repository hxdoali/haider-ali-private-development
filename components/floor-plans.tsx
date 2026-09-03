import Image from "next/image";
import type { FloorPlan } from "@/lib/types";
import { formatBaths, formatSquareFeet } from "@/lib/format";

export function FloorPlans({ plans }: { plans: readonly FloorPlan[] }) {
  if (plans.length === 0) return null;
  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-x-8 md:gap-y-14">
      {plans.map((plan) => (
        <figure key={plan.name}>
          <div className="relative aspect-[10/7] w-full overflow-hidden border hairline bg-[#f6f3ee]">
            <Image
              src={plan.image}
              alt={`${plan.name} floor plan`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              quality={80}
              className="object-contain"
            />
          </div>
          <figcaption className="mt-4 flex flex-col gap-1">
            <span className="text-[15px] text-ink">{plan.name}</span>
            <span className="eyebrow">
              {[
                plan.beds !== undefined ? `${plan.beds} bed` : null,
                plan.baths !== undefined ? `${formatBaths(plan.baths)} bath` : null,
                plan.squareFeet ? formatSquareFeet(plan.squareFeet) : null,
              ]
                .filter(Boolean)
                .join("  ·  ")}
            </span>
            {plan.note ? <span className="text-[13px] text-ash">{plan.note}</span> : null}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
