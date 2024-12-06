// types.d.ts

import { DefaultSession } from "next-auth";
import { GroupType, RoleType } from "./types/user";
// The `JWT` interface can be found in the `next-auth/jwt` submodule
// Extend the User interface to include custom fields
declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    id: string; // Unique user ID
    email: string | null; // User's email
    name: string | null; // User's name
    mobile_number?: string; // Optional mobile number
    roles?: RoleType[]; // Optional user roles
    permissions?: string[]; // Optional user permissions
    accessToken?: string; // Optional access token
    refreshToken?: string; // Optional refresh token
    expiresIn?: number; // Optional expiration time
    category: "B-ADMIN" | "CL-ADMIN" | "B-CUST" | "CL-CUST";
    is_active: boolean;
    company_id?: string;
    business_id?: string;
    profile_picture?: string;
    groups?: GroupType[]; // Groups associated with the user
    default_group: "HOTELIER-GRP" | "B2C-GRP" | "CORPORATE-GRP"
  }

  /**
   * The shape of the account object returned in the OAuth providers' `account` callback,
   * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
   */
  interface Account {
    provider: string; // Provider name
    type: string; // Account type (e.g., OAuth)
    id: string; // Unique ID for the account
    accessToken?: string; // Access token for OAuth providers
    refreshToken?: string; // Refresh token for OAuth providers
    expires_at?: number; // Expiration time for the token
  }

  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  interface Session extends DefaultSession {
    user: User; // Extend the default session user with our custom User type
    accessToken?: string; // Optional access token
    refreshToken?: string; // Optional refresh token
    expiresIn?: number; // Optional expiration time
    error?: string | null;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    id: string; // Unique user ID
    email: string; // User's email
    name: string; // User's name
    mobile_number?: string; // Optional mobile number
    roles?: RoleType[]; // Optional user roles
    permissions?: string[]; // Optional user permissions
    accessToken?: string; // Optional access token
    refreshToken?: string; // Optional refresh token
    expiresIn?: number; // Optional expiration time
    category: "B-ADMIN" | "CL-ADMIN" | "B-CUST" | "CL-CUST";
    is_active: boolean;
    company_id?: string;
    business_id?: string;
    profile_picture?: string;
    error?: string | null;
    groups?: GroupType[]; // Groups associated with the user
    default_group: "HOTELIER-GRP" | "B2C-GRP" | "CORPORATE-GRP";

  }
}
