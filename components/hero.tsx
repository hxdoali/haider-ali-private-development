import Image from "next/image";
import type { ReactNode } from "react";
import { ViewTransition } from "react";
import { Presenter } from "@/components/presenter";
import type { Slide } from "@/lib/slides";

/**
 * Full-viewport cinematic opening for a development or residence. The image
 * arrives from the card the visitor clicked (shared element), settles with a
 * slow scale, and drifts on scroll. Copy rises in sequence.
 *
 * `data-hero` lets the header sit transparent over it until scrolled past.
 */
export function Hero({
  src,
  alt,
  transitionName,
  eyebrow,
  title,
  meta,
  slides,
  presentLabel = "Walk through",
}: {
  src: string;
  alt: string;
  transitionName: string;
  /** Breadcrumb / status line above the title. */
  eyebrow: ReactNode;
  title: ReactNode;
  /** Right-hand column: location, summary, price. */
  meta?: ReactNode;
  /** When provided, a "Walk through" control opens the full-screen walkthrough. */
  slides?: Slide[];
  presentLabel?: string;
}) {
  return (
    <section data-hero className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-charcoal text-bone">
      <ViewTransition name={transitionName} share="morph" default="none">
        <div className="absolute inset-0 overflow-hidden">
          <div className="hero-parallax absolute inset-0">
            <Image src={src} alt={alt} fill priority sizes="100vw" quality={80} className="hero-intro object-cover" />
          </div>
        </div>
      </ViewTransition>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(23,23,21,0.78)_0%,rgba(23,23,21,0.30)_42%,rgba(23,23,21,0.12)_100%)]"
      />

      <div className="gutter hero-copy relative pb-10 pt-40 md:pb-14">
        <p className="eyebrow flex flex-wrap items-center gap-3 !text-bone/70" style={{ "--i": 0 } as React.CSSProperties}>
          {eyebrow}
        </p>
        <h1
          className="display mt-6 text-[clamp(2.75rem,9vw,8.5rem)] leading-[0.95] text-bone"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          {title}
        </h1>
        <div style={{ "--i": 2 } as React.CSSProperties}>
          <div className="hero-rule mt-8 h-px w-full bg-bone/25 md:mt-10" />
          <div className="flex flex-col gap-6 pt-6 md:flex-row md:items-end md:justify-between md:gap-10">
            <div className="text-bone/90">{meta}</div>
            <div className="flex items-center gap-8 md:gap-10">
              {slides && slides.length > 0 ? <Presenter slides={slides} label={presentLabel} /> : null}
              <div className="hidden items-center gap-4 md:flex" aria-hidden="true">
                <span className="eyebrow !text-bone/50">Scroll</span>
                <span className="scroll-cue" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
