import { developments } from "@/data/developments";
import { residences } from "@/data/residences";
import { insights } from "@/data/insights";
import type { Development, Residence, Insight } from "@/lib/types";

/* ---------------------------------- Developments ---------------------------------- */

export function getDevelopments(): Development[] {
  return developments;
}

export function getPublicDevelopments(): Development[] {
  return developments.filter((d) => !d.private);
}

export function getPrivateDevelopments(): Development[] {
  return developments.filter((d) => d.private);
}

export function getFeaturedDevelopments(limit?: number): Development[] {
  const list = developments.filter((d) => d.featured);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export function getDevelopment(slug: string): Development | undefined {
  return developments.find((d) => d.slug === slug);
}

/* ----------------------------------- Residences ----------------------------------- */

export function getResidences(): Residence[] {
  return residences;
}

export function getPublicResidences(): Residence[] {
  return residences.filter((r) => !r.private);
}

export function getPrivateResidences(): Residence[] {
  return residences.filter((r) => r.private);
}

export function getFeaturedResidences(limit?: number): Residence[] {
  const list = residences.filter((r) => r.featured);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export function getResidence(slug: string): Residence | undefined {
  return residences.find((r) => r.slug === slug);
}

export function getResidencesForDevelopment(developmentSlug: string): Residence[] {
  return residences.filter((r) => r.developmentSlug === developmentSlug);
}

/* ------------------------------------ Insights ------------------------------------ */

export function getInsights(): Insight[] {
  return [...insights].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getFeaturedInsights(limit = 3): Insight[] {
  return getInsights()
    .filter((i) => i.featured)
    .slice(0, limit);
}

export function getInsight(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug);
}
