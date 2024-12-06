import React, { useState } from "react";
import {
  IoMail,
  IoCall,
  IoCopy,
  IoClose,
  IoCheckmarkDoneSharp,
} from "react-icons/io5";
import { useCorporateData } from "@/hooks/useCorporateData"; // Ensure correct path to your hook
import Image from "next/image"; // For optimized image loading
import avatar1 from "@/images/avatars/default.webp";

// Shimmer placeholder component
const Shimmer = () => (
  <div className="animate-pulse flex space-x-4">
    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
    <div className="flex-1 space-y-2 py-1">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
    </div>
  </div>
);

const AccountManagerChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Use the custom hook to get corporate data
  const { profileQuery } = useCorporateData();
  const { data, isLoading, isError } = profileQuery;

  const rep = data?.business_rep; // Business representative details

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "email") {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="p-4">
        <Shimmer />
      </div>
    );
  }

  if (isError) return <p>Error fetching data!</p>; // Handle error
  if (!rep) return null; // Render nothing if no representative data

  return (
    <div className="self-center">
      {/* Top Bar */}
      <div
        className="bg-primary-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 px-2 py-1 flex justify-between items-center rounded-full border-2 border-orange-300 hover:border-orange-400 transition-all duration-300 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex items-center space-x-3">
          <Image
            src={data.company_logo || avatar1}
            alt={rep.name}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full border-2 border-white"
          />
          <div>
            <div className="text-sm leading-tight font-semibold text-neutral-900 dark:text-white">
              Meet {rep.name}
            </div>
            <div className="text-xs opacity-90 leading-snug">
              Your Account Manager
            </div>
          </div>
        </div>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute right-4 top-16 w-80 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700">
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-neutral-900 dark:text-white">
                  Hi, I am {rep.name}, Your Account Manager
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
                  Talk to me on how to get the best out of Idbook
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                  I&apos;ve helped 1000+ businesses streamline over 20+
                  countries in last 20 days.
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                <IoClose className="w-5 h-5" />
              </button>
            </div>

            {/* Contact Details */}
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between group">
                <div className="flex items-center space-x-2 text-neutral-700 dark:text-neutral-300">
                  <IoMail className="w-4 h-4" />
                  <span className="text-sm">{rep.email}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(rep.email, "email")}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {copiedEmail ? (
                    <IoCheckmarkDoneSharp className="w-4 h-4 text-green-500" />
                  ) : (
                    <IoCopy className="w-4 h-4 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200" />
                  )}
                </button>
              </div>
              <div className="flex items-center justify-between group">
                <div className="flex items-center space-x-2 text-neutral-700 dark:text-neutral-300">
                  <IoCall className="w-4 h-4" />
                  <span className="text-sm">{rep.mobile_number}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(rep.mobile_number, "phone")}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {copiedPhone ? (
                    <IoCheckmarkDoneSharp className="w-4 h-4 text-green-500" />
                  ) : (
                    <IoCopy className="w-4 h-4 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200" />
                  )}
                </button>
              </div>
            </div>

            {/* Call Button */}
            <button className="mt-4 w-full bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 text-white rounded-lg py-2 px-4 transition-colors flex items-center justify-center space-x-2">
              <IoCall className="w-4 h-4" />
              <span>Call Now</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountManagerChat;
