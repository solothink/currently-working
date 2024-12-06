import React, { FC } from "react";

interface PricingSwitchProps {
  isYearly: boolean;
  onChange: (isYearly: boolean) => void;
}

const PricingSwitch: FC<PricingSwitchProps> = ({ isYearly, onChange }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="relative inline-flex bg-neutral-100 rounded-full p-1 dark:bg-neutral-800">
        <button
          className={`relative px-4 py-2 rounded-full transition-all duration-300 ease-in-out ${
            !isYearly
              ? "text-white"
              : "text-neutral-700 dark:text-neutral-300"
          }`}
          onClick={() => onChange(false)}
        >
          
          {!isYearly && (
            <span className="absolute inset-0 bg-primary-500 rounded-full transition-all duration-300 ease-in-out"></span>
          )}
          <span className="relative z-10">Monthly</span>
        </button>
        <button
          className={`relative px-4 py-2 rounded-full transition-all duration-300 ease-in-out ${
            isYearly
              ? "text-white"
              : "text-neutral-700 dark:text-neutral-300"
          }`}
          onClick={() => onChange(true)}
        >
          {isYearly && (
            <span className="absolute inset-0 bg-primary-500 rounded-full transition-all duration-300 ease-in-out"></span>
          )}
          <span className="relative z-10">Yearly</span>
        </button>
      </div>
    </div>
  );
};

export default PricingSwitch;

