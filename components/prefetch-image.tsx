"use client";

import { useEffect, useRef } from "react";

/**
 * Warms the browser cache with the full-size version of an image once its
 * card scrolls into view, so that when the visitor clicks, the hero on the
 * next page is already loaded and the shared-element morph lands on a
 * finished image rather than an empty frame.
 */
export function PrefetchImage({ srcSet, sizes }: { srcSet: string; sizes: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Observe the figure, not the hidden marker: a display:none element never intersects.
    const el = ref.current?.parentElement;
    if (!el || !("IntersectionObserver" in window)) return;
    let done = false;
    const load = () => {
      if (done) return;
      done = true;
      const img = new Image();
      img.sizes = sizes;
      img.srcset = srcSet;
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          load();
          io.disconnect();
        }
      },
      { rootMargin: "25% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [srcSet, sizes]);

  return <span ref={ref} hidden aria-hidden="true" />;
}
