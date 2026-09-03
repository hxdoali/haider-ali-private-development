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
   * LEGAL / BROKERAGE PLACEHOLDERS
   * Replace every value below with the actual text supplied by your brokerage
   * and counsel before launch. Empty strings are hidden automatically.
   */
  legal: {
    brokerage: "[Brokerage Name], Licensed Real Estate Broker", // PLACEHOLDER
    brokerageAddress: "[Brokerage Address, City, State ZIP]", // PLACEHOLDER
    license:
      "Haider Ali, Licensed Real Estate Salesperson, NJ License No. [0000000] / NY License No. [00000000]", // PLACEHOLDER
    fairHousing:
      "We are committed to the letter and spirit of U.S. policy for the achievement of equal housing opportunity throughout the nation. We encourage and support an affirmative advertising and marketing program in which there are no barriers to obtaining housing because of race, color, religion, sex, handicap, familial status, or national origin.",
    disclaimer:
      "All information is from sources deemed reliable but is subject to errors, omissions, changes in price, prior sale or withdrawal without notice. No representation is made as to the accuracy of any description. All measurements and square footages are approximate. Renderings and photography are for illustrative purposes only. This is not an offering. The complete offering terms are in an offering plan available from the sponsor where required by law.",
    nyStandardOperatingProcedures:
      "New York State Standard Operating Procedures and the NYS Housing and Anti-Discrimination Disclosure are available upon request. [PLACEHOLDER — link to PDF]", // PLACEHOLDER
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
