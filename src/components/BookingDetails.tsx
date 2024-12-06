"use client";

import React, { useState } from "react";
import Image from "next/image";
import StartRating from "@/components/StartRating";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { toast } from "react-toastify";
import { api } from "@/lib/api/client";

interface User {
  name: string;
  email: string;
}

interface HotelBooking {
  enquired_property: string;
  booking_slot?: string;
  room_type?: string;
  checkin_time: string;
  checkout_time: string;
  bed_count: number;
  confirmed_property?: Record<string, any>;
  room?: Record<string, any>;
}

interface HolidayPackageBooking {
  id: number;
  no_days: number;
  available_start_date: string;
  enquired_holiday_package: string;
  confirmed_holiday_package?: Record<string, any>;
}

interface VehicleBooking {
  pickup_addr: string;
  dropoff_addr: string;
  pickup_time: string;
  vehicle_type?: string;
}

interface FlightBooking {
  flight_trip: string;
  flight_class: string;
  departure_date: string;
  return_date?: string;
  flying_from: string;
  flying_to: string;
}

export interface BookingData {
  id: number;
  confirmation_code?: string | null;
  invoice_id?: string | null;
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
  user: User;
  hotel_booking?: HotelBooking | null;
  holiday_package_booking?: HolidayPackageBooking | null;
  vehicle_booking?: VehicleBooking | null;
  flight_booking?: FlightBooking | null;
}

interface BookingDetailsProps {
  booking: BookingData;
}

export default function BookingDetails({ booking }: BookingDetailsProps) {
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancelBooking = async () => {
    setIsCancelling(true);
    try {
      await api.post(`/booking/bookings/${booking.id}/cancel/`, {});
      toast.success("Booking cancelled successfully");
    } catch (error) {
      toast.error("Failed to cancel booking");
    } finally {
      setIsCancelling(false);
    }
  };

  const renderBookingDetails = () => {
    switch (booking.booking_type) {
      case "HOTEL":
        return (
          booking.hotel_booking && (
            <>
              <span className="text-base sm:text-lg font-medium mt-1 block text-primary-700 dark:text-primary-300">
                {booking.hotel_booking.enquired_property}
              </span>
              <span className="block text-sm text-neutral-500 dark:text-neutral-400">
                {booking.hotel_booking.room_type} -{" "}
                {booking.hotel_booking.bed_count} beds
              </span>
            </>
          )
        );

      case "HOLIDAYPACK":
        return (
          booking.holiday_package_booking && (
            <>
              <span className="text-base sm:text-lg font-medium mt-1 block text-primary-700 dark:text-primary-300">
                {booking.holiday_package_booking.enquired_holiday_package}
              </span>
              <span className="block text-sm text-neutral-500 dark:text-neutral-400">
                {booking.holiday_package_booking.no_days} days
              </span>
            </>
          )
        );

      case "VEHICLE":
        return (
          booking.vehicle_booking && (
            <>
              <span className="text-base sm:text-lg font-medium mt-1 block text-primary-700 dark:text-primary-300">
                {booking.vehicle_booking.vehicle_type || "Vehicle"}
              </span>
              <span className="block text-sm text-neutral-500 dark:text-neutral-400">
                Pickup: {booking.vehicle_booking.pickup_addr} <br />
                Dropoff: {booking.vehicle_booking.dropoff_addr || "N/A"}
              </span>
            </>
          )
        );

      case "FLIGHT":
        return (
          booking.flight_booking && (
            <>
              <span className="text-base sm:text-lg font-medium mt-1 block text-primary-700 dark:text-primary-300">
                {booking.flight_booking.flight_class} Class
              </span>
              <span className="block text-sm text-neutral-500 dark:text-neutral-400">
                {booking.flight_booking.flying_from} to{" "}
                {booking.flight_booking.flying_to}
              </span>
            </>
          )
        );

      default:
        return null;
    }
  };

  const renderContent = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl space-y-10 px-0 sm:p-6 xl:p-8">
        <h2 className="text-3xl lg:text-4xl font-semibold text-primary-700 dark:text-primary-300">
          Booking Details
        </h2>

        {booking.invoice_id && (
          <ButtonPrimary
            href={`/invoices/${booking.invoice_id}`}
            className="self-start"
          >
            View Invoice
          </ButtonPrimary>
        )}

        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-primary-600 dark:text-primary-400">
            Your booking
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex-shrink-0 w-full sm:w-40">
              <div className="aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
                <Image
                  fill
                  alt={
                    booking.hotel_booking?.enquired_property || "Booking Image"
                  }
                  className="object-cover"
                  src="/placeholder.svg?height=300&width=400"
                />
              </div>
            </div>
            <div className="pt-5 sm:pb-5 sm:px-5 space-y-3">
              <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                {booking.booking_type} booking
              </span>
              {renderBookingDetails()}
              <div className="w-10 border-b border-neutral-200 dark:border-neutral-700"></div>
              <StartRating />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-primary-600 dark:text-primary-400">
            Booking details
          </h3>
          <div className="flex flex-col space-y-4">
            <div className="flex text-neutral-600 dark:text-neutral-300">
              <span className="flex-1">Booking code</span>
              <span className="flex-1 font-medium text-primary-700 dark:text-primary-300">
                {booking.confirmation_code || "Not available"}
              </span>
            </div>
            <div className="flex text-neutral-600 dark:text-neutral-300">
              <span className="flex-1">Date</span>
              <span className="flex-1 font-medium text-primary-700 dark:text-primary-300">
                {new Date(booking.created).toLocaleDateString()}
              </span>
            </div>
            <div className="flex text-neutral-600 dark:text-neutral-300">
              <span className="flex-1">Total</span>
              <span className="flex-1 font-medium text-primary-700 dark:text-primary-300">
                ₹{booking.final_amount}
              </span>
            </div>
            <div className="flex justify-between text-neutral-600 dark:text-neutral-300">
              <span className="flex-1">Status</span>
              <span className="flex-1 font-medium text-primary-700 dark:text-primary-300">
                {booking.status}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <ButtonPrimary href="/">Explore more stays</ButtonPrimary>
          <ButtonPrimary
            onClick={handleCancelBooking}
            disabled={isCancelling || booking.status !== "pending"}
            className="bg-red-600 hover:bg-red-700"
          >
            {isCancelling ? "Cancelling..." : "Cancel Booking"}
          </ButtonPrimary>
        </div>
      </div>
    );
  };

  return (
    <div className="nc-PayPage bg-neutral-50 dark:bg-neutral-900">
      <main className="container mt-11 mb-24 lg:mb-32 ">
        <div className="max-w-4xl mx-auto">{renderContent()}</div>
      </main>
    </div>
  );
}
