import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Story } from "@/components/sections/Story";
import { ScentPyramid } from "@/components/sections/ScentPyramid";
import { CraftVessel } from "@/components/sections/CraftVessel";
import { SocialProof } from "@/components/sections/SocialProof";
import { OfferBuy } from "@/components/sections/OfferBuy";
import { GuaranteeFaq } from "@/components/sections/GuaranteeFaq";
import { FinalCtaFooter } from "@/components/sections/FinalCtaFooter";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Story />
        <ScentPyramid />
        <CraftVessel />
        <SocialProof />
        <OfferBuy />
        <GuaranteeFaq />
        <FinalCtaFooter />
      </main>
    </>
  );
}
