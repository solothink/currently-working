import { Role } from "./types";

// Signup roles for the signup process
export const signupRoles: Role[] = [
  { label: "Customer", value: "B2C-GRP", redirectPath: "/signup" },
  { label: "Corporate", value: "CORPORATE-GRP", redirectPath: "/corporate/signup" },
  // { label: "Franchise", value: "FRANCHISE-GRP", redirectPath: "/franchise/signup" },
  { label: "Hotelier", value: "HOTELIER-GRP", redirectPath: "/hotelier/signup" },
];

// Login roles for the login process
export const loginRoles: Role[] = [
  { label: "Customer", value: "B2C-GRP", redirectPath: "/login" },
  { label: "Corporate", value: "CORPORATE-GRP", redirectPath: "/corporate/login" },
  // { label: "Franchise", value: "FRANCHISE-GRP", redirectPath: "/franchise/login" },
  { label: "Hotelier", value: "HOTELIER-GRP", redirectPath: "/hotelier/login" },
];

// export const defaultRole =   { label: "Customer", value: "B2C-GRP", redirectPath: "/login" }
