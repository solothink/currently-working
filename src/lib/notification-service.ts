// lib/notification-service.ts
import axios from "./api-client"; // Adjust the import according to your file structure

export interface Notification {
  id: number;
  title: string;
  description: string;
  is_read: boolean;
  created: string;
  updated: string;
  user: number;
  profile_url?: string;
  redirect_url?: string;
}

interface ApiResponse<T = any> {
  status: string;
  message?: string;
  count?: number;
  data?: T;
}

const NotificationService = {
  getUserNotifications: async (): Promise<Notification[]> => {
    try {
      const response = await axios.get<ApiResponse<Notification[]>>(
        "/org-resources/notification/user-based/retrieve/",
      );
      if (response.data.status === "success" && response.data.data) {
        return response.data.data;
      }
      throw new Error(response.data.message || "Failed to fetch notifications");
    } catch (error) {
      handleError(error);
      return [];
    }
  },

  markAsRead: async (notificationId: number): Promise<void> => {
    try {
      await axios.patch(`/org-resources/notification/${notificationId}/`, {
        is_read: true,
      });
    } catch (error) {
      handleError(error);
    }
  },
};

const handleError = (error: any): ApiResponse => {
  if (error.response) {
    return error.response.data;
  }
  return { status: "error", message: "An unexpected error occurred." };
};

export default NotificationService;
