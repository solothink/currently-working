import React, { FC } from "react";
import Heading from "@/shared/Heading";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import { FaCity } from "react-icons/fa6";
import { FaHotel, FaUser } from "react-icons/fa";
import { MdBedroomChild, MdOutlineBedroomChild } from "react-icons/md";
import Counter from "./Counter";
import ModalSelectGuests from "@/components/ModalSelectGuests";

export interface Statistic {
  id: string;
  end: number;
  label: string;
  suffix?: string;
  prefix?: string | JSX.Element;
  format?: string;
}

const FOUNDER_DEMO: Statistic[] = [
  {
    id: "1",
    end: 500,
    label: "guests",
    prefix: <FaUser />,
    format: "number",
    suffix: "K",
  },
  {
    id: "2",
    end: 60,
    label: "Cities",
    suffix: "+",
    format: "number",
    prefix: <FaCity />,
  },
  {
    id: "3",
    end: 500,
    label: "Hotels",
    suffix: "+",
    format: "number",
    prefix: <FaHotel />,
  },
  {
    id: "4",
    end: 10000,
    label: "Rooms",
    suffix: "+",
    format: "number",
    prefix: <MdBedroomChild />,
  },
];

export interface SectionStatisticProps {
  className?: string;
}

const SectionStatistic: FC<SectionStatisticProps> = ({ className = "" }) => {
  return (
    <div className={`nc-SectionStatistic relative ${className}`}>
      <Heading>Achivements</Heading>
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 xl:gap-8">
        {FOUNDER_DEMO.map((item) => (
          <div
            key={item.id}
            className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl dark:border-neutral-800 flex items-center gap-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-[3rem] text-primary-800 dark:text-primary-200">
                {item.prefix}
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-semibold leading-none text-neutral-900 md:text-3xl dark:text-neutral-200 flex items-center">
                <Counter from={0} to={item.end} />
                {item.suffix}
              </h3>
              <span className="block text-sm text-neutral-500 mt-1 sm:text-base dark:text-neutral-400">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionStatistic;
