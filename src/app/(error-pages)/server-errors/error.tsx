"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary-600 text-white dark:bg-primary-800">
      <div className="text-center">
        <h1 className="text-[10rem] font-bold text-primary-300 dark:text-primary-200 mb-4">
          500
        </h1>
        <h2 className="text-4xl font-bold mb-4">
          Something bad just happened...
        </h2>
        <p className="mb-8 max-w-md mx-auto">
          Our servers could not handle your request. Don&apos;t worry, our
          development team was already notified. Try refreshing the page.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-white text-primary-600 rounded-md font-medium hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-colors duration-200"
        >
          Refresh the page
        </button>
      </div>
    </div>
  );
}
