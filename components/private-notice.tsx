import { ButtonLink } from "@/components/ui";

/**
 * Shown in place of sensitive details whenever `private` is true.
 */
export function PrivateNotice({
  kind = "residence",
  subject,
  className = "",
}: {
  kind?: "residence" | "development";
  /** Used to prefill the contact form's message. */
  subject?: string;
  className?: string;
}) {
  const href = `/contact?inquiry=${encodeURIComponent("Private access")}${
    subject ? `&subject=${encodeURIComponent(subject)}` : ""
  }`;
  return (
    <div className={`border-t hairline pt-10 ${className}`}>
      <p className="eyebrow">{kind === "development" ? "Private development" : "Private residence"}</p>
      <p className="display mt-4 text-[1.75rem] text-ink md:text-[2.25rem]">Details available upon request.</p>
      <p className="measure mt-5 text-[15px] leading-relaxed text-charcoal">
        Address, pricing and particulars are shared only with parties who have requested access and been introduced.
      </p>
      <ButtonLink href={href} className="mt-8">
        Request Private Access
      </ButtonLink>
    </div>
  );
}
