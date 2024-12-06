import React from "react";
import ButtonClose from "@/shared/ButtonClose";
import {
  ChevronRight,
  Home,
  Settings,
  HelpCircle,
  Shield,
  UserIcon,
  Lock,
  Heart,
  CreditCardIcon,
} from "lucide-react";
import ButtonSecondary from "../ButtonSecondary";
import { signOut } from "next-auth/react";
import SwitchProfile from "@/components/SwitchProfile";
import Avatar from "../Avatar";
import { User } from "next-auth";
import { MdPassword } from "react-icons/md";
import { useAccountStore } from "@/store/accountStore";
import {
  BuildingOfficeIcon,
  PaperClipIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import AccountManagerChat from "@/app/(client-components)/(Header)/AccountManagerDropDown";

export interface ProfileNavProps {
  user?: User;
  onClickClose: () => void;
}

const ProfileNav: React.FC<ProfileNavProps> = ({
  user = {
    name: "Guest User",
  },
  onClickClose,
}) => {
  const { activeGroup } = useAccountStore();
  const menuSections = [
    {
      title: "Account",
      items: [
        {
          label: "Profile",
          icon: UserIcon,
          href: "/profile",
        },
        {
          label: "Reset Password",
          icon: Lock,
          href: "/reset-password",
        },
        {
          label: "Wishlist",
          icon: Heart,
          href: "/savelists",
        },
      ],
    },
    {
      title: "Corporate",
      items: [
        {
          label: "Company Details",
          icon: BuildingOfficeIcon,
          href: "/company-details",
        },
        {
          label: "Employees",
          icon: UserGroupIcon,
          href: "/employees",
        },
        {
          label: "Travel Report",
          icon: PaperClipIcon,
          href: "/travel-report",
        },
        {
          label: "Travel Invoice",
          icon: CreditCardIcon,
          href: "/travel-invoice",
        },
      ],
    },
    // {
    //   title: "Support",
    //   items: [
    //     {
    //       label: "Visit help center",
    //       icon: HelpCircle,
    //       href: "/help",
    //     },
    //     {
    //       label: "Get help with a safety issue",
    //       icon: Shield,
    //       href: "/help/safety",
    //     },
    //   ],
    // },
  ];

  const renderMenuItem = (item: { label: string; icon: any; href: string }) => {
    const Icon = item.icon;

    return (
      <a
        key={item.label}
        href={item.href}
        className="flex items-center justify-between p-4 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Icon className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
          <span className="text-neutral-700 dark:text-neutral-300">
            {item.label}
          </span>
        </div>
        <ChevronRight className="w-5 h-5 text-neutral-500" />
      </a>
    );
  };

  return (
    <div className="overflow-y-auto w-full h-screen bg-white dark:bg-neutral-900 shadow-lg ring-1 dark:ring-neutral-700">
      <div className="relative p-4 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center space-x-3">
          <Avatar
            sizeClass="w-8 h-8 sm:w-9 sm:h-9"
            userName={user?.name ?? "Guest"}
            imgUrl={user?.profile_picture}
          />

          <div>
            <h3 className="font-medium text-neutral-900 dark:text-white">
              {user.name}
            </h3>
            <button className="text-sm text-neutral-700 dark:text-neutral-300 hover:underline">
              Show profile
            </button>
          </div>
        </div>
        <ButtonClose
          className="absolute right-4 top-4"
          onClick={onClickClose}
        />
      </div>
      <div className="p-4 space-y-6">
        <SwitchProfile />
      </div>
      <div className="p-4 space-y-6">
        {menuSections.map((section) => {
          // Only render the "Corporate" section if activeGroup is "CORP-GRP"
          if (
            section.title === "Corporate" &&
            activeGroup?.name !== "CORPORATE-GRP"
          ) {
            return null;
          }
          return (
            <div key={section.title}>
              <h4 className="text-base font-medium text-neutral-900 dark:text-white mb-2">
                {section.title}
              </h4>
              {section.title === "Corporate" && (
                <div className="space-y-1">
                  <AccountManagerChat />{" "}
                </div>
              )}
              <div className="space-y-1">
                {section.items.map(renderMenuItem)}
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-4 space-y-3 mt-4">
        <ButtonSecondary
          onClick={() => {
            signOut();
            onClickClose();
          }}
          className="w-full"
        >
          Log Out
        </ButtonSecondary>
      </div>
    </div>
  );
};

export default ProfileNav;
