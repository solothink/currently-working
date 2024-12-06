import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
  required?: boolean;
  hasError?: boolean;
  helpText?: string;
  sizeClass?: string;
  fontClass?: string;
  rounded?: string;
  labelClass?: string;
}

// Using React.forwardRef to forward the ref to the input element
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      labelClass,
      required,
      errorMessage,
      hasError,
      className = "",
      sizeClass = "h-11 px-4 py-3",
      fontClass = "text-sm font-normal",
      rounded = "rounded-2xl",
      helpText,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="form-group block">
        <label
          className={`nc-Label text-sm font-medium text-neutral-700 dark:text-neutral-300 ${labelClass}`}
        >
          {label} {required && <span className="text-red-500">*</span>}
          <input
            ref={ref}
            className={`mt-1 block w-full  focus:ring  focus:ring-opacity-50 bg-white   dark:focus:ring-opacity-25 dark:bg-neutral-900 ${rounded} ${fontClass} ${sizeClass} ${className} ${
              hasError
                ? "border-red-200 focus:border-red-300 focus:ring-red-200 dark:border-red-700 dark:focus:ring-red-600"
                : "border-neutral-200 focus:border-primary-300 focus:ring-primary-200 dark:border-neutral-700 dark:focus:ring-primary-600"
            }`}
            {...props}
          />
          {helpText && <p className="mt-2 text-sm text-gray-500">{helpText}</p>}
          {(hasError || errorMessage) && (
            <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
          )}
        </label>
      </div>
    );
  },
);

// Set displayName for better debugging (optional but recommended)
Input.displayName = "Input";

export default Input;
