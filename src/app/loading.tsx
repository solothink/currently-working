import Image from "next/image";

export default function LoadingPage() {
  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300 bg-neutral-50 dark:bg-neutral-800 `}
    >
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Image
            src="/idbook_logo.jpg?height=100&width=300"
            alt="Logo"
            width={300}
            height={100}
            className="mx-auto mb-4"
          />
          <h1 className="text-2xl font-display font-bold mb-2 text-primary-700 dark:text-primary-300">
            Loading...
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300 font-body">
            Please wait while we prepare your experience.
          </p>
        </div>
        <div className="flex justify-center space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 bg-primary-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
      <div className="mt-8 w-full max-w-md">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg blur"></div>
          <div className="relative bg-white dark:bg-neutral-700 rounded-lg p-6 shadow-xl">
            <h2 className="text-lg font-semibold mb-2 text-primary-700 dark:text-primary-300">
              Did you know?
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300">
              Our app uses cutting-edge technology to provide you with the best
              possible experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
