import { Hero } from "@/components/landing/Hero";
import { ProblemScroll } from "@/components/landing/ProblemScroll";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Consequences } from "@/components/landing/Consequences";
import { Founders } from "@/components/landing/Founders";
import { StatsStrip } from "@/components/landing/StatsStrip";
import { Pricing } from "@/components/landing/Pricing";
import { Faq } from "@/components/landing/Faq";
import { Community } from "@/components/landing/Community";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { MobileCta } from "@/components/landing/MobileCta";

export default function Home() {
  return (
    <>
      <main id="main">
        <Hero />
        <ProblemScroll />
        <HowItWorks />
        <Consequences />
        <Founders />
        <StatsStrip />
        <Pricing />
        <Faq />
        <Community />
      </main>
      <SiteFooter />
      <MobileCta />
    </>
  );
}
