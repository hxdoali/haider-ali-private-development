"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { site } from "@/data/site";
import type { Slide } from "@/lib/slides";

const IMAGE_MS = 7000;
const TITLE_MS = 4500;

/**
 * Presentation mode. Takes the screen over: one image at a time with a slow
 * drift, captions, a progress line, and keyboard control, so a house can be
 * shown on a large display the way it deserves.
 *
 *   → / space / click right   next        ← / click left   previous
 *   P                          play/pause  F                fullscreen
 *   Esc                        close
 */
export function Presenter({
  slides,
  label = "Walk through",
  variant = "hero",
}: {
  slides: Slide[];
  label?: string;
  /** `hero` is the small control used on a page; `inline` is the large one on /present. */
  variant?: "hero" | "inline";
}) {
  const [open, setOpen] = useState(false);
  if (slides.length === 0) return null;

  const trigger =
    variant === "inline" ? (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex items-center gap-5 border border-bone/40 px-8 py-5 text-bone transition-colors duration-500 hover:border-bone hover:bg-bone hover:text-ink"
      >
        <span className="eyebrow !text-current">{label}</span>
        <span aria-hidden="true" className="display text-[1.6rem] leading-none">
          →
        </span>
      </button>
    ) : (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="eyebrow group inline-flex items-center gap-3 !text-bone/80 transition-colors duration-300 hover:!text-bone"
        aria-label={`${label}: open the full-screen walkthrough`}
      >
        <span
          aria-hidden="true"
          className="grid h-8 w-8 place-items-center border border-bone/40 transition-colors duration-300 group-hover:border-bone"
        >
          <span className="ml-0.5 block h-0 w-0 border-y-[4px] border-l-[6px] border-y-transparent border-l-current" />
        </span>
        {label}
      </button>
    );

  return (
    <>
      {trigger}
      {/* Portalled to <body>: ancestors with transforms would otherwise contain the fixed stage. */}
      {open ? createPortal(<Stage slides={slides} onClose={() => setOpen(false)} />, document.body) : null}
    </>
  );
}

