"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface Role {
  label: string;
  value: string;
  redirectPath: string;
}

const useDefaultRole = (roles: Role[]): Role => {
  const pathname = usePathname(); // Get the current URL
  const [defaultRole, setDefaultRole] = useState<Role>(roles[0]);

  useEffect(() => {
    // Find the role whose redirectPath matches the current URL
    const matchedRole = roles.find((role) => pathname.startsWith(role.redirectPath));
    if (matchedRole) {
      setDefaultRole(matchedRole);
    } else {
      // Fallback to the first role if no match
      setDefaultRole(roles[0]);
    }
  }, [pathname, roles]);

  return defaultRole;
};

export default useDefaultRole;
