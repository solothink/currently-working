"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PropertyService from "@/lib/property-service";
import { ApiResponse, Property } from "@/lib/property-service";

// Hook to fetch property details by ID
export const usePropertyDetails = (id: number) => {
  return useQuery<ApiResponse<Property>>({
    queryKey: ["propertyDetails", id],
    queryFn: () => PropertyService.fetchPropertyById(id),
    enabled: !!id, // Fetch only if ID is provided
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};

// Hook to fetch a list of properties with optional filters
export const useProperties = (filters: Record<string, any> = {}) => {
  return useQuery<ApiResponse<Property[]>>({
    queryKey: ["properties", filters],
    queryFn: () => PropertyService.fetchProperties(filters),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};

// Hook to create a new property
export const useCreateProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Property) => PropertyService.createProperty(data),
    onSuccess: () => {
      // Invalidate the property list query to refresh the data
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });
};

// Hook to update an existing property
export const useUpdateProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Property }) =>
      PropertyService.updateProperty(id, data),
    onSuccess: (_, { id }) => {
      // Invalidate the specific property and property list queries
      queryClient.invalidateQueries({ queryKey: ["propertyDetails", id] });
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });
};

// Hook to delete a property
export const useDeleteProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => PropertyService.deleteProperty(id),
    onSuccess: () => {
      // Invalidate the property list query to refresh the data
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });
};

// Hook to fetch properties filtered by user ID and status
export const usePropertiesByUserIdAndStatus = (id: string, status: string) => {
    return useQuery<ApiResponse<Property[]>>({
      queryKey: ["propertiesByUserIdAndStatus", { user: id, status }],
      queryFn: () => PropertyService.fetchProperties({ user: id, status }),
      staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    });
  };
