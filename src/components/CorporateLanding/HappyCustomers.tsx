"use client";
import React, { FC, useRef } from "react";
import Slider from "react-slick";
import Heading from "@/shared/Heading";
import Airtel from "@/images/corporate/clients/airtel-logo.png";
import MarutiSuzuki from "@/images/corporate/clients/maruti-suzuki-logo.jpg";
import Reliance from "@/images/corporate/clients/reliance.png";
import Adani from "@/images/corporate/clients/adani-logo.png";
import HUL from "@/images/corporate/clients/hul.jpeg";
import LMI from "@/images/corporate/clients/life-max-insurance-logo.png";
import DP from "@/images/corporate/clients/dp.png";
import SandNetworkPvtLtd from "@/images/corporate/clients/sand-network-logo.png";

import Image from "next/image";

export const Media = [
  {
    iconSrc: Airtel,
    title: "Airtel",
  },
  {
    iconSrc: MarutiSuzuki,
    title: "Maruti Suzuki",
  },
  {
    iconSrc: Reliance,
    title: "Reliance",
  },
  {
    iconSrc: Adani,
    title: "Adani",
  },
  {
    iconSrc: HUL,
    title: "Hindustan Unilever Limited",
  },
  {
    iconSrc: DP,
    title: "DP",
  },
  {
    iconSrc: LMI,
    title: "Max Life Insurance",
  },

  {
    iconSrc: SandNetworkPvtLtd,
    title: "Sand Network Pvt Ltd",
  },
];

export interface CoverageReportProps {
  className?: string;
}

const CorporateClients: FC<CoverageReportProps> = ({ className = "" }) => {
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
      <div className="pt-8 my-8">
        <Heading desc="" isCenter={true}>
          Our Happy Clients
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
export default CorporateClients;
