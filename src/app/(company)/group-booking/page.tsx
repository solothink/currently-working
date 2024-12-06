import { Metadata } from "next";
import Link from "next/link";
import React, { FC } from "react";

export const metadata: Metadata = {
  title: "Group Booking | Idbook hotels™ - Affordable and Convenient",
  description:
    "Plan your next group trip with Idbook hotels™ and enjoy exclusive discounts on group bookings. Whether it's for corporate events, family reunions, or group vacations, our easy-to-use platform offers tailored solutions to meet your needs. Contact our team for personalized assistance and make your group travel experience seamless and enjoyable.",
};

export interface PageGroupBookingProps {}

const PageGroupBooking: FC<PageGroupBookingProps> = () => {
  return (
    <div className="nc-PageGroupBooking overflow-hidden relative">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-6">Group Booking</h1>
        <div
          className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6"
          role="alert"
        >
          <p className="font-bold">Under Development</p>
          <p>
            We&apos;re working hard to bring you group booking functionality.
            Please check back soon!
          </p>
        </div>
        <p className="text-lg mb-8">
          Our group booking feature is currently in development. We&apos;re
          excited to offer this service to you soon, making it easier to book
          accommodations for large groups.
        </p>
        <div className="text-gray-600">
          <p>
            In the meantime, if you need assistance with group bookings, please
            contact our customer support:
          </p>
          <Link href={"/about"} className="text-blue-600 hover:text-blue-800">
            About Us
          </Link>
        </div>
        <div className="mt-8">
          <Link href={"/"} className="text-blue-600 hover:text-blue-800">
            Back to Home
          </Link>
          <span className="mx-2">|</span>
          <Link href={"/contact"} className="text-blue-600 hover:text-blue-800">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageGroupBooking;
