import React from "react";
import logoImg from "@/images/logos/idbook-text-logo.png";
import logoLightImg from "@/images/logo-light.png";
import LogoSvgLight from "./LogoSvgLight";
import LogoSvg from "./LogoSvg";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

export interface LogoProps {
  img?: StaticImageData;
  imgLight?: StaticImageData;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  img = logoImg,
  imgLight = logoLightImg,
  className = "w-24",
}) => {
  return (
    <Link
      href="/"
      className={`ttnc-logo inline-block text-primary-6000 focus:outline-none focus:ring-0 ${className}`}
    >
      {/* <LogoSvgLight /> */}
      {/* <LogoSvg /> */}

      {/* THIS USE FOR MY CLIENT */}
      {/* PLEASE UN COMMENT BELLOW CODE AND USE IT */}
      {img ? (
        <Image
          className={`block ${imgLight ? "dark:hidden" : ""}`}
          src="/idbook-text-logo.png"
          alt="Logo"
          width={1200}
          height={1200}
        />
      ) : (
        "Idbook Hotels"
      )}
      {imgLight && (
        <Image
          className="hidden  dark:block"
          src="/idbook-text-logo.png"
          alt="Idbook Hotels"
          width={1200}
          height={1200}
        />
      )}
    </Link>
  );
};

export default Logo;
