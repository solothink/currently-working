"use client";

import React from "react";
import Franchise from "@/images/footer/franchaise.svg";
import Image from "next/image";
import Link from "next/link";
const FranchiseBanner: React.FC = () => {
  return (
    <div className="bg-primary-800 py-4 w-full">
      <div className="container mx-auto flex justify-between items-center gap-8 md:gap-12">
        {/* Left Text */}
        <h2 className="text-white text-sm font-semibold md:text-xl flex items-center gap-3 md:gap-8">
          <div
            className="bg-white rounded-full"
            style={{
              width: "4px",
              height: "44px",
              top: "1532px",
              left: "80px",
              gap: "0px",
              opacity: "0px",
            }}
          ></div>
          SAVE YOUR MARKETING COST, GROW YOUR BUSINESS AND JOIN OUR NETWORK
        </h2>

        {/* Right Button */}
        <Link
          href="/be-franchise"
          className="flex items-center px-4 py-2 bg-transparent rounded-lg text-white hover:bg-primary-900 transition-colors duration-300  shadow-[0px_0px_2.9px_7px_rgba(255,255,255,0.25)] px-2"
        >
          Get our Franchise
          <Image
            src={Franchise}
            alt="Franchise"
            width={20}
            height={20}
            className="ml-2 mr-2 sm:mr-1"
          />
        </Link>
      </div>
    </div>
  );
};

export default FranchiseBanner;
