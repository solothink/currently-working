import { SocialType } from "@/shared/SocialsShare";
import React, { FC } from "react";

export interface SocialsList1Props {
  className?: string;
}

const socials: SocialType[] = [
  {
    name: "Facebook",
    icon: "lab la-facebook-square",
    href: "https://www.facebook.com/p/Idbook-hotels-100063459046918/",
  },
  {
    name: "Twitter",
    icon: "lab la-twitter",
    href: "https://x.com/idbookhotels",
  },
  {
    name: "Youtube",
    icon: "lab la-youtube",
    href: "https://www.youtube.com/channel/UCv6CYWYoDo9Kyow5BMzJfAQ",
  },
  {
    name: "Instagram",
    icon: "lab la-instagram",
    href: "https://www.instagram.com/idbook_hotels/",
  },
  {
    name: "Linkedin",
    icon: "lab la-linkedin",
    href: "https://in.linkedin.com/company/idbook-hotels",
  },
];

const SocialsList1: FC<SocialsList1Props> = ({ className = "space-y-2.5" }) => {
  const renderItem = (item: SocialType, index: number) => {
    return (
      <a
        href={item.href}
        className="flex items-center text-neutral-700  hover:text-black dark:text-neutral-300 dark:hover:text-white leading-none space-x-2 group "
        key={index}
      >
        {" "}
        <span className="w-6 h-6 flex items-center justify-center rounded-full bg-neutral-100  dark:bg-neutral-800 dark:text-neutral-300">
          <i className={item.icon}></i>
        </span>
        <span className="hidden lg:block text-sm">{item.name}</span>
      </a>
    );
  };

  return (
    <div className={`nc-SocialsList1 ${className}`} data-nc-id="SocialsList1">
      {socials.map(renderItem)}
    </div>
  );
};

export default SocialsList1;
