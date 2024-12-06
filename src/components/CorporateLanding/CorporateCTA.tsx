import React from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export default function CorporateLoginCTA() {
  return (
    <div className="bg-primary-900 text-white py-16 rounded-lg">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Access Your Corporate Account
          </h2>
          <p className="text-lg mb-8 text-primary-100">
            Manage your bookings, track expenses, and access exclusive corporate
            rates all in one place.
          </p>
          <ButtonPrimary
            href="/corporate/signup"
            className="bg-white text-primary-900 hover:bg-primary-100 transition-colors duration-300"
          >
            Register as a Corporate Member
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </ButtonPrimary>
          <p className="mt-6 text-sm text-primary-200">
            Already a corporate member?{" "}
            <a href="/corporate/login" className="underline hover:text-white">
              Login
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
