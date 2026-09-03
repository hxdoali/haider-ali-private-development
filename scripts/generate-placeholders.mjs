/**
 * Generates placeholder architectural imagery for the demo content.
 *
 * Run with:  npm run placeholders
 *
 * You do NOT need this script for a real site — replace the generated files
 * in /public with your own photography. It exists only so the demo content
 * has imagery and so the repository does not depend on third-party photos.
 *
 * Requires the `sharp` devDependency (installed with `npm install`).
 */
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public");

/* Warm, stone-toned palette. */
const palettes = [
  ["#E9E3D8", "#CFC6B7", "#8E857A", "#3B3834"],
  ["#EDE7DD", "#D6CDBE", "#A29888", "#2E2C29"],
  ["#E4DED3", "#B9AF9F", "#6F675E", "#1F1E1C"],
  ["#F0EBE2", "#D9D1C3", "#968C7C", "#4A4641"],
  ["#E2DCD1", "#C3B9A8", "#7D7468", "#26241F"],
];

function rng(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

/** Abstract facade / interior composition in SVG. */
function architecturalSVG(w, h, seed, variant) {
  const r = rng(seed);
  const p = palettes[seed % palettes.length];
  const parts = [];
  parts.push(`<defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${p[0]}"/>
      <stop offset="1" stop-color="${p[1]}"/>
    </linearGradient>
    <linearGradient id="shade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${p[3]}" stop-opacity="0.85"/>
      <stop offset="1" stop-color="${p[2]}" stop-opacity="0.9"/>
    </linearGradient>
    <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.06"/></feComponentTransfer></filter>
  </defs>`);
  parts.push(`<rect width="${w}" height="${h}" fill="url(#sky)"/>`);

  if (variant === "facade") {
    // Large planar wall with a grid of recessed openings.
    const wallX = w * (0.05 + r() * 0.1);
    const wallW = w * (0.7 + r() * 0.25);
    const wallY = h * (0.12 + r() * 0.15);
    parts.push(`<rect x="${wallX}" y="${wallY}" width="${wallW}" height="${h}" fill="${p[1]}"/>`);
    parts.push(`<rect x="${wallX}" y="${wallY}" width="${wallW * 0.35}" height="${h}" fill="url(#shade)"/>`);
    const cols = 3 + Math.floor(r() * 4);
    const rows = 3 + Math.floor(r() * 3);
    const gutter = wallW / (cols * 4);
    const cw = (wallW - gutter * (cols + 1)) / cols;
    const ch = cw * (1.3 + r() * 0.5);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = wallX + gutter + i * (cw + gutter);
        const y = wallY + gutter * 1.5 + j * (ch + gutter * 1.2);
        if (y + ch > h) continue;
        parts.push(`<rect x="${x}" y="${y}" width="${cw}" height="${ch}" fill="${p[3]}" opacity="0.92"/>`);
        parts.push(`<rect x="${x}" y="${y}" width="${cw * 0.08}" height="${ch}" fill="${p[2]}" opacity="0.6"/>`);
      }
    }
  } else if (variant === "interior") {
    // A room: floor plane, back wall, tall window slot, light wash.
    const horizon = h * (0.62 + r() * 0.1);
    parts.push(`<rect x="0" y="${horizon}" width="${w}" height="${h - horizon}" fill="${p[2]}" opacity="0.55"/>`);
    parts.push(`<rect x="0" y="0" width="${w}" height="${horizon}" fill="${p[1]}"/>`);
    const winX = w * (0.55 + r() * 0.2);
    const winW = w * (0.08 + r() * 0.08);
    parts.push(`<rect x="${winX}" y="${h * 0.08}" width="${winW}" height="${horizon - h * 0.08}" fill="${p[0]}"/>`);
    parts.push(`<polygon points="${winX},${horizon} ${winX + winW},${horizon} ${winX + winW * 3.2},${h} ${winX - winW * 0.6},${h}" fill="${p[0]}" opacity="0.5"/>`);
    parts.push(`<rect x="0" y="0" width="${w * 0.28}" height="${horizon}" fill="url(#shade)" opacity="0.5"/>`);
    // A low plinth / bench
    parts.push(`<rect x="${w * 0.12}" y="${horizon - h * 0.06}" width="${w * 0.3}" height="${h * 0.06}" fill="${p[3]}" opacity="0.8"/>`);
  } else if (variant === "detail") {
    // Close crop: overlapping planes and a single diagonal shadow.
    parts.push(`<rect x="0" y="0" width="${w * 0.55}" height="${h}" fill="${p[1]}"/>`);
    parts.push(`<rect x="${w * 0.55}" y="0" width="${w * 0.45}" height="${h}" fill="${p[2]}"/>`);
    parts.push(`<polygon points="0,${h * 0.15} ${w},${h * 0.55} ${w},${h} 0,${h}" fill="${p[3]}" opacity="0.75"/>`);
    parts.push(`<rect x="${w * 0.42}" y="0" width="${w * 0.02}" height="${h}" fill="${p[0]}" opacity="0.7"/>`);
  } else {
    // "massing": a stepped building silhouette against soft sky.
    let x = w * 0.04;
    const base = h * 0.98;
    while (x < w * 0.98) {
      const bw = w * (0.08 + r() * 0.18);
      const bh = h * (0.35 + r() * 0.5);
      const tone = [p[2], p[3], p[1]][Math.floor(r() * 3)];
      parts.push(`<rect x="${x}" y="${base - bh}" width="${bw}" height="${bh}" fill="${tone}"/>`);
      parts.push(`<rect x="${x}" y="${base - bh}" width="${bw * 0.18}" height="${bh}" fill="${p[3]}" opacity="0.35"/>`);
      x += bw + w * 0.01;
    }
  }
  parts.push(`<rect width="${w}" height="${h}" filter="url(#grain)" opacity="0.5"/>`);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${parts.join("")}</svg>`;
}

/** Simple line-drawn floor plan. */
function floorPlanSVG(w, h, seed, label) {
  const r = rng(seed);
  const ink = "#2B2A28";
  const bg = "#F6F3EE";
  const m = w * 0.08;
  const pw = w - m * 2;
  const ph = h - m * 2;
  const parts = [`<rect width="${w}" height="${h}" fill="${bg}"/>`];
  parts.push(`<rect x="${m}" y="${m}" width="${pw}" height="${ph}" fill="none" stroke="${ink}" stroke-width="6"/>`);
  // Vertical divider and a few rooms
  const split = m + pw * (0.5 + (r() - 0.5) * 0.2);
  parts.push(`<line x1="${split}" y1="${m}" x2="${split}" y2="${m + ph}" stroke="${ink}" stroke-width="3"/>`);
  const rooms = 2 + Math.floor(r() * 2);
  for (let i = 1; i < rooms; i++) {
    const y = m + (ph * i) / rooms;
    parts.push(`<line x1="${split}" y1="${y}" x2="${m + pw}" y2="${y}" stroke="${ink}" stroke-width="3"/>`);
  }
  // Door arcs
  for (let i = 0; i < rooms; i++) {
    const y = m + (ph * i) / rooms + ph / rooms / 2;
    parts.push(`<path d="M ${split} ${y - 40} A 40 40 0 0 1 ${split + 40} ${y}" fill="none" stroke="${ink}" stroke-width="2"/>`);
  }
  // Windows on left wall
  for (let i = 0; i < 4; i++) {
    const y = m + ph * (0.12 + i * 0.22);
    parts.push(`<rect x="${m - 3}" y="${y}" width="6" height="${ph * 0.12}" fill="${bg}" stroke="${ink}" stroke-width="2"/>`);
  }
  const labels = ["LIVING / DINING", "KITCHEN", "PRIMARY", "BEDROOM", "STUDY", "BATH"];
  parts.push(`<text x="${m + pw * 0.06}" y="${m + ph * 0.5}" font-family="Helvetica, Arial, sans-serif" font-size="${w * 0.018}" letter-spacing="3" fill="${ink}">${labels[0]}</text>`);
  for (let i = 0; i < rooms; i++) {
    const y = m + (ph * i) / rooms + ph / rooms / 2;
    parts.push(`<text x="${split + pw * 0.05}" y="${y}" font-family="Helvetica, Arial, sans-serif" font-size="${w * 0.016}" letter-spacing="3" fill="${ink}">${labels[(i + 1) % labels.length]}</text>`);
  }
  parts.push(`<text x="${m}" y="${h - m * 0.35}" font-family="Helvetica, Arial, sans-serif" font-size="${w * 0.016}" letter-spacing="4" fill="${ink}">${label.toUpperCase()}  ·  DEMO PLAN, NOT TO SCALE</text>`);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${parts.join("")}</svg>`;
}

