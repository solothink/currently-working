import { create } from "zustand";
import { GroupType, RoleType } from "@/types/user";

interface AccountState {
  activeGroup: GroupType | null;
  groups: GroupType[];
  userRoles: RoleType[]; // Separate list of user-specific roles
  setActiveGroup: (groupName: GroupType["name"]) => void;
  setGroupsAndRoles: (
    newGroups: GroupType[],
    newUserRoles: RoleType[],
    activeGroup?: GroupType,
  ) => void;
  hasGroupRole: (roleName: string) => boolean;
  hasUserRole: (roleName: string) => boolean;
  hasPermission: (permission: string) => boolean;
  resetGroup: () => void;
}

export const useAccountStore = create<AccountState>((set, get) => ({
  activeGroup: null,
  groups: [],
  userRoles: [],

  setActiveGroup: (groupName) => {
    const group = get().groups.find((grp) => grp.name === groupName);
    if (group) set({ activeGroup: group });
  },

  setGroupsAndRoles: (newGroups, newUserRoles, activeGroup) => {
    set({
      groups: newGroups,
      userRoles: newUserRoles,
      // activeGroup: activeGroup || null, // Set the first group as default if available
    });
  },

  hasGroupRole: (roleName) => {
    const { activeGroup } = get();
    return activeGroup?.roles?.some((role) => role.name === roleName) ?? false;
  },

  hasUserRole: (roleName) => {
    const { userRoles } = get();
    return userRoles.some((role) => role.name === roleName);
  },

  hasPermission: (permission) => {
    const { activeGroup, userRoles } = get();

    // Check permission within active group roles
    const groupPermission = activeGroup?.roles?.some((role) =>
      role.permissions?.includes(permission),
    );

    // Check permission within user roles
    const userPermission = userRoles.some((role) =>
      role.permissions?.includes(permission),
    );

    return groupPermission || userPermission || false;
  },

  resetGroup: () => set({ activeGroup: null }),
}));
