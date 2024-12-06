import Image from "next/image";

export default function CorporateHeroSection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between mb-16 sm:mx-8">
      <div className="md:w-1/2 ">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary-800">
          <span className="text-primary-800">Idbook Hotel</span>
          <br /> &{" "}
          <span className="text-white drop-shadow-md shadow-primary-500 text-stroke">
            Corporate
          </span>
          <br />
          <span className="text-primary-800 flex gap-2">
            Partners
            <Image
              src="/corporate/hero-arrow.png"
              alt="Arrow"
              width={60}
              height={60}
              className="ml-2"
            />
          </span>
        </h1>
      </div>
      <div className="md:w-1/2">
        <Image
          src="/corporate/hero-image.png"
          alt="Hero"
          width={500}
          height={500}
        />
      </div>
    </section>
  );
}
