import Heading from "@/shared/Heading";
import Image from "next/image";
import React from "react";
import Shubham from "@/images/about/shubham.jpg";
import Amit from "@/images/about/amit.jpg";
import Vignesh from "@/images/about/vignesh_2022.jpeg";
import Sonu from "@/images/about/sonu.jpg";
export interface People {
  id: string;
  name: string;
  job: string;
  avatar: string | any;
}

const FOUNDER_DEMO: People[] = [
  {
    id: "1",
    name: `Shubham k. Sahu`,
    job: "Founder and CEO",
    avatar: Shubham,
  },
  {
    id: "4",
    name: `Amit Kumar Sheoran`,
    job: "Co-founder and CMO",
    avatar: Amit,
  },
  {
    id: "3",
    name: `Vignesh N U`,
    job: "Product and Software Engineer",
    avatar: Vignesh,
  },
  {
    id: "2",
    name: `Sonu George`,
    job: "Backend Engineer",
    avatar: Sonu,
  },
];

const SectionFounder = () => {
  return (
    <div className="nc-SectionFounder relative">
      <Heading
        desc="We’re impartial and independent, and every day we create distinctive,
          world-class programmes and content"
      >
        ⛱ Team Idbook
      </Heading>
      <div className="grid sm:grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4 xl:gap-x-8">
        {FOUNDER_DEMO.map((item) => (
          <div key={item.id} className="max-w-sm">
            <div className="relative h-0 aspect-h-1 aspect-w-1 rounded-xl overflow-hidden">
              <Image
                fill
                className=" object-fit"
                src={item.avatar}
                alt=""
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 30vw, 30vw"
              />
            </div>

            <h3 className="text-lg font-semibold text-neutral-900 mt-4 md:text-xl dark:text-neutral-200">
              {item.name}
            </h3>
            <span className="block text-sm text-neutral-500 sm:text-base dark:text-neutral-400">
              {item.job}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionFounder;
