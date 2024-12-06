import axios from "./api-client"; // Assuming api-client is in the same directory

// Interface for common request/response structures
interface ApiResponse<T = any> {
  status: string;
  message?: string;
  errors?: Array<{ field: string; message: string }>;
  data?: T;
}

export interface ProfileResponse {
  id: number;
  mobile_number: string;
  email: string;
  name: string;
  groups: Array<{ id: number; name: string }>;
  roles: Array<{ id: number; name: string }>;
  permissions: Array<string>;
  category: string;
  customer_details: {
    id: number;
    address: string | null;
    gender: string | null;
    date_of_birth: string | null;
    profile_picture: string | null | File;
    id_proof_type: string | null;
    id_proof: string | null | File;
    pan_card: string | null;
    pan_card_number: string | null;
    aadhar_card: string | null;
    aadhar_card_number: string | null;
    loyalty_points: number;
    membership_status: boolean;
    emergency_contact_name: string | null;
    emergency_contact_phone: string | null;
    preferred_language: string | null;
    dietary_restrictions: string | null;
    special_requests: string | null;
    group_name: string;
    employee_id: string;
    department: string;
    privileged: boolean;
    active: boolean;
    created: string;
    updated: string;
    user: number;
    added_user: number;
    allergy_restrictions?: string;
    language?: string;
  };
  business_details: object;
  company_id: number;
}

// Profile fetch and update service functions
const ProfileService = {
  // Get profile details
  getProfileDetail: async (): Promise<ApiResponse<ProfileResponse>> => {
    try {
      const response = await axios.get("/auth/user/profile/detail/");
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  // Update customer details
  updateCustomerDetails: async (data: {
    address: string;
    gender: string;
    date_of_birth: string;
    id_proof_type: string;
    pan_card_number: string;
    aadhar_card_number: string;
    emergency_contact_name: string;
    emergency_contact_phone: string;
    preferred_language: string;
    dietary_restrictions: string;
    special_requests: string;
    group_name: string;
    department: string;
  }): Promise<ApiResponse> => {
    console.log("data", data);
    try {
      const response = await axios.post(
        "/customer/customers/user-based/update/",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for FormData
          },
        },
      );
      console.log("response", response);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },
};

// Error handler to extract meaningful error messages
const handleError = (error: any): ApiResponse => {
  if (error.response) {
    return error.response.data;
  }
  return { status: "error", message: "An unexpected error occurred." };
};

export default ProfileService;
