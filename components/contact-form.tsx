"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { site } from "@/data/site";
import type { InquiryType } from "@/lib/types";

const INQUIRY_TYPES: InquiryType[] = [
  "General inquiry",
  "Private access",
  "Developer representation",
  "Development advisory",
  "Residence inquiry",
  "Investor / family office",
  "Press",
];

const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";
const ACCESS_KEY = process.env.NEXT_PUBLIC_FORM_ACCESS_KEY ?? "";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Contact form. Posts to a free form endpoint (Formspree or Web3Forms) when
 * NEXT_PUBLIC_FORM_ENDPOINT is set; otherwise falls back to a mailto link so
 * the form is never dead. No server, no database, no paid service.
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

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    // Honeypot: bots fill hidden fields; humans never see this one.
    if (String(fd.get("company_website") ?? "").length > 0) {
      setStatus("sent");
      return;
    }

    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      company: String(fd.get("company") ?? "").trim(),
      inquiryType: String(fd.get("inquiryType") ?? ""),
      message: String(fd.get("message") ?? "").trim(),
      regarding: subject,
    };

    if (!ENDPOINT) {
      // Fallback: open the visitor's mail client with everything filled in.
      const body = [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Phone: ${payload.phone}`,
        `Company: ${payload.company}`,
        `Inquiry type: ${payload.inquiryType}`,
        payload.regarding ? `Regarding: ${payload.regarding}` : "",
        "",
        payload.message,
      ]
        .filter((l) => l !== undefined)
        .join("\n");
      const mailto = `mailto:${site.contact.email}?subject=${encodeURIComponent(
        `${payload.inquiryType} — ${site.wordmark}`,
      )}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
      setStatus("sent");
      return;
    }

    setStatus("sending");
    setError("");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...payload,
          // Formspree reads these two; Web3Forms reads access_key + subject.
          _subject: `${payload.inquiryType} — ${site.wordmark}`,
          _replyto: payload.email,
          subject: `${payload.inquiryType} — ${site.wordmark}`,
          ...(ACCESS_KEY ? { access_key: ACCESS_KEY } : {}),
        }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
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
        <p className="display mt-4 text-[1.75rem] text-ink md:text-[2.25rem]">Thank you. We will be in touch.</p>
        <p className="measure mt-4 text-[15px] text-charcoal">
          Inquiries are answered personally, usually within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8" noValidate={false}>
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
        <label htmlFor="message" className="eyebrow">
          Message
        </label>
        <textarea id="message" name="message" rows={5} required className="field" />
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
          {status === "sending" ? "Sending" : "Send"}
        </button>
        <p className="text-[12px] leading-relaxed text-ash">
          Your details are used only to respond to this inquiry.
          {!ENDPOINT ? " Sending opens your email client." : ""}
        </p>
      </div>

      {status === "error" ? (
        <p role="alert" className="text-[14px] text-charcoal">
          The message could not be sent ({error}). Please email{" "}
          <a href={`mailto:${site.contact.email}`} className="link-quiet">
            {site.contact.email}
          </a>{" "}
          directly.
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
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="field"
      />
    </div>
  );
}
