"use client";

import CorporateFeatureCard from "./CorporateFeatureCard";

const services = [
  { icon: "/corporate/earth.svg", title: "50", subtitle: "Countries" },
  { icon: "/corporate/cities.svg", title: "500+", subtitle: "Cities and" },
  { icon: "/corporate/hotel.svg", title: "1500+", subtitle: "Hotels" },
  {
    icon: "/corporate/flight.svg",
    title: "50,000+",
    subtitle: "Holiday Package",
  },
];

export default function CorporateFeatureSection() {
  return (
    <div className="py-20 px-4 md:px-8">
      {/* Header Text */}
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-16 text-gray-900 dark:text-white">
        Idbook Hotel is offering special innovating Hospitality solutions to
        ease their business travel
      </h2>

      {/* Services Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-8 ">
        {services.map((service, index) => (
          <CorporateFeatureCard
            key={index}
            icon={service.icon}
            title={service.title}
            subtitle={service.subtitle}
            isGradient={index === 1}
          />
        ))}
      </section>
    </div>
  );
}
