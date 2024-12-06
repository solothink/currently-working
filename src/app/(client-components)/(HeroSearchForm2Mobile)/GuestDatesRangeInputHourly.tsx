"use client";

import DatePicker from "react-datepicker";
import React, { FC, Fragment, useEffect, useState } from "react";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "@/components/DatePickerCustomDay";

export interface StayDatesRangeInputProps {
  className?: string;
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: Function;
  setEndDate: Function;
}

const GuestDatesRangeInputHourly: FC<StayDatesRangeInputProps> = ({
  className = "",
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  const onChangeDate = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className="w-full">
      <div className="p-5">
        <span className="block font-semibold text-xl sm:text-2xl">
          {` When's your trip?`}
        </span>
      </div>

      <div className="flex items-center justify-evenly font-semibold text-xl sm:text-2xl mx-auto max-w-xl">
        <p>Check In</p>
        <p>-</p>
        <p>Check Out</p>
      </div>

      <div
        className={`relative flex flex-shrink-0 flex justify-center z-10 py-5 ${className} `}
      >
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date as Date)}
          startDate={startDate}
          endDate={endDate}
          dateFormat="MMMM d, yyyy h:mm aa"
          // selectsRange
          // monthsShown={2}
          selectsStart
          showPopperArrow={false}
          inline
          showTimeInput
          renderCustomHeader={(p) => <DatePickerCustomHeaderTwoMonth {...p} />}
          renderDayContents={(day, date) => (
            <DatePickerCustomDay dayOfMonth={day} date={date} />
          )}
        />
        <DatePicker
          selected={startDate}
          onChange={(date) => setEndDate(date as Date)}
          startDate={startDate}
          endDate={endDate}
          dateFormat="MMMM d, yyyy h:mm aa"
          // selectsRange
          // monthsShown={2}
          showPopperArrow={false}
          selectsEnd
          inline
          showTimeInput
          renderCustomHeader={(p) => <DatePickerCustomHeaderTwoMonth {...p} />}
          renderDayContents={(day, date) => (
            <DatePickerCustomDay dayOfMonth={day} date={date} />
          )}
        />
      </div>
    </div>
  );
};

export default GuestDatesRangeInputHourly;
