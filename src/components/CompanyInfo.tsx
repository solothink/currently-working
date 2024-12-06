"use client";

import React from "react";

const CompanyInfo: React.FC = () => {
  return (
    <div className="">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
        {/* Registered Address */}
        <div>
          <h2 className="font-semibold text-neutral-700 dark:text-neutral-200 text-lg mb-3">
            Registered Address
          </h2>
          <p className="leading-relaxed text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white">
            VPO– Sarhaul, SEC-18, Gurugram, <br />
            Gurugram, Haryana, 122001
          </p>
        </div>

        {/* Legal Name & GST */}
        <div>
          <h2 className="font-semibold text-neutral-700 dark:text-neutral-200 text-lg mb-3">
            Legal Name & GST
          </h2>
          <p className="leading-relaxed text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white">
            Idbook Hospitality Private Limited <br />
            GSTIN: 06AAECI8163K1Z9
          </p>
        </div>

        {/* CIN Information */}
        <div className=" flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold ">CIN :</h2>
            <p className="leading-relaxed">U74999HR2018PTC073257 </p>
          </div>
          <div className="flex items-center gap-2">
            <h2 className="font-semibold ">PAN No :</h2>
            <p className="leading-relaxed">AAECI8163K </p>
          </div>

          <div className="flex items-center gap-2">
            <h2 className="font-semibold">TAN :</h2>
            <p className="leading-relaxed">RTKI02839E </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
