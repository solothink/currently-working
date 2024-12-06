"use client";

import React from "react";
import {
  Clock,
  CalendarCheck,
  Globe,
  CreditCard,
  Percent,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ServiceFeature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  gradient: string;
  dotPattern: boolean;
}

const features: ServiceFeature[] = [
  {
    icon: Clock,
    title: "Hourly Room Bookings",
    description:
      "Pay only for the hours you stay, perfect for short stays and layovers",
    gradient:
      "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/30",
    dotPattern: true,
  },
  {
    icon: CalendarCheck,
    title: "Flexible Check-in & Check-out",
    description: "24/7 check-in and check-out, accommodating your schedule",
    gradient:
      "from-yellow-50 to-amber-100 dark:from-yellow-900/20 dark:to-amber-900/30",
    dotPattern: false,
  },
  {
    icon: CreditCard,
    title: "Cost-Effective Stays",
    description: "Enjoy quality accommodations without paying for unused time",
    gradient:
      "from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/30",
    dotPattern: false,
  },
  {
    icon: Percent,
    title: "Affordable Luxury",
    description: "Experience comfort and quality at budget-friendly prices",
    gradient:
      "from-rose-50 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/30",
    dotPattern: true,
  },
  {
    icon: Award,
    title: "Vacation Perfection Warranty",
    description:
      "We guarantee a perfect stay at any of our holiday destinations",
    gradient:
      "from-orange-50 to-red-100 dark:from-orange-900/20 dark:to-red-900/30",
    dotPattern: false,
  },
];

export default function ServicesSection() {
  const settings = {
    dots: false,
    infinite: true,
    centerMode: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "40px",
        },
      },
    ],
  };

  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-display font-bold text-primary-800 dark:text-primary-100 mb-4"
          >
            Why Choose Idbook Hotels?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-primary-600 dark:text-primary-300"
          >
            Revolutionizing the hotel industry with flexible, affordable stays
          </motion.p>
        </div>

        <Slider {...settings} className="">
          {features.map((feature, index) => (
            <div key={index} className="px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`relative group rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden bg-gradient-to-br ${feature.gradient}`}
                style={{
                  height: "400px",
                  width: "100%",
                  maxWidth: "300px",
                  margin: "0 auto",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {feature.dotPattern && (
                  <div className="absolute inset-0 opacity-10">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)",
                        backgroundSize: "16px 16px",
                      }}
                    />
                  </div>
                )}
                <div className="relative flex flex-col h-full">
                  <div className="mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-white dark:bg-white/10 transform -rotate-6" />
                      <feature.icon className="relative w-12 h-12 text-primary-600 dark:text-primary-400" />
                    </div>
                  </div>
                  <h3 className="text-xl font-display font-semibold text-primary-900 dark:text-primary-50 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-700 dark:text-neutral-300 flex-grow overflow-auto">
                    {feature.description}
                  </p>
                  <div className="absolute bottom-0 right-0 w-24 h-24 transform translate-x-8 translate-y-8 opacity-10">
                    <feature.icon className="w-full h-full" />
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
