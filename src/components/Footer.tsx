"use client";

import Logo from "@/shared/Logo";
import SocialsList1 from "@/shared/SocialsList1";
import { CustomLink } from "@/data/types";
import React from "react";
import FooterNav from "./FooterNav";
import GooglePlayImage from "@/images/footer/google-play.png";
import AppStoreImage from "@/images/footer/apple-store.png";
import Image from "next/image";
import HotelFooter from "./HotelFooter";
import CompanyInfo from "./CompanyInfo";
import FranchiseBanner from "./FranchiseBanner";
import PaymentsAndSubscription from "./PaymentsAndSubscription";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "5",
    title: "Our Services",
    menus: [
      { href: "/about", label: "About Us" },
      { href: "/careers", label: "Careers" },
      { href: "/blog", label: "Blog" },
      { href: "/holiday-package", label: "Holiday Package" },
      { href: "/group-booking", label: "Group booking" },
    ],
  },
  {
    id: "1",
    title: "Partner With Us",
    menus: [
      { href: "/be-franchise", label: "Get Franchise" },
      { href: "/travel-agent", label: "Travel Agent" },
      { href: "/corporate-enquiries", label: "Corporate Enquiries" },
      { href: "/flight", label: "Flight" },
      { href: "/transport", label: "Transport" },
    ],
  },
  {
    id: "2",
    title: "Policies",
    menus: [
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact Us" },
      { href: "/refund", label: "Cancellation & Refund Policy" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms-and-condition", label: "Terms & Conditions" },
    ],
  },
];

const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
          {menu.title}
        </h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <a
                key={index}
                className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                href={item.href}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      <FranchiseBanner />
      <FooterNav />

      <div className="nc-Footer relative py-24 lg:py-28 pb-14 lg:pb-16 border-t border-neutral-200 dark:border-neutral-700">
        <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
          <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
            <div className="col-span-2 md:col-span-1">
              <Logo />
            </div>
            <div className="col-span-2 flex items-center md:col-span-3">
              <SocialsList1 className="flex items-center space-x-3 lg:space-x-0 lg:flex-col lg:space-y-2 lg:items-start" />
            </div>
          </div>
          {widgetMenus.map(renderWidgetMenuItem)}
          <div className="">
            <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
              Download Our App
            </h2>
            <p className="mt-5 text-neutral-6000 dark:text-neutral-300 text-xs">
              Fastest & most convenient way to book your stay.
            </p>
            <div className="mt-5 space-y-2 flex flex-col items-left justify-center">
              <Image
                src={GooglePlayImage}
                alt="google play"
                className=" "
                height={50}
                width={120}
              />
              <Image
                src={AppStoreImage}
                alt="app store"
                height={50}
                width={120}
                className=" "
              />
            </div>
          </div>
        </div>
      </div>
      <div className="relative py-14 lg:py-16 border-t border-neutral-200 dark:border-neutral-700">
        <PaymentsAndSubscription />
      </div>
      <div className="relative py-14 lg:py-16 border-t border-neutral-200 dark:border-neutral-700">
        <HotelFooter />
      </div>

      <div className="relative py-14 lg:py-16 border-t border-neutral-200 dark:border-neutral-700">
        <CompanyInfo />
      </div>

      <div className="relative pb-14 lg:pb-16 pt-8 lg:pt-12 border-t border-neutral-200 dark:border-neutral-700">
        <p className="text-right mr-4 sm:mr-16 text-sm text-neutral-6000 dark:text-neutral-300">
          © 2018- {`${new Date().getFullYear()}`} Idbook. All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
