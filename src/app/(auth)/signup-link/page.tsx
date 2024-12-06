"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/components/ui/forms/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import AuthService from "@/lib/auth-service"; // API service
import { signIn } from "next-auth/react";

// Validation schema
const inviteSchema = z.object({
  name: z.string().nonempty("Name is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  mobile_number: z
    .string()
    .length(10, "Phone number must be exactly 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  email: z.string().email("Invalid email address").nonempty(),
});

type InviteFormData = z.infer<typeof inviteSchema>;

const AcceptInviteForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // To fetch query params
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InviteFormData>({
    resolver: zodResolver(inviteSchema),
  });
  const [isLoading, setIsLoading] = useState(false);

  // Fetch token and email from URL parameters
  useEffect(() => {
    const email = searchParams.get("email");
    const token = searchParams.get("token");

    if (email) setValue("email", email); // Pre-fill email if available
    if (!token) {
      toast.error("Invalid or missing invite token.");
      router.push("/signup");
    }
  }, [searchParams, router, setValue]);

  const onSubmit = async (data: InviteFormData) => {
    const token = searchParams.get("token");

    const payload = { ...data, token };
    console.log("payload", payload);
    try {
      setIsLoading(true);
      const response = await AuthService.acceptInvite(token ?? "", data);

      if (response.status === "success") {
        const { accessToken, refreshToken, user } = response.data;

        // Sign in user with received tokens
        await signIn("credentials", {
          redirect: false,
          user: JSON.stringify(user),
          accessToken,
          refreshToken,
        });

        toast.success("Signup successful!");
        router.push("/corporate-booking"); // Redirect to dashboard or another page
      } else {
        toast.error(response.message || "Signup failed.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Join through Invite
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Name"
          type="text"
          placeholder="Your Name"
          {...register("name")}
          errorMessage={errors.name?.message}
          hasError={!!errors.name}
        />
        <Input
          label="Email"
          type="email"
          placeholder="Email Address"
          {...register("email")}
          errorMessage={errors.email?.message}
          hasError={!!errors.email}
          //   disabled // Email is pre-filled and non-editable
        />
        <Input
          label="Phone Number"
          type="text"
          placeholder="10-digit mobile number"
          {...register("mobile_number")}
          errorMessage={errors.mobile_number?.message}
          hasError={!!errors.mobile_number}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Create a password"
          {...register("password")}
          errorMessage={errors.password?.message}
          hasError={!!errors.password}
        />
        <ButtonPrimary type="submit" loading={isLoading}>
          Join Now
        </ButtonPrimary>
      </form>
    </div>
  );
};

export default AcceptInviteForm;
