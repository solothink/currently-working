"use client";

import React, { useState, useEffect } from "react";
import {
  MdUpcoming,
  MdCancel,
  MdCheckCircle,
  MdHotel,
  MdBeachAccess,
  MdDirectionsCar,
  MdFlight,
  MdCalendarToday,
  MdWarning,
} from "react-icons/md";
import BookingService, { BookingData } from "@/lib/booking-service";
import { useDebounce } from "use-debounce"; // Make sure to install this
import ButtonPrimary from "@/shared/ButtonPrimary";

interface Booking {
  id: number;
  confirmation_code: string | null;
  booking_type: "HOTEL" | "HOLIDAYPACK" | "VEHICLE" | "FLIGHT";
  adult_count: number;
  child_count: number;
  infant_count: number;
  deal_price: string;
  discount: number;
  final_amount: string;
  total_payment_made: string;
  status: string;
  active: boolean;
  created: string;
  updated: string;
  user: number;
  hotel_booking: any | null;
  holiday_package_booking: any | null;
  vehicle_booking: any | null;
  flight_booking: any | null;
  coupon: any | null;
}

interface BookingHistoryProps {
  initialBookings?: BookingData[];
}

const BookingHistory: React.FC<BookingHistoryProps> = ({
  initialBookings = [],
}) => {
  const [bookings, setBookings] = useState<BookingData[]>(initialBookings);
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const [activeBookingType, setActiveBookingType] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const statusTabs = [
    "ALL",
    "PENDING",
    "CONFIRMED",
    "CANCELLED",
    "COMPLETED",
    "NO_SHOW",
  ];
  const bookingTypes = ["ALL", "HOTEL", "HOLIDAYPACK", "VEHICLE", "FLIGHT"];

  const [debouncedActiveTab] = useDebounce(activeTab, 300);
  const [debouncedActiveBookingType] = useDebounce(activeBookingType, 300);

  useEffect(() => {
    fetchBookings();
  }, [currentPage, debouncedActiveTab, debouncedActiveBookingType]);

  const fetchBookings = async () => {
    setIsLoading(true);
    setErrorMessage(null); // Reset error message
    try {
      const response = await BookingService.getBookingHistory({
        offset: (currentPage - 1) * 5,
        limit: 5,
        status:
          debouncedActiveTab !== "ALL"
            ? debouncedActiveTab.toLowerCase()
            : undefined,
        booking_type:
          debouncedActiveBookingType !== "ALL"
            ? debouncedActiveBookingType
            : undefined,
      });

      if (response.status === "success" && response.data) {
        setBookings(response.data as BookingData[]);
        setTotalPages(Math.ceil(response.count ? response.count / 5 : 1));
      } else {
        setBookings([]);
        setErrorMessage("No bookings found.");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      // Define a type for error handling
      const backendMessage =
        (error as any)?.response?.data?.message || // Change `any` to a more specific type if possible
        "An error occurred while fetching bookings.";
      setErrorMessage(backendMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "text-green-500";
      case "pending":
        return "text-yellow-500";
      case "cancelled":
        return "text-red-500";
      case "no_show":
        return "text-purple-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return <MdCheckCircle className="mr-2" />;
      case "pending":
        return <MdUpcoming className="mr-2" />;
      case "cancelled":
        return <MdCancel className="mr-2" />;
      case "no_show":
        return <MdWarning className="mr-2" />;
      default:
        return <MdCalendarToday className="mr-2" />;
    }
  };

  const getBookingTypeIcon = (type: string) => {
    switch (type) {
      case "HOTEL":
        return <MdHotel className="inline-block mr-2 text-2xl" />;
      case "HOLIDAYPACK":
        return <MdBeachAccess className="inline-block mr-2 text-2xl" />;
      case "VEHICLE":
        return <MdDirectionsCar className="inline-block mr-2 text-2xl" />;
      case "FLIGHT":
        return <MdFlight className="inline-block mr-2 text-2xl" />;
      default:
        return <MdCalendarToday className="inline-block mr-2 text-2xl" />;
    }
  };

  const renderBookingDetails = (booking: BookingData) => {
    switch (booking.booking_type) {
      case "HOTEL":
        return (
          <div>
            <p className="font-semibold">
              {booking.hotel_booking?.enquired_property}
            </p>
            <p>
              Check-in:{" "}
              {new Date(
                booking.hotel_booking?.checkin_time,
              ).toLocaleDateString()}
            </p>
            <p>
              Check-out:{" "}
              {new Date(
                booking.hotel_booking?.checkout_time,
              ).toLocaleDateString()}
            </p>
          </div>
        );
      case "HOLIDAYPACK":
        return (
          <div>
            <p className="font-semibold">
              {booking.holiday_package_booking?.enquired_holiday_package}
            </p>
            <p>Duration: {booking.holiday_package_booking?.no_days} days</p>
            <p>
              Start Date:{" "}
              {new Date(
                booking.holiday_package_booking?.available_start_date,
              ).toLocaleDateString()}
            </p>
          </div>
        );
      case "VEHICLE":
        return (
          <div>
            <p className="font-semibold">Vehicle Booking</p>
            <p>From: {booking.vehicle_booking?.pickup_addr}</p>
            <p>To: {booking.vehicle_booking?.dropoff_addr}</p>
            <p>
              Pickup:{" "}
              {new Date(booking.vehicle_booking?.pickup_time).toLocaleString()}
            </p>
          </div>
        );
      case "FLIGHT":
        return (
          <div>
            <p className="font-semibold">
              {booking.flight_booking?.flying_from} ✈️{" "}
              {booking.flight_booking?.flying_to}
            </p>
            <p>
              Departure:{" "}
              {new Date(
                booking.flight_booking?.departure_date,
              ).toLocaleString()}
            </p>
            {booking.flight_booking?.return_date && (
              <p>
                Return:{" "}
                {new Date(booking.flight_booking.return_date).toLocaleString()}
              </p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const renderShimmerLoading = () => (
    <div className="animate-pulse flex flex-col space-y-4">
      <div className="bg-gray-200 h-10 rounded-md" />
      <div className="bg-gray-200 h-6 rounded-md" />
      <div className="bg-gray-200 h-6 rounded-md" />
      <div className="bg-gray-200 h-6 rounded-md" />
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <div className="overflow-x-auto mb-6">
        <div className="flex space-x-4 pb-2">
          {statusTabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm font-medium transition-colors flex items-center whitespace-nowrap ${
                activeTab === tab
                  ? "text-primary-600 border-b-2 border-primary-600"
                  : "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {getStatusIcon(tab)}
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {bookingTypes.map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeBookingType === type
                ? "bg-primary-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-primary-500 hover:text-white"
            }`}
            onClick={() => setActiveBookingType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          {renderShimmerLoading()}
        </div>
      ) : errorMessage ? (
        <div className="text-center py-10">
          <p className="text-lg text-red-500">{errorMessage}</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-500">
            No bookings found for the selected filters.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                    {getBookingTypeIcon(booking.booking_type)}
                    {booking.booking_type} Booking
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Booking ID: {booking.id}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium mt-2 sm:mt-0 ${getStatusColor(booking.status)}`}
                >
                  {booking.status}
                </span>
              </div>

              {renderBookingDetails(booking)}

              <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-0">
                  Booked on: {new Date(booking.created).toLocaleDateString()}
                </p>
                <ButtonPrimary href={`/bookings/${booking.id}`}>
                  View & Manage Booking
                </ButtonPrimary>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage >= totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookingHistory;
