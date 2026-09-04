# HAIDER ALI — Private Residential Development

A quiet, editorial website for a boutique residential development practice serving New Jersey and New York.
Built with **Next.js (App Router) · TypeScript · Tailwind CSS v4**. No CMS, no database, no paid backend.
Deploys to Vercel's free tier. Ongoing cost: the domain.

---

## Contents

1. [What's inside](#whats-inside)
2. [Run locally](#run-locally)
3. [Deploy to GitHub + Vercel](#deploy-to-github--vercel)
4. [Connect a custom domain](#connect-a-custom-domain)
5. [Contact form (free)](#contact-form-free)
6. [Editing content](#editing-content)
   - [Developments](#developments)
   - [Residences](#residences)
   - [Change pricing or status](#change-pricing-or-status)
   - [Private listings](#private-listings)
   - [Insights](#insights)
   - [Site settings, contact details, legal text](#site-settings-contact-details-legal-text)
7. [Presentation mode and transitions](#presentation-mode-and-transitions)
8. [Adding photos](#adding-photos)
9. [Removing the demo content](#removing-the-demo-content)
10. [SEO](#seo)
11. [Costs](#costs)
12. [Project structure](#project-structure)

---

## What's inside

| Route | Page |
| --- | --- |
| `/` | Home: hero, selected developments, advisory, private residential, insights, contact |
| `/developments` | Editorial portfolio of projects |
| `/developments/[slug]` | One page per development (auto-generated from data) |
| `/residences` | Curated individual homes |
| `/residences/[slug]` | One page per residence (auto-generated from data) |
| `/advisory` | Development advisory and developer representation |
| `/private` | Off-market programme and request-access flow |
| `/about` | The practice |
| `/contact` | Contact form + details |
| `/insights`, `/insights/[slug]` | Short editorial notes |
| `/legal` | Licensing, brokerage, fair housing and disclosures |
| `/sitemap.xml`, `/robots.txt` | Generated automatically |

All content is plain TypeScript in `/data`. Adding an object creates a page. Every page is statically generated at build time.

---

## Run locally

Requirements: **Node.js 20.9 or newer** (22 recommended) and npm.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

Other scripts:

```bash
npm run build        # production build (also type-checks)
npm run start        # serve the production build locally
npm run lint         # ESLint
npm run typecheck    # TypeScript only
npm run placeholders # regenerate the demo placeholder images (optional)
```

---

## Deploy to GitHub + Vercel

1. **Push the code to GitHub.** If this folder is not yet a repository:

   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```

2. **Create a free Vercel account** at <https://vercel.com> and sign in with GitHub.

3. **Import the repository.** Vercel → *Add New… → Project* → pick the repo. It detects Next.js; leave the defaults.

4. **Add environment variables** (Project → *Settings → Environment Variables*). Copy the names from `.env.example`:

   | Name | Value |
   | --- | --- |
   | `NEXT_PUBLIC_SITE_URL` | `https://officeofali.com` (used for canonical URLs, sitemap, social cards) |
   | `NEXT_PUBLIC_FORM_ENDPOINT` | your Formspree or Web3Forms endpoint (see below) |
   | `NEXT_PUBLIC_FORM_ACCESS_KEY` | only for Web3Forms |

5. **Deploy.** Every push to `main` redeploys automatically. Pull requests get preview URLs.

---

## Connect a custom domain

1. In Vercel: Project → *Settings → Domains* → add `yourdomain.com` and `www.yourdomain.com`.
2. Vercel shows the DNS records to add at your registrar (GoDaddy, Namecheap, Cloudflare, Google Domains…):
   - `A` record for the root: `@` → `76.76.21.21`
   - `CNAME` for `www` → `cname.vercel-dns.com`
   (Use whatever Vercel displays on that screen; the values above are the current defaults.)
3. Choose which one redirects to the other (usually root → `www`, or the reverse). Vercel handles the redirect and issues the HTTPS certificate automatically.
4. Set `NEXT_PUBLIC_SITE_URL` to the final address and redeploy.

Propagation takes minutes to a few hours.

---

## Contact form (free)

The form on `/contact` posts to a free third-party endpoint so no server is required. Choose one:

**Formspree** (<https://formspree.io>, free plan: 50 submissions/month)
1. Create a form, copy its endpoint (`https://formspree.io/f/xxxxxxxx`).
2. Set `NEXT_PUBLIC_FORM_ENDPOINT` to that URL.

**Web3Forms** (<https://web3forms.com>, free plan: 250 submissions/month)
1. Get an access key for your email address.
2. Set `NEXT_PUBLIC_FORM_ENDPOINT=https://api.web3forms.com/submit` and `NEXT_PUBLIC_FORM_ACCESS_KEY=<key>`.

**No provider configured?** The form still works: pressing *Send* opens the visitor's email client with the message pre-filled, addressed to `site.contact.email`.

The form includes a honeypot field for basic spam protection. Fields: Name, Email, Phone, Company, Inquiry Type, Message. Links such as `/contact?inquiry=Private%20access&subject=Marin%20House` pre-select the inquiry type and add a "Regarding" line; the site generates these automatically from the *Inquire* and *Request Private Access* buttons.

---

## Editing content

Everything lives in three files. Edit, commit, push. Vercel rebuilds in about a minute.

```
data/developments.ts
data/residences.ts
data/insights.ts
data/site.ts           ← contact details, legal text, nav
```

Types for every field are documented in `lib/types.ts`.

### Developments

Open `data/developments.ts`. Each object looks like this:

```ts
{
  name: "Marin House",
  slug: "marin-house",                   // URL: /developments/marin-house — must match the image folder
  location: "Paulus Hook, Jersey City",  // shown publicly
  address: "000 Marin Boulevard, Jersey City, NJ 07302", // hidden automatically if private: true
  developer: "Lantern Hill Development",
  architect: "Studio Halvorsen",
  interiors: "Ines Marrow Interiors",    // optional
  projectType: "Boutique condominium",
  residenceCount: 14,
  status: "Now Selling",                 // "Pre-Development" | "Pre-Launch" | "Now Selling" | "Under Construction" | "Completed" | "Sold Out"
  completion: "Occupancy anticipated 2027", // optional
  overview: ["First paragraph.", "Second paragraph."],
  amenities: ["Attended lobby", "Private storage"],
  heroImage: "/developments/marin-house/hero.jpg",
  gallery: ["/developments/marin-house/gallery-01.jpg", "/developments/marin-house/gallery-02.jpg"],
  floorPlans: [
    { name: "Residence B", image: "/developments/marin-house/plans/residence-b.png", beds: 3, baths: 2.5, squareFeet: 1880, note: "Corner exposure" },
  ],
  featured: true,    // appears on the home page
  private: false,    // true = hide address, developer, architect, amenities, gallery and plans
  demo: true,        // delete this line on real projects
}
```

- **Add**: create `/public/developments/<slug>/`, add photos, copy an object, edit, push.
- **Edit**: change any field and push.
- **Remove**: delete the object (and optionally its image folder). The page disappears and drops out of the sitemap.
- **Order**: the order of the array is the order on the page. The first `featured` development supplies the full-screen hero image on the home page, so give it your strongest photograph.

### Residences

Open `data/residences.ts`:

```ts
{
  name: "Marin House, Residence 4B",
  slug: "marin-house-4b",           // URL: /residences/marin-house-4b — must match the image folder
  developmentSlug: "marin-house",   // links to a development, or null for a standalone property
  location: "Paulus Hook, Jersey City",
  address: "000 Marin Boulevard, Residence 4B, Jersey City, NJ 07302", // hidden if private
  price: 2395000,                   // number in USD, or null
  priceUponRequest: false,          // true shows "Price upon request"
  beds: 3,
  baths: 2.5,
  squareFeet: 1880,                 // or null
  propertyType: "Condominium",      // "Penthouse", "Townhouse", "Duplex", …
  status: "Available",              // "Available" | "In Contract" | "Sold" | "Coming Soon" | "Off Market"
  description: ["Paragraph one.", "Paragraph two."],
  heroImage: "/residences/marin-house-4b/hero.jpg",
  gallery: ["/residences/marin-house-4b/gallery-01.jpg"],
  floorPlan: "/residences/marin-house-4b/floor-plan.png", // or null
  monthlyCharges: 1860,             // optional, hidden if private
  exposure: "South and west.",      // optional
  featured: true,                   // appears on the home page
  private: false,
  demo: true,                       // delete on real listings
}
```

Residences linked with `developmentSlug` appear automatically on that development's page under *Residences at …*, and each residence page shows *Other residences in the building*.

### Change pricing or status

In `data/residences.ts`, edit the relevant object:

- New price: `price: 2495000`
- Hide the number: `priceUponRequest: true` (the `price` value is then ignored)
- Under contract: `status: "In Contract"`
- Sold: `status: "Sold"`

In `data/developments.ts`: `status: "Under Construction"`, `"Sold Out"`, etc.

Commit and push. No other file needs to change.

### Private listings

Set `private: true` on a residence or development. The site then:

- hides the address, price, square footage, monthly charges, description, gallery and floor plan (residences)
- hides the address, developer, architect, interiors, amenities, gallery and plans (developments)
- shows **PRIVATE RESIDENCE / Details available upon request.** with a **Request Private Access** button
- titles the page "Private Residence" and marks it `noindex`, and leaves it out of the sitemap
- still lists it on `/residences`, `/private` and (if `featured`) the home page, masked

The hero image, general location, property type, bedroom and bathroom count remain visible. Give private items a general `location` (for example "Hoboken, New Jersey" rather than a street) and a neutral `name`.

### Insights

`data/insights.ts`. Fields: `title`, `slug`, `date` (ISO `YYYY-MM-DD`), `category`, `excerpt`, `body` (array of paragraphs), optional `image`, `featured`. Newest first automatically.

### Site settings, contact details, legal text

`data/site.ts` holds:

- `contact` — email, phone, Instagram
- `brokerage` — the SERHANT. affiliation: legal entity, Jersey City office address and phone, a short description, and two **placeholder** assets (`/public/brokerage/serhant-wordmark.svg` and `/public/brokerage/office.jpg`). Replace the wordmark with the official logo from SERHANT.'s marketing team and the office image with a photograph. Renders on `/about`, `/contact` and in the footer.
- `legal` — brokerage and license lines (the NJ license number was taken from public listing records and is marked **CONFIRM** in the file; check it against your NJ Real Estate Commission record before launch), fair housing statement, disclaimer, and **placeholders** for the NY Standard Operating Procedures and NJ Consumer Information Statement PDF links. These render in the footer, on `/about` and on `/legal`.
- `nav` — the menu
- `keywords`, `description` — default SEO text

---

## Presentation mode and transitions

The site is built to be shown in a room as much as read on a phone.

**Presentation mode.** Every public development and residence has a **Present**
control in its hero. It takes the screen (true fullscreen where the browser
allows it) and plays the property one image at a time: a title card, the hero,
the gallery, floor plans on a light ground, each residence in the building,
and a closing card with the inquiry link and your contact details.

| Key | Action |
| --- | --- |
| `→` `space` `enter` or click the right side | Next |
| `←` or click the left side | Previous |
| `P` | Pause / play (autoplay is on by default, 9s per image) |
| `F` | Toggle fullscreen |
| `Esc` | Leave |

The cursor and controls hide after a couple of seconds of stillness.

**Portfolio screening.** `/present` plays the whole public portfolio as
chapters, one development after another, then any standalone residences. It
is linked from the developments page and the footer, and is excluded from
search engines. Nothing marked `private: true` appears in any presentation.

Slides are generated from the same data files as the pages (`lib/slides.ts`),
so there is nothing extra to maintain: add a gallery image and it is in the
presentation.

**Transitions.** Click a house and its image travels from the card into the
full-screen hero rather than reloading; pages fade and settle. This uses the
browser's View Transitions API through React's `<ViewTransition>`. Where a
browser lacks support the site simply navigates normally. All motion respects
the visitor's reduced-motion preference.

## Adding photos

Images live under `/public` and are referenced by path:

```
public/
  developments/<slug>/hero.jpg
  developments/<slug>/gallery-01.jpg …
  developments/<slug>/plans/<plan>.png
  residences/<slug>/hero.jpg
  residences/<slug>/gallery-01.jpg …
  residences/<slug>/floor-plan.png
  insights/<name>.jpg
  about/studio.jpg
  og.jpg                       ← social sharing card (1600×900)
```

Guidelines:

- **Home hero and private band**: the home page hero uses the first featured development's `heroImage`; the dark "Private" band uses `public/private/hero.jpg`. Both are shown full-bleed with type over them, so choose images with a calm area near the bottom-left.
- **Format**: JPG for photography, PNG for floor plans. Next.js converts to AVIF/WebP and resizes automatically.
- **Size**: 2400px on the long edge is plenty. Keep files under ~1 MB each; export at quality 80–85.
- **Aspect**: hero images are shown 16:9 on detail pages and 3:2 in lists; gallery images alternate 3:2 (wide) and 4:5 (tall); residence thumbnails are 4:5. Images are cropped to fit (`object-cover`), so keep the subject centred.
- **Names**: anything works, as long as the path in the data file matches exactly (case-sensitive).
- **Floor plans**: light background, dark lines, roughly 10:7. They are shown uncropped (`object-contain`).

Then commit the files with the data change and push. Vercel's free image optimisation covers a personal site of this size comfortably.

`npm run placeholders` regenerates the abstract demo images from `scripts/generate-placeholders.mjs`. You never need it for a real site.

---

## Removing the demo content

The three developments, five residences and three insights are **fictional**. Anything with `demo: true` shows a small "Demo" tag on the site.

1. Delete the demo objects in `data/developments.ts` and `data/residences.ts` (or replace them field by field).
2. Delete `public/developments/<demo-slug>/` and `public/residences/<demo-slug>/`.
3. Rewrite the copy in `data/insights.ts` or delete the entries.
4. Replace `public/about/studio.jpg`, `public/advisory/hero.jpg`, `public/private/hero.jpg` and `public/og.jpg` with real photography.
5. Edit the About copy in `app/about/page.tsx` and the placeholders in `data/site.ts`.
6. Remove the "Demonstration content" section from `app/legal/page.tsx`.

---

## SEO

- Per-page `<title>`, description, canonical URL, Open Graph and Twitter cards (`lib/seo.ts`)
- Structured data: `ProfessionalService` (site-wide), `ApartmentComplex` (public developments), `BreadcrumbList`
- `sitemap.xml` and `robots.txt` generated from the data (private pages excluded)
- Target phrases baked into titles and copy: *NJ new development*, *Jersey City new development*, *Hoboken new development*, *developer representation NJ*, *residential development advisory NJ*
- Fonts self-hosted via `next/font` (no third-party requests), static HTML, optimised images — strong Core Web Vitals on mobile

Set `NEXT_PUBLIC_SITE_URL` so canonical links and the sitemap point at your domain. After launch, submit the sitemap in Google Search Console.

---

## Costs

| Item | Cost |
| --- | --- |
| Hosting (Vercel Hobby) | $0 |
| Image optimisation (Vercel Hobby) | $0 within the free quota |
| Fonts (Google Fonts, self-hosted at build) | $0 |
| Contact form (Formspree / Web3Forms free tier) | $0 |
| CMS / database / backend | none |
| Domain | ~$10–20 / year at your registrar |

No paid service is required to build, deploy or run the site. Vercel's Hobby plan is for personal, non-commercial use; if the site is used commercially, review Vercel's terms or move to the Pro plan.

---

## Project structure

```
app/                     Routes (App Router)
  layout.tsx             Fonts, header, footer, metadata
  page.tsx               Home
  developments/          Index + [slug]
  residences/            Index + [slug]
  advisory/ private/ about/ contact/ insights/ legal/
  sitemap.ts robots.ts not-found.tsx icon.svg globals.css
components/              UI: header, footer, figure, gallery, floor plans, entries, forms
data/                    ALL CONTENT — developments, residences, insights, site settings
lib/                     Types, content helpers, formatting, SEO helper
public/                  Images
scripts/                 Placeholder image generator (dev only)
```
