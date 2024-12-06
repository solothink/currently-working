// Define the role type
export interface Role {
    label: string; // The display label for the role
    value: string; // The internal value representing the role
    redirectPath: string; // The path to redirect based on the role
  }
  
  // Define the props for RoleDropdown component
  export interface RoleDropdownProps {
    roles: Role[]; // List of roles available in the dropdown
  }
  
  // Define the props for useDefaultRole hook
  export interface UseDefaultRole {
    roles: Role[]; // List of roles available for determining the default role
  }
  
  // Define the custom hook's return type
  export type UseDefaultRoleReturn = string | undefined; // Returns the default role or undefined if not found
  