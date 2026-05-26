import Image from "next/image";
import { assets } from "@/lib/assets";
import { copy } from "@/lib/copy";
import { SectionShell } from "@/components/ui/SectionShell";

export function Consequences() {
  return (
    <SectionShell
      title={copy.consequences.headline}
      className="consequences"
    >
      <p className="consequences__intro">{copy.consequences.intro}</p>
      <ul className="consequences__list">
        {copy.consequences.penalties.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="consequences__visual">
        <Image
          src={assets.plankLeft}
          alt=""
          width={800}
          height={400}
          className="consequences__plank"
        />
        <p className="consequences__closing">{copy.consequences.closing}</p>
      </div>
    </SectionShell>
  );
}
