import React from "react";

const NewsletterSubscribe: React.FC = () => {
  return (
    <div className="border-t-2 pt-4 md:pt-0 md:border-t-0 md:border-l-2 border-white pl-6">
      <h2 className="font-semibold text-neutral-700 dark:text-neutral-200 text-center mb-8 text-lg">
        Sign up for our newsletter
      </h2>
      {/* Main Container */}
      <div className="flex items-center bg-white rounded-lg shadow-[0px_9px_4.6px_0px_rgba(255,255,255,0.25)]">
        {/* Input Field */}
        <input
          type="email"
          placeholder="Enter Your Email"
          className="px-4 py-2 text-gray-600 rounded-l-lg focus:outline-none w-full"
        />
        {/* Subscribe Button */}
        <button className="flex items-center px-4 py-2.5 bg-[#16458D] text-white hover:bg-blue-900 rounded-r-lg w-min">
          {/* Icon (RSS Feed) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 6.75a.75.75 0 01.75-.75h.001c7.042 0 12.75 5.707 12.75 12.75a.75.75 0 01-.75.75h-2.982a.75.75 0 01-.75-.75C14.52 14.216 9.784 9.48 5.25 9.48a.75.75 0 01-.75-.75V6.75zm-.748 4.994a.75.75 0 011.06-.06A10.482 10.482 0 0116.25 16.25a.75.75 0 01-.75.75h-2.983a.75.75 0 01-.75-.75c0-2.984-2.418-5.403-5.402-5.403a.75.75 0 01-.749-.75v-2.982zm-.749 4.993a.75.75 0 01.751-.751c2.97 0 5.376 2.406 5.376 5.376a.75.75 0 01-.75.75H8.25a.75.75 0 01-.75-.75 1.125 1.125 0 00-2.249 0 .75.75 0 01-.751.75H3a.75.75 0 01-.748-.748v-2.985z"
            />
          </svg>
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default NewsletterSubscribe;
