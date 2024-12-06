"use client";

import React, { useEffect, useState } from "react";
import CompanyDetailsCard from "@/components/Corporate/CompanyDetails";
import { useCorporateData } from "@/hooks/useCorporateData";
import { LoadingState } from "@/components/Corporate/CompanyLoading";
import { ErrorState } from "@/components/Corporate/ErrorState";

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
}

// Updated Company Details page
const CompanyDetails: React.FC = () => {
  const { profileQuery } = useCorporateData();
  const { data: profileData, isLoading, error } = profileQuery;
  const [company, setCompany] = useState<CompanyDetails | null>(null);

  useEffect(() => {
    if (profileData) {
      setCompany(profileData);
    }
  }, [profileData]);

  if (isLoading) return <LoadingState />;

  if (error)
    return (
      <ErrorState
        message={
          error instanceof Error
            ? error.message
            : "An unexpected error occurred"
        }
      />
    );

  if (!company) return <ErrorState message="No company data available" />;

  return <CompanyDetailsCard details={company} onEdit={() => {}} />;
};

export default CompanyDetails;
