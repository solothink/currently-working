import { GroupType } from "@/types/user";
import { User } from "next-auth";

/**
 * Utility function to get the default redirect path based on the group.
 * @param defaultGroup - The group name.
 * @returns The default redirect path for the group.
 */
export const getDefaultRedirectPath = (defaultGroup: User["default_group"]): string => {
    switch (defaultGroup) {
      case "HOTELIER-GRP":
        return "/hotelier-dashboard";
      case "B2C-GRP":
        return "/";
      case "CORPORATE-GRP":
        return "/corporate-dashboard";
      default:
        return "/"; // Default path for unknown groups
    }
  };


  /**
   * Utility function to determine the redirect path based on user, roles, and group.
   * @param user - The logged-in user's details.
   * @param group - The group to which the user belongs.
   * @returns The appropriate redirect path.
   */
  export const getRedirectPath = (user: User, group: GroupType): string => {
    // Define paths based on groups and roles
    const groupRedirects: Record<string, Record<string, string>> = {
      "BUSINESS-GRP": {
        "B-ADMIN": "/",
        "B-CUST": "/",
      },
      "CORPORATE-GRP": {
        "CL-ADMIN": "/corporate-dashboard",
        "CL-CUST": "/corporate-booking",
      },
      "B2C-GRP": {
        "B-CUST": "/",
      },
      "FRANCHISE-GRP": {
        "B-ADMIN": "/franchise-admin-dashboard",
      },
    };
  
    // Default fallback path
    const defaultPath = "/";
  
    // Match user's group and category
    const groupPaths = groupRedirects[group.name];
    if (groupPaths) {
      const categoryPath = groupPaths[user.category];
      if (categoryPath) {
        return categoryPath;
      }
    }
  
    // Match roles within the group if no category match
    // const userRoles = user?.roles?.map((role) => role.name) ?? [];
    // if (group.roles) {
    //   for (const role of group.roles) {
    //     if (userRoles.includes(role.name)) {
    //       return `/group/${group.name.toLowerCase()}/role/${role.name.toLowerCase()}`;
    //     }
    //   }
    // }
  
    // Return default path if no match is found
    return defaultPath;
  };
  