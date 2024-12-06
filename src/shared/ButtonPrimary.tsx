import React from "react";
import Button, { ButtonProps } from "./Button";

export interface ButtonPrimaryProps extends ButtonProps {
  loading?: boolean;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  className = "",
  loading = false,
  children,
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-600 hover:bg-primary-700 text-neutral-50 ${className} ${
        loading ? "cursor-not-allowed opacity-70" : ""
      }`}
      disabled={loading || args.disabled}
      {...args}
    >
      {loading ? (
        <svg
          className="animate-spin h-5 w-5 text-neutral-50"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      ) : (
        children
      )}
    </Button>
  );
};

export default ButtonPrimary;
