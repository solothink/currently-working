"use client";
import { FC } from "react";
import RoleDropdown from "./RoleDropdown";
import useDefaultRole from "../_hooks/useDefaultRole";
import { signupRoles, loginRoles } from "../constants"; // Import roles constants

interface HeadingWithRoleDropdownProps {
  type: "login" | "signup"; // Specifies if it's for login or signup
  className?: string; // Additional custom class names
}

const HeadingWithRoleDropdown: FC<HeadingWithRoleDropdownProps> = ({
  type,
  className,
}) => {
  // Use the appropriate roles based on the type (login or signup)
  const roles = type === "signup" ? signupRoles : loginRoles;

  return (
    <div
      className={`flex items-center justify-center text-center space-x-2 ${className}`}
    >
      <h1 className="text-2xl sm:text-4xl font-bold leading-[115%] text-neutral-900 dark:text-neutral-100">
        {type === "signup" ? "Sign up as" : "Log in as"}
      </h1>
      <RoleDropdown
        roles={roles}
        className="text-primary-500 dark:text-primary-400 text-xl sm:text-2xl font-medium"
      />
    </div>
  );
};

export default HeadingWithRoleDropdown;
