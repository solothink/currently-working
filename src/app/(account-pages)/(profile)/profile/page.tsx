"use client";

import React, { FC } from "react";
import ProfileComponent from "@/components/features/profile/Profile";
import { useUserProfile, useUpdateUserProfile } from "@/hooks/useProfile"; // Assuming these hooks are correctly set up
import { ProfileResponse } from "@/lib/profile-service";
import { toast } from "react-toastify";

export interface AccountPageProps {}

const AccountPage: FC<AccountPageProps> = () => {
  // Fetch the user profile using react-query
  const { data, isLoading, isError } = useUserProfile();
  const updateProfileMutation = useUpdateUserProfile();

  const handleUpdateProfile = (updatedProfile: ProfileResponse) => {
    const formData = new FormData();

    // Append each profile field to formData
    formData.append("address", updatedProfile.customer_details.address || "");
    formData.append("gender", updatedProfile.customer_details.gender || "");
    formData.append(
      "date_of_birth",
      updatedProfile.customer_details.date_of_birth || "",
    );
    formData.append(
      "id_proof_type",
      updatedProfile.customer_details.id_proof_type || "",
    );
    formData.append(
      "pan_card_number",
      updatedProfile.customer_details.pan_card_number || "",
    );
    formData.append(
      "aadhar_card_number",
      updatedProfile.customer_details.aadhar_card_number || "",
    );
    formData.append(
      "emergency_contact_name",
      updatedProfile.customer_details.emergency_contact_name || "",
    );
    formData.append(
      "emergency_contact_phone",
      updatedProfile.customer_details.emergency_contact_phone || "",
    );
    formData.append(
      "preferred_language",
      updatedProfile.customer_details.preferred_language || "",
    );
    formData.append(
      "dietary_restrictions",
      updatedProfile.customer_details.dietary_restrictions || "",
    );
    formData.append(
      "special_requests",
      updatedProfile.customer_details.special_requests || "",
    );
    formData.append(
      "group_name",
      updatedProfile.customer_details.group_name || "",
    );
    formData.append(
      "department",
      updatedProfile.customer_details.department || "",
    );
    formData.append("name", updatedProfile.name || "");

    // Check if profile_picture is a file and append if it is
    if (updatedProfile.customer_details.profile_picture instanceof File) {
      formData.append(
        "profile_picture",
        updatedProfile.customer_details.profile_picture,
      );
    }

    // Check if id_proof is a file and append if it is
    if (updatedProfile.customer_details.id_proof instanceof File) {
      formData.append("id_proof", updatedProfile.customer_details.id_proof);
    }

    // Use mutation to send the FormData to the server
    updateProfileMutation.mutate(formData, {
      onSuccess: (data) => {
        if (data?.status === "error") {
          toast.error(data.message);
          // If the server responds with specific validation errors
          const errors = data.errors;
          errors?.forEach((err: { field: string; message: string }) => {
            toast.error(`${err.field}: ${err.message}`);
          });
        } else {
          toast.success("Profile updated successfully");
        }
        console.log(data);
      },
      onError: (error: any) => {
        if (error.response?.data?.status === "error") {
          // If the server responds with specific validation errors
          const errors = error.response.data.errors;
          errors.forEach((err: { field: string; message: string }) => {
            toast.error(`${err.field}: ${err.message}`);
          });
        } else {
          // Generic error message
          toast.error(error.message || "Error updating profile");
        }
      },
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading profile data</div>;

  return (
    <div className="space-y-6 sm:space-y-8">
      {data && (
        <ProfileComponent
          profile={data} // Pass the fetched profile data
          onUpdateProfile={handleUpdateProfile} // Pass update handler to ProfileComponent if needed
        />
      )}
    </div>
  );
};

export default AccountPage;
