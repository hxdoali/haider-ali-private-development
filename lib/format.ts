import type { Residence } from "@/lib/types";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const num = new Intl.NumberFormat("en-US");

export function formatPrice(
  residence: Pick<Residence, "price" | "priceUponRequest" | "private"> & { listingType?: Residence["listingType"] },
): string {
  if (residence.private) return "Details available upon request";
  if (residence.priceUponRequest || residence.price === null) return "Price upon request";
  const value = usd.format(residence.price);
  return residence.listingType === "rental" ? `${value} / month` : value;
}

export function formatUSD(value: number): string {
  return usd.format(value);
}

export function formatNumber(value: number): string {
  return num.format(value);
}

export function formatSquareFeet(value: number | null): string {
  if (value === null) return "—";
  return `${num.format(value)} sq ft`;
}

export function formatBaths(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

export function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** "3 bedrooms · 2.5 baths · 1,880 sq ft" */
export function residenceSummary(r: Pick<Residence, "beds" | "baths" | "squareFeet" | "private">): string {
  const parts: string[] = [];
  if (r.beds > 0) parts.push(`${r.beds} ${r.beds === 1 ? "bedroom" : "bedrooms"}`);
  if (r.baths > 0) parts.push(`${formatBaths(r.baths)} ${r.baths === 1 ? "bath" : "baths"}`);
  if (!r.private && r.squareFeet) parts.push(formatSquareFeet(r.squareFeet));
  return parts.join("  ·  ");
}

/** "14 residences", or an empty string when the count is unknown. */
export function residenceCountLabel(count?: number): string {
  if (!count) return "";
  return `${count} ${count === 1 ? "residence" : "residences"}`;
}
