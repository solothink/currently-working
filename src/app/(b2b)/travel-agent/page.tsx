import React, { FC } from "react";
import Link from "next/link";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Agents Partnership | Idbook hotels™",
  description:
    "Join the Idbook hotels™ network as a travel agent and unlock exclusive benefits! Collaborate with us to offer your clients unmatched hospitality solutions, competitive rates, and a diverse range of accommodations. Enhance your business with our user-friendly platform, dedicated support, and promotional tools designed for success. Partner with Idbook hotels™ today and elevate your travel services to new heights!",
};

export interface PageTravelAgentProps {}

const PageTravelAgent: FC<PageTravelAgentProps> = () => {
  return (
    <div className="nc-PageTravelAgent overflow-hidden relative">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-6">Travel Agent Portal</h1>
        <div
          className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6"
          role="alert"
        >
          <p className="font-bold">Coming Soon!</p>
          <p>
            We&apos;re working on creating a powerful portal for travel agents.
            Please check back soon!
          </p>
        </div>
        <p className="text-lg mb-8">
          Our Travel Agent Portal is currently under development. We&apos;re
          excited to bring you a comprehensive platform that will streamline
          your booking process and enhance your ability to serve your clients.
        </p>
        <div className="bg-gray-100 p-6 rounded-lg max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl font-semibold mb-4">What to Expect</h2>
          <ul className="text-left list-disc pl-6 mb-4">
            <li>
              Easy access to our extensive inventory of hotels and packages
            </li>
            <li>Competitive commission rates</li>
            <li>Real-time availability and instant booking confirmation</li>
            <li>Detailed reporting and analytics tools</li>
            <li>Dedicated support for travel agents</li>
          </ul>
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">
            Interested in Partnering with Us?
          </h3>
          <p className="mb-4">
            While our portal is being developed, you can express your interest
            by contacting our partnership team:
          </p>
          <p className="font-semibold text-blue-600">
            partner.b2b@idbookhotels.com
          </p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg max-w-md mx-auto mb-8">
          <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
          <p className="mb-4">
            Want to be the first to know when our Travel Agent Portal launches?
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

export default PageTravelAgent;
