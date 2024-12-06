"use client";

import React, { FC, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";

// Testimonials Data
const testimonials = [
  {
    id: 1,
    name: "Varsha Adhikari",
    content:
      "Idbook's corporate portal, expense tracking, and GST handling have made travel hassle-free for us.",
    image: "/corporate/testimonial/varsha_adhikari.png",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    content:
      "Had a seamless business trip to Mumbai, thanks to Idbook's travel portal.",
    image: "/corporate/testimonial/rajesh_kumar.png",
  },
  {
    id: 3,
    name: "Priya Shah",
    content: "Perfect weekend getaway to Goa. Everything was well-organized!",
    image: "/corporate/testimonial/priya_shah.png",
  },
  {
    id: 4,
    name: "Aman Verma",
    content:
      "Booked a family trip to Manali. Smooth process and great service!",
    image: "/corporate/testimonial/aman_verma.png",
  },
  {
    id: 5,
    name: "Ravi Patel",
    content: "Amazing deals on hotels. Highly recommended for frequent flyers.",
    image: "/corporate/testimonial/ravi_patel.png",
  },
];

const SectionClientSay: FC = () => {
  const [index, setIndex] = useState(1);

  const changeItem = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < testimonials.length) {
      setIndex(newIndex);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => changeItem(index + 1),
    onSwipedRight: () => changeItem(index - 1),
  });

  const isPrevDisabled = index === 0;
  const isNextDisabled = index === testimonials.length - 1;
  const currentTestimonial = testimonials[index];

  return (
    <div
      className="relative min-h-screen flex items-center justify-center 
      px-4 py-8 md:px-8 bg-gray-50 dark:bg-neutral-900 transition-colors"
    >
      <div
        className="relative bg-white dark:bg-neutral-800 text-neutral-900 
        dark:text-white shadow-lg rounded-3xl max-w-4xl w-full p-6 md:p-10"
      >
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 md:mb-12">
          Stories from those who love us
        </h2>

        {/* Testimonial Section */}
        <div
          className="relative flex items-center justify-center lg:justify-between"
          {...handlers}
        >
          {/* Left Navigation Button */}
          <button
            onClick={() => changeItem(index - 1)}
            disabled={isPrevDisabled}
            className={`absolute -left-12 md:left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-lg transition ${
              isPrevDisabled
                ? "bg-gray-300 dark:bg-neutral-700 cursor-not-allowed"
                : "bg-gradient-to-r from-[#1D498D] to-[#3C65A4] text-white"
            }`}
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>

          {/* Testimonial Content */}
          <div className="text-center max-w-xl mx-auto space-y-4">
            <div className="flex justify-center">
              <Image
                src="/corporate/testimonial/quote_open.svg"
                alt="quote open"
                width={24}
                height={24}
                className="mb-2"
              />
            </div>
            <p className="text-lg md:text-xl">{currentTestimonial.content}</p>
            <div className="flex justify-center">
              <Image
                src="/corporate/testimonial/quote_close.svg"
                alt="quote close"
                width={24}
                height={24}
              />
            </div>
            <p className="text-xl font-semibold mt-2">
              {currentTestimonial.name}
            </p>
          </div>

          {/* Right Navigation Button */}
          <button
            onClick={() => changeItem(index + 1)}
            disabled={isNextDisabled}
            className={`absolute -right-12 md:right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-lg transition ${
              isNextDisabled
                ? "bg-gray-300 dark:bg-neutral-700 cursor-not-allowed"
                : "bg-gradient-to-r from-[#1D498D] to-[#3C65A4] text-white"
            }`}
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center mt-6 space-x-2">
          {testimonials.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition ${
                i === index
                  ? "w-5 h-5 md:w-6 md:h-6 bg-gradient-to-r from-[#1D498D] to-[#3C65A4]"
                  : "bg-gray-300 dark:bg-neutral-600"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionClientSay;
