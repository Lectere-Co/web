import { HeroSection } from "@/components/HeroSection";
import { ProblemSection } from "@/components/ProblemSection";
import { WhatIsLectere } from "@/components/WhatIsLectere";
import { FinalCTA } from "@/components/FinalCTA";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <WhatIsLectere />
      <FinalCTA />
    </>
  );
}
