"use client";
import React, { FC, useState } from "react";
import Input from "@/components/ui/forms/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Link from "next/link";
import OtpComponent from "@/components/ui/forms/OtpComponent";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthService from "@/lib/auth-service"; // Extracted service for API calls
import "react-toastify/dist/ReactToastify.css";

// Zod schema for validation
const resetPasswordSchema = z
  .object({
    email: z
      .string()
      .email("Invalid email address")
      .nonempty("Email is required"),

    otp: z.string().length(4, "OTP must be exactly 4 digits").optional(),

    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .optional(),

    confirmPassword: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Require both passwords if OTP is provided
    if (data.otp) {
      if (!data.newPassword) {
        ctx.addIssue({
          path: ["newPassword"],
          message: "New password is required when OTP is provided",
          code: z.ZodIssueCode.custom,
        });
      }
      if (!data.confirmPassword) {
        ctx.addIssue({
          path: ["confirmPassword"],
          message: "Confirm password is required when OTP is provided",
          code: z.ZodIssueCode.custom,
        });
      }
    }

    // Check if passwords match (only if both are provided)
    if (data.newPassword && data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords do not match",
        code: z.ZodIssueCode.custom,
      });
    }
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPasswordForm: FC = () => {
  const router = useRouter();
  const [otpSent, setOtpSent] = useState(false);
  const [emailCountdown, setEmailCountdown] = useState<number | null>(null);
  const [otpValue, setOtpValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const startCountdown = () => {
    let time = 60;
    setEmailCountdown(time);
    const interval = setInterval(() => {
      time -= 1;
      if (time <= 0) {
        clearInterval(interval);
        setEmailCountdown(null);
      } else {
        setEmailCountdown(time);
      }
    }, 1000);
  };

  const sendOtp = async (email: string) => {
    try {
      const response = await AuthService.generateSignupOtp(email);
      if (response.status === "success") {
        toast.success("OTP sent to your email!");
        setOtpSent(true);
        startCountdown();
      } else {
        toast.error(response.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  const handleResetPassword = async (data: ResetPasswordFormData) => {
    if (data.email && data.newPassword) {
      try {
        setIsLoading(true);
        const response = await AuthService.resetPasswordWithOtp(
          data.email,
          otpValue,
          data.newPassword,
        );

        if (response.status === "success") {
          toast.success("Password reset successful! Redirecting to login...");
          router.push("/login");
        } else {
          handleErrors(response);
        }
      } catch (error) {
        console.error("Password reset error:", error);
        toast.error("An unexpected error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleErrors = (errorResponse: any) => {
    if (errorResponse.errors) {
      errorResponse.errors.forEach((err: { field: string; message: string }) =>
        setError(err.field as keyof ResetPasswordFormData, {
          message: err.message,
        }),
      );
    } else {
      toast.error(errorResponse.message || "An error occurred");
    }
  };

  return (
    <div className="nc-PageResetPassword">
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 text-center text-3xl font-semibold text-neutral-900">
          Reset Password
        </h2>

        <div className="max-w-md mx-auto space-y-6">
          <form
            onSubmit={handleSubmit(handleResetPassword)}
            className="grid gap-6"
          >
            <Input
              label="Email address"
              type="email"
              {...register("email")}
              errorMessage={errors.email?.message}
              hasError={!!errors.email}
              required
            />

            {otpSent && (
              <>
                <OtpComponent
                  emailCountdown={emailCountdown}
                  otpValue={otpValue}
                  onOtpChange={(value) => {
                    setOtpValue(value);
                    setValue("otp", value);
                  }}
                  startCountdown={startCountdown}
                  error={errors.otp?.message}
                  onResendOtp={() => sendOtp(watch("email"))}
                />

                <Input
                  label="New Password"
                  type="password"
                  {...register("newPassword")}
                  errorMessage={errors.newPassword?.message}
                  hasError={!!errors.newPassword}
                  required
                />

                <Input
                  label="Confirm Password"
                  type="password"
                  {...register("confirmPassword")}
                  errorMessage={errors.confirmPassword?.message}
                  hasError={!!errors.confirmPassword}
                  required
                />

                <ButtonPrimary loading={isLoading} type="submit">
                  Reset Password
                </ButtonPrimary>
              </>
            )}

            {!otpSent && (
              <ButtonPrimary
                loading={isLoading}
                type="button"
                onClick={() => sendOtp(watch("email"))}
              >
                Send OTP
              </ButtonPrimary>
            )}
          </form>

          <div className="text-center mt-4">
            <Link href="/login" className="underline">
              Back to login
            </Link>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ResetPasswordForm;
