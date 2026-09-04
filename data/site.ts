/**
 * Site-wide settings. Edit this file to change contact details, social links,
 * the brokerage affiliation and the legal text that appears in the footer.
 */

export const site = {
  name: "Haider Ali",
  wordmark: "HAIDER ALI",
  descriptor: "Private Residential Development",
  region: "New Jersey / New York",
  /** Set NEXT_PUBLIC_SITE_URL in your environment; this is the fallback. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.officeofali.com",
  description:
    "Haider Ali is a private residential development practice serving New Jersey and New York: boutique new development, developer representation, development advisory and off-market residences across the Hudson waterfront, Bergen County, the Shore and Princeton; Manhattan, Brooklyn, Westchester and the Hamptons.",
  keywords: [
    "New Jersey new development",
    "New York new development",
    "luxury real estate New Jersey",
    "luxury real estate New York",
    "Jersey City new development",
    "Hoboken luxury condos",
    "Bergen County luxury homes",
    "Alpine NJ luxury homes",
    "Saddle River estates",
    "Short Hills luxury homes",
    "Jersey Shore luxury homes",
    "Rumson waterfront homes",
    "Princeton luxury real estate",
    "Manhattan new development",
    "Tribeca new development condos",
    "Brooklyn new development",
    "Brooklyn Heights townhouse",
    "Westchester luxury homes",
    "Hamptons real estate",
    "developer representation NJ NY",
    "residential development advisory",
    "off-market residences New Jersey New York",
    "boutique condominium development",
  ],
  contact: {
    /** Public address. Forwards to the Gmail inbox via Cloudflare Email Routing. */
    email: "haider@officeofali.com",
    phone: "+1 (201) 800-5506",
    phoneHref: "tel:+12018005506",
    instagram: "https://www.instagram.com/officeofali?igsi=b3Y4bzQ4eWg4enZ6&utm_source=qr",
    instagramHandle: "@officeofali",
    city: "New Jersey / New York",
  },
  /**
   * Brokerage affiliation. Haider Ali is a licensed salesperson with
   * SERHANT. New Jersey LLC, working out of the Jersey City office.
   * The wordmark file is a placeholder — replace it with the official
   * SERHANT. logo asset supplied by the brokerage's marketing team.
   */
  brokerage: {
    name: "SERHANT.",
    legalName: "SERHANT. New Jersey LLC, Licensed Real Estate Broker",
    office: "Jersey City",
    address: "355 Varick Street",
    city: "Jersey City, NJ 07302",
    phone: "(201) 431-7677",
    phoneHref: "tel:+12014317677",
    website: "https://serhant.com/new-jersey",
    /** Official SERHANT. wordmark, recoloured to the site's ink. */
    logo: "/brokerage/serhant-wordmark.svg",
    /** Downtown Jersey City from above; the office sits on Varick Street. */
    image: "/brokerage/jersey-city.jpg",
    blurb:
      "SERHANT. is a technology-forward luxury brokerage founded by Ryan Serhant, with offices across New York, New Jersey and the East Coast. Haider Ali practises out of the Jersey City office on Varick Street.",
  },
  /**
   * LEGAL TEXT
   * The license number below was taken from public listing records and must
   * be confirmed against your NJ Real Estate Commission record before launch.
   */
  legal: {
    brokerage: "SERHANT. New Jersey LLC, Licensed Real Estate Broker",
    brokerageAddress: "355 Varick Street, Jersey City, NJ 07302  ·  (201) 431-7677",
    license: "Haider Ali, Licensed Real Estate Salesperson, New Jersey License No. 2322723", // CONFIRM before launch
    fairHousing:
      "We are committed to the letter and spirit of U.S. policy for the achievement of equal housing opportunity throughout the nation. We encourage and support an affirmative advertising and marketing program in which there are no barriers to obtaining housing because of race, color, religion, sex, handicap, familial status, or national origin.",
    disclaimer:
      "All information is from sources deemed reliable but is subject to errors, omissions, changes in price, prior sale or withdrawal without notice. No representation is made as to the accuracy of any description. All measurements and square footages are approximate. Renderings and photography are for illustrative purposes only. This is not an offering. The complete offering terms are in an offering plan available from the sponsor where required by law. Each office is independently owned and operated where applicable.",
    nyStandardOperatingProcedures:
      "New York properties are shown in cooperation with a New York licensed brokerage. The New York State Standard Operating Procedures and the Housing and Anti-Discrimination Disclosure are available upon request.",
    njConsumerInformation:
      "The New Jersey Consumer Information Statement on Real Estate Relationships is available upon request.",
    equalHousingLine: "Equal Housing Opportunity.",
  },
  nav: [
    { label: "Developments", href: "/developments" },
    { label: "Residences", href: "/residences" },
    { label: "Advisory", href: "/advisory" },
    { label: "Private", href: "/private" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type Site = typeof site;
