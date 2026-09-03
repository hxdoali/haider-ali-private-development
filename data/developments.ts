import type { Development } from "@/lib/types";

/**
 * DEVELOPMENTS
 * ------------------------------------------------------------------
 * One object = one project = one page at /developments/[slug].
 *
 * To add a project:
 *   1. Create /public/developments/<slug>/ and drop in hero.jpg, gallery
 *      images and floor-plan images.
 *   2. Copy one of the objects below, change the fields, and make sure the
 *      image paths match the files you added.
 *   3. Commit and push. Vercel redeploys automatically.
 *
 * To remove a project: delete its object (and, optionally, its image folder).
 *
 * The three entries below are DEMONSTRATION CONTENT (`demo: true`). Every
 * name, firm, address and figure is fictional and exists only so the site
 * looks complete. Replace them with real projects before launch.
 * ------------------------------------------------------------------
 */

export const developments: Development[] = [
  {
    name: "Marin House",
    slug: "marin-house",
    location: "Paulus Hook, Jersey City",
    address: "000 Marin Boulevard, Jersey City, NJ 07302", // DEMO
    developer: "Lantern Hill Development", // DEMO — fictional
    architect: "Studio Halvorsen", // DEMO — fictional
    interiors: "Ines Marrow Interiors", // DEMO — fictional
    projectType: "Boutique condominium",
    residenceCount: 14,
    status: "Now Selling",
    completion: "Occupancy anticipated 2027",
    overview: [
      "Fourteen residences in a six-storey brick and limestone building set back from the waterfront on a quiet Paulus Hook block. The massing follows the neighbourhood's rowhouse rhythm rather than interrupting it.",
      "Floor plates are kept small so that most homes hold a corner. Ceilings reach ten feet, windows are steel-framed and operable, and each residence is planned around a single generous room for living rather than a sequence of small ones.",
      "Materials are limited by intent: white oak, honed limestone, unlacquered brass, and plaster. Nothing is added that would need to be explained.",
    ],
    amenities: [
      "Attended lobby",
      "Private storage",
      "Landscaped roof terrace",
      "Bicycle room",
      "Package and cold storage",
      "Secure parking for select residences",
    ],
    heroImage: "/developments/marin-house/hero.jpg",
    gallery: [
      "/developments/marin-house/gallery-01.jpg",
      "/developments/marin-house/gallery-02.jpg",
      "/developments/marin-house/gallery-03.jpg",
      "/developments/marin-house/gallery-04.jpg",
    ],
    floorPlans: [
      {
        name: "Residence B",
        image: "/developments/marin-house/plans/residence-b.png",
        beds: 3,
        baths: 2.5,
        squareFeet: 1880,
        note: "Corner exposure, south and west",
      },
      {
        name: "Penthouse",
        image: "/developments/marin-house/plans/penthouse.png",
        beds: 4,
        baths: 3.5,
        squareFeet: 3240,
        note: "Full floor with private roof terrace",
      },
    ],
    featured: true,
    private: false,
    demo: true,
  },
  {
    name: "Willow & Thirteenth",
    slug: "willow-thirteenth",
    location: "Uptown Hoboken",
    address: "000 Willow Avenue, Hoboken, NJ 07030", // DEMO
    developer: "Meridian Row Partners", // DEMO — fictional
    architect: "Coburn Architecture", // DEMO — fictional
    projectType: "Townhouse-scale condominium",
    residenceCount: 9,
    status: "Pre-Launch",
    completion: "Anticipated 2027",
    overview: [
      "Nine residences across three adjoining buildings at the north end of Hoboken, where the grid loosens and the blocks turn residential. The scheme reads as a row of houses rather than a single building.",
      "Each residence spans a full floor or two. Private entries, rear gardens for the ground-floor homes, and roof terraces above. Interiors are quiet: pale oak floors, limewashed walls, honed stone.",
      "Pre-launch pricing and the full plan set are available to registered parties ahead of the public release.",
    ],
    amenities: [
      "Private entries",
      "Rear gardens (ground-floor residences)",
      "Private roof terraces",
      "Dedicated storage",
      "Deeded parking for select residences",
    ],
    heroImage: "/developments/willow-thirteenth/hero.jpg",
    gallery: [
      "/developments/willow-thirteenth/gallery-01.jpg",
      "/developments/willow-thirteenth/gallery-02.jpg",
      "/developments/willow-thirteenth/gallery-03.jpg",
      "/developments/willow-thirteenth/gallery-04.jpg",
    ],
    floorPlans: [
      {
        name: "Residence 2",
        image: "/developments/willow-thirteenth/plans/residence-2.png",
        beds: 2,
        baths: 2,
        squareFeet: 1420,
        note: "Full floor, east and west exposure",
      },
      {
        name: "Residence 5",
        image: "/developments/willow-thirteenth/plans/residence-5.png",
        beds: 3,
        baths: 2.5,
        squareFeet: 2160,
        note: "Duplex with roof terrace",
      },
    ],
    featured: true,
    private: false,
    demo: true,
  },
  {
    name: "Palisade House",
    slug: "palisade-house",
    location: "Hudson Waterfront, New Jersey",
    address: "Undisclosed", // hidden on the site because private = true
    developer: "Undisclosed",
    architect: "Undisclosed",
    projectType: "Private residential",
    residenceCount: 6,
    status: "Pre-Development",
    overview: [
      "A limited release of six residences on the Palisade edge, planned for a small number of buyers introduced privately. Nothing about this project is marketed publicly.",
    ],
    amenities: [],
    heroImage: "/developments/palisade-house/hero.jpg",
    gallery: [
      "/developments/palisade-house/gallery-01.jpg",
      "/developments/palisade-house/gallery-02.jpg",
    ],
    floorPlans: [
      {
        name: "Residence North",
        image: "/developments/palisade-house/plans/residence-north.png",
        beds: 4,
        baths: 4.5,
        squareFeet: 3900,
      },
    ],
    featured: true,
    private: true,
    demo: true,
  },
];
