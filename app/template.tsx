import { ViewTransition } from "react";

/**
 * Re-mounts on every navigation, so wrapping the page in a <ViewTransition>
 * gives each route a real exit and enter animation (see globals.css).
 * Shared elements inside — hero images named in <Figure> — morph on their own.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
