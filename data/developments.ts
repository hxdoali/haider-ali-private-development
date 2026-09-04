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
  /* ------------------------------ Portfolio (SERHANT.) ------------------------------ */
  {
    name: "The Manorath",
    slug: "the-manorath",
    location: "Jersey City Heights",
    address: "10 Lincoln Street, Jersey City, NJ 07307",
    projectType: "Boutique rental residences",
    status: "Now Leasing",
    residenceCount: 27,
    website: "https://www.themanorath.com",
    overview: [
      "A limited collection of twenty-seven new residences in Jersey City Heights, designed for people who want more privacy than a tower and more polish than a standard apartment. One- and two-bedroom homes, with select residences opening onto private terraces and an unbroken view of the Manhattan skyline.",
      "The Manorath is quiet by design. Residences are offered fully furnished with flexible lease terms and a level of service, from concierge to wellness-focused amenities, that is unusual at this scale. The rooftop, with its firepits and lounges facing the city, is the building's living room.",
      "We were engaged to conceive the brand and the visual language of the building, and to bring it to market. Leasing is under way.",
    ],
    amenities: [
      "27 residences",
      "One- and two-bedroom homes",
      "Fully furnished and flexible lease options",
      "Concierge and in-house support",
      "Rooftop terrace with Manhattan skyline views",
      "Wellness-focused amenities",
      "Corporate housing available",
      "Pet friendly",
    ],
    heroImage: "/developments/the-manorath/hero.jpg",
    gallery: [
      "/developments/the-manorath/gallery-01.jpg",
      "/developments/the-manorath/gallery-02.jpg",
      "/developments/the-manorath/gallery-03.jpg",
      "/developments/the-manorath/gallery-04.jpg",
    ],
    floorPlans: [],
    featured: true,
    private: false,
  },
  {
    name: "The Caliburn",
    slug: "the-caliburn",
    location: "Jersey City Heights",
    address: "166 Hancock Avenue, Jersey City, NJ 07307",
    projectType: "Historic conversion · Rental residences",
    status: "Now Leasing",
    residenceCount: 13,
    website: "https://www.caliburnjc.com",
    overview: [
      "For a hundred and fifty years, 166 Hancock Avenue was a convent. It has been restored and transformed into twelve residences and a penthouse, from studios to three bedrooms, that keep the building's Gothic arcades and its quiet while adding everything a modern home requires.",
      "The interiors are deliberately restrained: pale oak, fluted timber, honed stone, and generous light. Each residence is different because the building is, and the plans follow the original bays and windows rather than fighting them.",
      "Our work here spanned positioning, brand identity and the sales and leasing campaign, translating a historic form into a contemporary identity. Residences are leasing now.",
    ],
    amenities: [
      "12 residences and a penthouse",
      "Studios to three bedrooms",
      "Restored 19th-century architecture",
      "Character details and contemporary finishes",
      "Pet friendly",
      "Limited on-site parking",
      "Steps to Central Avenue shops and transit",
    ],
    heroImage: "/developments/the-caliburn/hero.jpg",
    gallery: [
      "/developments/the-caliburn/gallery-01.jpg",
      "/developments/the-caliburn/gallery-02.jpg",
      "/developments/the-caliburn/gallery-03.jpg",
      "/developments/the-caliburn/gallery-04.jpg",
      "/developments/the-caliburn/gallery-05.jpg",
    ],
    floorPlans: [],
    featured: true,
    private: false,
  },
  {
    name: "The Montgomery",
    slug: "the-montgomery",
    location: "Paulus Hook, Jersey City",
    address: "100 Montgomery Street, Jersey City, NJ 07302",
    projectType: "Renovated rental residences",
    status: "Now Leasing",
    residenceCount: 302,
    website: "https://themontgomeryjc.com",
    overview: [
      "Three hundred and two residences at 100 Montgomery Street, in the heart of Paulus Hook, one of Jersey City's most sought-after waterfront neighbourhoods. Studios, one- and two-bedroom homes have been thoroughly renovated with bright open layouts, oversized windows and contemporary finishes; select residences look across the Hudson to the Manhattan skyline.",
      "The building is moments from the PATH, the NY Waterway ferry, the Hudson-Bergen Light Rail and the waterfront parks, with Paulus Hook's restaurants and shops at the door. A lounge, concierge service and a fitness centre complete the offering.",
      "We repositioned and rebranded the building for a new generation of residents and lead its leasing. Monthly rents from $2,700 to $4,015.",
    ],
    amenities: [
      "302 residences",
      "Studios, one- and two-bedroom homes",
      "High ceilings and plank flooring",
      "Roller window shades",
      "Resident lounge",
      "Concierge service",
      "Fitness centre",
      "Pet friendly",
      "Rents from $2,700 to $4,015 a month",
    ],
    heroImage: "/developments/the-montgomery/hero.jpg",
    gallery: [
      "/developments/the-montgomery/gallery-01.jpg",
      "/developments/the-montgomery/gallery-02.jpg",
      "/developments/the-montgomery/gallery-03.jpg",
      "/developments/the-montgomery/gallery-04.jpg",
      "/developments/the-montgomery/gallery-05.jpg",
    ],
    floorPlans: [],
    featured: true,
    private: false,
  },
  {
    name: "24 Thorne Street",
    slug: "24-thorne-street",
    location: "Jersey City Heights",
    address: "24 Thorne Street, Jersey City, NJ 07307",
    projectType: "Two-residence condominium",
    status: "Completed",
    residenceCount: 2,
    overview: [
      "A new-construction two-unit condominium in the heart of Jersey City Heights, from a trusted local builder. Two three-bedroom homes: Residence 1 with two and a half baths and a private backyard, Residence 2 with two baths and a private rooftop terrace.",
      "Every convenience was built in rather than added later: central air, side-by-side washer and dryer, LED lighting throughout, wide-plank oak floors, a primary suite with en-suite bath, walk-in closet and private balcony.",
      "We branded the building, produced its identity and collateral, and ran a targeted digital campaign, including placements with The Real Deal, to bring both residences to market.",
    ],
    amenities: [
      "2 residences",
      "Three bedrooms each",
      "Private rooftop terrace (Residence 2)",
      "Private backyard (Residence 1)",
      "Wide-plank oak floors",
      "Central air conditioning",
      "Side-by-side washer and dryer",
      "Primary suite with walk-in closet and balcony",
    ],
    heroImage: "/developments/24-thorne-street/hero.jpg",
    gallery: [
      "/developments/24-thorne-street/gallery-01.jpg",
      "/developments/24-thorne-street/gallery-02.jpg",
      "/developments/24-thorne-street/gallery-03.jpg",
      "/developments/24-thorne-street/gallery-04.jpg",
      "/developments/24-thorne-street/gallery-05.jpg",
    ],
    floorPlans: [],
    featured: false,
    private: false,
  },
  {
    name: "69 Charles Street",
    slug: "69-charles-street",
    location: "Jersey City Heights",
    address: "69 Charles Street, Jersey City, NJ 07307",
    projectType: "Boutique condominium",
    status: "Completed",
    overview: [
      "A boutique new-construction condominium on a quiet block of Jersey City Heights, drawn to sit comfortably beside its older neighbours. Duplex layouts with double-height living spaces, open kitchens and private outdoor space.",
      "With a focus on fine materials and an element of craft, kitchens and bathrooms make the most of custom textured woods, veined marble and mosaic tile, paired with state-of-the-art appliances and fixtures.",
      "We took the project from digital conception to finished product: brand, renderings, print and digital collateral, and the sales campaign.",
    ],
    amenities: [
      "Duplex residences with double-height living",
      "Open kitchens with veined marble",
      "Custom textured wood and mosaic tile",
      "Private outdoor space",
      "Tranquil residential block",
    ],
    heroImage: "/developments/69-charles-street/hero.jpg",
    gallery: [
      "/developments/69-charles-street/gallery-01.jpg",
      "/developments/69-charles-street/gallery-02.jpg",
      "/developments/69-charles-street/gallery-03.jpg",
      "/developments/69-charles-street/gallery-04.jpg",
    ],
    floorPlans: [],
    featured: false,
    private: false,
  },
  {
    name: "966 Summit Avenue",
    slug: "966-summit-avenue",
    location: "Jersey City Heights",
    address: "966 Summit Avenue, Jersey City, NJ 07307",
    projectType: "Mid-rise boutique condominium",
    status: "Completed",
    overview: [
      "A mid-rise boutique condominium in the Heights, set between Central Avenue and John F. Kennedy Boulevard, with open-plan residences and an exceptional view of the Manhattan skyline from the upper floors.",
      "Residences are bright and simply detailed: wide living rooms, quiet bedrooms, kitchens with waterfall islands and integrated appliances, and an exterior of warm brick that belongs to the street.",
      "We created the brand identity, the renderings and the marketing programme, and represented the building through its sellout.",
    ],
    amenities: [
      "Boutique mid-rise",
      "Open-plan residences",
      "Manhattan skyline views from upper floors",
      "Kitchens with waterfall islands",
      "Between Central Avenue and JFK Boulevard",
    ],
    heroImage: "/developments/966-summit-avenue/hero.jpg",
    gallery: [
      "/developments/966-summit-avenue/gallery-01.jpg",
      "/developments/966-summit-avenue/gallery-02.jpg",
      "/developments/966-summit-avenue/gallery-03.jpg",
      "/developments/966-summit-avenue/gallery-04.jpg",
      "/developments/966-summit-avenue/gallery-05.jpg",
    ],
    floorPlans: [],
    featured: false,
    private: false,
  },

  /* --------------------------------- Demo content --------------------------------- */
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
    featured: false,
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
    featured: false,
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
    featured: false,
    private: true,
    demo: true,
  },
];
