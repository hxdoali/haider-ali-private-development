import { getDevelopment, getPublicDevelopments, getPublicResidences, getResidencesForDevelopment } from "@/lib/content";
import { formatBaths, formatPrice, formatSquareFeet, residenceSummary } from "@/lib/format";
import type { Development, Residence } from "@/lib/types";

/**
 * Slides for presentation mode. Built on the server from the same data that
 * renders the pages, so a house never needs to be entered twice.
 */
export type Slide =
  | {
      kind: "title";
      eyebrow?: string;
      title: string;
      subtitle?: string;
      /** Optional image shown dimmed behind the title. */
      image?: string;
    }
  | {
      kind: "image";
      src: string;
      /** Small tracked label, e.g. the location or "Residence 4B". */
      eyebrow?: string;
      /** Serif line under the label. */
      title?: string;
      /** Plans and drawings are shown whole on a light ground. */
      fit?: "cover" | "contain";
    }
  | {
      kind: "end";
      eyebrow?: string;
      title: string;
      body?: string;
      cta: string;
      href: string;
    };

const inquiryHref = (subject: string, inquiry = "Residence inquiry") =>
  `/contact?inquiry=${encodeURIComponent(inquiry)}&subject=${encodeURIComponent(subject)}`;

function residenceImageSlides(r: Residence, development?: Development): Slide[] {
  if (r.private) return [];
  const label = development ? `${development.name}  ·  ${r.name}` : r.name;
  const line = `${residenceSummary(r)}  ·  ${formatPrice(r)}`;
  const slides: Slide[] = [{ kind: "image", src: r.heroImage, eyebrow: label, title: line }];
  for (const src of r.gallery) slides.push({ kind: "image", src, eyebrow: label, title: r.location });
  if (r.floorPlan) {
    slides.push({
      kind: "image",
      src: r.floorPlan,
      fit: "contain",
      eyebrow: `${label}  ·  Plan`,
      title: `${r.beds} bed  ·  ${formatBaths(r.baths)} bath${r.squareFeet ? `  ·  ${formatSquareFeet(r.squareFeet)}` : ""}`,
    });
  }
  return slides;
}

/** A single development: title card, hero, gallery, plans, each residence, close. */
export function developmentSlides(d: Development): Slide[] {
  if (d.private) return [];
  const residences = getResidencesForDevelopment(d.slug).filter((r) => !r.private);
  const slides: Slide[] = [
    {
      kind: "title",
      eyebrow: `${d.location}  ·  ${d.status}`,
      title: d.name,
      subtitle: `${d.residenceCount} residences  ·  ${d.projectType}`,
      image: d.heroImage,
    },
    { kind: "image", src: d.heroImage, eyebrow: d.name, title: d.location },
    ...d.gallery.map<Slide>((src) => ({ kind: "image", src, eyebrow: d.name, title: d.architect })),
    ...d.floorPlans.map<Slide>((p) => ({
      kind: "image",
      src: p.image,
      fit: "contain",
      eyebrow: `${d.name}  ·  ${p.name}`,
      title: [
        p.beds != null ? `${p.beds} bed` : null,
        p.baths != null ? `${formatBaths(p.baths)} bath` : null,
        p.squareFeet ? formatSquareFeet(p.squareFeet) : null,
        p.note ?? null,
      ]
        .filter(Boolean)
        .join("  ·  "),
    })),
    ...residences.flatMap((r) => residenceImageSlides(r, d)),
    {
      kind: "end",
      eyebrow: d.name,
      title: "Inquire.",
      body: `${d.residenceCount} residences in ${d.location}. For availability, pricing and a private appointment.`,
      cta: `Inquire about ${d.name}`,
      href: inquiryHref(d.name),
    },
  ];
  return slides;
}

/** A single residence: title card, images, plan, close. */
export function residenceSlides(r: Residence): Slide[] {
  if (r.private) return [];
  const development = r.developmentSlug ? getDevelopment(r.developmentSlug) : undefined;
  return [
    {
      kind: "title",
      eyebrow: `${r.location}  ·  ${r.status}`,
      title: r.name,
      subtitle: `${residenceSummary(r)}  ·  ${formatPrice(r)}`,
      image: r.heroImage,
    },
    ...residenceImageSlides(r, development && !development.private ? development : undefined),
    {
      kind: "end",
      eyebrow: r.name,
      title: "Inquire.",
      body: `${r.propertyType} in ${r.location}. ${formatPrice(r)}. For a private appointment and the offering documents.`,
      cta: `Inquire about ${r.name}`,
      href: inquiryHref(r.name),
    },
  ];
}

/** The whole public portfolio as chapters, for a screening on a large display. */
export function portfolioSlides(): Slide[] {
  const developments = getPublicDevelopments();
  const standalone = getPublicResidences().filter((r) => !r.developmentSlug);
  const slides: Slide[] = [
    {
      kind: "title",
      eyebrow: "New Jersey / New York",
      title: "Private Residential Development",
      subtitle: `${developments.length} developments  ·  ${getPublicResidences().length} residences`,
    },
  ];
  for (const d of developments) {
    const chapter = developmentSlides(d);
    chapter.pop(); // drop the per-development close; the screening has one ending
    slides.push(...chapter);
  }
  if (standalone.length > 0) {
    slides.push({
      kind: "title",
      eyebrow: "Select properties",
      title: "Residences",
      subtitle: `${standalone.length} ${standalone.length === 1 ? "property" : "properties"}`,
    });
    for (const r of standalone) slides.push(...residenceImageSlides(r));
  }
  slides.push({
    kind: "end",
    eyebrow: "Haider Ali",
    title: "By introduction.",
    body: "Developer representation, development advisory and private residences across New Jersey and New York.",
    cta: "Start a conversation",
    href: "/contact",
  });
  return slides;
}
