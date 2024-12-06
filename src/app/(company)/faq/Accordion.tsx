"use client";
import React from "react";
import { FaChevronDown } from "react-icons/fa";

interface FAQItem {
  question: string;
  answer: string;
}

export const Accordion: React.FC<{ item: FAQItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <button
        className={`flex justify-between items-center w-full py-6 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg p-4 `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-primary-600 dark:text-primary-400 font-semibold text-lg">
          {item.question}
        </span>
        <FaChevronDown
          className={`w-6 h-6 text-primary-500 dark:text-primary-300 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="pb-6 pt-2 px-4 text-left text-gray-700 dark:text-gray-300">
          <p>{item.answer}</p>
        </div>
      )}
    </div>
  );
};
