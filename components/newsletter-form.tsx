"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { newsletter } from "@/data/newsletter";

type HubSpotWindow = Window & {
  hbspt?: {
    forms: {
      create(options: {
        portalId: string;
        region: string;
        formId: string;
        target: string;
        onFormReady: () => void;
      }): void;
    };
  };
};

/** Native HubSpot form only. No submission proxy, field stamping or auto-email. */
export function NewsletterForm({ formId }: { formId: string }) {
  const started = useRef(false);
  const [status, setStatus] = useState<"loading" | "ready" | "unavailable">("loading");

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setStatus((current) => current === "ready" ? current : "unavailable");
    }, 20_000);
    return () => window.clearTimeout(timeout);
  }, []);

  function mountForm() {
    if (started.current) return;
    const hubspot = (window as HubSpotWindow).hbspt;
    if (!hubspot?.forms) {
      setStatus("unavailable");
      return;
    }
    started.current = true;
    try {
      hubspot.forms.create({
        portalId: newsletter.portalId,
        region: newsletter.region,
        formId,
        target: "#ali-brief-signup-form",
        onFormReady: () => setStatus("ready"),
      });
    } catch {
      setStatus("unavailable");
    }
  }

  return (
    <div>
      <Script
        id="ali-brief-hubspot-embed"
        src="https://js.hsforms.net/forms/embed/v2.js"
        strategy="afterInteractive"
        onReady={mountForm}
        onError={() => setStatus("unavailable")}
      />
      {status !== "ready" ? (
        <p role="status" className="mb-6 text-[15px] leading-relaxed text-charcoal">
          {status === "loading" ? "Loading newsletter signup…" : "Newsletter signup is temporarily unavailable. Please try again later."}
        </p>
      ) : null}
      <div id="ali-brief-signup-form" />
      <noscript><p>Please enable JavaScript to use the newsletter signup form.</p></noscript>
    </div>
  );
}
