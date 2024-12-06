import Features from "@/components/franchise-landing/Features";
import Header from "@/components/franchise-landing/Header";
import ListingTypes from "@/components/franchise-landing/ListingTypes";
import WhyJoin from "@/components/franchise-landing/WhyJoin";
import React from "react";

export const metadata = {
  title: "Be a Franchise | Idbook hotels™ - Grow Your Hotel Business with Us",
  description:
    "Join Idbook hotels™ as a franchise and grow your hotel business. Benefit from self-onboarding, easy operations, and increased revenue. Enjoy a simple 7-day setup process and increase your business by up to 70%. Sign up now and start managing real-time bookings with 24x7 support. Explore franchise and hotel listing opportunities.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white my-4 px-4 lg:px-28">
      <Header />
      <Features />
      <WhyJoin />
      <ListingTypes />
    </div>
  );
}
