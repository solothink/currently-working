"use client";

import React, { FC, FormEvent, useEffect, useState } from "react";
import LocationInput from "../LocationInput";
import RentalCarDatesRangeInput from "./RentalCarDatesRangeInput";
import useBookingQueryStore from "@/store/bookingQueryStore";
import { BookingRequest, VehicleBooking } from "@/lib/booking-service";
import GuestsInput from "../GuestsInput";

const RentalCarSearchForm: FC = () => {
  const { queryData, setBookingType, updateQueryField, submitQuery } =
    useBookingQueryStore();
  const [dropOffLocationType, setDropOffLocationType] = useState<
    "same" | "different"
  >("different");

  const isVehicleBooking = queryData.booking_type === "VEHICLE";

  useEffect(() => {
    // Ensure booking type is set to 'VEHICLE'
    setBookingType("VEHICLE");
  }, [setBookingType]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await submitQuery();
      console.log("Vehicle booking submitted successfully");
    } catch (error) {
      console.error("Failed to submit booking:", error);
    }
  };

  const renderRadioBtn = () => (
    <div className="py-5 [ nc-hero-field-padding ] flex items-center flex-wrap flex-row border-b border-neutral-100 dark:border-neutral-700">
      {["different", "same"].map((type) => (
        <div
          key={type}
          className={`py-1.5 px-4 flex items-center rounded-full font-medium text-xs cursor-pointer mr-2 my-1 sm:mr-3 ${
            dropOffLocationType === type
              ? "bg-black text-white shadow-black/10 shadow-lg"
              : "border border-neutral-300 dark:border-neutral-700"
          }`}
          onClick={() => setDropOffLocationType(type as "same" | "different")}
        >
          {type === "different" ? "Different drop off" : "Same drop off"}
        </div>
      ))}
    </div>
  );

  const isDifferentDropOff = dropOffLocationType === "different";

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full relative mt-8 rounded-[40px] xl:rounded-[49px] rounded-t-2xl xl:rounded-t-3xl shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800"
    >
      {renderRadioBtn()}

      <div className="relative flex flex-row">
        {/* Pick-up Location Input */}
        <LocationInput
          value={isVehicleBooking ? (queryData.pickup_addr ?? "") : ""}
          setValue={(value: string) =>
            updateQueryField("pickup_addr" as keyof BookingRequest, value)
          }
          placeHolder="City or Airport"
          desc="Pick up location"
          className="flex-1"
        />

        {isDifferentDropOff && (
          <>
            <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
            <LocationInput
              value={isVehicleBooking ? (queryData.dropoff_addr ?? "") : ""}
              setValue={(value: string) =>
                updateQueryField("dropoff_addr" as keyof BookingRequest, value)
              }
              placeHolder="City or Airport"
              desc="Drop off location"
              className="flex-1"
              divHideVerticalLineClass="-inset-x-0.5"
            />
          </>
        )}

        <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>

        {/* Rental Date Range Input */}
        <RentalCarDatesRangeInput
          hasButtonSubmit={false}
          startDate={
            isVehicleBooking && queryData.pickup_time
              ? new Date(queryData.pickup_time)
              : null
          }
          endDate={null} // Adjust if you need an end date
          setStartDate={(date: Date | null) =>
            updateQueryField(
              "pickup_time" as keyof BookingRequest,
              date?.toISOString() || "",
            )
          }
          setEndDate={() => {}} // Optional if no end date is required
          className="flex-1"
        />

        {/* Guests Input */}
        <GuestsInput
          guestAdultsInputValue={queryData.adult_count || 1}
          guestChildrenInputValue={queryData.child_count || 0}
          guestInfantsInputValue={queryData.infant_count || 0}
          setGuestAdultsInputValue={(value: number) =>
            updateQueryField("adult_count", value)
          }
          setGuestChildrenInputValue={(value: number) =>
            updateQueryField("child_count", value)
          }
          setGuestInfantsInputValue={(value: number) =>
            updateQueryField("infant_count", value)
          }
          className="flex-1"
          buttonSubmitHref="/listing-experiences"
        />
      </div>
    </form>
  );
};

export default RentalCarSearchForm;
