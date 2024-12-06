import React from "react";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa";
import AccordionItem from "./AccordionItem";

const HassleFreeGST: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary-800 dark:text-primary-200">
        Hassle-free GST
      </h2>
      <div className="flex flex-col md:flex-row items-start justify-between">
        <div className="md:w-1/2 space-y-4 mb-8 md:mb-0 flex flex-col justify-center h-[400px]">
          <AccordionItem title="Claim input credit in every state" />
          <AccordionItem title="Claim input credit for full GST amount" />
          <AccordionItem title="One - time Vendor Registration & Payment" />
        </div>
        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/corporate/gst.png"
            alt="GST Illustration"
            width={400}
            height={400}
            className="max-w-full h-[400px]"
          />
        </div>
      </div>
    </div>
  );
};

export default HassleFreeGST;
