import type { Insight } from "@/lib/types";

/**
 * INSIGHTS
 * ------------------------------------------------------------------
 * Short editorial notes. One object = one page at /insights/[slug].
 * Keep them brief. Dates are ISO strings and sort newest first.
 * ------------------------------------------------------------------
 */

export const insights: Insight[] = [
  {
    title: "What boutique means in a market of towers",
    slug: "what-boutique-means",
    date: "2026-06-02",
    category: "Development",
    excerpt:
      "The word is used for anything under a hundred units. It should describe a way of planning a building, not a count.",
    body: [
      "Most of the new development on both sides of the Hudson over the last cycle has been large: full-block sites in Jersey City and Long Island City, several hundred units, amenity floors sized to a hotel. That product has a market. It is not the one we work in.",
      "A boutique building is defined less by its unit count than by the decisions its scale allows. Small floor plates mean corners for most residences. Fewer homes mean a lobby that can be attended without a service charge that alarms buyers. A limited palette can be executed properly because there are fewer places for it to go wrong.",
      "The result is a building that competes on the quality of the individual home rather than on the length of the amenity list. In Paulus Hook or Brooklyn Heights, in Hoboken or the West Village, in Montclair or Rye, that is what the most discerning buyers are actually comparing.",
      "For a developer, the discipline is in resisting the extra floor and the extra unit. The upside is a sellout that does not depend on the broader market's appetite for volume.",
    ],
    image: "/insights/boutique.jpg",
    featured: true,
  },
  {
    title: "Pricing a pre-launch: sequence before spread",
    slug: "pricing-a-pre-launch",
    date: "2026-04-14",
    category: "Advisory",
    excerpt:
      "The first ten contracts set the tone for the next forty. Which residences are released, and in what order, matters as much as the number on the sheet.",
    body: [
      "Developers tend to arrive at pricing conversations with a spreadsheet: a blended price per square foot, a premium for height, an adjustment for exposure. That framework is necessary. It is not sufficient.",
      "The question we ask first is which residences should be released, and to whom, before anything is public. A pre-launch is a chance to place the homes that anchor the building's reputation with buyers who will speak about it accurately. It is also the moment to hold back the inventory whose value will be clearer once the building is understood.",
      "Spread, the gap between the least and most expensive residences, should be set with the sellout curve in mind rather than the appraisal. A schedule that is too flat leaves money in the upper floors. One that is too steep stalls in the middle.",
      "Sequence first. Then spread. Then the number.",
    ],
    image: "/insights/pricing.jpg",
    featured: true,
  },
  {
    title: "Small sites, conversions, and the next cycle",
    slug: "small-sites-and-the-next-cycle",
    date: "2026-02-20",
    category: "Market",
    excerpt:
      "With the large waterfront and rail-yard sites largely spoken for, the interesting work from Hoboken to Brooklyn is moving to small sites, infill, and conversion.",
    body: [
      "Hoboken is a mile square, and the brownstone belt of Brooklyn is not much more forgiving. The large parcels that defined the last two decades of development sit at the edges, and most of them are now built or entitled. What remains, from the Hudson waterfront to the villages of Westchester and Bergen County, is the interior of the grid: individual lots, assemblages of two or three, and older buildings whose structure is worth keeping.",
      "That shifts the product. Small sites favour a handful of full-floor residences over a hundred studios. Conversions favour tall ceilings and irregular plans that a ground-up building would not produce. Both reward a developer who is willing to sell fewer homes at a higher standard.",
      "It also shifts the marketing. A nine-unit building does not need a sales gallery. It needs a clear position, a short list of the right buyers, and a release strategy that treats each residence as its own decision.",
      "This is the segment we expect to spend most of our time in for the foreseeable future.",
    ],
    image: "/insights/small-sites.jpg",
    featured: true,
  },
];
