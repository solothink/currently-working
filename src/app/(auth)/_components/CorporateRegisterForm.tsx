"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/components/ui/forms/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import AuthService from "@/lib/auth-service"; // New API service
import Image from "next/image";
import HeadingWithRoleDropdown from "./HeadingWithRoleDropdown";
import LoginLink from "./LoginLink";

interface ErrorResponse {
  status: "error";
  message: string;
  errorCode: string;
  errors?: { field: string; message: string }[]; // Optional array for validation errors
}

const companySchema = z.object({
  company_logo: z.any().optional(),
  company_name: z.string().nonempty("Company name is required"),
  brand_name: z.string().optional(),
  company_email: z
    .string()
    .email("Invalid email")
    .nonempty("Email is required"),
  company_website: z.string().url("Invalid website").optional(),
  gstin_no: z.string().optional(),
  pan_no: z.string().optional(),
  registered_address: z.string().nonempty("Address is required"),
  contact_person_name: z.string().nonempty("Contact person name is required"),
  contact_number: z.string().nonempty("Contact number is required"),
  designation: z.string().optional(),
  contact_email_address: z.string().email("Invalid contact email").optional(),
  district: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  pin_code: z.string().optional(),
});

type CorporateFormData = z.infer<typeof companySchema>;

const CorporateRegisterForm: React.FC = () => {
  const router = useRouter();
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<CorporateFormData>({
    resolver: zodResolver(companySchema),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setCompanyLogo(e.target.files[0]);
    }
  };

  const onSubmit = async (data: CorporateFormData) => {
    setIsLoading(true);
    clearErrors();
    console.log("Form data:", data);
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      console;
      formData.append(key, (data as any)[key]);
    });
    if (companyLogo) {
      formData.append("company_logo", companyLogo);
    }

    console.log("Form Data 2:", formData);

    try {
      const response = await AuthService.submitCompanyDetails(formData);
      console.log("Signup response:", response);
      if (response.status === "success") {
        toast.success("Signup successful! Redirecting to login...");
        router.push("/login");
      } else if (response.status === "error" && response.errors) {
        handleErrors(response as ErrorResponse);
      } else {
        toast.error(response.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleErrors = (data: ErrorResponse) => {
    console.log("error ", data);

    try {
      if (data?.errors) {
        data.errors.forEach((err) => {
          setError(err.field as keyof CorporateFormData, {
            message: err.message,
          });
        });
      } else {
        toast.error(data.message || "An error occurred");
      }

      if (data?.message) {
        toast.error(data.message || "An error occurred");
      }
    } catch {
      toast.error(data.message || "An error occurred");
    }
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row items-center lg:justify-between gap-2 py-8 px-4 md:px-12">
      {/* Left-side Image */}
      <div className="md:w-1/2">
        <Image
          src="/corporate/corporate-signup.png"
          alt="Corporate Signup"
          width={500}
          height={500}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Signup Form */}
      <div className="md:w-1/2 mx-auto space-y-6">

      <HeadingWithRoleDropdown
        type="signup"
        className="text-blue-600 my-20"
      />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 mx-4"
        >
          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
            
            <Input
              label="Contact Person Name"
              {...register("contact_person_name")}
              errorMessage={errors.contact_person_name?.message}
              required
            />
            <Input
              label="Contact Number"
              {...register("contact_number")}
              errorMessage={errors.contact_number?.message}
              required
            />
            <Input
              label="Designation"
              {...register("designation")}
              errorMessage={errors.designation?.message}
            />
            <Input
              label="Contact Email Address"
              type="email"
              {...register("contact_email_address")}
              errorMessage={errors.contact_email_address?.message}
            />
          </div>

          {/* Company Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
            <Input
              label="Company Name"
              {...register("company_name")}
              errorMessage={errors.company_name?.message}
              required
            />
            <Input
              label="Brand Name"
              {...register("brand_name")}
              errorMessage={errors.brand_name?.message}
            />
            <Input
              label="Company Email"
              type="email"
              {...register("company_email")}
              errorMessage={errors.company_email?.message}
              required
            />
            <Input
              label="Company Website"
              type="url"
              {...register("company_website")}
              errorMessage={errors.company_website?.message}
            />
          </div>

          {/* Registration Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
            <Input
              label="GSTIN Number"
              {...register("gstin_no")}
              errorMessage={errors.gstin_no?.message}
            />
            <Input
              label="PAN Number"
              {...register("pan_no")}
              errorMessage={errors.pan_no?.message}
            />
            <Input
              label="Pin Code"
              {...register("pin_code")}
              errorMessage={errors.pin_code?.message}
            />
            <Input
              label="Registered Address"
              {...register("registered_address")}
              errorMessage={errors.registered_address?.message}
              required
            />
          </div>

          {/* Company Logo */}
          <div className="">
            <label className="block font-medium mb-1">Company Logo</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          <ButtonPrimary type="submit" loading={isLoading} className="w-full">
            Signup
          </ButtonPrimary>
        </form>
        <LoginLink/>

      </div>
    </div>
  );
};

export default CorporateRegisterForm;
