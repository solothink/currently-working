'use client';

import React, { FC } from "react";
import { useRouter } from "next/navigation";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import { useListingStore } from "@/store/listingStore";
import { useCreateProperty, useUpdateProperty } from "@/hooks/useProperty";
import { Property } from "@/lib/property-service";
import { toast } from "react-toastify";

export interface CommonLayoutProps {
  children: React.ReactNode;
  params: {
    stepIndex: string;
    propertyId?: string;
  };
}

const CommonLayout: FC<CommonLayoutProps> = ({ children, params }) => {
  const router = useRouter();
  const { stepIndex, propertyId } = params;
  const index = Number(stepIndex) || 1;

  const { pageSpecificData, savePageData, setActiveStep } = useListingStore();
  const createProperty = useCreateProperty();
  const updateProperty = useUpdateProperty();
  const isLoading = createProperty.status === "pending" || updateProperty.status === "pending";

  const handleSaveProperty = async () => {
    const isCreate = !propertyId;
  
    try {
      let newPropertyId = propertyId;
  
      if (isCreate) {
        // Create property and get the id from the response
        const response = await createProperty.mutateAsync(pageSpecificData as Property);
        console.log("response ", response)
        if (response.status == "error") {

          if(response.errors){
            response.errors.forEach((err) => {
              toast.error(err.message)
            });
          }
          else{
            toast.error(response.message)
          }
          return 
        }
        else{
          toast.success("Property created successfully")
        }
        newPropertyId = response.data?.id?.toString(); // Extract id from the response
      } else {
        // Update existing property
        await updateProperty.mutateAsync({ id: Number(propertyId), data: pageSpecificData });
      }
  
      savePageData();
      setActiveStep(index + 1);
  
      // Construct the next URL
      const nextHref = `/add-listing/${index + 1}?propertyId=${newPropertyId}`;
      router.push(nextHref);
    } catch (error) {
      console.error("Error saving property:", error);
      alert("Failed to save property. Please try again.");
    }
  };

  // const handleErrors = (data) => {
  //   console.log("error ", data);

  //   try {
  //     if (data?.errors) {
  //       data.errors.forEach((err) => {
  //         setError(err.field as keyof LoginFormData, { message: err.message });
  //       });
  //     } else {
  //       toast.error(data.message || "An error occurred");
  //     }

  //     if (data?.message) {
  //       toast.error(data.message || "An error occurred");
  //     }
  //   } catch {
  //     toast.error(data.message || "An error occurred");
  //   }
  // };
  

  return (
    <div className="nc-PageAddListing1 px-4 max-w-3xl mx-auto pb-24 pt-14 sm:py-24 lg:pb-32">
      <div className="space-y-11">
        <div>
          <span className="text-4xl font-semibold">{index}</span>{" "}
          <span className="text-lg text-neutral-500 dark:text-neutral-400">/ 10</span>
        </div>
        <div className="listingSection__wrap">{children}</div>
        <div className="flex justify-end space-x-5">
          <ButtonSecondary href={`/add-listing/${index - 1}`} disabled={isLoading}>
            Go back
          </ButtonSecondary>
          <ButtonPrimary onClick={handleSaveProperty} disabled={isLoading}>
            {isLoading ? "Saving..." : index === 10 ? "Publish listing" : "Continue"}
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

export default CommonLayout;
