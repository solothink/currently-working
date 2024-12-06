"use client";

import { useEffect } from "react";

export default function ServerError() {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("503 Service Unavailable");
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary-600 text-white dark:bg-primary-800">
      <div className="relative w-full max-w-lg px-4 text-center">
        <div className="absolute inset-0 flex items-center justify-center text-primary-400 dark:text-primary-300 select-none pointer-events-none">
          <span className="text-[20rem] font-bold opacity-20">503</span>
        </div>
        <h1 className="text-4xl font-bold mb-4 relative z-10">
          All of our servers are busy
        </h1>
        <p className="mb-8 text-primary-100 dark:text-primary-200 relative z-10">
          We cannot handle your request right now, please wait for a couple of
          minutes and refresh the page. Our team is already working on this
          issue.
        </p>
        <button
          onClick={handleRefresh}
          className="px-6 py-3 bg-white text-primary-600 rounded-md font-medium hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-colors duration-200 relative z-10"
        >
          Refresh the page
        </button>
      </div>
    </div>
  );
}
