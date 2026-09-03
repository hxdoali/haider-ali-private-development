import { site } from "@/data/site";
import type { Development } from "@/lib/types";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inline; the `<` escape guards against
      // accidental script-closing sequences in content.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: `${site.name} — ${site.descriptor}`,
        url: site.url,
        description: site.description,
        image: new URL("/og.jpg", site.url).toString(),
        email: site.contact.email,
        areaServed: [
          { "@type": "State", name: "New Jersey" },
          { "@type": "State", name: "New York" },
          { "@type": "City", name: "Jersey City" },
          { "@type": "City", name: "Hoboken" },
        ],
        knowsAbout: [
          "New development",
          "Developer representation",
          "Residential development advisory",
          "Boutique condominium development",
          "Off-market residences",
        ],
        sameAs: [site.contact.instagram],
      }}
    />
  );
}

export function DevelopmentJsonLd({ development }: { development: Development }) {
  if (development.private) return null;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ApartmentComplex",
        name: development.name,
        url: new URL(`/developments/${development.slug}`, site.url).toString(),
        description: development.overview[0],
        image: new URL(development.heroImage, site.url).toString(),
        numberOfAccommodationUnits: development.residenceCount,
        address: { "@type": "PostalAddress", addressLocality: development.location, addressRegion: "NJ", addressCountry: "US" },
        amenityFeature: development.amenities.map((a) => ({ "@type": "LocationFeatureSpecification", name: a })),
      }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: new URL(item.path, site.url).toString(),
        })),
      }}
    />
  );
}
