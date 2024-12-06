import rightImg from "@/images/about-hero-right.png";
import React, { FC } from "react";
import SectionFounder from "./SectionFounder";
import SectionStatistic from "./SectionStatistic";
import SectionHero from "./SectionHero";
import BgGlassmorphism from "@/components/BgGlassmorphism";
import BackgroundSection from "@/components/BackgroundSection";
import SectionClientSay from "@/components/SectionClientSay";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import { Metadata } from "next";
import VisionMission from "@/app/(client-components)/(Home)/VisionMission";

export const metadata: Metadata = {
  title: "About Us | Idbook Hospitality™",
  description:
    "Discover Idbook Hospitality Private Limited, a leading hospitality solutions provider in India. With over 500 hotels and 10,000 rooms, we offer innovative solutions for business and leisure travelers. Explore our commitment to cost-effective stays, flexibility with hourly hotels, and exceptional customer experiences across India and beyond.",
};

export interface PageAboutProps {}

const PageAbout: FC<PageAboutProps> = ({}) => {
  return (
    <div className={`nc-PageAbout overflow-hidden relative`}>
      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />

      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
        <SectionHero
          rightImg={rightImg}
          heading="👋 About Us."
          btnText=""
          subHeading="Idbook Hospitality Private Limited is a leading hospitality solutions provider in India, offering personalized and innovative solutions for business and leisure travellers. With a chain of 500+ hotels and 10,000+ rooms, we ensure perfection at any holiday destination across India, Nepal, Bhutan, Sri Lanka, Maldives, Singapore, Malaysia, Vietnam, Bali, Europe, Turkey, and Thailand. We focus on cost-effective stays and flexibility with our trend of hourly hotels, striving to enhance customer experiences."
        />
        <VisionMission />

        <SectionFounder />
        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionClientSay />
        </div> */}

        <SectionStatistic />

        {/* <SectionSubscribe2 /> */}
      </div>
    </div>
  );
};

export default PageAbout;
