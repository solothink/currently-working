import axios from "./api-client"; // Assuming api-client is in the same directory

// Interface for common request/response structures
interface ApiResponse<T = any> {
  status: string;
  message?: string;
  errors?: Array<{ field: string; message: string }>;
  data?: T;
}

interface SignupRequest {
  email: string;
  password?: string;
  otp?: string;
  phone?: string;
}

// Service functions for account-related API calls
const AuthService = {
  // Generate OTP for signup
  generateSignupOtp: async (email: string): Promise<ApiResponse> => {
    try {
      const response = await axios.post("/auth/signup/email/generate-otp/", {
        email,
      });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  // Signup with OTP
  signupWithOtp: async (email: string, otp: string): Promise<ApiResponse> => {
    try {
      const response = await axios.post("/auth/signup/buser/email-otp/", {
        email,
        otp,
      });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  // Signup with password
  signupWithPassword: async (data: SignupRequest): Promise<ApiResponse> => {
    try {
      const response = await axios.post("/auth/signup/", data);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  // Signup with password
  signupWithEmailOTP: async (data: SignupRequest): Promise<ApiResponse> => {
    try {
      const response = await axios.post("/auth/signup/buser/email-otp/", data);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  // Login with password
  loginWithPassword: async (
    email: string,
    password: string,
  ): Promise<ApiResponse> => {
    try {
      const response = await axios.post("/auth/login", { email, password });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },
  // Login with email OTP
  loginWithEmailOTP: async (
    email: string,
    otp: string,
  ): Promise<ApiResponse> => {
    try {
      const response = await axios.post("/auth/signup/buser/email-otp/", {
        email,
        otp,
      });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  // Forgot password
  forgotPassword: async (email: string): Promise<ApiResponse> => {
    try {
      const response = await axios.post("/auth/forgot-password/", { email });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  // Send reset password OTP
  sendResetPasswordEmailOTP: async (
    data: SignupRequest,
  ): Promise<ApiResponse> => {
    try {
      const response = await axios.post("/auth/signup/buser/email-otp/", data);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  // Reset password with OTP
  resetPasswordWithOtp: async (
    email: string,
    otp: string,
    password: string,
  ): Promise<ApiResponse> => {
    try {
      const response = await axios.post("/auth/password/otp-reset/", {
        email,
        otp,
        password,
      });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  submitCompanyDetails: async (formData: FormData): Promise<ApiResponse> => {
    try {
      const response = await axios.post(
        "/org-resources/company-details/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error submitting company details:", error);
      return handleError(error); // Use the error handler
    }
  },

  // Accept invite with token in headers and user data in the body
  acceptInvite: async (
    inviteToken: string,
    data: {
      password: string;
      mobile_number: string;
      email: string;
      name: string;
    },
  ): Promise<ApiResponse> => {
    try {
      const response = await axios.post(
        "/auth/signup/customer/signup-link/process/",
        data,
        {
          headers: {
            Authorization: `Bearer ${inviteToken}`, // Custom token overrides session token
          },
        },
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

export default AuthService;
