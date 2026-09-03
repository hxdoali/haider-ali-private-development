import { Figure } from "@/components/figure";

/**
 * Editorial gallery. Alternates a wide image with a pair, so the rhythm
 * reads like a magazine spread rather than a card grid.
 */
export function Gallery({ images, alt }: { images: readonly string[]; alt: string }) {
  if (images.length === 0) return null;
  const rows: string[][] = [];
  let i = 0;
  let wide = true;
  while (i < images.length) {
    if (wide || images.length - i === 1) {
      rows.push([images[i]]);
      i += 1;
    } else {
      rows.push(images.slice(i, i + 2));
      i += 2;
    }
    wide = !wide;
  }
  return (
    <div className="space-y-4 md:space-y-8">
      {rows.map((row, r) =>
        row.length === 1 ? (
          <Figure key={r} src={row[0]} alt={`${alt} — image ${r + 1}`} ratio="3/2" sizes="100vw" />
        ) : (
          <div key={r} className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
            {row.map((src, c) => (
              <Figure
                key={src}
                src={src}
                alt={`${alt} — image ${r + 1}.${c + 1}`}
                ratio="4/5"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            ))}
          </div>
        ),
      )}
    </div>
  );
}
