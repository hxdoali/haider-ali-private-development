"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Progressive reveal. Any element with `data-reveal` fades and rises into
 * place as it enters the viewport. Purely additive: without JavaScript (or
 * with reduced motion) everything is simply visible.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.in)"));
    if (reduce || !("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    // Anything already scrolled past (or currently in view) before hydration
    // is shown immediately; only what lies below the fold waits for scroll.
    const fold = window.innerHeight;
    nodes.forEach((n) => {
      if (n.getBoundingClientRect().top < fold) n.classList.add("in");
      else io.observe(n);
    });
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
