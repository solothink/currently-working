import React, { FC, useEffect, FormEvent } from "react";
import useBookingQueryStore from "@/store/bookingQueryStore";
import LocationInput from "../LocationInput";
import GuestsInput from "../GuestsInput";
import ExperiencesDateSingleInput from "./ExperiencesDateSingleInput";
import ExperienceDaysInput from "./ExperienceDaysInput";
import { BookingRequest } from "@/lib/booking-service";

const ExperiencesSearchForm: FC = () => {
  const { queryData, setBookingType, updateQueryField, submitQuery } =
    useBookingQueryStore();

  // Ensure the booking type is set to 'HOLIDAYPACK'
  useEffect(() => {
    setBookingType("HOLIDAYPACK");
  }, [setBookingType]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await submitQuery();
      console.log("Holiday package booking submitted successfully");
    } catch (error) {
      console.error("Failed to submit booking:", error);
    }
  };

  // Type guard to ensure safe property access
  const isHolidayPack = queryData.booking_type === "HOLIDAYPACK";

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full relative mt-8 flex flex-col md:flex-row rounded-3xl md:rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800"
    >
      {/* Location Input */}
      <LocationInput
        value={isHolidayPack ? queryData.enquired_holidaypack || "" : ""}
        setValue={(value: string) =>
          updateQueryField(
            "enquired_holidaypack" as keyof BookingRequest,
            value,
          )
        }
        className="flex-[1.5]"
      />

      <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>

      {/* Days Input */}
      <ExperienceDaysInput
        day={isHolidayPack ? queryData.no_days || 1 : 1}
        setDay={(value: number) =>
          updateQueryField("no_days" as keyof BookingRequest, value)
        }
        className="flex-1"
      />

      <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>

      {/* Date Input */}
      <ExperiencesDateSingleInput
        startDate={
          isHolidayPack && queryData.available_start_date
            ? new Date(queryData.available_start_date)
            : null
        }
        endDate={
          isHolidayPack && queryData.available_end_date
            ? new Date(queryData.available_end_date)
            : null
        }
        setStartDate={(date: Date | null) =>
          updateQueryField(
            "available_start_date" as keyof BookingRequest,
            date?.toISOString() || "",
          )
        }
        setEndDate={(date: Date | null) =>
          updateQueryField(
            "available_end_date" as keyof BookingRequest,
            date?.toISOString() || "",
          )
        }
        className="flex-1"
      />

      <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>

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
    </form>
  );
};

export default ExperiencesSearchForm;
