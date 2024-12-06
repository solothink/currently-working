import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import CorporateService from "@/lib/corporate-service";

// Interface for company details
interface CompanyDetails {
  id: number;
  company_name: string;
  brand_name: string;
  company_logo: string | null;
  company_email: string;
  company_website: string;
  gstin_no: string;
  pan_no: string;
  registered_address: string;
  contact_email_address: string;
  country: string;
  latitude: number;
  longitude: number;
  approved: boolean;
  is_active: boolean;
  business_rep?: {
    name: string;
    email: string;
    mobile_number: string;
  };
}

// API Response type to wrap the data
interface ApiResponse<T> {
  status: string;
  message?: string;
  count?: number;
  data?: T;
}

// Custom hook for fetching corporate data
export const useCorporateData = (): {
  profileQuery: UseQueryResult<CompanyDetails, Error>;
} => {
  const { data: session, status } = useSession();
  const companyId = session?.user?.company_id;

  const profileQuery = useQuery<CompanyDetails, Error>({
    queryKey: ["corporateProfile", companyId],
    queryFn: async (): Promise<CompanyDetails> => {
      if (!companyId) {
        throw new Error("Company ID is not available.");
      }

      const response: ApiResponse<CompanyDetails> =
        await CorporateService.getCorporateProfile(companyId);

      // if (response.status !== "success" || !response.data) {
      if (!response.data) {
        throw new Error(
          response.message || "Failed to fetch corporate profile.",
        );
      }

      return response.data;
    },
    staleTime: 1000 * 60 * 10, // Cache the result for 10 minutes
    enabled: status === "authenticated" && !!companyId, // Only run when authenticated
    retry: 2, // Retry failed queries up to 2 times
  });

  return { profileQuery };
};
