"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [overHeroImage, setOverHeroImage] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Over a full-screen hero (the home page, a development, a residence) the
  // header sits transparent until the visitor scrolls past it. Everywhere
  // else it is solid. Pages opt in by marking their hero with `data-hero`.
  useEffect(() => {
    let hero: HTMLElement | null = null;
    const update = () => {
      setOverHeroImage(hero ? window.scrollY < hero.offsetHeight * 0.72 : false);
      setScrolled(window.scrollY > 8);
    };
    // Read the new page's DOM after it has painted.
    const frame = window.requestAnimationFrame(() => {
      hero = document.querySelector<HTMLElement>("[data-hero]");
      update();
    });
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, [pathname]);

  // Lock body scroll while the overlay is open; close on Escape.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const overHero = overHeroImage && !open;

  return (
    <header className="fixed inset-x-0 top-0 z-50" style={{ viewTransitionName: "site-header" }}>
      <div
        className={`gutter flex h-16 items-center justify-between border-b transition-[background-color,color,border-color] duration-1000 ease-[var(--ease-quiet)] md:h-20 ${
          overHero
            ? "header-over-hero border-transparent"
            : `bg-bone text-ink ${scrolled ? "border-rule" : "border-transparent"}`
        }`}
      >
        <Link
          href="/"
          onClick={() => setOpen(false)}
          aria-label={`${site.wordmark} — home`}
          className="font-sans text-[12px] font-medium uppercase tracking-[var(--tracking-wordmark)] text-ink md:text-[13px]"
        >
          {site.wordmark}
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8 lg:gap-10">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`eyebrow transition-colors duration-300 hover:text-ink ${
                    isActive(item.href) ? "text-ink" : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="eyebrow -mr-2 px-2 py-3 text-ink md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 flex flex-col bg-bone transition-opacity duration-500 ease-[var(--ease-quiet)] md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="h-16" />
        <nav aria-label="Mobile" className="gutter flex flex-1 flex-col justify-between pb-10 pt-8">
          <ul className="space-y-1">
            {site.nav.map((item, i) => (
              <li
                key={item.href}
                style={{ transitionDelay: open ? `${80 + i * 40}ms` : "0ms" }}
                className={`transition-all duration-500 ease-[var(--ease-quiet)] ${
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="display block py-2 text-[2.75rem] leading-none text-ink"
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="space-y-3 border-t hairline pt-6">
            <p className="eyebrow">{site.descriptor}</p>
            <p className="eyebrow">{site.region}</p>
            <a href={`mailto:${site.contact.email}`} className="block text-sm text-charcoal">
              {site.contact.email}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
