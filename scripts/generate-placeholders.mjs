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

/* Warm, stone-toned palette: light, mid, deep, shadow. */
const palettes = [
  ["#efeae1", "#d3c9b9", "#8f8578", "#2f2c28"],
  ["#f1ece3", "#d9d0c1", "#9a8f80", "#33302b"],
  ["#e8e2d7", "#c2b7a6", "#746b60", "#26231f"],
  ["#f3efe7", "#dcd4c6", "#a0968a", "#3a3631"],
  ["#e6dfd3", "#c8bcaa", "#7f7569", "#2a2722"],
];

function rng(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

/**
 * Abstract architectural light study in SVG: soft gradients, a raking light,
 * blurred shadows and a little grain. Deliberately quiet.
 */
function architecturalSVG(w, h, seed, variant) {
  const r = rng(seed);
  const p = palettes[seed % palettes.length];
  const [light, mid, deep, shadow] = p;
  const parts = [];
  const blur = Math.round(Math.min(w, h) * 0.02);
  parts.push(`<defs>
    <linearGradient id="ground" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0" stop-color="${light}"/>
      <stop offset="1" stop-color="${mid}"/>
    </linearGradient>
    <linearGradient id="plane" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${mid}"/>
      <stop offset="1" stop-color="${deep}"/>
    </linearGradient>
    <linearGradient id="dark" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${shadow}"/>
      <stop offset="1" stop-color="${deep}"/>
    </linearGradient>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${shadow}" stop-opacity="0"/>
      <stop offset="1" stop-color="${shadow}" stop-opacity="0.55"/>
    </linearGradient>
    <radialGradient id="glow" cx="${0.2 + r() * 0.6}" cy="${0.1 + r() * 0.3}" r="0.8">
      <stop offset="0" stop-color="#fffaf0" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#fffaf0" stop-opacity="0"/>
    </radialGradient>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="${blur}"/></filter>
    <filter id="softer" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="${blur * 2.5}"/></filter>
    <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.055"/></feComponentTransfer></filter>
  </defs>`);
  parts.push(`<rect width="${w}" height="${h}" fill="url(#ground)"/>`);

  if (variant === "facade") {
    // A tall plane with recessed openings, lit from one side.
    const wallX = w * (0.04 + r() * 0.08);
    const wallW = w * (0.78 + r() * 0.2);
    const wallY = h * (0.1 + r() * 0.12);
    parts.push(`<rect x="${wallX}" y="${wallY}" width="${wallW}" height="${h}" fill="url(#plane)"/>`);
    const cols = 3 + Math.floor(r() * 3);
    const rows = 2 + Math.floor(r() * 3);
    const gutter = wallW / (cols * 5);
    const cw = (wallW - gutter * (cols + 1)) / cols;
    const ch = cw * (1.35 + r() * 0.5);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = wallX + gutter + i * (cw + gutter);
        const y = wallY + gutter * 1.6 + j * (ch + gutter * 1.4);
        if (y + ch > h) continue;
        // soft shadow inside the reveal, then the opening
        parts.push(`<rect x="${x + cw * 0.06}" y="${y + ch * 0.05}" width="${cw}" height="${ch}" fill="${shadow}" opacity="0.5" filter="url(#soft)"/>`);
        parts.push(`<rect x="${x}" y="${y}" width="${cw}" height="${ch}" fill="url(#dark)" opacity="0.95"/>`);
        parts.push(`<rect x="${x}" y="${y}" width="${cw * 0.07}" height="${ch}" fill="${light}" opacity="0.25"/>`);
      }
    }
    parts.push(`<rect x="${wallX}" y="${wallY}" width="${wallW * 0.32}" height="${h}" fill="${shadow}" opacity="0.35" filter="url(#softer)"/>`);
  } else if (variant === "interior") {
    // A room: back wall, floor, a tall opening and a wash of light across the floor.
    const horizon = h * (0.6 + r() * 0.12);
    parts.push(`<rect x="0" y="0" width="${w}" height="${horizon}" fill="${mid}"/>`);
    parts.push(`<rect x="0" y="${horizon}" width="${w}" height="${h - horizon}" fill="${deep}" opacity="0.55"/>`);
    const winX = w * (0.52 + r() * 0.24);
    const winW = w * (0.07 + r() * 0.07);
    parts.push(`<rect x="${winX}" y="${h * 0.06}" width="${winW}" height="${horizon - h * 0.06}" fill="${light}"/>`);
    parts.push(`<polygon points="${winX},${horizon} ${winX + winW},${horizon} ${winX + winW * 3.4},${h} ${winX - winW * 0.9},${h}" fill="#fffaf0" opacity="0.42" filter="url(#soft)"/>`);
    parts.push(`<rect x="0" y="0" width="${w * 0.3}" height="${h}" fill="${shadow}" opacity="0.32" filter="url(#softer)"/>`);
    // a low plinth with a soft shadow
    const px = w * 0.1, pw = w * 0.28, py = horizon - h * 0.055, ph = h * 0.055;
    parts.push(`<rect x="${px + pw * 0.05}" y="${py + ph * 0.5}" width="${pw}" height="${ph}" fill="${shadow}" opacity="0.5" filter="url(#soft)"/>`);
    parts.push(`<rect x="${px}" y="${py}" width="${pw}" height="${ph}" fill="${shadow}" opacity="0.85"/>`);
    parts.push(`<rect x="0" y="${horizon}" width="${w}" height="${h - horizon}" fill="url(#fade)" opacity="0.6"/>`);
  } else if (variant === "detail") {
    // Close crop: two planes meeting, a single long shadow.
    const split = w * (0.5 + (r() - 0.5) * 0.2);
    parts.push(`<rect x="0" y="0" width="${split}" height="${h}" fill="url(#plane)"/>`);
    parts.push(`<rect x="${split}" y="0" width="${w - split}" height="${h}" fill="${deep}"/>`);
    parts.push(`<polygon points="0,${h * 0.2} ${w},${h * 0.6} ${w},${h} 0,${h}" fill="${shadow}" opacity="0.7" filter="url(#soft)"/>`);
    parts.push(`<rect x="${split - w * 0.012}" y="0" width="${w * 0.012}" height="${h}" fill="${light}" opacity="0.55"/>`);
    parts.push(`<rect x="${split}" y="0" width="${w * 0.25}" height="${h}" fill="${shadow}" opacity="0.4" filter="url(#softer)"/>`);
  } else {
    // Massing: a stepped skyline of planes, receding.
    let x = w * 0.02;
    const base = h * 1.02;
    const blocks = [];
    while (x < w * 0.98) {
      const bw = w * (0.09 + r() * 0.2);
      const bh = h * (0.32 + r() * 0.55);
      blocks.push([x, bw, bh, r()]);
      x += bw + w * 0.006;
    }
    blocks.sort((a, b) => a[2] - b[2]);
    for (const [bx, bw, bh, t] of blocks) {
      const tone = t < 0.35 ? shadow : t < 0.7 ? deep : mid;
      parts.push(`<rect x="${bx + bw * 0.03}" y="${base - bh + h * 0.02}" width="${bw}" height="${bh}" fill="${shadow}" opacity="0.35" filter="url(#soft)"/>`);
      parts.push(`<rect x="${bx}" y="${base - bh}" width="${bw}" height="${bh}" fill="${tone}"/>`);
      parts.push(`<rect x="${bx}" y="${base - bh}" width="${bw * 0.16}" height="${bh}" fill="${shadow}" opacity="0.3"/>`);
      parts.push(`<rect x="${bx + bw * 0.16}" y="${base - bh}" width="${bw * 0.02}" height="${bh}" fill="${light}" opacity="0.3"/>`);
    }
    parts.push(`<rect x="0" y="${h * 0.55}" width="${w}" height="${h * 0.45}" fill="url(#fade)" opacity="0.5"/>`);
  }

  parts.push(`<rect width="${w}" height="${h}" fill="url(#glow)"/>`);
  parts.push(`<rect width="${w}" height="${h}" filter="url(#grain)" opacity="0.6"/>`);
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
