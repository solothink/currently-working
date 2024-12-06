import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react"; // For session handling

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL,
});

// Request interceptor with optional headers override
apiClient.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> => {
    // Get the session (which includes the access token)
    const session = await getSession();

    // Set default Authorization header if session has an access token
    const defaultHeaders: Record<string, string> = session?.accessToken
      ? { Authorization: `Bearer ${session.accessToken}` }
      : {};

    // Merge user-defined headers from the request with defaults (if any)
    config.headers = {
      ...defaultHeaders,
      ...(config.headers || {}),
    } as any; // Type assertion to handle AxiosHeaders typing issues

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiClient;
