"use client";
import React, { FC, useRef } from "react";
import { IoWifi } from "react-icons/io5";
import { MdOutlineLocalTaxi } from "react-icons/md";
import { MdOutlineRestaurant } from "react-icons/md";
import { MdLocalBar } from "react-icons/md";
import { IoMdFitness } from "react-icons/io";
import { MdOutlinePool } from "react-icons/md";
import Slider from "react-slick";
import Heading from "@/shared/Heading";
import ANINewsMedia from "@/images/home/coverage/ani.svg";
import StartUpTerminal from "@/images/home/coverage/startup-terminal.svg";
import ZeeNews from "@/images/home/coverage/zee-news.svg";
import BusinessStandard from "@/images/home/coverage/business-standard.svg";
import Yahoo from "@/images/home/coverage/yahoo.svg";
import BigNewsNetwork from "@/images/home/coverage/big-news-network.svg";
import Image from "next/image";

export const Media = [
  {
    iconSrc: ANINewsMedia,
    title: "ANI News Media",
  },
  {
    iconSrc: StartUpTerminal,
    title: "StartUp Terminal",
  },
  {
    iconSrc: ZeeNews,
    title: "Zee News",
  },
  {
    iconSrc: BusinessStandard,
    title: "Business Standard",
  },
  {
    iconSrc: Yahoo,
    title: "Yahoo",
  },
  {
    iconSrc: BigNewsNetwork,
    title: "Big News Network",
  },
];

export interface CoverageReportProps {
  className?: string;
}

const CoverageReport: FC<CoverageReportProps> = ({ className = "" }) => {
  let sliderRef = useRef(null);

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    dots: false,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
        },
      },
    ],
  };
  return (
    <>
      <div className="">
        <Heading desc="" isCenter={true}>
          Idbook Hotel Coverage Report
        </Heading>
      </div>

      <Slider
        {...settings}
        className=" slider-container relative bg-white dark:bg-gray-900 py-8 rounded-lg shadow-none before:absolute before:inset-x-0 before:top-0 before:h-1 before:shadow-[0_-4px_10px_rgba(0,0,0,0.15)] before:rounded-t-lg after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:shadow-[0_4px_10px_rgba(0,0,0,0.15)] after:rounded-b-lg"
      >
        {Media.map((item, i) => {
          return (
            <div key={i} className="flex items-center justify-center">
              <Image src={item.iconSrc} alt={item.title} className="h-16" />
            </div>
          );
        })}
      </Slider>
    </>
  );
};
export default CoverageReport;
