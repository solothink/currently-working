"use client";

import React, { useState } from "react";
import Image from "next/image";
import ButtonPrimary from "@/shared/ButtonPrimary";

interface ListingTypeProps {
  icon: string;
  title: string;
  subtitle: string;
  guarantee: string;
  description: React.ReactNode;
}

const ListingType: React.FC<ListingTypeProps> = ({
  icon,
  title,
  subtitle,
  guarantee,
  description,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col items-center text-center">
      <Image
        src={`/franchise/${icon}`}
        alt={title}
        width={300}
        height={300}
        className="mb-6"
      />
      <h3 className="text-2xl font-bold mb-2 text-primary-800 dark:text-primary-200 px-4 sm:px-8">
        {title}
      </h3>
      <p className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300 px-4 sm:px-8">
        {subtitle}
      </p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-sm text-primary-600 dark:text-primary-400 mb-4 flex items-center px-4 sm:px-8"
      >
        {guarantee}
        <svg
          className={`w-4 h-4 ml-1 transform ${isExpanded ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-[1000px]" : "max-h-0"} px-4 sm:px-8 text-left w-full`}
      >
        {description}
      </div>
      <div className="mt-6 mb-6 w-full px-6">
        <ButtonPrimary href="/hotelier/signup" className="w-full">
          Sign-up
        </ButtonPrimary>
      </div>
    </div>
  );
};

const ListingTypes: React.FC = () => (
  <section className="py-16 px-8 rounded-lg">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-12 text-center text-primary-800 dark:text-primary-200">
        Idbook Listing Works Two Types
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <ListingType
          icon="franchise-hotel-icon.svg"
          title="Franchise Hotel Listing"
          subtitle="Franchise ( ₹10 Lakh cost valid for 5 years )"
          guarantee="70% Occupancy Guaranteed"
          description={
            <ol className="text-left list-decimal pl-6 mb-4 text-gray-600 dark:text-gray-300">
              <li>Idbook listing on top search</li>
              <li>Official website</li>
              <li>
                Hotels branding (flex light board, wall and reception, branded
                t-shirt to staff, Id card, bedsheet, pillow cover)
              </li>
              <li>Toiletry kit (around 10 items for the use)</li>
              <li>Google my business</li>
              <li>Social media promotion</li>
              <li>Offline and b2b sales</li>
              <li>Hotel will be recommended for holiday package bookings</li>
              <li>Group bookings and marriage function bookings</li>
            </ol>
          }
        />
        <ListingType
          icon="normal-hotel-icon.svg"
          title="Normal Hotel Listing"
          subtitle="Standard Listing"
          guarantee="100 Bookings Monthly"
          description={
            <ol className="text-left list-decimal pl-6 mb-4 text-gray-600 dark:text-gray-300">
              <li>Hotel listing with Idbook</li>
              <li>Official website</li>
            </ol>
          }
        />
      </div>
    </div>
  </section>
);

export default ListingTypes;
