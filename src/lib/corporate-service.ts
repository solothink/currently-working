import axios from "./api-client";

// Interface for request/response structures
interface ApiResponse<T = any> {
  status: string;
  message?: string;
  errors?: Array<{ field: string; message: string }>;
  data?: T;
  count?: number;
}

// Interface for Employee Invitation Request
export interface InviteEmployeeRequest {
  email: string;
  name: string;
  gender: string;
  mobile_number: string;
  group_name: string;
  employee_id: string;
  department: string;
}

// Corporate Service functions for managing employees and company data
const CorporateService = {
  /**
   * Fetch corporate profile by company ID
   */
  getCorporateProfile: async (companyId: string): Promise<ApiResponse> => {
    console.log("companyId", companyId);
    try {
      const response = await axios.get(
        `/org-resources/company-details/${companyId}/`,
      );
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * List employees with token authorization
   */
  listEmployees: async (params: {
    limit: number;
    offset: number;
    search?: string;
    company_id?: string;
    user_id?: string;
  }): Promise<ApiResponse> => {
    try {
      const response = await axios.get(`/customer/customers/`, { params });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  // Other methods remain the same...
  inviteEmployee: async (data: InviteEmployeeRequest): Promise<ApiResponse> => {
    try {
      const response = await axios.post(
        "/auth/signup/customer/signup-link/",
        data,
      );
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },
  resendInvitation: async (employeeId: string): Promise<ApiResponse> => {
    try {
      const response = await axios.post(
        `/corporate/employees/${employeeId}/resend-invitation/`,
      );
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },
  getEmployeeDetails: async (employeeId: string): Promise<ApiResponse> => {
    try {
      const response = await axios.get(`/corporate/employees/${employeeId}/`);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },
  updateEmployee: async (
    employeeId: string,
    data: Partial<InviteEmployeeRequest>,
  ): Promise<ApiResponse> => {
    try {
      const response = await axios.put(
        `/corporate/employees/${employeeId}/`,
        data,
      );
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

export default CorporateService;
