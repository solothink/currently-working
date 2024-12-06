import React, { FC } from "react";
import { Metadata } from "next";
import PricingSection from "./components/PricingSection";
import { PricingItem } from "./types";

export const metadata: Metadata = {
  title: "Become a Pro | Subscribe to Idbook hotels™ Services",
  description:
    "Unlock your potential with Idbook hotels™! Subscribe to our 'Become a Pro' service and gain access to exclusive resources, expert travel insights, and professional tips to elevate your travel experience. Join our community of travel enthusiasts and professionals dedicated to exploring the world with confidence and style. Subscribe now to take your travel game to the next level!",
};

export interface PageSubscriptionProps {}

const pricings: PricingItem[] = [
  {
    isPopular: false,
    name: "Starter",
    monthlyPricing: "₹199",
    yearlyPricing: "₹1099",
    features: ["Valid only in hotels booking", "Up to 15% off on every booking", "Basic support"],
    desc: `Perfect for occasional travelers.`,
  },
  {
    isPopular: true,
    name: "Pro",
    monthlyPricing: "₹499",
    yearlyPricing: "₹2099",
    features: [
      "Valid on hotels booking and holiday packages",
      "500 wallet money",
      "Up to 30% off on every booking",
      "Assured cash-back on every 3rd booking",
      "Premium Support",
    ],
    desc: `Ideal for frequent travelers and holiday enthusiasts.`,
  },
  {
    isPopular: false,
    name: "Plus",
    monthlyPricing: "₹299",
    yearlyPricing: "₹1599",
    features: [
      "Valid only holiday packages",
      "200 wallet money",
      "Up to 20% off on every booking",
      "Assured cash-back on every 5th booking",
      "Standard support",
    ],
    desc: `Great for holiday package lovers.`,
  },
];

const PageSubscription: FC<PageSubscriptionProps> = () => {
  return (
    <div className={`nc-PageSubscription container pb-24 lg:pb-32 `}>
      <header className="text-center max-w-2xl mx-auto my-20">
        <h2 className="flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          <span className="mr-4 text-3xl md:text-4xl leading-none">💎</span>
          Subscription
        </h2>
        <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
        Choose the perfect plan for your travel needs
        </span>
      </header>
      <PricingSection pricings={pricings} />
    </div>
  );
};

export default PageSubscription;

