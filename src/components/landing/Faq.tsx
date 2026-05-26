import { copy } from "@/lib/copy";
import { SectionShell } from "@/components/ui/SectionShell";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

export function Faq() {
  return (
    <SectionShell title={copy.faq.headline} className="faq-section">
      <FaqAccordion items={copy.faq.items} />
    </SectionShell>
  );
}
