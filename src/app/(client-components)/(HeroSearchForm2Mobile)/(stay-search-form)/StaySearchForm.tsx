"use client";

import converSelectedDateToString from "@/utils/converSelectedDateToString";
import React, { useEffect, useState } from "react";
import { GuestsObject, hoursOptions } from "../../type";
import GuestsInput from "../GuestsInput";
import LocationInput from "../LocationInput";
import DatesRangeInput from "../DatesRangeInput";
import GuestDatesRangeInputHourly from "../GuestDatesRangeInputHourly";
import GuestDatesRangeInput from "../GuestDatesRangeInput";
import HoursInput from "../../(HeroSearchForm)/HoursInput";

const StaySearchForm = ({ stayType = "hourly" }) => {
  //
  const [fieldNameShow, setFieldNameShow] = useState<
    "location" | "hours" | "checkIn" | "checkOut" | "guests"
  >("location");
  //
  const [locationInputTo, setLocationInputTo] = useState("");
  const [guestInput, setGuestInput] = useState<GuestsObject>({
    guestAdults: 0,
    guestChildren: 0,
    guestInfants: 0,
    pets: 0,
  });
  const [startDate, setStartDate] = useState<Date | null>(new Date(Date.now()));
  const [endDate, setEndDate] = useState<Date | null>(new Date(Date.now()));
  const [hours, setHours] = useState<hoursOptions>(4 as hoursOptions);
  //

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
  const renderInputLocation = () => {
    const isActive = fieldNameShow === "location";
    return (
      <div
        className={`w-full bg-white dark:bg-neutral-800 ${
          isActive
            ? "rounded-2xl shadow-lg"
            : "rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
        }`}
      >
        {!isActive ? (
          <button
            className={`w-full flex justify-between text-sm font-medium p-4`}
            onClick={() => setFieldNameShow("location")}
          >
            <span className="text-neutral-400">Where</span>
            <span>{locationInputTo || "Location"}</span>
          </button>
        ) : (
          <LocationInput
            defaultValue={locationInputTo}
            onChange={(value) => {
              setLocationInputTo(value);
              setFieldNameShow("hours");
            }}
          />
        )}
      </div>
    );
  };

  const renderCheckInDate = () => {
    const isActive = fieldNameShow === "checkIn";

    return (
      <div
        className={`w-full bg-white dark:bg-neutral-800 overflow-hidden ${
          isActive
            ? "rounded-2xl shadow-lg"
            : "rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
        }`}
      >
        <button
          className={`w-full flex justify-between text-sm font-medium p-4  `}
          onClick={() => setFieldNameShow("checkIn")}
        >
          <span className="text-neutral-400">Check In</span>
          <span>
            {startDate
              ? startDate.toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Add date"}
          </span>
        </button>
        {isActive && (
          <GuestDatesRangeInput date={startDate} setDate={setStartDate} />
        )}
      </div>
    );
  };

  const renderCheckOutDate = () => {
    const isActive = fieldNameShow === "checkOut";

    return (
      <div
        className={`w-full bg-white dark:bg-neutral-800 overflow-hidden ${
          isActive
            ? "rounded-2xl shadow-lg"
            : "rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
        }`}
      >
        <button
          className={`w-full flex justify-between text-sm font-medium p-4  `}
          onClick={() => setFieldNameShow("checkOut")}
        >
          <span className="text-neutral-400">Check Out</span>
          <span>
            {endDate
              ? endDate.toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Add date"}
          </span>
        </button>
        {isActive && (
          <GuestDatesRangeInput date={endDate} setDate={setEndDate} />
        )}
      </div>
    );
  };

  const renderHourInput = () => {
    const isActive = fieldNameShow === "hours";
    return (
      <div
        className={`w-full bg-white dark:bg-neutral-800 overflow-hidden ${
          isActive
            ? "rounded-2xl shadow-lg"
            : "rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
        }`}
      >
        <button
          className={`w-full flex justify-between text-sm font-medium p-4  `}
          onClick={() => setFieldNameShow("hours")}
        >
          <span className="text-neutral-400">Hours</span>
          <span>{hours > 0 ? `${hours} hours` : "Select hours"}</span>
        </button>
        {isActive && (
          <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10 ">
            <div className="relative grid gap-8 bg-white dark:bg-neutral-800 p-7 ">
              {[4, 8, 12].map((item) => (
                <a
                  key={item}
                  onClick={(e) => {
                    e.preventDefault();
                    setHours(item as hoursOptions);
                    close();
                  }}
                  className="flex items-center justify-right p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                >
                  <p className="text-sm font-medium text-right ">
                    {item} hours
                  </p>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderInputGuests = () => {
    const isActive = fieldNameShow === "guests";
    let guestSelected = "";
    if (guestInput.guestAdults || guestInput.guestChildren) {
      const guest =
        (guestInput.guestAdults || 0) + (guestInput.guestChildren || 0);
      guestSelected += `${guest} guests`;
    }

    if (guestInput.guestInfants) {
      guestSelected += `, ${guestInput.guestInfants} infants`;
    }

    return (
      <div
        className={`w-full bg-white dark:bg-neutral-800 overflow-hidden ${
          isActive
            ? "rounded-2xl shadow-lg"
            : "rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
        }`}
      >
        {!isActive ? (
          <button
            className={`w-full flex justify-between text-sm font-medium p-4`}
            onClick={() => setFieldNameShow("guests")}
          >
            <span className="text-neutral-400">Who</span>
            <span>{guestSelected || `Add guests`}</span>
          </button>
        ) : (
          <GuestsInput defaultValue={guestInput} onChange={setGuestInput} />
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="w-full space-y-5">
        {/*  */}
        {renderInputLocation()}
        {stayType === "hourly" ? renderHourInput() : null}
        {/*  */}
        {renderCheckInDate()}
        {/*  */}
        {renderCheckOutDate()}
        {/*  */}
        {renderInputGuests()}
      </div>
    </div>
  );
};

export default StaySearchForm;