function Stage({ slides, onClose }: { slides: Slide[]; onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [idle, setIdle] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const idleTimer = useRef<number | null>(null);
  const last = slides.length - 1;
  const current = slides[index];
  const duration = current.kind === "image" ? IMAGE_MS : TITLE_MS;

  const next = useCallback(() => setIndex((i) => Math.min(i + 1, last)), [last]);
  const prev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);

  const close = useCallback(() => {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => undefined);
    }
    onClose();
  }, [onClose]);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => undefined);
    } else {
      document.documentElement.requestFullscreen?.({ navigationUI: "hide" }).catch(() => undefined);
    }
  }, []);

  // Enter fullscreen on open (the click that opened us counts as the gesture),
  // lock scroll, take focus. Leaving fullscreen by other means closes the stage.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    rootRef.current?.focus();
    let entered = false;
    document.documentElement
      .requestFullscreen?.({ navigationUI: "hide" })
      .then(() => {
        entered = true;
      })
      .catch(() => undefined);
    const onFs = () => {
      if (entered && !document.fullscreenElement) onClose();
    };
    document.addEventListener("fullscreenchange", onFs);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("fullscreenchange", onFs);
    };
  }, [onClose]);

  // Keyboard.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case " ":
        case "Enter":
        case "PageDown":
          e.preventDefault();
          next();
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          prev();
          break;
        case "Home":
          setIndex(0);
          break;
        case "End":
          setIndex(last);
          break;
        case "p":
        case "P":
        case "k":
          setPlaying((v) => !v);
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
        case "Escape":
          close();
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, last, close, toggleFullscreen]);

  // Autoplay. Stops on the final slide.
  useEffect(() => {
    if (!playing || index >= last) return;
    const t = window.setTimeout(next, duration);
    return () => window.clearTimeout(t);
  }, [playing, index, last, duration, next]);

  // Hide the cursor and controls when the presenter's hand is still.
  const wake = useCallback(() => {
    setIdle(false);
    if (idleTimer.current) window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => setIdle(true), 2600);
  }, []);
  useEffect(() => {
    idleTimer.current = window.setTimeout(() => setIdle(true), 2600);
    return () => {
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
    };
  }, []);

  const onStageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a, button")) return;
    if (swiped.current) {
      swiped.current = false;
      return;
    }
    const x = e.clientX / window.innerWidth;
    if (x < 0.28) prev();
    else next();
  };

  // Swipe left / right on touch screens.
  const touchX = useRef<number | null>(null);
  const swiped = useRef(false);
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0]?.clientX ?? null;
    wake();
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 40) return;
    swiped.current = true;
    if (dx < 0) next();
    else prev();
  };

  return (
    <div
      ref={rootRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label="Presentation"
      onMouseMove={wake}
      onClick={onStageClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className={`present-root fixed inset-0 z-[100] select-none overflow-hidden bg-ink text-bone outline-none ${idle ? "idle" : ""}`}
    >
      {/* Slides: current, and its neighbours so the next image is already loaded. */}
      {slides.map((s, i) => {
        if (Math.abs(i - index) > 1) return null;
        const active = i === index;
        return (
          <div
            key={i}
            aria-hidden={!active}
            className={`present-slide absolute inset-0 ${active ? "z-10 opacity-100" : "z-0 opacity-0"}`}
          >
            <SlideView slide={s} active={active} alt={i % 2 === 1} />
          </div>
        );
      })}

      {/* Chrome */}
      <div className="present-chrome pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between p-6 md:p-10">
        <p className="font-sans text-[11px] font-medium uppercase tracking-[var(--tracking-wordmark)] text-bone/80 md:text-[12px]">
          {site.wordmark}
        </p>
        <div className="pointer-events-auto flex items-center gap-6">
          <p className="eyebrow tabular-nums !text-bone/60">
            {String(index + 1).padStart(2, "0")}
            <span className="mx-2 text-bone/30">/</span>
            {String(slides.length).padStart(2, "0")}
          </p>
          <button
            type="button"
            onClick={close}
            className="eyebrow !text-bone/70 transition-colors hover:!text-bone"
            aria-label="Close presentation"
          >
            Close
            <span className="ml-2 hidden text-bone/40 md:inline">Esc</span>
          </button>
        </div>
      </div>

      <div className="present-chrome pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-end gap-8 p-6 md:p-10">
        <div className="pointer-events-auto flex items-center gap-6">
          <button
            type="button"
            onClick={() => setPlaying((v) => !v)}
            className="eyebrow !text-bone/70 transition-colors hover:!text-bone"
            aria-pressed={playing}
          >
            {playing ? "Pause" : "Play"}
          </button>
          <button
            type="button"
            onClick={prev}
            disabled={index === 0}
            className="display text-[1.5rem] leading-none text-bone/70 transition-colors hover:text-bone disabled:opacity-25"
            aria-label="Previous"
          >
            ←
          </button>
          <button
            type="button"
            onClick={next}
            disabled={index === last}
            className="display text-[1.5rem] leading-none text-bone/70 transition-colors hover:text-bone disabled:opacity-25"
            aria-label="Next"
          >
            →
          </button>
        </div>
      </div>

      {/* Progress */}
      {index < last ? (
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-20 h-px bg-bone/15">
          <div
            key={index}
            className={`present-progress h-full bg-bone/70 ${playing ? "" : "paused"}`}
            style={{ "--dur": `${duration}ms` } as React.CSSProperties}
          />
        </div>
      ) : null}
    </div>
  );
}

function SlideView({ slide, active, alt }: { slide: Slide; active: boolean; alt: boolean }) {
  if (slide.kind === "image") {
    const contain = slide.fit === "contain";
    return (
      <>
        <div className={`absolute inset-0 ${contain ? "bg-bone" : "bg-ink"}`}>
          <div className={`present-kb absolute inset-0 ${contain ? "m-[6vmin]" : ""} ${active && !contain ? "play" : ""} ${alt ? "alt" : ""}`}>
            <Image
              src={slide.src}
              alt={slide.title ?? slide.eyebrow ?? ""}
              fill
              sizes="100vw"
              quality={80}
              priority={active}
              className={contain ? "object-contain" : "object-cover"}
            />
          </div>
        </div>
        {!contain ? (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(23,23,21,0.62)_0%,rgba(23,23,21,0.12)_38%,rgba(23,23,21,0)_60%)]"
          />
        ) : null}
        {slide.eyebrow || slide.title ? (
          <div
            key={active ? "on" : "off"}
            className={`present-copy absolute inset-x-0 bottom-0 p-6 pb-14 md:p-10 md:pb-20 ${contain ? "text-ink" : "text-bone"}`}
          >
            {slide.eyebrow ? (
              <p className={`eyebrow ${contain ? "" : "!text-bone/70"}`} style={{ "--i": 0 } as React.CSSProperties}>
                {slide.eyebrow}
              </p>
            ) : null}
            {slide.title ? (
              <p
                className="display mt-3 text-[clamp(1.5rem,3vw,2.6rem)] leading-[1.05]"
                style={{ "--i": 1 } as React.CSSProperties}
              >
                {slide.title}
              </p>
            ) : null}
          </div>
        ) : null}
      </>
    );
  }

  if (slide.kind === "title") {
    return (
      <div className="absolute inset-0 bg-ink">
        {slide.image ? (
          <div className={`present-kb absolute inset-0 opacity-40 ${active ? "play" : ""} ${alt ? "alt" : ""}`}>
            <Image src={slide.image} alt="" fill sizes="100vw" quality={70} priority={active} className="object-cover" />
          </div>
        ) : null}
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(23,23,21,0.2),rgba(23,23,21,0.85))]" />
        <div key={active ? "on" : "off"} className="present-copy absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
          {slide.eyebrow ? (
            <p className="eyebrow !text-bone/70" style={{ "--i": 0 } as React.CSSProperties}>
              {slide.eyebrow}
            </p>
          ) : null}
          <h2
            className="display mt-8 max-w-[18ch] text-[clamp(3rem,9vw,9.5rem)] leading-[0.95] text-bone"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            {slide.title}
          </h2>
          {slide.subtitle ? (
            <p className="display mt-10 text-[clamp(1.2rem,2.2vw,2rem)] italic text-bone/80" style={{ "--i": 2 } as React.CSSProperties}>
              {slide.subtitle}
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-ink">
      <div key={active ? "on" : "off"} className="present-copy absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
        {slide.eyebrow ? (
          <p className="eyebrow !text-bone/70" style={{ "--i": 0 } as React.CSSProperties}>
            {slide.eyebrow}
          </p>
        ) : null}
        <h2 className="display mt-8 text-[clamp(3rem,8vw,8rem)] leading-[0.95] text-bone" style={{ "--i": 1 } as React.CSSProperties}>
          {slide.title}
        </h2>
        {slide.body ? (
          <p className="lede mt-8 max-w-[34rem] !text-bone/80" style={{ "--i": 2 } as React.CSSProperties}>
            {slide.body}
          </p>
        ) : null}
        <div className="mt-12 flex flex-col items-center gap-6" style={{ "--i": 3 } as React.CSSProperties}>
          <Link
            href={slide.href}
            className="inline-flex items-center border border-bone/50 px-8 py-4 text-bone transition-colors duration-500 hover:bg-bone hover:text-ink"
          >
            <span className="eyebrow !text-current">{slide.cta}</span>
          </Link>
          <a href={`mailto:${site.contact.email}`} className="link-quiet text-[15px] text-bone/80">
            {site.contact.email}
          </a>
          <p className="eyebrow !text-bone/50">{site.contact.phone}</p>
        </div>
      </div>
    </div>
  );
}
