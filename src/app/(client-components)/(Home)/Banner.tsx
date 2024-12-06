import React from "react";
import Image from "next/image";

interface BannerProps {
  imageSrc: any;
}

const Banner: React.FC<BannerProps> = ({ imageSrc }) => {
  return (
    <Image
      className="object-fit rounded-sm w-full"
      src={imageSrc}
      alt="hero"
      priority
    />
  );
};

export default Banner;
