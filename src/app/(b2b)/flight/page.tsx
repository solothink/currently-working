import React, { FC } from "react";
import Link from "next/link";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flight Booking | Idbook hotels™ - Book Your Flights with Ease",
  description:
    "Experience seamless flight booking with Idbook hotels™. Search, compare, and book flights from a wide selection of airlines at competitive prices. Enjoy flexible booking options, user-friendly seat selection, and transparent pricing. Enhance your travel experience by integrating your flight bookings with hotel and transport arrangements. Plan your trip today!",
};

export interface PageFlightProps {}

const PageFlight: FC<PageFlightProps> = () => {
  return (
    <div className="nc-PageFlight overflow-hidden relative">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-6">Flight Booking</h1>
        <div
          className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6"
          role="alert"
        >
          <p className="font-bold">Coming Soon!</p>
          <p>
            We&apos;re working on bringing you a seamless flight booking
            experience. Please check back soon!
          </p>
        </div>
        <p className="text-lg mb-8">
          Our flight booking feature is currently under development. We&apos;re
          excited to offer you an easy way to search, compare, and book flights
          from various airlines around the world.
        </p>
        <div className="bg-gray-100 p-6 rounded-lg max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl font-semibold mb-4">What to Expect</h2>
          <ul className="text-left list-disc pl-6 mb-4">
            <li>Wide selection of airlines and routes</li>
            <li>Competitive prices and exclusive deals</li>
            <li>Easy comparison of flight options</li>
            <li>Flexible booking options (one-way, round-trip, multi-city)</li>
            <li>
              Integration with hotel bookings for complete travel packages
            </li>
            <li>User-friendly seat selection</li>
            <li>Transparent fee structure and price breakdown</li>
          </ul>
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Plan Your Trip</h3>
          <p className="mb-4">
            While we&apos;re perfecting our flight booking system, you can still
            plan other aspects of your trip:
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/hotels" className="text-blue-600 hover:text-blue-800">
              Book Hotels
            </Link>
            <Link
              href="/transport"
              className="text-blue-600 hover:text-blue-800"
            >
              Book Transport
            </Link>
          </div>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg max-w-md mx-auto mb-8">
          <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
          <p className="mb-4">
            Want to be the first to know when our flight booking is ready for
            takeoff?
          </p>
          <NewsletterSubscribe />
        </div>
        <div className="mt-12 text-center">
          <Link href={"/"} className="text-blue-600 hover:text-blue-800 mr-4">
            Return to Home
          </Link>
          <Link href={"/contact"} className="text-blue-600 hover:text-blue-800">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageFlight;
