"use client";

import React, { FC, useEffect, useState } from "react";
import StaySearchForm from "./(stay-search-form-general)/StaySearchForm";
import ExperiencesSearchForm from "./(experiences-search-form)/ExperiencesSearchForm";
import RentalCarSearchForm from "./(car-search-form)/RentalCarSearchForm";
import FlightSearchForm from "./(flight-search-form)/FlightSearchForm";
import useBookingQueryStore from "@/store/bookingQueryStore";
import ResponseModal from "@/components/features/booking/BookingQueryResposeModal";

export type SearchTab = "Stays" | "Holiday Package" | "Cars" | "Flights";

export interface HeroSearchFormProps {
  className?: string;
  currentTab?: SearchTab;
  currentPage?: "Stays" | "Holiday Package" | "Cars" | "Flights";
}

const HeroSearchForm: FC<HeroSearchFormProps> = ({
  className = "",
  currentTab = "Stays",
  currentPage,
}) => {
  const tabs: SearchTab[] = ["Stays", "Holiday Package", "Cars", "Flights"];

  const {
    bookingType,
    setBookingType,
    resetQueryData,
    isLoading,
    error,
    bookingResponse,
  } = useBookingQueryStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const getBookingTypeFromTab = (tab: SearchTab) => {
    switch (tab) {
      case "Stays":
        return "HOTEL";
      case "Holiday Package":
        return "HOLIDAYPACK";
      case "Cars":
        return "VEHICLE";
      case "Flights":
        return "FLIGHT";
      default:
        return "HOTEL";
    }
  };

  useEffect(() => {
    const initialType = getBookingTypeFromTab(
      currentTab || currentPage || "Stays",
    );
    setBookingType(initialType);
  }, [currentTab, currentPage, setBookingType]);

  const handleTabChange = (tab: SearchTab) => {
    const newBookingType = getBookingTypeFromTab(tab);
    setBookingType(newBookingType);
    resetQueryData();
  };

  useEffect(() => {
    if (isLoading || bookingResponse || error) {
      setIsModalOpen(true);
    }
  }, [isLoading, bookingResponse, error]);

  const renderTab = () => (
    <ul className="ml-2 sm:ml-6 md:ml-12 flex space-x-5 sm:space-x-8 lg:space-x-11 overflow-x-auto hiddenScrollbar">
      {tabs.map((tab) => {
        const active = getBookingTypeFromTab(tab) === bookingType;

        return (
          <li
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`flex-shrink-0 flex items-center cursor-pointer text-sm lg:text-base font-medium ${
              active
                ? ""
                : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-400"
            }`}
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

  const renderForm = () => {
    switch (bookingType) {
      case "HOTEL":
        return <StaySearchForm />;
      case "HOLIDAYPACK":
        return <ExperiencesSearchForm />;
      case "VEHICLE":
        return <RentalCarSearchForm />;
      case "FLIGHT":
        return <FlightSearchForm />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`nc-HeroSearchForm w-full max-w-6xl py-5 lg:py-0 ${className}`}
    >
      {renderTab()}
      {renderForm()}
      <ResponseModal
        isOpen={isModalOpen}
        onClose={() => {
          resetQueryData(); // Reset form after successful submission (optional)
          setIsModalOpen(false);
        }}
        response={bookingResponse}
        error={error}
        isLoading={isLoading}
      />
    </div>
  );
};

export default HeroSearchForm;
