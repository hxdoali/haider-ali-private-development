import { PageIntro } from "@/components/page-intro";
import { TextLink } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <PageIntro
        eyebrow="404"
        title="This page is not available."
        intro={<p>It may have been withdrawn, or the address may be incomplete.</p>}
        aside={<TextLink href="/">Return home</TextLink>}
      />
      <div className="min-h-[30vh]" />
    </>
  );
}
