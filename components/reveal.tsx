"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Elements entering together cascade rather than arriving as one block. */
const STEP_MS = 90;
const MAX_STEPS = 4;

function reveal(nodes: HTMLElement[]) {
  // Reading order: down the page, then across.
  nodes
    .sort((a, b) => {
      const ra = a.getBoundingClientRect();
      const rb = b.getBoundingClientRect();
      return Math.abs(ra.top - rb.top) > 24 ? ra.top - rb.top : ra.left - rb.left;
    })
    .forEach((n, i) => {
      if (i > 0) n.style.transitionDelay = `${Math.min(i, MAX_STEPS) * STEP_MS}ms`;
      n.classList.add("in");
    });
}

/**
 * Progressive reveal. Any element with `data-reveal` fades and rises as it
 * reaches the viewport. It begins the moment the element's first pixel
 * arrives, so what you see is the tail of the motion rather than its start,
 * and siblings are offset so a row of cards arrives in sequence.
 *
 * Purely additive: without JavaScript, or with reduced motion, everything is
 * simply visible.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.in)"));
    if (nodes.length === 0) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const hits = entries.filter((e) => e.isIntersecting).map((e) => e.target as HTMLElement);
        if (hits.length === 0) return;
        hits.forEach((n) => io.unobserve(n));
        reveal(hits);
      },
      // Fires as the element's leading edge meets the viewport.
      { rootMargin: "0px", threshold: 0 },
    );

    // Anything already on screen at hydration cascades in once, rather than
    // waiting for a scroll that may never come.
    const fold = window.innerHeight;
    const onScreen: HTMLElement[] = [];
    nodes.forEach((n) => {
      if (n.getBoundingClientRect().top < fold) onScreen.push(n);
      else io.observe(n);
    });
    if (onScreen.length) reveal(onScreen);

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
