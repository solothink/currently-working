import SectionHero from "@/components/Corporate/SectionHero";
import BgGlassmorphism from "@/components/BgGlassmorphism";
import React from "react";

export default function CorporateBookingPage() {
  return (
    <main className="nc-PageHome relative overflow-hidden">
      <BgGlassmorphism />

      <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28 min-h-screen">
        <SectionHero />
      </div>
    </main>
  );
}
