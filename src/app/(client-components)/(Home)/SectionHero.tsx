import React, { FC } from "react";
import imagePng from "@/images/home/header.png";
import Image from "next/image";
import StaySearchForm from "../(HeroSearchForm)/(stay-search-form)/StaySearchForm";

export interface SectionHero3Props {
  className?: string;
}

const SectionHero: FC<SectionHero3Props> = ({ className = "" }) => {
  return (
    <div
      className={`hidden md:block nc-SectionHero3 relative ${className}`}
      data-nc-id="SectionHero3"
    >
      <div className="absolute z-10 inset-x-0 top-[10%] sm:top-[15%] text-center flex flex-col items-center max-w-5xl mx-auto space-y-4 lg:space-y-5 xl:space-y-12">
        <span className="sm:text-lg md:text-4xl font-black mt-16 mb-4 text-neutral-100">
          India’s Leading Budget Hotels Chain
        </span>
        {/* <h2 className="font-bold text-black text-3xl sm:text-4xl md:text-3xl lg:text-6xl xl:text-6xl !leading-[115%] ">
        Pay Only for <br /> What You Use
      </h2> */}
        <StaySearchForm />
      </div>
      <div className="relative aspect-w-1 aspect-h-1 sm:aspect-w-4 sm:aspect-h-3 lg:aspect-w-16 lg:aspect-h-4 xl:aspect-h-5 ">
        <Image
          className="absolute inset-0 object-cover "
          src={imagePng}
          alt="hero"
          priority
        />
      </div>
    </div>
  );
};
export default SectionHero;
