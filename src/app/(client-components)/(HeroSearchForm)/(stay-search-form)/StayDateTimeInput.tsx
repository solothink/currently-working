"use client";

import React, { Fragment, useState, FC, forwardRef } from "react";
import { Popover, Transition } from "@headlessui/react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "@/components/DatePickerCustomDay";
import DatePicker from "react-datepicker";
import ClearDataButton from "../ClearDataButton";
import { Listbox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/solid";

export interface StayDatesRangeInputProps {
  className?: string;
  fieldClassName?: string;
  date: Date | null;
  setDate: Function;
  label: string;
}

const StayDateTimeInput: FC<StayDatesRangeInputProps> = ({
  className = "[ lg:nc-flex-2 ]",
  fieldClassName = "[ nc-hero-field-padding ]",
  date: date,
  setDate: setDate,
  label: label,
}) => {
  const [openDateInput, setOpenDateInput] = useState(true);
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
          setOpenDateInput(false);
        }}
        as="div"
        className="flex-shrink-0"
      >
        <Listbox.Button className="focus:outline-none inline-flex items-center group relative">
          <span className="ml-1 text-sm font-semibold">{`, ${date?.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`}</span>
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

        <Listbox.Options className="absolute z-40 min-w-max py-1 mt-5 overflow-auto text-base bg-white dark:bg-neutral-800 rounded-md shadow-lg max-h-60 ring-1 ring-black/5 dark:ring-white/20 focus:outline-none sm:text-sm">
          {times.map((time, index) => (
            <Listbox.Option
              key={index}
              className={({ active }) =>
                `${
                  active
                    ? "text-amber-900 bg-amber-100"
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
                        active ? "text-amber-600" : "text-amber-600"
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

  const renderInput = () => {
    return (
      <>
        <div
          className="text-neutral-300 dark:text-neutral-400"
          onClick={() => openDateInput === false && setOpenDateInput(true)}
        >
          <CalendarIcon className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-grow text-left">
          <span className="block mt-1 text-xs text-neutral-400 leading-none font-light">
            {label}
          </span>
          <span className="flex items-start justify-start xl:text-sm font-semibold spacing-x-1">
            <div
              onClick={() => openDateInput === false && setOpenDateInput(true)}
              className="cursor-pointer"
            >
              {date?.toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
              }) || "Add dates"}
            </div>

            <div
              onClick={() => setOpenDateInput(false)}
              className="cursor-pointer"
            >
              {date && renderEditTime()}
            </div>
          </span>
        </div>
      </>
    );
  };

  return (
    <Popover
      className={`StayDatesRangeInput z-10 relative flex ${className}`}
      as="div"
    >
      {({ open, close }) => (
        <>
          <Popover.Button
            as="div"
            className={`flex-1 z-10 flex relative ${fieldClassName} items-center space-x-2 focus:outline-none ${
              open ? "nc-hero-field-focused" : ""
            }`}
          >
            {renderInput()}
            {date && open && <ClearDataButton onClick={() => setDate(null)} />}
          </Popover.Button>

          {open && (
            <div className="h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 -inset-x-0.5 bg-white dark:bg-neutral-800"></div>
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
            <Popover.Panel className="absolute left-1/2 z-20 mt-3 top-full w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-md">
              {openDateInput && (
                <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-neutral-800 p-8">
                  <DatePicker
                    selected={date}
                    onChange={(date) => {
                      setDate(date as Date);
                      close();
                    }}
                    showPopperArrow={false}
                    inline
                    renderCustomHeader={(p) => (
                      <DatePickerCustomHeaderTwoMonth {...p} />
                    )}
                    renderDayContents={(day, date) => (
                      <DatePickerCustomDay dayOfMonth={day} date={date} />
                    )}
                  />
                </div>
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default StayDateTimeInput;
