// components/InitializeAccount.tsx
"use client"; // This marks the file as a client-side component

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAccountStore } from "@/store/accountStore";

const InitializeAccount = () => {
  const { data: session } = useSession();
  const { setGroupsAndRoles, activeGroup, setActiveGroup } = useAccountStore();

  useEffect(() => {
    if (session?.user?.groups && session?.user?.roles) {
      setGroupsAndRoles(session.user.groups, session.user.roles);
      if (activeGroup === null) {
        const defaultGroup = session.user.groups[0];
        setActiveGroup(defaultGroup.name);
      }
    }
  }, [session, setGroupsAndRoles]);

  return null; // This component does not need to render anything itself
};

export default InitializeAccount;
