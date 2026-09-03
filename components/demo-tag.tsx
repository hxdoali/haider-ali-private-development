/**
 * Small, discreet marker rendered on demonstration content.
 * Delete the `demo: true` flags in /data once real content is in place and
 * this disappears automatically.
 */
export function DemoTag({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center border border-clay px-2 py-1 font-sans text-[10px] uppercase tracking-[0.18em] text-ash ${className}`}
      title="Demonstration content — fictional placeholder"
    >
      Demo
    </span>
  );
}
