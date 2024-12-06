export type Role = {
  id: number;
  name: string;
};

export type Permission = {
  id?: number;
  name?: string;
};

export type User = {
  id: number;
  email: string;
  mobile_number: string;
  name: string;
  roles: Role[];
  permissions: Permission[];
  category: "B-ADMIN" | "CL-ADMIN" | "B-CUST" | "CL-CUST";
};

export interface GroupType {
  id: number;
  name: "BUSINESS-GRP" | "CORPORATE-GRP" | "B2C-GRP" | "FRANCHISE-GRP" | "HOTELIER-GRP";
  roles?: RoleType[];
}

export interface RoleType {
  id: number;
  name: string;
  description?: string;
  permissions?: string[];
}
