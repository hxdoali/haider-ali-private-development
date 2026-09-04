import { ViewTransition } from "react";

/**
 * Re-mounts on every navigation. The tiny marker below mounts and unmounts
 * with it, which is enough to start a view transition on every route change
 * without snapshotting the whole page: the browser then crossfades the
 * viewport (see ::view-transition-old(root) in globals.css) while any shared
 * hero image morphs on its own. Cheap on phones, which a full-page snapshot
 * was not.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ViewTransition enter="route" exit="route" default="none">
        <span aria-hidden="true" className="pointer-events-none fixed left-0 top-0 h-px w-px opacity-0" />
      </ViewTransition>
      {children}
    </>
  );
}
