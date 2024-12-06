import React from "react";
import Image from "next/image";
import IdbookPromise from "./IdbookPromise";
import ThereIsMore from "./IdbookFeatures";
import HassleFreeGST from "./HasselFreeGST";
import SectionClientSay from "./ClientSay";
import CorporateHeroSection from "./CorporateHeroSection";
import CorporateFeatureSection from "./CorporateFeatureSection";
import CorporateLoginCTA from "./CorporateCTA";
import CorporateClients from "./HappyCustomers";

const Corporates: React.FC = () => {
  return (
    <div>
      <div className="w-full max-w-7xl mx-auto px-4 py-8 dark:bg-gray-900 dark:text-white">
        {/* Hero Section */}

        <CorporateHeroSection />
        <CorporateFeatureSection />
        <IdbookPromise />
        <ThereIsMore />
        <HassleFreeGST />
        <SectionClientSay />
        <CorporateLoginCTA />
        <CorporateClients />
      </div>
    </div>
  );
};

export default Corporates;
