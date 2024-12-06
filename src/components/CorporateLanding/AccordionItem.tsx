"use client";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface AccordionItemProps {
  title: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        className="w-full p-4 text-left flex justify-between items-center bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-primary-700 dark:text-primary-300 font-medium">
          {title}
        </span>
        <FaChevronDown
          className={`text-primary-500 transition-transform transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="p-4 bg-gray-50 dark:bg-gray-700">
          <p className="text-gray-600 dark:text-gray-300">
            Detailed information about {title.toLowerCase()} goes here.
          </p>
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
