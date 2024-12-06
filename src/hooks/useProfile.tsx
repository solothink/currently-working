"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ProfileService from "@/lib/profile-service"; // Assuming AuthService is in the lib directory
import { useSession } from "next-auth/react";

// Hook to fetch user profile details
export const useUserProfile = () => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const response = await ProfileService.getProfileDetail();
      return response.data;
    },
    enabled: !!token, // Only fetch if token exists
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    // cacheTime: 10 * 60 * 1000, // Keep unused cache for 10 minutes
  });
};

// Hook to update user profile details
export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => ProfileService.updateCustomerDetails(data),
    onSuccess: () => {
      // Invalidate and refetch user profile data after a successful update
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
};
