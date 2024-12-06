import React, { FC } from "react";
import Link from "next/link";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transport Booking | Idbook hotels™",
  description:
    "Book your transport effortlessly with Idbook hotels™! Whether you need a car, van, or other transportation options, we provide a seamless booking experience. Explore our range of vehicles, competitive pricing, and reliable services tailored for your travel needs. Enjoy hassle-free travel and convenience at your fingertips. Reserve your ride today and make your journey smoother with Idbook hotels™!",
};

export interface PageTransportProps {}

const PageTransport: FC<PageTransportProps> = () => {
  return (
    <div className="nc-PageTransport overflow-hidden relative">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-6">Transport Booking</h1>
        <div
          className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6"
          role="alert"
        >
          <p className="font-bold">Coming Soon!</p>
          <p>
            We&apos;re working on bringing you convenient transport booking
            options. Please check back soon!
          </p>
        </div>
        <p className="text-lg mb-8">
          Our transport booking feature is currently under development.
          We&apos;re excited to offer you a seamless way to book various
          transportation options for your travels.
        </p>
        <div className="bg-gray-100 p-6 rounded-lg max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl font-semibold mb-4">What to Expect</h2>
          <ul className="text-left list-disc pl-6 mb-4">
            <li>Car rentals from top providers</li>
            <li>Airport transfers and shuttle services</li>
            <li>Train and bus ticket bookings</li>
            <li>Luxury vehicle options for special occasions</li>
            <li>Integration with your hotel and flight bookings</li>
          </ul>
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">
            Need Transportation Now?
          </h3>
          <p className="mb-4">
            While we&apos;re developing our transport booking system, you can
            still book other travel services:
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/hotels" className="text-blue-600 hover:text-blue-800">
              Book Hotels
            </Link>
            <Link href="/flights" className="text-blue-600 hover:text-blue-800">
              Book Flights
            </Link>
          </div>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg max-w-md mx-auto mb-8">
          <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
          <p className="mb-4">
            Want to be the first to know when our transport booking is ready?
          </p>
          <NewsletterSubscribe />
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

export default PageTransport;
