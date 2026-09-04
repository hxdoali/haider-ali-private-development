import Image, { getImageProps } from "next/image";
import { ViewTransition } from "react";
import { PrefetchImage } from "@/components/prefetch-image";

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
 * other on navigation instead of reloading it. `prefetchHero` additionally
 * warms the cache with the full-screen variant (as rendered by <Hero>) when
 * the card comes into view, so the morph lands on a loaded image.
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
  prefetchHero = false,
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
  prefetchHero?: boolean;
}) {
  const ratioClass =
    ratio === "auto"
      ? ""
      : mobileRatio
        ? `${ratios[mobileRatio]} ${mdRatios[ratio]}`
        : ratios[ratio];
  // Must match the <Image> in components/hero.tsx so the browser reuses the cache.
  const hero = prefetchHero ? getImageProps({ src, alt: "", fill: true, sizes: "100vw", quality: 80 }).props : null;
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
      {hero?.srcSet ? <PrefetchImage srcSet={hero.srcSet} sizes={hero.sizes ?? "100vw"} /> : null}
    </figure>
  );
}
