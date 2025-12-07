import { Hero } from "@/components/marketing/Hero";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { ScanModes } from "@/components/marketing/ScanModes";
import { Pricing } from "@/components/marketing/Pricing";
import { FAQ } from "@/components/marketing/FAQ";
import { Privacy } from "@/components/marketing/Privacy";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <ScanModes />
      <Pricing />
      <FAQ />
      <Privacy />
    </>
  );
}
