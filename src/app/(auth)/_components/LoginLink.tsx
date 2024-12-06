"use client";

import { FC } from "react";
import Link from "next/link";
import useDefaultRole from "../_hooks/useDefaultRole";
import { loginRoles, signupRoles } from "../constants"; // Import login roles

interface LoginLinkProps {
  className?: string; // Optional className for styling
}

const LoginLink: FC<LoginLinkProps> = ({ className }) => {
  // Get the default role from the custom hook
  const defaultRole = useDefaultRole(signupRoles);

  // Find the login link for the default role
  const defaultLoginLink =
    loginRoles.find((role) => role.value === defaultRole.value)?.redirectPath || "/login";

  return (
    <span
      className={`block text-center text-neutral-700 dark:text-neutral-300 ${className}`}
    >
      Already have an account?{" "}
      <Link href={defaultLoginLink} className="font-semibold underline">
        Log in
      </Link>
    </span>
  );
};

export default LoginLink;
