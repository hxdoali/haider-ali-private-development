import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui";
import { SplitText } from "@/components/split-text";

/**
 * Standard page opening: eyebrow, large title, and a serif lede set to the
 * right on wide screens. Includes the offset for the fixed header.
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
    <header className="gutter pt-32 pb-14 md:pt-48 md:pb-24">
      <div className="grid gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-8">
          <Eyebrow className="rise-in mb-6 md:mb-10">{eyebrow}</Eyebrow>
          <h1 className="display text-[2.9rem] text-ink md:text-[4.5rem] lg:text-[5.75rem]">
            <SplitText text={title} delay={0.25} />
          </h1>
        </div>
        {intro ? (
          <div className="rise-in flex flex-col justify-end md:col-span-4" style={{ "--i": 4 } as React.CSSProperties}>
            <div className="lede max-w-[30rem]">{intro}</div>
            {aside ? <div className="mt-8">{aside}</div> : null}
          </div>
        ) : null}
      </div>
    </header>
  );
}
