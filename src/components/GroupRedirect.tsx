// components/GroupRedirect.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccountStore } from "@/store/accountStore";

const GroupRedirect = () => {
  const { activeGroup } = useAccountStore();
  const router = useRouter();

  useEffect(() => {
    console.log("Active group:", activeGroup);
    if (activeGroup) {
      // Define redirect paths based on the group name
      const groupRedirectPaths: Record<string, string> = {
        // "BUSINESS-GRP": "/business-dashboard",
        "CORPORATE-GRP": "/corporate-booking",
        "B2C-GRP": "/",
        // "FRANCHISE-GRP": "/franchise-dashboard",
      };

      // Redirect to the appropriate path if it exists
      const redirectPath = groupRedirectPaths[activeGroup.name];
      console.log("Redirect path:", redirectPath);

      if (redirectPath) {
        router.push(redirectPath);
      } else {
        console.warn(`No redirect path defined for group: ${activeGroup.name}`);
      }
    }
  }, [activeGroup]);

  return null; // No UI, as this is purely for redirection
};

export default GroupRedirect;
