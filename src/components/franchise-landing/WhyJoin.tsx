import React from "react";
import Image from "next/image";

interface BenefitProps {
  icon: string;
  title: string;
  description: string;
}

const Benefit: React.FC<BenefitProps> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center">
    <Image
      src={`/franchise/${icon}`}
      alt={title}
      width={160}
      height={160}
      className="mb-4"
    />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-sm">{description}</p>
  </div>
);

const WhyJoin: React.FC = () => (
  <section className="bg-primary-700 dark:bg-primary-800 text-white py-16 px-8 rounded-lg">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Why join to the Idbook hotels
      </h2>
      <p className="text-center mb-12">
        Idbook is the hotel chain we will help you grow together and up to 70%
        increase your business.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Benefit
          icon="self-onboarding-icon.svg"
          title="Self Onboarding"
          description="Get your hotel listed on our Day 1 as soon as business grow starts"
        />
        <Benefit
          icon="business-growth-icon.svg"
          title="Business Growth"
          description="Increase your revenue through Idbook channels, OTAs and all enabled growth tools"
        />
        <Benefit
          icon="easy-operations-icon.svg"
          title="Easy Operations"
          description="Manage operations easily, realtime bookings across channels and 24x7x365 app and support system"
        />
      </div>
    </div>
  </section>
);

export default WhyJoin;
