"use client";

import React, { FC, FormEvent, useState } from "react";
import LocationInput from "../LocationInput";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Fragment } from "react";
import NcInputNumber from "@/components/NcInputNumber";
import FlightDateRangeInput from "./FlightDateRangeInput";
import { GuestsObject } from "../../type";
import useBookingQueryStore from "@/store/bookingQueryStore";
import { BookingRequest } from "@/lib/booking-service";

export interface FlightSearchFormProps {}

const flightClassOptions = [
  { name: "Economy", value: "ECONOMY" },
  { name: "Business", value: "BUSINESS" },
];

const FlightSearchForm: FC<FlightSearchFormProps> = () => {
  const { queryData, updateQueryField, setBookingType, submitQuery } =
    useBookingQueryStore();

  const [dropOffLocationType, setDropOffLocationType] = useState<
    "ROUND_TRIP" | "ONE_WAY"
  >("ROUND_TRIP");
  const isFlightBooking = queryData.booking_type === "FLIGHT";

  // Initialize guest states from queryData
  const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(
    queryData.adult_count || 1,
  );
  const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(
    queryData.child_count || 0,
  );
  const [guestInfantsInputValue, setGuestInfantsInputValue] = useState(
    queryData.infant_count || 0,
  );

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await submitQuery();
      console.log("Vehicle booking submitted successfully");
    } catch (error) {
      console.error("Failed to submit booking:", error);
    }
  };

  const handleChangeData = (value: number, type: keyof GuestsObject) => {
    const newValue: GuestsObject = {
      guestAdults: guestAdultsInputValue,
      guestChildren: guestChildrenInputValue,
      guestInfants: guestInfantsInputValue,
    };
    if (type === "guestAdults") {
      setGuestAdultsInputValue(value);
      newValue.guestAdults = value;
    }
    if (type === "guestChildren") {
      setGuestChildrenInputValue(value);
      newValue.guestChildren = value;
    }
    if (type === "guestInfants") {
      setGuestInfantsInputValue(value);
      newValue.guestInfants = value;
    }
    // Update booking query with new values
    updateQueryField("adult_count", guestAdultsInputValue);
    updateQueryField("child_count", guestChildrenInputValue);
    updateQueryField("infant_count", guestInfantsInputValue);
  };

  const totalGuests =
    guestChildrenInputValue + guestAdultsInputValue + guestInfantsInputValue;

  const renderGuest = () => (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            as="button"
            className={`
              ${open ? "" : ""}
               px-4 py-1.5 rounded-md inline-flex items-center font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 text-xs`}
          >
            <span>{`${totalGuests} Guests`}</span>
            <ChevronDownIcon
              className={`${
                open ? "" : "text-opacity-70"
              } ml-2 h-4 w-4 group-hover:text-opacity-80 transition ease-in-out duration-150`}
              aria-hidden="true"
            />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-20 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 left-1/2 -translate-x-1/2  py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl ring-1 ring-black/5 dark:ring-white/10">
              <NcInputNumber
                className="w-full"
                defaultValue={guestAdultsInputValue}
                onChange={(value) => handleChangeData(value, "guestAdults")}
                max={10}
                min={1}
                label="Adults"
                desc="Ages 13 or above"
              />
              <NcInputNumber
                className="w-full mt-6"
                defaultValue={guestChildrenInputValue}
                onChange={(value) => handleChangeData(value, "guestChildren")}
                max={4}
                label="Children"
                desc="Ages 2–12"
              />
              <NcInputNumber
                className="w-full mt-6"
                defaultValue={guestInfantsInputValue}
                onChange={(value) => handleChangeData(value, "guestInfants")}
                max={4}
                label="Infants"
                desc="Ages 0–2"
              />
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );

  const renderSelectClass = () => (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button
            className={`
           ${open ? "" : ""}
            px-4 py-1.5 rounded-md inline-flex items-center font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 text-xs`}
          >
            <span>{isFlightBooking ? queryData.flight_class : ""}</span>
            <ChevronDownIcon
              className={`${
                open ? "" : "text-opacity-70"
              } ml-2 h-4 w-4 group-hover:text-opacity-80 transition ease-in-out duration-150`}
              aria-hidden="true"
            />
          </Popover.Button>
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
                  {flightClassOptions.map((item) => (
                    <a
                      key={item.value}
                      href="##"
                      onClick={(e) => {
                        e.preventDefault();
                        updateQueryField(
                          "flight_class" as keyof BookingRequest,
                          item.value,
                        ); // Update flight class in booking query
                        close();
                      }}
                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <p className="text-sm font-medium ">{item.name}</p>
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

  const renderRadioBtn = () => (
    <div className="py-5 [ nc-hero-field-padding ] flex flex-row flex-wrap border-b border-neutral-100 dark:border-neutral-700">
      <div
        className={`py-1.5 px-4 flex items-center rounded-full font-medium text-xs cursor-pointer mr-2 my-1 sm:mr-3 ${
          dropOffLocationType === "ROUND_TRIP"
            ? "bg-black shadow-black/10 shadow-lg text-white"
            : "border border-neutral-300 dark:border-neutral-700"
        }`}
        onClick={() => {
          setDropOffLocationType("ROUND_TRIP");
          updateQueryField("flight_trip" as keyof BookingRequest, "ROUND_TRIP"); // Update flight_trip in queryData
        }}
      >
        Round-trip
      </div>
      <div
        className={`py-1.5 px-4 flex items-center rounded-full font-medium text-xs cursor-pointer mr-2 my-1 sm:mr-3 ${
          dropOffLocationType === "ONE_WAY"
            ? "bg-black text-white shadow-black/10 shadow-lg"
            : "border border-neutral-300 dark:border-neutral-700"
        }`}
        onClick={() => {
          setDropOffLocationType("ONE_WAY");
          updateQueryField("flight_trip" as keyof BookingRequest, "ONE_WAY"); // Update flight_trip in queryData
        }}
      >
        One-way
      </div>
      <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8 mr-2 my-1 sm:mr-3"></div>
      <div className="mr-2 my-1 sm:mr-3 border border-neutral-300 dark:border-neutral-700 rounded-full">
        {renderSelectClass()}
      </div>
      <div className="my-1 border border-neutral-300 dark:border-neutral-700 rounded-full">
        {renderGuest()}
      </div>
    </div>
  );

  const renderForm = () => (
    <form
      className="w-full relative mt-8 rounded-[40px] xl:rounded-[49px] rounded-t-2xl xl:rounded-t-3xl shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800"
      onSubmit={handleSubmit}
    >
      {renderRadioBtn()}
      <div className="flex flex-1 rounded-full">
        <LocationInput
          placeHolder="Flying from"
          desc="Where do you want to fly from?"
          className="flex-1"
          value={isFlightBooking ? (queryData.flying_from ?? "") : ""}
          setValue={(value: string) =>
            updateQueryField("flying_from" as keyof BookingRequest, value)
          }
        />
        <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
        <LocationInput
          placeHolder="Flying to"
          desc="Where do you want to fly to?"
          className="flex-1"
          value={isFlightBooking ? (queryData.flying_to ?? "") : ""}
          setValue={(value: string) =>
            updateQueryField("flying_to" as keyof BookingRequest, value)
          }
        />
        <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
        <FlightDateRangeInput
          selectsRange={dropOffLocationType === "ROUND_TRIP"}
          startDate={
            new Date(
              isFlightBooking
                ? (queryData.departure_date ?? new Date().toISOString())
                : new Date().toISOString(),
            )
          }
          endDate={
            new Date(
              isFlightBooking
                ? (queryData.return_date ?? new Date().toISOString())
                : new Date().toISOString(),
            )
          }
          setStartDate={(date) =>
            updateQueryField(
              "departure_date" as keyof BookingRequest,
              date?.toISOString(),
            )
          }
          setEndDate={(date) =>
            updateQueryField(
              "return_date" as keyof BookingRequest,
              date?.toISOString(),
            )
          }
          className="flex-1"
        />
      </div>
    </form>
  );

  return <div>{renderForm()}</div>;
};

export default FlightSearchForm;
