"use client";

import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardCategoryBox1 from "./CardCategoryBox1";
import { TaxonomyType } from "@/data/types";

const DEMO_CATS: TaxonomyType[] = [
  {
    id: "1",
    href: "/#",
    name: "Mumbai",
    taxonomy: "category",
    count: 1882,
    thumbnail: "/top-destination/mumbai.webp",
  },
  {
    id: "2",
    href: "/#",
    name: "Singapore",
    taxonomy: "category",
    count: 8288,
    thumbnail:
      "https://images.pexels.com/photos/7740160/pexels-photo-7740160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "3",
    href: "/#",
    name: "Delhi",
    taxonomy: "category",
    count: 1288,
    thumbnail: "/top-destination/delhi.png",
  },
  {
    id: "4",
    href: "/#",
    name: "Manali",
    taxonomy: "category",
    count: 112,
    thumbnail: "/top-destination/manali.png",
  },
  {
    id: "5",
    href: "/#",
    name: "Ooty",
    taxonomy: "category",
    count: 323,
    thumbnail: "/top-destination/ooty.png",
  },
  {
    id: "6",
    href: "/#",
    name: "Maldives",
    taxonomy: "category",
    count: 2223,
    thumbnail:
      "https://images.pexels.com/photos/3250613/pexels-photo-3250613.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "7",
    href: "/#",
    name: "Shimla",
    taxonomy: "category",
    count: 1775,
    thumbnail: "/top-destination/shimla.png",
  },
  {
    id: "8",
    href: "/#",
    name: "Kolkata",
    taxonomy: "category",
    count: 1288,
    thumbnail: "/top-destination/kolkata.png",
  },
];

const Heading: React.FC<{
  children: React.ReactNode;
  desc?: string;
  isCenter?: boolean;
}> = ({ children, desc, isCenter = false }) => {
  return (
    <div className={`mb-12 ${isCenter ? "text-center" : ""}`}>
      <h2 className=" md:text-4xl font-semibold font-display font-bold text-primary-800 dark:text-primary-100">
        {children}
      </h2>
      {desc && (
        <span className="mt-2 md:mt-3 font-normal block text-base sm:text-xl  text-primary-600 dark:text-primary-300">
          {desc}
        </span>
      )}
    </div>
  );
};

export default function ScrollableDestinations() {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="nc-SectionGridCategoryBox relative py-16 container">
      <div className=" mx-auto ">
        <Heading isCenter={true}>Top Destinations Around the Globe</Heading>
        <Slider {...settings} className="gap-5 sm:gap-6 md:gap-8">
          {DEMO_CATS.map((item) => (
            <div key={item.id} className="px-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <CardCategoryBox1 taxonomy={item} key={item.id} />
              </motion.div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
