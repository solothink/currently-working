import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ErrorStateProps {
  message?: string;
}

export const ErrorState: FC<ErrorStateProps> = ({ message }) => {
  return (
    <div className="p-4 w-full max-w-4xl mx-auto">
      <ErrorCard>
        <ErrorIcon />
        <ErrorTitle />
        <ErrorMessage message={message} />
      </ErrorCard>
    </div>
  );
};

// Reusable ErrorCard Component
const ErrorCard: FC<{ children: React.ReactNode }> = ({ children }) => (
  <Card className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
    <CardContent className="p-8">
      <div className="flex flex-col items-center text-center">{children}</div>
    </CardContent>
  </Card>
);

// Reusable ErrorIcon Component
const ErrorIcon: FC = () => (
  <div className="w-16 h-16 bg-red-100 dark:bg-red-800/50 rounded-full flex items-center justify-center mb-4">
    <svg
      className="w-8 h-8 text-red-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  </div>
);

// Reusable ErrorTitle Component
const ErrorTitle: FC = () => (
  <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">
    Error Loading Data
  </h3>
);

// Reusable ErrorMessage Component
const ErrorMessage: FC<{ message?: string }> = ({ message }) => (
  <p className="text-red-600 dark:text-red-300">
    {message || "Failed to load company details. Please try again later."}
  </p>
);
