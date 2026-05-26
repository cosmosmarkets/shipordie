import Image from "next/image";
import { assets } from "@/lib/assets";
import { copy } from "@/lib/copy";
import { SectionShell } from "@/components/ui/SectionShell";
import { PirateButton } from "@/components/ui/PirateButton";

const stepImages = [assets.step1, assets.step2, assets.step3];

export function HowItWorks() {
  return (
    <SectionShell title={copy.howItWorks.headline} className="how-it-works">
      <div className="steps-grid">
        {copy.howItWorks.steps.map((step, i) => (
          <article key={step.number} className="step-card">
            <p className="step-card__label">step {step.number}</p>
            <h3 className="step-card__title">{step.title}</h3>
            <p className="step-card__intro">{step.intro}</p>
            <ul className="step-card__bullets">
              {step.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <div className="step-card__media">
              <Image
                src={stepImages[i]}
                alt=""
                width={640}
                height={400}
                className="step-card__img"
              />
            </div>
          </article>
        ))}
      </div>
      <div className="section-cta-row">
        <PirateButton href="#pricing">{copy.howItWorks.cta}</PirateButton>
      </div>
    </SectionShell>
  );
}
