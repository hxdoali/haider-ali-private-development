import type { Residence } from "@/lib/types";

/**
 * RESIDENCES
 * ------------------------------------------------------------------
 * One object = one property = one page at /residences/[slug].
 *
 * To add a residence:
 *   1. Create /public/residences/<slug>/ with hero.jpg, gallery images and
 *      (optionally) floor-plan.png.
 *   2. Copy an object below and edit the fields. `developmentSlug` links the
 *      residence to a project in /data/developments.ts, or use null.
 *   3. Commit and push.
 *
 * Pricing / status:
 *   - `price` is a plain number in USD. It is formatted automatically.
 *   - `priceUponRequest: true` shows "Price upon request" instead of a number.
 *   - `private: true` hides the address, price, size, plan, gallery and
 *     description and shows "Details available upon request".
 *   - `status` accepts: "Available" | "In Contract" | "Sold" | "Coming Soon" | "Off Market".
 *
 * The entries below are DEMONSTRATION CONTENT (`demo: true`). Fictional.
 * ------------------------------------------------------------------
 */

export const residences: Residence[] = [
  {
    name: "Marin House, Residence 4B",
    slug: "marin-house-4b",
    developmentSlug: "marin-house",
    location: "Paulus Hook, Jersey City",
    address: "000 Marin Boulevard, Residence 4B, Jersey City, NJ 07302", // DEMO
    price: 2395000, // DEMO
    priceUponRequest: false,
    beds: 3,
    baths: 2.5,
    squareFeet: 1880,
    propertyType: "Condominium",
    status: "Available",
    description: [
      "A corner three-bedroom on the fourth floor with south and west exposure. The plan gives the entire street frontage to a single living and dining room, with the kitchen set along the interior wall so it reads as furniture.",
      "Bedrooms sit along the quiet side of the building. The primary suite has a dressing room and a limestone bath with a steel-framed window. Ten-foot ceilings throughout; white oak floors laid in wide planks.",
    ],
    heroImage: "/residences/marin-house-4b/hero.jpg",
    gallery: [
      "/residences/marin-house-4b/gallery-01.jpg",
      "/residences/marin-house-4b/gallery-02.jpg",
      "/residences/marin-house-4b/gallery-03.jpg",
    ],
    floorPlan: "/residences/marin-house-4b/floor-plan.png",
    monthlyCharges: 1860, // DEMO
    exposure: "South and west. Juliet balconies on the living room.",
    featured: true,
    private: false,
    demo: true,
  },
  {
    name: "Marin House, Penthouse",
    slug: "marin-house-penthouse",
    developmentSlug: "marin-house",
    location: "Paulus Hook, Jersey City",
    address: "000 Marin Boulevard, Penthouse, Jersey City, NJ 07302", // DEMO
    price: null,
    priceUponRequest: true,
    beds: 4,
    baths: 3.5,
    squareFeet: 3240,
    propertyType: "Penthouse",
    status: "Available",
    description: [
      "The full sixth floor with a private roof terrace above, reached by an internal stair. Four exposures. The main room runs the width of the building and opens west toward the water.",
      "Kitchen in honed stone and oak, a separate study, and a primary suite occupying the southern end of the floor. Two parking spaces are included.",
    ],
    heroImage: "/residences/marin-house-penthouse/hero.jpg",
    gallery: [
      "/residences/marin-house-penthouse/gallery-01.jpg",
      "/residences/marin-house-penthouse/gallery-02.jpg",
      "/residences/marin-house-penthouse/gallery-03.jpg",
    ],
    floorPlan: "/residences/marin-house-penthouse/floor-plan.png",
    exposure: "Four exposures. Private roof terrace of approximately 1,400 square feet.",
    featured: true,
    private: false,
    demo: true,
  },
  {
    name: "Willow & Thirteenth, Residence 2",
    slug: "willow-thirteenth-2",
    developmentSlug: "willow-thirteenth",
    location: "Uptown Hoboken",
    address: "000 Willow Avenue, Residence 2, Hoboken, NJ 07030", // DEMO
    price: 1650000, // DEMO
    priceUponRequest: false,
    beds: 2,
    baths: 2,
    squareFeet: 1420,
    propertyType: "Condominium",
    status: "Coming Soon",
    description: [
      "A full-floor two-bedroom with front and rear exposure and a private entry from the street. The living room faces east over Willow Avenue; the bedrooms face the gardens at the rear.",
      "Available to registered parties ahead of the public release. Pricing shown is anticipated and subject to the final offering.",
    ],
    heroImage: "/residences/willow-thirteenth-2/hero.jpg",
    gallery: [
      "/residences/willow-thirteenth-2/gallery-01.jpg",
      "/residences/willow-thirteenth-2/gallery-02.jpg",
      "/residences/willow-thirteenth-2/gallery-03.jpg",
    ],
    floorPlan: "/residences/willow-thirteenth-2/floor-plan.png",
    exposure: "East and west.",
    featured: true,
    private: false,
    demo: true,
  },
  {
    name: "Palisade House, Residence North",
    slug: "palisade-house-north",
    developmentSlug: "palisade-house",
    location: "Hudson Waterfront, New Jersey",
    address: "Undisclosed",
    price: 4800000, // hidden on site because private = true
    priceUponRequest: false,
    beds: 4,
    baths: 4.5,
    squareFeet: 3900,
    propertyType: "Private residence",
    status: "Off Market",
    description: [
      "Hidden on the site. Full particulars are shared only with parties who have requested private access.",
    ],
    heroImage: "/residences/palisade-house-north/hero.jpg",
    gallery: ["/residences/palisade-house-north/gallery-01.jpg"],
    floorPlan: "/residences/palisade-house-north/floor-plan.png",
    featured: false,
    private: true,
    demo: true,
  },
  {
    name: "Hudson Street Townhouse",
    slug: "hudson-street-townhouse",
    developmentSlug: null,
    location: "Hoboken, New Jersey",
    address: "Undisclosed",
    price: null,
    priceUponRequest: true,
    beds: 5,
    baths: 4,
    squareFeet: 4600,
    propertyType: "Townhouse",
    status: "Off Market",
    description: [
      "Hidden on the site. A single-family townhouse offered quietly on behalf of its owner.",
    ],
    heroImage: "/residences/hudson-street-townhouse/hero.jpg",
    gallery: [
      "/residences/hudson-street-townhouse/gallery-01.jpg",
      "/residences/hudson-street-townhouse/gallery-02.jpg",
    ],
    floorPlan: "/residences/hudson-street-townhouse/floor-plan.png",
    featured: true,
    private: true,
    demo: true,
  },
];
