"use client";

import DatePicker from "react-datepicker";
import React, { FC, Fragment, useEffect, useState } from "react";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "@/components/DatePickerCustomDay";
import { Listbox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/solid";
export interface StayDatesRangeInputProps {
  className?: string;
  date: Date | null;
  setDate: Function;
}

const GuestDatesRangeInput: FC<StayDatesRangeInputProps> = ({
  className = "",
  date,
  setDate,
}) => {
  const renderEditTime = () => {
    const times = [
      "12:00 AM",
      "1:00 AM",
      "2:00 AM",
      "3:00 AM",
      "4:00 AM",
      "5:00 AM",
      "6:00 AM",
      "7:00 AM",
      "8:00 AM",
      "9:00 AM",
      "10:00 AM",
      "11:00 AM",
      "12:00 PM",
      "1:00 PM",
      "2:00 PM",
      "3:00 PM",
      "4:00 PM",
      "5:00 PM",
      "6:00 PM",
      "7:00 PM",
      "8:00 PM",
      "9:00 PM",
      "10:00 PM",
      "11:00 PM",
    ];

    return (
      <Listbox
        // value={stateTimeRage.startTime}

        onChange={(time: string) => {
          const updatedDate = new Date(date || Date.now());
          let hour = parseInt(time.split(":")[0]);
          let minutes = parseInt(time.split(":")[1]);
          let ampm = time.split(" ")[1];
          if (ampm === "PM") {
            hour += 12;
          }
          updatedDate.setHours(hour);
          updatedDate.setMinutes(minutes);
          setDate(updatedDate);
          // setOpenDateInput(false);
        }}
        as="div"
        className="flex-shrink-0"
      >
        <Listbox.Button className="focus:outline-none inline-flex items-center group relative">
          <span className="ml-1 text-sm font-semibold">{`${date?.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`}</span>
          <span className="ml-1 absolute z-20 left-full top-0  text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </span>
        </Listbox.Button>

        <Listbox.Options
          static={true}
          className="absolute z-40 min-w-max py-1 mt-5 overflow-auto text-base bg-white dark:bg-neutral-800 rounded-md shadow-lg max-h-60 ring-1 ring-black/5 dark:ring-white/20 focus:outline-none sm:text-sm"
        >
          {times.map((time, index) => (
            <Listbox.Option
              key={index}
              className={({ active }) =>
                `${
                  active
                    ? "text-primary-900 bg-primary-100"
                    : "text-gray-900 dark:text-neutral-200"
                } cursor-default select-none relative py-2 pl-10 pr-4`
              }
              value={time}
            >
              {({ selected, active }) => (
                <>
                  <span
                    className={`${
                      selected ? "font-medium" : "font-normal"
                    } block truncate`}
                  >
                    {time}
                  </span>
                  {selected ? (
                    <span
                      className={`${
                        active ? "text-primary-600" : "text-primary-600"
                      }  absolute inset-y-0 left-0 flex items-center pl-3`}
                    >
                      <CheckIcon className="w-5 h-5" aria-hidden="true" />
                    </span>
                  ) : null}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    );
  };

  return (
    <div>
      {/* <div className="p-5">
        <span className="block font-semibold text-xl sm:text-2xl">
          {` When's your trip?`}
        </span>
      </div> */}
      <div
        className={`relative flex flex-shrink-0 w-full overflow-auto justify-center z-10 py-5 ${className} `}
      >
        <DatePicker
          selected={date}
          onChange={(date) => {
            setDate(date as Date);
            // setOpenDateInput(false);
          }}
          showPopperArrow={false}
          inline
          renderCustomHeader={(p) => <DatePickerCustomHeaderTwoMonth {...p} />}
          renderDayContents={(day, date) => (
            <DatePickerCustomDay dayOfMonth={day} date={date} />
          )}
        />
        {date && renderEditTime()}
      </div>
    </div>
  );
};

export default GuestDatesRangeInput;
