"use client";

import Image from "next/image";
import { FC } from "react";

interface CorporateFeatureCardProps {
  icon: string; // Path to the icon image
  title: string;
  subtitle: string;
  isGradient?: boolean; // New prop to determine background style
}

const CorporateFeatureCard: FC<CorporateFeatureCardProps> = ({
  icon,
  title,
  subtitle,
  isGradient = false,
}) => {
  return (
    <div
      className={`relative rounded p-6 pt-12 mt-16 shadow-md flex flex-col items-center
        transition-colors duration-300
        ${
          isGradient
            ? " bg-corporate-gradient "
            : " bg-[#ECF6F8] dark:bg-neutral-800 "
        }`}
    >
      {/* Floating Icon */}
      <div
        className="absolute -top-10 w-20 h-20 rounded-full bg-white dark:bg-neutral-700 
        border-4 border-white dark:border-neutral-700 shadow-lg flex items-center justify-center"
      >
        <Image
          src={icon}
          alt={subtitle}
          width={40}
          height={40}
          className="object-contain"
        />
      </div>

      {/* Title and Subtitle */}
      <p
        className={`text-2xl font-bold         ${
          isGradient ? "text-white" : "text-gray-900 dark:text-white"
        }  mt-6`}
      >
        {title}
      </p>
      <p
        className={`text-sm text-center  ${
          isGradient ? "text-white" : "text-gray-600 dark:text-gray-300 "
        } mt-2`}
      >
        {subtitle}
      </p>
    </div>
  );
};

export default CorporateFeatureCard;
