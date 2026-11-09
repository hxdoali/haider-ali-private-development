/**
 * Public HubSpot embed configuration; these identifiers are not credentials.
 * Set newsletterFormId only after the separate newsletter form is created,
 * reviewed and authorized for publication in portal 247892651.
 * Never use the existing Website & Linktree Inquiry form here.
 */
export const newsletter = {
  portalId: "247892651",
  region: "na2",
  newsletterFormId: "f154a9ab-ac26-49a1-9101-836755ecd07c",
} as const;

export function publishedNewsletterFormId(): string | null {
  const id: string = newsletter.newsletterFormId;
  const inquiryFormId = "9c414b41-bdb9-466e-aa57-9a749c72d8c9";
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id) && id !== inquiryFormId
    ? id
    : null;
}
