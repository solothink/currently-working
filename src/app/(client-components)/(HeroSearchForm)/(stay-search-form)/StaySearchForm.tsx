"use client";
import React, { FC, useEffect, useState } from "react";
import LocationInput from "../LocationInput";
import GuestsInput from "../GuestsInput";
import StayDatesRangeInputHourly from "./StayDatesRangeInputHourly";
import StayDateTimeInput from "./StayDateTimeInput";
import { Listbox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/solid";
import HoursInput from "../HoursInput";
import { hoursOptions } from "../../type";
const StaySearchForm: FC<{}> = ({}) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date(Date.now()));
  const [endDate, setEndDate] = useState<Date | null>(new Date(Date.now()));
  const [stayType, setStayType] = useState<"hourly" | "full-day">("hourly");
  const [hours, setHours] = useState<hoursOptions>(4);
  const [location, setLocation] = useState<string>("");
  const [guestAdults, setGuestAdults] = useState(0);
  const [guestChildren, setGuestChildren] = useState(0);
  const [guestInfants, setGuestInfants] = useState(0);

  useEffect(() => {
    const today = new Date();
    let tomorrow = new Date(today);
    let checkout = new Date(endDate || today);

    if (stayType === "full-day") {
      tomorrow.setDate(tomorrow.getDate() + 1);
      if (endDate && endDate <= tomorrow) {
        checkout = tomorrow;
      } else {
        checkout = endDate || tomorrow;
      }
      const checkInHour = startDate?.getHours() || 12;
      const checkInMinute = startDate?.getMinutes() || 0;
      checkout.setHours(checkInHour);
      checkout.setMinutes(checkInMinute);
      setEndDate(checkout);
    }
    if (stayType === "hourly") {
      if (startDate) {
        checkout = new Date(startDate);
        checkout.setHours(checkout.getHours() + hours);
        setEndDate(checkout);
      }
    }
  }, [stayType, hours, startDate]);

  useEffect(() => {
    let checkIn = new Date(startDate || Date.now());
    checkIn.setMinutes(0);
    checkIn.setSeconds(0);
    setStartDate(checkIn);
  }, []);

  const tabs = ["Hourly", "Full Day"];

  const renderRadioBtn = () => {
    return (
      <ul className="ml-2 sm:ml-6 md:ml-12 flex space-x-5 sm:space-x-8 lg:space-x-11 overflow-x-auto hiddenScrollbar">
        {tabs.map((tab) => {
          const active =
            tab === "Hourly" ? stayType === "hourly" : stayType === "full-day";
          return (
            <li
              onClick={() =>
                setStayType(tab === "Hourly" ? "hourly" : "full-day")
              }
              className={`flex-shrink-0 flex items-center cursor-pointer text-sm lg:text-base font-medium ${
                active
                  ? " text-neutral-800 dark:text-neutral-200"
                  : "text-neutral-200 dark:text-neutral-800 hover:text-neutral-700 dark:hover:text-neutral-400"
              } `}
              key={tab}
            >
              {active && (
                <span className="block w-2.5 h-2.5 rounded-full bg-neutral-800 dark:bg-neutral-100 mr-2" />
              )}
              <span>{tab}</span>
            </li>
          );
        })}
      </ul>
    );
  };
  const isHourly = stayType === "hourly";

  const renderForm = () => {
    return (
      <form className="hidden md:block w-full relative mt-8">
        {renderRadioBtn()}
        <div
          className={`relative mt-8 flex flex-row rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800`}
        >
          <LocationInput
            className="flex-[2.5]"
            value={location}
            setValue={setLocation}
          />
          <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
          {isHourly && (
            <>
              <HoursInput
                hours={hours}
                setHours={setHours}
                className="flex-1"
              />
              <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
            </>
          )}
          <StayDateTimeInput
            className="flex-1.5"
            date={startDate}
            setDate={setStartDate}
            label="check-in"
          />
          <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>

          <StayDateTimeInput
            className="flex-1.5"
            date={endDate}
            setDate={setEndDate}
            label="check-out"
          />
          <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
          <GuestsInput
            className="flex-1"
            guestAdultsInputValue={guestAdults}
            guestChildrenInputValue={guestChildren}
            guestInfantsInputValue={guestInfants}
            setGuestAdultsInputValue={setGuestAdults}
            setGuestChildrenInputValue={setGuestChildren}
            setGuestInfantsInputValue={setGuestInfants}
          />
        </div>
      </form>
    );
  };

  return renderForm();
};

export default StaySearchForm;
