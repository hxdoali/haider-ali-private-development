import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/data/site";
import { getPublicDevelopments, getPublicResidences } from "@/lib/content";
import { Presenter } from "@/components/presenter";
import { pageMetadata } from "@/lib/seo";
import { portfolioSlides } from "@/lib/slides";

export const metadata: Metadata = pageMetadata({
  title: "Portfolio screening",
  description: "Present the portfolio on a large display.",
  path: "/present",
  noIndex: true,
});

/**
 * A screening of the whole public portfolio, chapter by chapter, for a
 * conference room or a client's living room. The first click takes the
 * screen; arrow keys, space or a click move through it; Esc leaves.
 */
export default function PresentPage() {
  const slides = portfolioSlides();
  const developments = getPublicDevelopments();
  const residences = getPublicResidences();
  const backdrop = developments[0]?.heroImage;

  return (
    <section data-hero className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink text-bone">
      {backdrop ? (
        <div className="absolute inset-0 opacity-35">
          <Image src={backdrop} alt="" fill priority sizes="100vw" quality={70} className="hero-drift object-cover" />
        </div>
      ) : null}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(23,23,21,0.9)_0%,rgba(23,23,21,0.45)_50%,rgba(23,23,21,0.3)_100%)]"
      />
      <div className="gutter hero-copy relative pb-12 pt-40 md:pb-16">
        <p className="eyebrow !text-bone/70" style={{ "--i": 0 } as React.CSSProperties}>
          Screening  ·  {site.region}
        </p>
        <h1
          className="display mt-6 max-w-[14ch] text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.95] text-bone"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          The portfolio, on one screen.
        </h1>
        <div style={{ "--i": 2 } as React.CSSProperties}>
          <div className="hero-rule mt-8 h-px w-full bg-bone/25 md:mt-10" />
          <div className="flex flex-col gap-8 pt-6 md:flex-row md:items-end md:justify-between md:gap-10">
            <div className="max-w-[34rem]">
              <p className="lede !text-bone/85">
                {developments.length} developments and {residences.length} residences, shown one image at a time with
                the room lights down. It runs on its own, or you drive it.
              </p>
              <p className="eyebrow mt-6 !text-bone/50">
                → or space to advance  ·  ← back  ·  P pause  ·  F fullscreen  ·  Esc to leave
              </p>
            </div>
            <Presenter slides={slides} variant="inline" label={`Begin  ·  ${slides.length} slides`} />
          </div>
        </div>
      </div>
    </section>
  );
}
