"use client";

import React from "react";
import Image from "next/image";
import visaImg from "@/images/payments/visa.png"; // Replace with actual image path
import mastercardImg from "@/images/payments/mastercard.png";
import amexImg from "@/images/payments/amex.png";
import paypalImg from "@/images/payments/paypal.png";
import rupayImg from "@/images/payments/rupay.png";
import upiImg from "@/images/payments/upi.png";
import paytmImg from "@/images/payments/paytm.png";
import pciDssImg from "@/images/payments/pcidss.png";

const PaymentsAndSubscription: React.FC = () => {
  return (
    <div className=" text-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-8">
        {/* Payments & Security Section */}
        <div>
          <h2 className="font-semibold text-neutral-700 dark:text-neutral-200 text-center text-lg mb-5">
            Payments & Security
          </h2>
          {/* Container for the images */}
          <div className="grid grid-cols-4 gap-4 items-center">
            <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg p-1 flex justify-center">
              <Image
                src={visaImg}
                alt="Visa"
                className="h-12 w-full  rounded-lg"
              />
            </div>
            <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg p-1 flex justify-center">
              <Image
                src={mastercardImg}
                alt="MasterCard"
                className="h-12 w-full  rounded-lg"
              />
            </div>
            <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg p-1 flex justify-center">
              <Image
                src={amexImg}
                alt="American Express"
                className="h-12 w-full  rounded-lg"
              />
            </div>
            <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg p-1 flex justify-center">
              <Image
                src={paypalImg}
                alt="PayPal"
                className="h-12 w-full  rounded-lg"
              />
            </div>
            <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg p-1 flex justify-center">
              <Image
                src={rupayImg}
                alt="RuPay"
                className="h-12 w-full  rounded-lg"
              />
            </div>
            <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg p-1 flex justify-center">
              <Image
                src={upiImg}
                alt="UPI"
                className="h-12 w-full  rounded-lg"
              />
            </div>
            <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg p-1 flex justify-center">
              <Image
                src={paytmImg}
                alt="PayTM"
                className="h-12 w-full  rounded-lg"
              />
            </div>
            <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg p-1 flex justify-center">
              <Image
                src={pciDssImg}
                alt="PCI DSS"
                className="h-12 w-full  rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Email Subscription Section */}
        <div className="border-t-2 pt-4 md:pt-0 md:border-t-0 md:border-l-2 border-white pl-6">
          <h2 className="font-semibold text-neutral-700 dark:text-neutral-200 text-center mb-8 text-lg">
            Get Latest Offers
          </h2>
          {/* Main Container */}
          <div className="flex items-center bg-white rounded-lg shadow-lg dark:shadow-[0px_9px_4.6px_0px_rgba(255,255,255,0.25)]">
            {/* Input Field */}
            <input
              type="email"
              placeholder="Enter Your Email"
              className="px-4 py-1.5 text-gray-600 border border-gray-300 border-r-0 rounded-l-lg focus:outline-none w-full"
            />

            {/* Subscribe Button */}
            <button className="flex items-center px-4 py-2 bg-primary-800 text-white hover:bg-primary-900 border border-gray-300 border-l-0 rounded-r-lg">
              {/* Icon (RSS Feed) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 6.75a.75.75 0 01.75-.75h.001c7.042 0 12.75 5.707 12.75 12.75a.75.75 0 01-.75.75h-2.982a.75.75 0 01-.75-.75C14.52 14.216 9.784 9.48 5.25 9.48a.75.75 0 01-.75-.75V6.75zm-.748 4.994a.75.75 0 011.06-.06A10.482 10.482 0 0116.25 16.25a.75.75 0 01-.75.75h-2.983a.75.75 0 01-.75-.75c0-2.984-2.418-5.403-5.402-5.403a.75.75 0 01-.749-.75v-2.982zm-.749 4.993a.75.75 0 01.751-.751c2.97 0 5.376 2.406 5.376 5.376a.75.75 0 01-.75.75H8.25a.75.75 0 01-.75-.75 1.125 1.125 0 00-2.249 0 .75.75 0 01-.751.75H3a.75.75 0 01-.748-.748v-2.985z"
                />
              </svg>
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsAndSubscription;
