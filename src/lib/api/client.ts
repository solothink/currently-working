import { toast } from "react-toastify";
// import { cookies } from 'next/headers'
import { auth } from "@/auth"; // Make sure this points to your auth configuration

// Type definitions
export type ApiResponse<T> = {
  status: string;
  message: string;
  count?: number;
  data: T;
};

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: Record<string, unknown>;
  headers?: Record<string, string>;
  requireAuth?: boolean;
};

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public errorCode?: string,
    public errors?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const ERROR_MESSAGES: Record<number, string> = {
  400: "Bad request. Please check your input.",
  401: "Unauthorized. Please login again.",
  403: "Forbidden. You don't have permission to access this resource.",
  404: "Resource not found.",
  422: "Invalid data provided.",
  429: "Too many requests. Please try again later.",
  500: "Internal server error. Please try again later.",
  502: "Bad gateway. Please try again later.",
  503: "Service unavailable. Please try again later.",
};

async function getAuthHeaders(): Promise<Record<string, string>> {
  try {
    // Get the session using the new auth() function
    const session = await auth();

    // If we have a session and access token, return the Authorization header
    if (session?.accessToken) {
      return { Authorization: `Bearer ${session.accessToken}` };
    }

    // For cookie-based auth, you might want to forward the cookies
    // const cookieStore = cookies()
    // const authCookie = cookieStore.get('your-auth-cookie-name')
    // if (authCookie) {
    //   return { Cookie: `${authCookie.name}=${authCookie.value}` }
    // }

    return {};
  } catch (error) {
    console.error("Error getting auth headers:", error);
    return {};
  }
}

export async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<ApiResponse<T>> {
  const { method = "GET", body, headers = {}, requireAuth = true } = options;

  const apiUrl = process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL;

  if (!apiUrl) {
    throw new Error("API URL is not configured");
  }

  try {
    // Get auth headers only if requireAuth is true
    const authHeaders = requireAuth ? await getAuthHeaders() : {};

    const finalHeaders = {
      "Content-Type": "application/json",
      ...authHeaders,
      ...headers,
    };

    const requestOptions: RequestInit = {
      method,
      headers: finalHeaders,
      credentials: "include",
      cache: "no-store", // Disable caching for authenticated requests
      ...(body && { body: JSON.stringify(body) }),
    };

    console.log(`🌐 Fetching ${method} ${endpoint}`, {
      headers: finalHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    const response = await fetch(`${apiUrl}${endpoint}`, requestOptions);
    const contentType = response.headers.get("content-type");
    const isJson = contentType?.includes("application/json");

    if (!response.ok) {
      let errorMessage: string;
      let errorData: any = {};

      if (isJson) {
        try {
          errorData = await response.json();
        } catch {
          errorData = {};
        }
      }

      errorMessage =
        errorData.message ||
        ERROR_MESSAGES[response.status] ||
        "An unexpected error occurred";

      throw new ApiError(
        response.status,
        errorMessage,
        errorData.error_code,
        errorData.errors,
      );
    }

    // Handle empty responses
    if (response.status === 204) {
      return {
        status: "success",
        message: "Operation successful",
        data: {} as T,
      };
    }

    if (!isJson) {
      throw new Error("Invalid response format. Expected JSON.");
    }

    const data = await response.json();
    return {
      status: "success",
      message: "Operation successful",
      data,
    } as ApiResponse<T>;
  } catch (error) {
    if (error instanceof ApiError) {
      if (typeof window !== "undefined") {
        toast.error(error.message);

        if (error.status === 401) {
          // Handle authentication errors
          // You might want to redirect to login page
          console.error("Authentication error:", error);
        }
      }
      throw error;
    }

    if (error instanceof TypeError && error.message === "Failed to fetch") {
      const networkError = new ApiError(
        0,
        "Network error. Please check your connection.",
        "NETWORK_ERROR",
      );
      if (typeof window !== "undefined") {
        toast.error(networkError.message);
      }
      throw networkError;
    }

    const unexpectedError = new ApiError(
      500,
      "An unexpected error occurred",
      "UNEXPECTED_ERROR",
    );
    if (typeof window !== "undefined") {
      toast.error(unexpectedError.message);
    }
    throw unexpectedError;
  }
}

// API client with typed methods
export const api = {
  get: <T>(endpoint: string, options?: Omit<FetchOptions, "method" | "body">) =>
    fetchApi<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(
    endpoint: string,
    body: Record<string, unknown>,
    options?: Omit<FetchOptions, "method" | "body">,
  ) => fetchApi<T>(endpoint, { ...options, method: "POST", body }),

  put: <T>(
    endpoint: string,
    body: Record<string, unknown>,
    options?: Omit<FetchOptions, "method" | "body">,
  ) => fetchApi<T>(endpoint, { ...options, method: "PUT", body }),

  patch: <T>(
    endpoint: string,
    body: Record<string, unknown>,
    options?: Omit<FetchOptions, "method" | "body">,
  ) => fetchApi<T>(endpoint, { ...options, method: "PATCH", body }),

  delete: <T>(
    endpoint: string,
    options?: Omit<FetchOptions, "method" | "body">,
  ) => fetchApi<T>(endpoint, { ...options, method: "DELETE" }),
};
