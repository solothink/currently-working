/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | Idbook hotels™",
  description:
    "Understand Idbook Hospitality's Refund Policy. Learn about our customer satisfaction guarantee, eligibility for refunds, return conditions, and how to initiate a return. We strive to ensure a smooth process for all your transactions with us.",
};

const RefundPolicy: React.FC = () => {
  return (
    <div className="overflow-hidden">
      <div className="container mx-auto mt-20 px-4">
        <div className="flex flex-wrap items-center justify-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <div className="flex items-center mb-4">
              <h1 className="text-3xl font-bold ">REFUND POLICY</h1>
            </div>
            <p className="text-left">
              Our focus is complete customer satisfaction. In the event, if you
              are displeased with the services provided, we will refund back the
              money, provided the reasons are genuine and proved after
              investigation. Please read the fine prints of each deal before
              buying it, it provides all the details about the services or the
              product you purchase.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            {/* <Image src="/images/refundpolicypic.png" alt="refundpic" width={500} height={300} className="w-full h-auto" /> */}
          </div>
        </div>

        <div className="relative mt-16">
          {/* <Image src="/images/redhalfspan.png" alt="redhalfspan" width={300} height={100} className="absolute -left-16 -top-24" />
          <Image src="/images/greenhalfspan.png" alt="greenhalfspan" width={300} height={100} className="absolute -right-16 top-0" /> */}
        </div>

        <div className="mt-24 mb-16">
          <h2 className="text-2xl font-bold mb-4">Return and Refund Policy</h2>
          <p className="mb-4">Last updated: December 13th NOV, 2024</p>
          <p className="mb-4">
            Thank you for Shopping at Idbookhotels.com website and idbookhotels
            website/app. If, for any reason, You are not completely satisfied
            with a purchase We invite You to review our policy on refunds and
            returns. This Return and Refund Policy has been created with the
            help of the Idbook legal team. The following terms are applicable
            for any Service that You purchased with Us.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            Interpretation and Definitions
          </h2>
          <h3 className="text-xl font-bold mt-4 mb-2">Interpretation</h3>
          <p className="mb-4">
            The words of which the initial letter is capitalized have meanings
            defined under the following conditions. The following definitions
            shall have the same meaning regardless of whether they appear in
            singular or in plural.
          </p>

          <h3 className="text-xl font-bold mt-4 mb-2">Definitions</h3>
          <p className="mb-4">
            For the purposes of this Return and Refund Policy:
          </p>
          <ul className="list-disc pl-8 mb-4">
            <li>
              Application means the software program provided by the Company
              downloaded by You on any electronic device, named idbookhotels
            </li>
            <li>
              Company (referred to as either "the Company", "We", "Us" or "Our"
              in this Agreement) refers to Idbook hospitality Private limited,
              PLOT NO 234, GROUND FLOOR, OPPOSITE ICICI BANK ATM, NEAR POLICE
              STATION, SECTOR 18, SARHAUL, GURUGRAM.
            </li>
            <li>Orders mean a request by You to purchase Services from Us.</li>
            <li>
              Service refers to the Application or the Website or both or call
              or whatsaap the contacts given in website only.
            </li>
            <li>
              Website refers to idbookhotels.com, accessible from
              https://www.idbookhotels.com/contact.html
            </li>
            <li>
              You means the individual accessing or using the Service, or the
              company, or other legal entity on behalf of which such individual
              is accessing or using the Service, as applicable.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            Your Order Cancellation Rights
          </h2>
          <p className="mb-4">
            You are entitled to cancel Your booking within as per given the
            policy on each and every booking, without giving any reason for
            doing so. The deadline for cancelling a booking. In order to
            exercise Your right of cancellation, You must inform Us of your
            decision by means of a clear statement. You can inform us of your
            decision by:
          </p>
          <ul className="list-disc pl-8 mb-4">
            <li>By email: support@idbookhotels.com</li>
            <li>
              By visiting this page on our website: https://www.idbookhotels.com
            </li>
            <li>By whatsaap number: +91 8800150924</li>
          </ul>
          <p className="mb-4">
            We will reimburse You no later than 60 days from the day on which We
            receive the cancellation request from your side. We will use the
            method selected by you, we have wallet and payment of payment as You
            used for the Order.
          </p>
          {/* 
          <h2 className="text-2xl font-bold mt-8 mb-4">
            Conditions for Returns
          </h2>
          <p className="mb-4">
            We reserve the right to refuse the cancellation of any merchandise
            that does not meet the above return conditions in our sole
            discretion. Only regular priced of the services may be refunded.
            Unfortunately, services on sale cannot be refunded. This exclusion
            may not apply to You if it is not permitted by applicable law.
          </p> */}

          <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about our Returns and Refunds Policy,
            please contact us:
          </p>
          <ul className="list-disc pl-8 mb-4">
            <li>By email: support@idbookhotels.com</li>
            <li>
              By visiting this page on our website: https://www.idbookhotels.com
            </li>
            <li>By whatsaap number: +91 8800150924</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
