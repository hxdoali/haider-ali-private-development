import Image from "next/image";
import { ViewTransition } from "react";

type Ratio = "3/2" | "4/5" | "16/9" | "1/1" | "21/9" | "2/3" | "auto";

const ratios: Record<Exclude<Ratio, "auto">, string> = {
  "3/2": "aspect-[3/2]",
  "4/5": "aspect-[4/5]",
  "16/9": "aspect-[16/9]",
  "1/1": "aspect-square",
  "21/9": "aspect-[21/9]",
  "2/3": "aspect-[2/3]",
};

const mdRatios: Record<Exclude<Ratio, "auto">, string> = {
  "3/2": "md:aspect-[3/2]",
  "4/5": "md:aspect-[4/5]",
  "16/9": "md:aspect-[16/9]",
  "1/1": "md:aspect-square",
  "21/9": "md:aspect-[21/9]",
  "2/3": "md:aspect-[2/3]",
};

/**
 * Editorial image with a fixed aspect ratio. Uses next/image `fill`, so the
 * source can be any size. Vercel's free image optimisation handles resizing.
 *
 * `ratio` applies from the md breakpoint up; `mobileRatio` (optional) applies
 * below it, so wide images can be shown taller on phones.
 *
 * `transitionName` makes the image a shared element: give the card image and
 * the detail-page hero the same name and the browser morphs one into the
 * other on navigation instead of reloading it.
 */
export function Figure({
  src,
  alt,
  ratio = "3/2",
  mobileRatio,
  caption,
  priority = false,
  sizes = "100vw",
  className = "",
  imgClassName = "",
  reveal = true,
  transitionName,
}: {
  src: string;
  alt: string;
  ratio?: Ratio;
  mobileRatio?: Exclude<Ratio, "auto">;
  caption?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  reveal?: boolean;
  transitionName?: string;
}) {
  const ratioClass =
    ratio === "auto"
      ? ""
      : mobileRatio
        ? `${ratios[mobileRatio]} ${mdRatios[ratio]}`
        : ratios[ratio];
  const frame = (
    <div className={`relative w-full overflow-hidden bg-linen ${ratioClass}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        quality={80}
        className={`object-cover ${imgClassName}`}
      />
    </div>
  );
  return (
    <figure className={className} data-reveal={reveal && !priority ? "image" : undefined}>
      {transitionName ? (
        <ViewTransition name={transitionName} share="morph" default="none">
          {frame}
        </ViewTransition>
      ) : (
        frame
      )}
      {caption ? <figcaption className="eyebrow mt-3">{caption}</figcaption> : null}
    </figure>
  );
}
