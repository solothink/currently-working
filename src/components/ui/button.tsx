import React, { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      className = "",
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary:
        "bg-primary-600 text-neutral-50 hover:bg-primary-700 focus-visible:ring-primary-500 dark:bg-primary-700 dark:hover:bg-primary-600",
      secondary:
        "bg-secondary-500 text-neutral-50 hover:bg-secondary-600 focus-visible:ring-secondary-500 dark:bg-secondary-600 dark:hover:bg-secondary-500",
      outline:
        "border border-neutral-300 text-neutral-700 hover:bg-neutral-100 focus-visible:ring-neutral-500 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-800",
      ghost:
        "text-neutral-700 hover:bg-neutral-100 focus-visible:ring-neutral-500 dark:text-neutral-300 dark:hover:bg-neutral-800",
    };

    const sizes = {
      sm: "text-sm px-3 py-1",
      md: "text-base px-4 py-2",
      lg: "text-lg px-6 py-3",
    };

    const variantStyles = variants[variant];
    const sizeStyles = sizes[size];

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className} font-body`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-neutral-50 dark:text-neutral-300"
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
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {!isLoading && leftIcon}
        <span className="font-display">{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
