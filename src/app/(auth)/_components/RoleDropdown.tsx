"use client";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import useDefaultRole from "../_hooks/useDefaultRole";

interface RoleDropdownProps {
  roles: { label: string; value: string; redirectPath: string }[];
  className?: string;
}

const RoleDropdown: FC<RoleDropdownProps> = ({ roles }) => {
  const defaultRole = useDefaultRole(roles);
  console.log("defaultRole ", defaultRole);

  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = event.target.value;

    // Find the redirect path for the selected role
    const selectedOption = roles.find((role) => role.value === newRole);
    if (selectedOption) {
      router.push(selectedOption.redirectPath);
    }
  };

  return (
    <div className="relative inline-block ">
    <label htmlFor="role-selector" className="sr-only">
      Select Role
    </label>
    <select
      id="role-selector"
      value={defaultRole.value}
      onChange={handleChange}
      className="block w-full px-4 py-2 text-base sm:text-lg font-medium bg-gray-50 border border-gray-300 rounded-md shadow-md appearance-none pr-10 focus:ring-2 focus:ring-primary-500 focus:outline-none dark:bg-neutral-800 dark:text-neutral-100 dark:border-neutral-600 dark:focus:ring-primary-400"
    >
      {roles.map((role) => (
        <option
          key={role.value}
          value={role.value}
          className="text-gray-700 dark:text-gray-200"
        >
          {role.label}
        </option>
      ))}
    </select>
    <svg
      className="absolute top-1/2 right-3 w-5 h-5 -translate-y-1/2 pointer-events-none text-gray-500 dark:text-neutral-400"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </div>
  
  );
};

export default RoleDropdown;
