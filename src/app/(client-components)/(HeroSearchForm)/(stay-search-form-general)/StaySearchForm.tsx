import React, { FC, FormEvent, useEffect } from "react";
import useBookingQueryStore from "@/store/bookingQueryStore";
import LocationInput from "../LocationInput";
import GuestsInput from "../GuestsInput";
import StayDatesRangeInput from "./StayDatesRangeInput";
import { BookingRequest, HotelBooking } from "@/lib/booking-service";

const isHotelBooking = (data: Partial<BookingRequest>): data is HotelBooking =>
  data.booking_type === "HOTEL";

const StaySearchForm: FC = () => {
  const {
    bookingType,
    queryData,
    setBookingType,
    updateQueryField,
    submitQuery,
  } = useBookingQueryStore();

  // Ensure the correct bookingType is set to 'HOTEL' on mount
  useEffect(() => {
    if (bookingType !== "HOTEL") setBookingType("HOTEL");
  }, [bookingType, setBookingType]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!isHotelBooking(queryData)) {
      console.error("Invalid booking type. Expected HOTEL.");
      return;
    }

    try {
      await submitQuery(); // Submit only if booking type matches
      console.log("Hotel booking submitted successfully");
    } catch (e) {
      console.error("Failed to submit hotel booking:", e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full relative mt-8 flex rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800"
    >
      {/* Location Input */}
      <LocationInput
        value={(queryData as HotelBooking).enquired_property || ""}
        setValue={(value) =>
          updateQueryField("enquired_property" as keyof BookingRequest, value)
        }
        className="flex-[1.5]"
      />

      <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>

      {/* Dates Range Input */}
      <StayDatesRangeInput
        startDate={
          (queryData as HotelBooking).checkin_time
            ? new Date((queryData as HotelBooking).checkin_time!)
            : null
        }
        endDate={
          (queryData as HotelBooking).checkout_time
            ? new Date((queryData as HotelBooking).checkout_time!)
            : null
        }
        setStartDate={(date) =>
          updateQueryField(
            "checkin_time" as keyof BookingRequest,
            date?.toISOString() || "",
          )
        }
        setEndDate={(date) =>
          updateQueryField(
            "checkout_time" as keyof BookingRequest,
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
        setGuestAdultsInputValue={(value) =>
          updateQueryField("adult_count", value)
        }
        setGuestChildrenInputValue={(value) =>
          updateQueryField("child_count", value)
        }
        setGuestInfantsInputValue={(value) =>
          updateQueryField("infant_count", value)
        }
        className="flex-1"
      />
    </form>
  );
};

export default StaySearchForm;
