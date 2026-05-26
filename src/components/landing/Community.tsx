import Image from "next/image";
import { assets } from "@/lib/assets";
import { copy } from "@/lib/copy";
import { crewMembers } from "@/lib/site-data";
import { SectionShell } from "@/components/ui/SectionShell";

export function Community() {
  return (
    <SectionShell
      id="community"
      title={copy.community.headline}
      className="community"
    >
      <p className="community__sub">{copy.community.subcopy}</p>
      <div className="community__deck-wrap">
        <Image
          src={assets.crewDeck}
          alt="Pixel art ship with crew on deck"
          width={1200}
          height={700}
          className="community__deck"
        />
      </div>
      <ul className="crew-chips" aria-label="Crew members">
        {crewMembers.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <a href="#community" className="community__link">
        {copy.community.viewCrew}
      </a>
    </SectionShell>
  );
}
