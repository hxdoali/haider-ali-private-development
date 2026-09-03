/**
 * Re-mounts on every navigation so the page content fades in quietly.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
