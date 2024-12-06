import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CorporateService, {
  InviteEmployeeRequest,
} from "@/lib/corporate-service";
import { useSession } from "next-auth/react";

// Hook to list employees
export const useListEmployees = (params: {
  limit: number;
  offset: number;
  search?: string;
  company_id?: string;
  user_id?: string;
}) => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  return useQuery({
    queryKey: ["employees", params],
    queryFn: async () => {
      const response = await CorporateService.listEmployees(params);
      return response.data;
    },
    enabled: !!token, // Only fetch if token exists
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};

// Hook to invite an employee
export const useInviteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => CorporateService.inviteEmployee(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "employees",
      });
    },
  });
};
