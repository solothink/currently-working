"use client";
import React, { FC } from "react";
import OtpInput from "react18-input-otp";

interface OtpComponentProps {
  emailCountdown: number | null;
  startCountdown: () => void;
  error?: string; // Optional error message
  otpValue: string; // Current OTP value
  onOtpChange: (value: string) => void; // Function to handle OTP change
  onResendOtp: () => void; // Function to call when resending OTP
}

const OtpComponent: FC<OtpComponentProps> = ({
  emailCountdown,
  startCountdown,
  error,
  otpValue,
  onOtpChange,
  onResendOtp, // New prop for resending OTP
}) => {
  return (
    <div>
      <label className="block">
        <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
          OTP
        </span>
        <OtpInput
          value={otpValue} // Use the value from props
          onChange={onOtpChange} // Use the function from props
          numInputs={4} // Change to 4 for 4-digit OTP
          separator={<span>-</span>}
          containerStyle={"flex flex-row space-x-2 mt-4 md:mt-8"}
          inputStyle={
            "w-12 h-12 text-2xl text-center border-2 border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-primary-600 dark:focus:border-primary-500 bg-neutral-50 dark:bg-neutral-800 mx-1 px-8"
          }
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}{" "}
        {/* Display error message */}
        <div className="text-sm font-medium flex justify-end mt-4">
          {emailCountdown !== null ? (
            `Resend in ${emailCountdown} seconds`
          ) : (
            <p
              onClick={() => {
                startCountdown(); // Start the countdown
                onResendOtp(); // Call the resend OTP function
              }}
              className="text-sm font-medium cursor-pointer text-primary-600 dark:text-primary-500"
            >
              Resend OTP
            </p>
          )}
        </div>
      </label>
    </div>
  );
};

export default OtpComponent;
