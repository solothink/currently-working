"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Unauthorized() {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error("401 Unauthorized Access");
  }, []);

  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary-600 text-white dark:bg-primary-800">
      <div className="relative w-full max-w-lg px-4 text-center">
        <div className="absolute inset-0 flex items-center justify-center text-primary-400 dark:text-primary-300 select-none pointer-events-none">
          <span className="text-[20rem] font-bold opacity-20">401</span>
        </div>
        <h1 className="text-4xl font-bold mb-4 relative z-10">Access Denied</h1>
        <p className="mb-8 text-primary-100 dark:text-primary-200 relative z-10">
          You do not have permission to access this page. Please log in with the
          appropriate credentials or contact the administrator if you believe
          this is an error.
        </p>
        <div className="flex justify-center space-x-4 relative z-10">
          <button
            onClick={handleGoBack}
            className="px-6 py-3 bg-white text-primary-600 rounded-md font-medium hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-colors duration-200"
          >
            Go Back
          </button>
          <button
            onClick={handleGoHome}
            className="px-6 py-3 bg-primary-500 text-white rounded-md font-medium hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-colors duration-200"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}
