import React from "react";
import Image from "next/image";

const Header: React.FC = () => (
  <header className="w-full bg-primary-800 text-white relative overflow-hidden rounded-lg">
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 h-[500px]">
      {/* Top-left positioned text */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8">
        <h1 className="text-lg sm:text-xl font-semibold">
          Idbook Hospitality Private Limited
        </h1>
      </div>

      {/* Centered text */}
      <div className="text-center mt-16">
        <p className="text-xl sm:text-2xl mb-4">
          Growing your business has never been so easy!
        </p>
        <p className="text-2xl sm:text-3xl font-bold mb-2">
          Specially designed for you,
        </p>
        <p className="text-3xl sm:text-4xl mb-4">
          Become an <span className="font-bold">Idbook Partner</span>
        </p>
        <p className="text-xl sm:text-2xl">In just 10 days!</p>
      </div>
    </div>

    {/* Background image */}
    <div className="absolute bottom-0 left-0 right-0 w-full h-[400px] m-0 p-0">
      <Image
        src="/franchise/cityscape.png"
        alt="Cityscape"
        layout="fill"
        objectFit="contain"
        objectPosition="bottom"
        className="opacity-20 m-0 p-0"
      />
    </div>
  </header>
);

export default Header;
