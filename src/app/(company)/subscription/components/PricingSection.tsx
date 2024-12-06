'use client'

import React, { FC, useState } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import PricingSwitch from "./PricingSwitch";
import { PricingItem } from "../types";

interface PricingSectionProps {
  pricings: PricingItem[];
}

const PricingSection: FC<PricingSectionProps> = ({ pricings }) => {
  const [isYearly, setIsYearly] = useState(false);

  const renderPricingItem = (pricing: PricingItem, index: number) => {
    return (
      <div
        key={index}
        className={`h-full relative px-6 py-8 rounded-3xl border-2 flex flex-col overflow-hidden ${
          pricing.isPopular
            ? "border-primary-500"
            : "border-neutral-100 dark:border-neutral-700"
        }`}
      >
        {pricing.isPopular && (
          <span className="bg-primary-500 text-white px-3 py-1 tracking-widest text-xs absolute right-3 top-3 rounded-full z-10">
            POPULAR
          </span>
        )}
        <div className="mb-8">
          <h3 className="block text-sm uppercase tracking-widest text-neutral-6000 dark:text-neutral-300 mb-2 font-medium">
            {pricing.name}
          </h3>
          <h2 className="text-5xl leading-none flex items-center text-neutral-900 dark:text-neutral-300">
            <span>{isYearly ? pricing.yearlyPricing : pricing.monthlyPricing}</span>
            <span className="text-lg ml-1 font-normal text-neutral-500">
              {isYearly ? "/year" : "/mo"}
            </span>
          </h2>
        </div>
        <nav className="space-y-4 mb-8">
          {pricing.features.map((item, index) => (
            <li className="flex items-center" key={index}>
              <span className="mr-4 inline-flex flex-shrink-0 text-primary-6000">
                <CheckIcon className="w-5 h-5" aria-hidden="true" />
              </span>
              <span className="text-neutral-700 dark:text-neutral-300">
                {item}
              </span>
            </li>
          ))}
        </nav>
        <div className="flex flex-col mt-auto">
          {pricing.isPopular ? (
            <ButtonPrimary>Submit</ButtonPrimary>
          ) : (
            <ButtonSecondary>
              <span className="font-medium">Submit</span>
            </ButtonSecondary>
          )}
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-3">
            {pricing.desc}
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      <PricingSwitch isYearly={isYearly} onChange={setIsYearly} />
      <section className="text-neutral-600 text-sm md:text-base overflow-hidden">
        <div className="grid lg:grid-cols-3 gap-5 xl:gap-8">
          {pricings.map(renderPricingItem)}
        </div>
      </section>
    </>
  );
};

export default PricingSection;

