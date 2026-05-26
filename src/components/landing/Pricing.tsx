import { copy } from "@/lib/copy";
import { SectionShell } from "@/components/ui/SectionShell";
import { PirateButton } from "@/components/ui/PirateButton";

export function Pricing() {
  return (
    <SectionShell
      id="pricing"
      eyebrow={copy.pricing.eyebrow}
      title={copy.pricing.headline}
      className="pricing"
    >
      <div className="pricing__card">
        <div className="pricing__price">
          <span className="pricing__was">${copy.pricing.was}</span>
          <span className="pricing__now">${copy.pricing.now}</span>
          <span className="pricing__type">{copy.pricing.type}</span>
        </div>
        <ul className="pricing__includes">
          {copy.pricing.includes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="pricing__warning">{copy.pricing.warning}</p>
        <PirateButton
          aria-disabled
          disabled
          title={copy.pricing.demoNote}
          className="pricing__cta pricing__cta--disabled"
        >
          {copy.pricing.cta}
        </PirateButton>
        <p className="pricing__demo">{copy.pricing.demoNote}</p>
      </div>
      <div className="tier-ladder">
        {copy.pricing.tiers.map((tier) => (
          <div
            key={tier.price}
            className={`tier-ladder__item${"active" in tier && tier.active ? " tier-ladder__item--active" : ""}${"soldOut" in tier && tier.soldOut ? " tier-ladder__item--sold" : ""}`}
          >
            <span className="tier-ladder__price">${tier.price}</span>
            <span className="tier-ladder__label">{tier.label}</span>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
