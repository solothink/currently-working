"use client";

import { FC } from "react";
import Link from "next/link";
import useDefaultRole from "../_hooks/useDefaultRole";
import { loginRoles, signupRoles } from "../constants";

interface SignupLinkProps {
  className?: string; // Optional className for styling
}

const SignupLink: FC<SignupLinkProps> = ({ className }) => {
  const defaultRole = useDefaultRole(loginRoles); // Get the default role dynamically

  // Derive the correct signup link for the current role
  const signupLink =
    signupRoles.find((role) => role.value === defaultRole.value)?.redirectPath || "/signup";

  return (
    <span
      className={`block text-center text-neutral-700 dark:text-neutral-300 ${className}`}
    >
      New user?{" "}
      <Link href={signupLink} className="font-semibold underline">
        Create an account
      </Link>
    </span>
  );
};

export default SignupLink;