/** Open Graph card: typographic. */
function ogSVG() {
  const w = 1600, h = 900;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <rect width="${w}" height="${h}" fill="#F3F0EA"/>
    <text x="120" y="420" font-family="Georgia, 'Times New Roman', serif" font-size="150" letter-spacing="14" fill="#171715">HAIDER ALI</text>
    <text x="120" y="520" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="64" fill="#3B3834">Private Residential Development</text>
    <text x="120" y="620" font-family="Helvetica, Arial, sans-serif" font-size="26" letter-spacing="8" fill="#6F675E">NEW JERSEY  /  NEW YORK</text>
  </svg>`;
}

const photos = [
  // developments
  ["developments/marin-house/hero.jpg", 2400, 1600, 11, "facade"],
  ["developments/marin-house/gallery-01.jpg", 1600, 2000, 12, "interior"],
  ["developments/marin-house/gallery-02.jpg", 2400, 1600, 13, "detail"],
  ["developments/marin-house/gallery-03.jpg", 2400, 1600, 14, "interior"],
  ["developments/marin-house/gallery-04.jpg", 1600, 2000, 15, "facade"],
  ["developments/willow-thirteenth/hero.jpg", 2400, 1600, 21, "massing"],
  ["developments/willow-thirteenth/gallery-01.jpg", 2400, 1600, 22, "interior"],
  ["developments/willow-thirteenth/gallery-02.jpg", 1600, 2000, 23, "facade"],
  ["developments/willow-thirteenth/gallery-03.jpg", 2400, 1600, 24, "detail"],
  ["developments/willow-thirteenth/gallery-04.jpg", 1600, 2000, 25, "interior"],
  ["developments/palisade-house/hero.jpg", 2400, 1600, 31, "detail"],
  ["developments/palisade-house/gallery-01.jpg", 2400, 1600, 32, "massing"],
  ["developments/palisade-house/gallery-02.jpg", 1600, 2000, 33, "interior"],
  // residences
  ["residences/marin-house-4b/hero.jpg", 2400, 1600, 41, "interior"],
  ["residences/marin-house-4b/gallery-01.jpg", 1600, 2000, 42, "detail"],
  ["residences/marin-house-4b/gallery-02.jpg", 2400, 1600, 43, "interior"],
  ["residences/marin-house-4b/gallery-03.jpg", 2400, 1600, 44, "facade"],
  ["residences/marin-house-penthouse/hero.jpg", 2400, 1600, 51, "interior"],
  ["residences/marin-house-penthouse/gallery-01.jpg", 2400, 1600, 52, "massing"],
  ["residences/marin-house-penthouse/gallery-02.jpg", 1600, 2000, 53, "interior"],
  ["residences/marin-house-penthouse/gallery-03.jpg", 2400, 1600, 54, "detail"],
  ["residences/willow-thirteenth-2/hero.jpg", 2400, 1600, 61, "interior"],
  ["residences/willow-thirteenth-2/gallery-01.jpg", 2400, 1600, 62, "detail"],
  ["residences/willow-thirteenth-2/gallery-02.jpg", 1600, 2000, 63, "interior"],
  ["residences/willow-thirteenth-2/gallery-03.jpg", 2400, 1600, 64, "facade"],
  ["residences/palisade-house-north/hero.jpg", 2400, 1600, 71, "detail"],
  ["residences/palisade-house-north/gallery-01.jpg", 2400, 1600, 72, "interior"],
  ["residences/hudson-street-townhouse/hero.jpg", 2400, 1600, 81, "facade"],
  ["residences/hudson-street-townhouse/gallery-01.jpg", 2400, 1600, 82, "interior"],
  ["residences/hudson-street-townhouse/gallery-02.jpg", 1600, 2000, 83, "detail"],
  // insights + about
  ["insights/boutique-jersey-city.jpg", 2400, 1600, 91, "facade"],
  ["insights/pricing-a-pre-launch.jpg", 2400, 1600, 92, "detail"],
  ["insights/hoboken-next-cycle.jpg", 2400, 1600, 93, "massing"],
  ["about/studio.jpg", 1600, 2000, 101, "interior"],
  ["private/hero.jpg", 2400, 1600, 111, "detail"],
  ["advisory/hero.jpg", 2400, 1600, 121, "massing"],
];

const plans = [
  ["developments/marin-house/plans/residence-b.png", 2000, 1400, 201, "Residence B"],
  ["developments/marin-house/plans/penthouse.png", 2000, 1400, 202, "Penthouse"],
  ["developments/willow-thirteenth/plans/residence-2.png", 2000, 1400, 203, "Residence 2"],
  ["developments/willow-thirteenth/plans/residence-5.png", 2000, 1400, 204, "Residence 5"],
  ["developments/palisade-house/plans/residence-north.png", 2000, 1400, 205, "Residence North"],
  ["residences/marin-house-4b/floor-plan.png", 2000, 1400, 211, "Residence 4B"],
  ["residences/marin-house-penthouse/floor-plan.png", 2000, 1400, 212, "Penthouse"],
  ["residences/willow-thirteenth-2/floor-plan.png", 2000, 1400, 213, "Residence 2"],
  ["residences/palisade-house-north/floor-plan.png", 2000, 1400, 214, "Residence North"],
  ["residences/hudson-street-townhouse/floor-plan.png", 2000, 1400, 215, "Townhouse"],
];

async function out(rel, buffer) {
  const file = join(root, rel);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, buffer);
  console.log("wrote", rel);
}

for (const [rel, w, h, seed, variant] of photos) {
  const svg = Buffer.from(architecturalSVG(w, h, seed, variant));
  const buf = await sharp(svg).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  await out(rel, buf);
}
for (const [rel, w, h, seed, label] of plans) {
  const svg = Buffer.from(floorPlanSVG(w, h, seed, label));
  const buf = await sharp(svg).png({ compressionLevel: 9, palette: true }).toBuffer();
  await out(rel, buf);
}
await out("og.jpg", await sharp(Buffer.from(ogSVG())).jpeg({ quality: 88 }).toBuffer());
console.log("done");
