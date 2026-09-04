import Image from "next/image";
import Link from "next/link";
import { SplitText } from "@/components/split-text";
import { site } from "@/data/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t hairline md:mt-40">
      <div className="gutter grid grid-cols-2 gap-x-6 gap-y-12 pt-16 pb-10 md:grid-cols-12 md:pt-24 md:pb-16">
        <div className="col-span-2 md:col-span-5">
          <p className="font-sans text-[12px] font-medium uppercase tracking-[var(--tracking-wordmark)] text-ink">
            {site.wordmark}
          </p>
          <p className="display mt-4 text-[1.75rem] text-charcoal md:text-[2.25rem]">{site.descriptor}</p>
          <p className="eyebrow mt-4">{site.region}</p>
        </div>

        <nav aria-label="Footer" className="md:col-span-2">
          <p className="eyebrow mb-5">Index</p>
          <ul className="space-y-2.5 text-[15px] text-charcoal">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-quiet">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/insights" className="link-quiet">
                Insights
              </Link>
            </li>
            <li>
              <Link href="/present" className="link-quiet">
                Portfolio tour
              </Link>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-2">
          <p className="eyebrow mb-5">Contact</p>
          <ul className="space-y-2.5 text-[15px] text-charcoal">
            <li>
              <a href={`mailto:${site.contact.email}`} className="link-quiet break-all">
                {site.contact.email}
              </a>
            </li>
            {site.contact.phone ? (
              <li>
                <a href={site.contact.phoneHref} className="link-quiet">
                  {site.contact.phone}
                </a>
              </li>
            ) : null}
            <li>
              <a href={site.contact.instagram} target="_blank" rel="noopener noreferrer" className="link-quiet">
                Instagram
              </a>
            </li>
          </ul>
        </div>

        <div className="col-span-2 md:col-span-3">
          <p className="eyebrow mb-5">Private</p>
          <p className="text-[15px] leading-relaxed text-charcoal">
            A limited number of residences and developments are shared privately, ahead of or instead of public release.
          </p>
          <Link href="/private" className="link-quiet mt-4 inline-block text-[15px] text-ink">
            Request private access
          </Link>
        </div>
      </div>

      {/* Signature */}
      <div className="gutter overflow-hidden pb-6 md:pb-10" aria-hidden="true">
        <p
          className="display select-none whitespace-nowrap text-[clamp(3.5rem,14.2vw,15rem)] uppercase leading-[0.85] tracking-[0.04em] text-sand"
          data-reveal="text"
        >
          <SplitText text={site.wordmark} by="char" mode="scroll" />
        </p>
      </div>

      {/* Brokerage and legal — edit in /data/site.ts */}
      <div className="gutter border-t hairline py-10 md:py-12">
        <div className="grid gap-8 text-[12px] leading-relaxed text-ash md:grid-cols-12">
          <div className="space-y-3 md:col-span-7">
            <Image
              src={site.brokerage.logo}
              alt={site.brokerage.name}
              width={640}
              height={160}
              className="mb-5 h-6 w-auto text-charcoal md:h-7"
            />
            {site.legal.license ? <p className="text-charcoal">{site.legal.license}</p> : null}
            {site.legal.brokerage ? <p>{site.legal.brokerage}</p> : null}
            {site.legal.brokerageAddress ? <p>{site.legal.brokerageAddress}</p> : null}
            <p>{site.legal.disclaimer}</p>
          </div>
          <div className="space-y-3 md:col-span-5">
            <p>{site.legal.fairHousing}</p>
            <p>{site.legal.equalHousingLine}</p>
            <p>
              <Link href="/legal" className="link-quiet text-charcoal">
                Legal, licensing and fair housing disclosures
              </Link>
            </p>
          </div>
        </div>
        <p className="eyebrow mt-10">
          © {year} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
