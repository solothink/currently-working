import { SocialType } from "@/shared/SocialsShare";
import React, { FC } from "react";

export interface SocialsListProps {
  className?: string;
  itemClass?: string;
  socials?: SocialType[];
}

const socialsDemo: SocialType[] = [
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

const SocialsList: FC<SocialsListProps> = ({
  className = "",
  itemClass = "block",
  socials = socialsDemo,
}) => {
  return (
    <nav
      className={`nc-SocialsList flex space-x-2.5 text-2xl text-neutral-6000 dark:text-neutral-300 ${className}`}
      data-nc-id="SocialsList"
    >
      {socials.map((item, i) => (
        <a
          key={i}
          className={`${itemClass}`}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          title={item.name}
        >
          <i className={item.icon}></i>
        </a>
      ))}
    </nav>
  );
};

export default SocialsList;
