import type { ReactNode } from "react";

/**
 * Splits a string into words (or letters) so each can rise into place from
 * behind an invisible line. Pure markup; the motion lives in globals.css.
 *
 *  - `mode="load"`   animates on page load (heroes, page titles).
 *  - `mode="scroll"` waits for the element to scroll into view; pair it with
 *                    data-reveal="text" on the same element.
 *
 * Anything that is not a plain string is rendered untouched.
 */
export function SplitText({
  text,
  by = "word",
  mode = "load",
  delay = 0,
  className = "",
  as: Tag = "span",
}: {
  text: ReactNode;
  by?: "word" | "char";
  mode?: "load" | "scroll";
  /** Seconds before the first word moves (load mode). */
  delay?: number;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}) {
  if (typeof text !== "string") return <Tag className={className}>{text}</Tag>;

  const parts = by === "char" ? Array.from(text) : text.split(/(\s+)/);
  let i = 0;
  return (
    <Tag
      className={`split ${mode === "load" ? "split-load" : "split-scroll"} ${className}`}
      style={mode === "load" ? ({ "--d": `${delay}s` } as React.CSSProperties) : undefined}
      aria-label={text}
    >
      {parts.map((part, k) => {
        if (/^\s+$/.test(part)) return " ";
        if (part === "") return null;
        const idx = i++;
        return (
          <span key={k} className="w" aria-hidden="true">
            <span className="wi" style={{ "--i": idx } as React.CSSProperties}>
              {part === " " ? " " : part}
            </span>
          </span>
        );
      })}
    </Tag>
  );
}
