"use client";

import React, { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { FC } from "react";
import { ClockIcon } from "@heroicons/react/24/outline";
import ClearDataButton from "../ClearDataButton";

export interface ExperienceDaysInputProps {
  fieldClassName?: string;
  className?: string;

  day: number;
  setDay: Function;
}

const ExperienceDaysInput: FC<ExperienceDaysInputProps> = ({
  fieldClassName = "[ nc-hero-field-padding ]",
  className = "[ nc-flex-1 ]",

  day,
  setDay,
}) => {
  return (
    <Popover className={`flex relative ${className}`}>
      {({ open, close }) => (
        <>
          <div
            className={`flex-1 z-10 flex items-center focus:outline-none ${
              open ? "nc-hero-field-focused" : ""
            }`}
          >
            <Popover.Button
              className={`relative z-10 flex-1 flex text-left items-center ${fieldClassName} space-x-3 focus:outline-none`}
            >
              <div className="text-neutral-300 dark:text-neutral-400">
                <ClockIcon className="w-5 h-5 lg:w-7 lg:h-7" />
              </div>
              <div className="flex-grow">
                <span className="block mt-1 text-xs text-neutral-400 leading-none font-light">
                  {day > 0 ? "Day" : "Select day"}
                </span>
                <span className="block xl:text-sm font-semibold w-max">
                  {day || ""} Day
                </span>
              </div>

              {day > 0 && open && (
                <ClearDataButton
                  onClick={() => {
                    setDay(0);
                  }}
                />
              )}
            </Popover.Button>
          </div>

          {open && (
            <div className="h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 -left-0.5 right-0.5 bg-white dark:bg-neutral-800"></div>
          )}
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-20 w-screen max-w-[200px] sm:max-w-[220px] px-4 top-full mt-3 transform -translate-x-1/2 left-1/2 sm:px-0  ">
              <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10 ">
                <div className="relative grid gap-8 bg-white dark:bg-neutral-800 p-7 ">
                  {[1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                    <a
                      key={item}
                      onClick={(e) => {
                        e.preventDefault();
                        setDay(item);
                        close();
                      }}
                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <p className="text-sm font-medium ">{item} day</p>
                    </a>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default ExperienceDaysInput;
