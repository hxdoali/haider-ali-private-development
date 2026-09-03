import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui";

/**
 * Standard page opening: eyebrow, large title, and an intro paragraph set to
 * the right on wide screens.
 */
export function PageIntro({
  eyebrow,
  title,
  intro,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <header className="gutter pt-12 pb-12 md:pt-24 md:pb-20">
      <div className="grid gap-8 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-8">
          <Eyebrow className="mb-5 md:mb-8">{eyebrow}</Eyebrow>
          <h1 className="display text-[2.75rem] text-ink md:text-[4.25rem] lg:text-[5.25rem]">{title}</h1>
        </div>
        {intro ? (
          <div className="flex flex-col justify-end md:col-span-4">
            <div className="measure text-[15px] leading-[1.75] text-charcoal md:text-[16px]">{intro}</div>
            {aside ? <div className="mt-6">{aside}</div> : null}
          </div>
        ) : null}
      </div>
    </header>
  );
}
