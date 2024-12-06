"use client";
import React, { FC, useEffect, useState } from "react";
import Logo from "@/shared/Logo";
import Navigation from "@/shared/Navigation/Navigation";
import SearchDropdown from "./SearchDropdown";
import ButtonPrimary from "@/shared/ButtonPrimary";
import MenuBar from "@/shared/MenuBar";
import SwitchDarkMode from "@/shared/SwitchDarkMode";
import HeroSearchForm2MobileFactory from "../(HeroSearchForm2Mobile)/HeroSearchForm2MobileFactory";
import LangDropdown from "./LangDropdown";
import Link from "next/link";
import { useSession } from "next-auth/react";
import AvatarDropdown from "./AvatarDropdown";
import NotifyDropdown from "./NotifyDropdown";
import { useAccountStore } from "@/store/accountStore";
import CorporateNav1 from "./CorporateNav1";
import CorporateNavigation from "@/shared/Navigation/CorporateNavigation";
import AccountManagerChat from "./AccountManagerDropDown";
import HeroSearchForm2MobileGeneral from "../(HeroSearchForm2Mobile)/HeroSearchForm2MobileGeneral";

export interface MainNav1Props {
  className?: string;
}

const MainNav1: FC<MainNav1Props> = ({ className = "" }) => {
  const { data: session, status } = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { activeGroup, userRoles, groups, hasUserRole } = useAccountStore();
  // console.log("activeGroup ", activeGroup, userRoles, groups);

  useEffect(() => {
    if (status === "authenticated") {
      // if (
      //   session.user.category === "B-ADMIN" ||
      //   session.user.category === "B-CUST"
      // ) {
      setIsLoggedIn(true);
      // }
    }
  }, [status, session]);
  // Check if the user is logged in
  return (
    <div className={`nc-MainNav1 relative z-10 ${className}`}>
      <div className="px-4 lg:container h-20 relative flex justify-between">
        <div className="hidden md:flex justify-start flex-1 space-x-4 sm:space-x-10">
          <Logo className="w-24 self-center" />
          {activeGroup?.name === "CORPORATE-GRP" ? (
            hasUserRole("CORP-ADMIN") ? (
              <CorporateNavigation />
            ) : (
              <></>
            )
          ) : (
            <Navigation />
          )}
        </div>

        <div className="flex lg:hidden flex-[3] max-w-lg !mx-auto md:px-3 ">
          <div className="self-center flex-1">
            {activeGroup?.name === "CORPORATE-GRP" ? (
              <HeroSearchForm2MobileGeneral />
            ) : (
              <HeroSearchForm2MobileFactory />
            )}
          </div>
        </div>

        <div className="hidden md:flex flex-shrink-0 justify-end flex-1 lg:flex-none text-neutral-700 dark:text-neutral-100">
          <div className="hidden xl:flex space-x-0.5">
            <div className="px-1" />
            {/* <SearchDropdown className="flex items-center" /> */}
            {isLoggedIn ? (
              <>
                {activeGroup?.name === "CORPORATE-GRP" ? (
                  <AccountManagerChat />
                ) : (
                  <Link
                    href={"/be-franchise"}
                    className="self-center hidden xl:inline-flex px-4 py-2 border border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 rounded-full items-center text-sm text-gray-700 dark:text-neutral-300 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  >
                    Be a Franchise
                  </Link>
                )}
                <NotifyDropdown />

                <AvatarDropdown />
              </>
            ) : (
              <>
                <Link
                  href={"/be-franchise"}
                  className="self-center hidden xl:inline-flex px-4 py-2 border border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 rounded-full items-center text-sm text-gray-700 dark:text-neutral-300 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                  Be a Franchise
                </Link>
                <SwitchDarkMode />
                <ButtonPrimary className="self-center" href="/signup">
                  Sign up
                </ButtonPrimary>
              </>
            )}
          </div>

          <div className="flex xl:hidden items-center">
            <SwitchDarkMode />
            <div className="px-0.5" />
            <MenuBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav1;
