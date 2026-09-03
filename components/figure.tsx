import Image from "next/image";

type Ratio = "3/2" | "4/5" | "16/9" | "1/1" | "21/9" | "auto";

const ratios: Record<Exclude<Ratio, "auto">, string> = {
  "3/2": "aspect-[3/2]",
  "4/5": "aspect-[4/5]",
  "16/9": "aspect-[16/9]",
  "1/1": "aspect-square",
  "21/9": "aspect-[21/9]",
};

/**
 * Editorial image with a fixed aspect ratio. Uses next/image `fill`, so the
 * source can be any size. Vercel's free image optimisation handles resizing.
 */
export function Figure({
  src,
  alt,
  ratio = "3/2",
  caption,
  priority = false,
  sizes = "100vw",
  className = "",
  imgClassName = "",
}: {
  src: string;
  alt: string;
  ratio?: Ratio;
  caption?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <figure className={className}>
      <div className={`relative w-full overflow-hidden bg-linen ${ratio === "auto" ? "" : ratios[ratio]}`}>
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
      {caption ? <figcaption className="eyebrow mt-3">{caption}</figcaption> : null}
    </figure>
  );
}
