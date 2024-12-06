import React, { FC, useState } from "react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import DatePicker from "react-datepicker";

export interface StayDateTimeInputProps {
  className?: string;
  fieldClassName?: string;
  date: Date | null;
  setDate: Function;
  label?: string;
}

const StayDateTimeInput: FC<StayDateTimeInputProps> = ({
  className = "[ lg:nc-flex-2 ]",
  fieldClassName = "[ nc-hero-field-padding ]",
  date,
  setDate,
  label,
}) => {
  const [openDateInput, setOpenDateInput] = useState(false);

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
      <select
        value={date?.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })}
        onChange={(e) => {
          const time = e.target.value;
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
        }}
        className="ml-1 text-sm font-semibold"
      >
        {times.map((time, index) => (
          <option key={index} value={time}>
            {time}
          </option>
        ))}
      </select>
    );
  };

  const renderInput = () => {
    return (
      <>
        <div className="text-neutral-300 dark:text-neutral-400">
          <CalendarIcon className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-grow text-left">
          <span className="block mt-1 text-xs text-neutral-400 leading-none font-light">
            {label}
          </span>
          <span className="flex items-start justify-start xl:text-sm font-semibold spacing-x-1">
            <div
              onClick={() => setOpenDateInput(true)}
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
    <div className={`StayDateTimeInput z-10 relative flex ${className}`}>
      <div
        className={`flex-1 z-10 flex relative ${fieldClassName} items-center space-x-2 focus:outline-none`}
      >
        {renderInput()}
      </div>

      <div className="absolute left-1/2 z-20 mt-3 top-full w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-md">
        <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-neutral-800 p-8">
          <DatePicker
            selected={date}
            onChange={(date) => {
              setDate(date as Date);
              setOpenDateInput(false);
            }}
            showPopperArrow={false}
            inline
          />
        </div>
      </div>
    </div>
  );
};

export default StayDateTimeInput;
