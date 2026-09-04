"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { site } from "@/data/site";
import type { InquiryType } from "@/lib/types";

const INQUIRY_TYPES: InquiryType[] = [
  "General inquiry",
  "Residence inquiry",
  "Private access",
  "Developer representation",
  "Development advisory",
  "Investor / family office",
  "Press",
];

const TIMING = ["As soon as possible", "Within the month", "In the next few months", "Just beginning to look"];

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Inquiry form. Posts to /api/inquiry, which emails the office and sends
 * the visitor an acknowledgement. Nothing opens the visitor's mail app.
 */
export function ContactForm() {
  const params = useSearchParams();
  const initialInquiry = useMemo<InquiryType>(() => {
    const q = params.get("inquiry");
    return (INQUIRY_TYPES as string[]).includes(q ?? "") ? (q as InquiryType) : "General inquiry";
  }, [params]);
  const subject = params.get("subject") ?? "";

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const [sentTo, setSentTo] = useState<{ name: string; regarding: string }>({ name: "", regarding: "" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      company: String(fd.get("company") ?? "").trim(),
      inquiryType: String(fd.get("inquiryType") ?? ""),
      timing: String(fd.get("timing") ?? ""),
      message: String(fd.get("message") ?? "").trim(),
      regarding: subject,
      company_website: String(fd.get("company_website") ?? ""),
    };

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error === "not-configured" ? "Inquiry delivery is not set up yet." : body.error || `Request failed (${res.status})`);
      }
      setSentTo({ name: payload.name.split(/\s+/)[0], regarding: subject });
      form.reset();
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div className="border-t hairline pt-10" role="status" aria-live="polite">
        <p className="eyebrow">Received</p>
        <p className="display mt-4 text-[1.9rem] leading-[1.1] text-ink md:text-[2.5rem]">
          Thank you{sentTo.name ? `, ${sentTo.name}` : ""}.
        </p>
        <p className="lede mt-6 max-w-[30rem]">
          Your inquiry{sentTo.regarding ? ` about ${sentTo.regarding}` : ""} has reached us. It will be answered
          personally, usually within one business day, and a note confirming it has been sent to your email.
        </p>
        <p className="mt-8 text-[15px] text-charcoal">
          If it is time-sensitive, call{" "}
          <a href={site.contact.phoneHref} className="link-quiet text-ink">
            {site.contact.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {subject ? (
        <p className="eyebrow border-t hairline pt-6">
          Regarding <span className="text-ink normal-case tracking-normal">{subject}</span>
        </p>
      ) : null}

      <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" required />
        <Field label="Email" name="email" type="email" autoComplete="email" required inputMode="email" />
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" />
        <Field label="Company" name="company" autoComplete="organization" />
      </div>

      <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="inquiryType" className="eyebrow">
            Inquiry type
          </label>
          <select id="inquiryType" name="inquiryType" defaultValue={initialInquiry} className="field">
            {INQUIRY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="timing" className="eyebrow">
            Timing
          </label>
          <select id="timing" name="timing" defaultValue={TIMING[0]} className="field">
            {TIMING.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="eyebrow">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="field"
          placeholder={subject ? `Tell us what you would like to know about ${subject}.` : "Tell us a little about what you are looking for."}
        />
      </div>

      {/* Honeypot — hidden from people, tempting to bots. */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="company_website">Company website</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-5 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="eyebrow inline-flex min-h-12 items-center justify-center bg-ink px-8 !text-bone transition-colors duration-300 hover:bg-charcoal disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send inquiry"}
        </button>
        <p className="text-[12px] leading-relaxed text-ash">Answered personally. Your details are used only to respond.</p>
      </div>

      {status === "error" ? (
        <p role="alert" className="text-[14px] text-charcoal">
          {error} Please call{" "}
          <a href={site.contact.phoneHref} className="link-quiet">
            {site.contact.phone}
          </a>{" "}
          or write to{" "}
          <a href={`mailto:${site.contact.email}`} className="link-quiet">
            {site.contact.email}
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
  inputMode,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "email" | "tel" | "text";
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="eyebrow">
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <input id={name} name={name} type={type} required={required} autoComplete={autoComplete} inputMode={inputMode} className="field" />
    </div>
  );
}
