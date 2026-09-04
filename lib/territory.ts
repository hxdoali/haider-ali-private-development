/**
 * Where the practice works. Shown on the home page and on About, and used
 * for search metadata. Edit freely; order is the order on the page.
 */
export type Territory = { state: "New Jersey" | "New York"; region: string; places: string[] };

export const territory: Territory[] = [
  { state: "New Jersey", region: "Hudson Waterfront", places: ["Jersey City", "Hoboken", "Weehawken", "Edgewater"] },
  { state: "New Jersey", region: "Bergen County", places: ["Alpine", "Saddle River", "Englewood Cliffs", "Franklin Lakes", "Tenafly", "Ridgewood"] },
  { state: "New Jersey", region: "Essex, Union & Morris", places: ["Short Hills", "Montclair", "Summit", "Chatham", "Glen Ridge"] },
  { state: "New Jersey", region: "The Shore", places: ["Rumson", "Deal", "Spring Lake", "Sea Girt", "Long Beach Island"] },
  { state: "New Jersey", region: "Princeton", places: ["Princeton", "Hopewell", "Lawrenceville"] },
  { state: "New York", region: "Manhattan", places: ["Tribeca", "West Village", "SoHo", "Upper East Side", "Hudson Yards"] },
  { state: "New York", region: "Brooklyn & Queens", places: ["Brooklyn Heights", "DUMBO", "Cobble Hill", "Park Slope", "Williamsburg", "Long Island City"] },
  { state: "New York", region: "Westchester", places: ["Scarsdale", "Rye", "Larchmont", "Bronxville", "Chappaqua"] },
  { state: "New York", region: "The Hamptons", places: ["Southampton", "East Hampton", "Sag Harbor", "Montauk"] },
  { state: "New York", region: "Hudson Valley", places: ["Cold Spring", "Rhinebeck", "Hudson"] },
];

export const territoryByState = (state: Territory["state"]) => territory.filter((t) => t.state === state);
