import React, { FC } from "react";
import Link from "next/link";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Holiday Packages | Idbook hotels™ - Explore Unique Destinations",
  description:
    "Discover amazing holiday packages with Idbook hotels™. Whether you're seeking adventure, relaxation, or cultural experiences, we offer a range of accommodations in popular destinations worldwide. Enjoy exclusive deals and tailored experiences that make your travel planning effortless. Explore eco retreats, floating residences, and more!",
};

export interface PageHolidayPackageProps {}

const PageHolidayPackage: FC<PageHolidayPackageProps> = () => {
  return (
    <div className="nc-PageHolidayPackage overflow-hidden relative">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-6">Holiday Packages</h1>
        <div
          className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6"
          role="alert"
        >
          <p className="font-bold">Coming Soon!</p>
          <p>
            We&apos;re working hard to bring you exciting holiday packages.
            Please check back soon!
          </p>
        </div>
        <p className="text-lg mb-8">
          Our holiday package feature is currently in development. We&apos;re
          excited to offer you curated travel experiences that combine flights,
          accommodations, and activities for unforgettable vacations.
        </p>
        <div className="text-gray-600 mb-8">
          <p>
            While we&apos;re putting the finishing touches on our holiday
            packages, you can still book individual services:
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              Book Hotels
            </Link>
            <Link href="/flights" className="text-blue-600 hover:text-blue-800">
              Book Flights
            </Link>
            <Link
              href="/transport"
              className="text-blue-600 hover:text-blue-800"
            >
              Book Transport
            </Link>
          </div>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg max-w-md mx-auto">
          <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
          <p className="mb-4">
            Want to be the first to know when our holiday packages are ready?
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

export default PageHolidayPackage;
