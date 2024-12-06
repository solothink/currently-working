import Link from "next/link";
import { FaHome } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-neutral-100 dark:bg-neutral-950 dark:text-neutral-50">
      <div className="relative w-full max-w-lg px-4 text-center">
        <div className="absolute inset-0 flex items-center justify-center text-neutral-800 dark:text-neutral-700 select-none pointer-events-none">
          <span className="text-[20rem] font-bold opacity-10">404</span>
        </div>
        <h1 className="text-4xl font-bold mb-4 relative z-10">
          Nothing to see here
        </h1>
        <p className="mb-8 text-neutral-400 dark:text-neutral-300 relative z-10">
          Page you are trying to open does not exist. You may have mistyped the
          address, or the page has been moved to another URL. If you think this
          is an error contact support.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200 relative z-10"
        >
          <FaHome className="mr-2" />
          Take me back to home page
        </Link>
      </div>
    </div>
  );
}
