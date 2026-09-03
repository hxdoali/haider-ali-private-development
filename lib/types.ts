/**
 * Content types for the site.
 *
 * All content lives in plain TypeScript files under /data. There is no CMS
 * and no database. Adding an object to one of those arrays automatically
 * creates its page via the dynamic routes in /app.
 */

export type DevelopmentStatus =
  | "Pre-Development"
  | "Pre-Launch"
  | "Now Selling"
  | "Under Construction"
  | "Completed"
  | "Sold Out";

export type ResidenceStatus =
  | "Available"
  | "In Contract"
  | "Sold"
  | "Coming Soon"
  | "Off Market";

export type FloorPlan = {
  /** Display name, e.g. "Residence A" or "Penthouse". */
  name: string;
  /** Path under /public, e.g. "/developments/marin-house/plans/residence-a.png". */
  image: string;
  beds?: number;
  baths?: number;
  squareFeet?: number;
  /** Optional one-line note, e.g. "Corner exposure, private terrace". */
  note?: string;
};

export type Development = {
  name: string;
  /** URL segment. Must be unique and match the folder in /public/developments/. */
  slug: string;
  /** Neighbourhood / city / state shown publicly, e.g. "Paulus Hook, Jersey City". */
  location: string;
  /** Exact street address. Hidden automatically when `private` is true. */
  address?: string;
  developer: string;
  architect: string;
  /** Optional interiors credit. */
  interiors?: string;
  /** e.g. "Boutique condominium", "Townhouse collection". */
  projectType: string;
  residenceCount: number;
  status: DevelopmentStatus;
  /** Anticipated completion / occupancy, free text. */
  completion?: string;
  /** Paragraphs. Each string renders as its own paragraph. */
  overview: string[];
  amenities: string[];
  heroImage: string;
  gallery: string[];
  floorPlans: FloorPlan[];
  /** Featured items appear on the home page. */
  featured: boolean;
  /**
   * When true the address, pricing and sensitive details are hidden and the
   * page shows a "Details available upon request" notice instead.
   */
  private: boolean;
  /**
   * Set true on placeholder/demonstration content so it is clearly marked in
   * the UI. Remove the flag (or set false) once real content is in place.
   */
  demo?: boolean;
};

export type Residence = {
  name: string;
  /** URL segment. Must be unique and match the folder in /public/residences/. */
  slug: string;
  /** Slug of the parent development, or null for a standalone property. */
  developmentSlug: string | null;
  /** Public location line, e.g. "Hoboken, New Jersey". */
  location: string;
  /** Exact street address. Hidden automatically when `private` is true. */
  address?: string;
  /** Asking price in USD. Ignored when `priceUponRequest` or `private` is true. */
  price: number | null;
  priceUponRequest: boolean;
  beds: number;
  baths: number;
  squareFeet: number | null;
  /** e.g. "Condominium", "Penthouse", "Townhouse", "Duplex". */
  propertyType: string;
  status: ResidenceStatus;
  /** Paragraphs. Each string renders as its own paragraph. */
  description: string[];
  heroImage: string;
  gallery: string[];
  /** Path to a single floor plan image, or null. */
  floorPlan: string | null;
  /** Optional monthly common charges / taxes, hidden when private. */
  monthlyCharges?: number;
  /** Optional exposure / outdoor space line, e.g. "South and west. Private terrace." */
  exposure?: string;
  featured: boolean;
  private: boolean;
  demo?: boolean;
};

export type Insight = {
  title: string;
  slug: string;
  /** ISO date, e.g. "2026-05-12". */
  date: string;
  /** e.g. "Market", "Advisory", "Development". */
  category: string;
  /** One or two sentences shown in lists. */
  excerpt: string;
  /** Paragraphs. */
  body: string[];
  /** Optional hero image path under /public. */
  image?: string;
  featured: boolean;
};

export type InquiryType =
  | "General inquiry"
  | "Private access"
  | "Developer representation"
  | "Development advisory"
  | "Residence inquiry"
  | "Investor / family office"
  | "Press";
