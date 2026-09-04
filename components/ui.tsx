import Link from "next/link";
import type { ReactNode } from "react";

/** Small uppercase tracked label. */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

/** Section title: eyebrow above, large light serif below. */
export function SectionTitle({
  eyebrow,
  title,
  as: Tag = "h2",
  className = "",
  size = "md",
}: {
  eyebrow?: string;
  title: ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "text-[1.75rem] md:text-[2.25rem]",
    md: "text-[2.25rem] md:text-[3.25rem] lg:text-[3.75rem]",
    lg: "text-[2.75rem] md:text-[4.25rem] lg:text-[5.25rem]",
  }[size];
  return (
    <div className={className} data-reveal>
      {eyebrow ? <Eyebrow className="mb-4 md:mb-6">{eyebrow}</Eyebrow> : null}
      <Tag className={`display text-ink ${sizes}`}>{title}</Tag>
    </div>
  );
}

/** Paragraph stack with a comfortable measure. */
export function Prose({
  paragraphs,
  className = "",
  lede = false,
}: {
  paragraphs: readonly string[];
  className?: string;
  /** Set the first paragraph in the display serif. */
  lede?: boolean;
}) {
  return (
    <div className={`measure space-y-5 text-[15px] leading-[1.75] text-charcoal md:text-[16px] ${className}`} data-reveal>
      {paragraphs.map((p, i) => (
        <p key={i} className={lede && i === 0 ? "lede !mb-8" : undefined}>
          {p}
        </p>
      ))}
    </div>
  );
}

/** Quiet text link. */
export function TextLink({
  href,
  children,
  className = "",
  external = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const cls = `link-quiet text-[15px] text-ink ${className}`;
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/** Solid button-style link used for the primary call to action. */
export function ButtonLink({
  href,
  children,
  tone = "dark",
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: "dark" | "light" | "outline";
  className?: string;
}) {
  const tones = {
    dark: "bg-ink !text-bone [--sweep:var(--color-charcoal)]",
    light: "bg-bone !text-ink [--sweep:var(--color-linen)]",
    outline: "border border-ink !text-ink hover:!text-bone [--sweep:var(--color-ink)]",
  }[tone];
  return (
    <Link
      href={href}
      className={`eyebrow btn-sweep inline-flex min-h-12 items-center justify-center px-7 transition-colors duration-500 ${tones} ${className}`}
    >
      {children}
    </Link>
  );
}

/** Key / value list for facts. */
export function FactList({
  items,
  className = "",
  columns = 1,
}: {
  items: { label: string; value: ReactNode }[];
  className?: string;
  columns?: 1 | 2;
}) {
  const visible = items.filter((i) => i.value !== undefined && i.value !== null && i.value !== "");
  return (
    <dl className={`${columns === 2 ? "grid grid-cols-1 gap-x-10 sm:grid-cols-2" : ""} ${className}`}>
      {visible.map((item) => (
        <div key={item.label} className="flex flex-col gap-1 border-t hairline py-4">
          <dt className="eyebrow">{item.label}</dt>
          <dd className="text-[15px] text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Full-width hairline. */
export function Rule({ className = "" }: { className?: string }) {
  return <hr className={`hairline border-t ${className}`} />;
}

/** Standard vertical section spacing. */
export function Section({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`gutter py-20 md:py-36 ${className}`}>
      {children}
    </section>
  );
}
