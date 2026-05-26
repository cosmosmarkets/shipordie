import { copy } from "@/lib/copy";
import { PirateButton } from "@/components/ui/PirateButton";

export function MobileCta() {
  return (
    <div className="mobile-cta" aria-hidden={false}>
      <PirateButton href="#pricing">{copy.nav.cta}</PirateButton>
    </div>
  );
}
