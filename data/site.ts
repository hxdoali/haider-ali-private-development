/**
 * Site-wide settings. Edit this file to change contact details, social links,
 * and the legal / brokerage placeholders that appear in the footer.
 */

export const site = {
  name: "Haider Ali",
  wordmark: "HAIDER ALI",
  descriptor: "Private Residential Development",
  region: "New Jersey / New York",
  /** Set NEXT_PUBLIC_SITE_URL in your environment; this is the fallback. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://officeofali.com",
  description:
    "Haider Ali is a private residential development practice serving New Jersey and New York: boutique new development, developer representation, development advisory, and off-market residences in Jersey City, Hoboken, and the Hudson waterfront.",
  keywords: [
    "NJ new development",
    "New Jersey new development",
    "Jersey City new development",
    "Hoboken new development",
    "developer representation NJ",
    "residential development advisory NJ",
    "new development condos Jersey City",
    "new development condos Hoboken",
    "Hudson County new construction",
    "private residential development New Jersey",
    "off-market residences New Jersey",
    "boutique condominium development NJ",
  ],
  contact: {
    email: "haideralirealtor@gmail.com",
    phone: "+1 (201) 800-5506",
    phoneHref: "tel:+12018005506",
    instagram: "https://www.instagram.com/haiderali.nj/",
    instagramHandle: "@haiderali.nj",
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
    /** Placeholder wordmark. Swap for the official logo (SVG preferred). */
    logo: "/brokerage/serhant-wordmark.svg",
    /** Placeholder photograph of the office. */
    image: "/brokerage/office.jpg",
    blurb:
      "SERHANT. is a technology-forward luxury brokerage founded by Ryan Serhant, with offices across New York, New Jersey and the East Coast. Haider Ali practises out of the Jersey City office on Varick Street.",
  },
  /**
   * LEGAL TEXT
   * The license number below was taken from public listing records and must
   * be confirmed against your NJ Real Estate Commission record before launch.
   * Items marked PLACEHOLDER still need real text or a PDF link.
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
      "New York properties are shown in cooperation with a New York licensed brokerage. New York State Standard Operating Procedures and the NYS Housing and Anti-Discrimination Disclosure are available upon request. [PLACEHOLDER — link to PDF]", // PLACEHOLDER
    njConsumerInformation:
      "New Jersey Consumer Information Statement on Real Estate Relationships available upon request. [PLACEHOLDER — link to PDF]", // PLACEHOLDER
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
