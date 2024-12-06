"use client";
import React, { useState } from "react";
import OtpInput from "react18-input-otp";
export default function ReactOtpInput() {
  const [otp, setOtp] = useState("");
  const handleChange = (enteredOtp: string) => {
    setOtp(enteredOtp);
  };
  return (
    <OtpInput
      value={otp}
      onChange={handleChange}
      numInputs={6}
      separator={<span>-</span>}
      containerStyle={"flex flex-row space-x-2 mt-4 md:mt-8"}
      inputStyle={
        "w-12 h-12 text-2xl text-center border-2 border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-primary-600 dark:focus:border-primary-500 bg-neutral-50 dark:bg-neutral-800 mx-1 px-8"
      }
    />
  );
}
