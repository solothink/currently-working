"use client";
import React, { FC, useState } from "react";
import facebookSvg from "@/images/Facebook.svg";
import appleSvg from "@/images/Apple.svg";
import googleSvg from "@/images/Google.svg";
import Input from "@/components/ui/forms/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import OtpComponent from "@/components/ui/forms/OtpComponent";
import { signIn } from "next-auth/react"; // Import NextAuth's signIn function
import AuthService from "@/lib/auth-service"; // Your API service
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import HeadingWithRoleDropdown from "./HeadingWithRoleDropdown";
import SignupLink from "./SignupLink";
import { getDefaultRedirectPath } from "../utils";

interface ErrorResponse {
  status: "error";
  message: string;
  errorCode: string;
  errors?: { field: string; message: string }[]; // Optional array for validation errors
}

export interface LoginComponentProps {}

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Apple",
    href: "#",
    icon: appleSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const LoginComponent: FC<LoginComponentProps> = () => {
  // Zod validation schema
  const loginSchema = z
    .object({
      email: z
        .string()
        .email("Invalid email address")
        .nonempty("Email is required"),

      password: z.string().optional(), // Password is optional when OTP is selected

      otp: z
        .string()
        .optional()
        .refine(
          (val) => !val || val.length === 4,
          "OTP must be exactly 4 digits"
        ), // OTP field
    })
    .superRefine((data, ctx) => {
      if (isOtpAuth) {
        // Require OTP only if it has been sent
        if (otpSent && !data.otp) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom, // Specify the issue code
            path: ["otp"],
            message: "OTP is required when using OTP authentication.",
          });
        }
      } else {
        // Require password if OTP is not being used
        if (!data.password) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom, // Specify the issue code
            path: ["password"],
            message: "Password is required when not using OTP authentication.",
          });
        }
      }
    });
  type LoginFormData = z.infer<typeof loginSchema>;
  const [isOtpAuth, setIsOtpAuth] = useState(true);
  const router = useRouter();

  const [otpSent, setOtpSent] = useState(false);
  const [emailCountdown, setEmailCountdown] = useState<number | null>(null);
  const [otpValue, setOtpValue] = useState<string>(""); // State to hold OTP value
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // useForm hook with zodResolver
  const {
    register,
    handleSubmit,
    setError,
    watch,
    getValues, // Destructure getValues
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
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
  const watchedFields = watch();
  console.log(watchedFields); // Check if the fields update as expected
  console.log("Errors object:", errors);

  const sendOtp = async () => {
    const email = getValues("email"); // Get the email value

    try {
      const result = await AuthService.generateSignupOtp(email); // Pass the email value
      if (result.status === "success") {
        toast.success("OTP sent successfully!");
        setOtpSent(true); // OTP has been sent, update state
        startCountdown(); // Start the countdown for OTP expiration
      } else {
        toast.error(result.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    console.log("Submitted data:", data);

    try {
      if (isOtpAuth && !otpSent) {
        // Send OTP logic
        await sendOtp();
        return; // Stop further execution to wait for OTP input
      }

      let response;
      // Continue with password or OTP login if OTP is already sent
      if (otpSent && data.otp) {
        response = await AuthService.loginWithEmailOTP(data.email, data.otp);
      } else if (data.password) {
        response = await AuthService.loginWithPassword(
          data.email,
          data.password
        );
      }

      if (response && response.status === "success") {
        // Process successful login here, sign the user in
        const { user, accessToken, refreshToken, expiresIn } = response.data;
        console.log("Login response:", response.data);
        const result = await signIn("credentials", {
          redirect: false,
          user: JSON.stringify(user),
          accessToken,
          refreshToken,
          expiresIn,
        });

        if (result?.error) {
          toast.error(result.error);
        } else {
          console.log("user ", user);
          toast.success("Login successful!");

          // Check if nextPage is available from the query
          const params = new URLSearchParams(window.location.search);
          const nextPage = params.get("nextPage");

          // Determine the redirect path based on user category
          let redirectPath = getDefaultRedirectPath(user.default_group);

          // Redirect to nextPage if available, otherwise use the category-based route
          router.push(nextPage || redirectPath);
        }
      } else {
        handleErrors(response as ErrorResponse);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleErrors = (data: ErrorResponse) => {
    console.log("error ", data);

    try {
      if (data?.errors) {
        data.errors.forEach((err) => {
          setError(err.field as keyof LoginFormData, { message: err.message });
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
    <div className={`nc-PageLogin`}>
      <div className="container mb-24 lg:mb-32">
        <HeadingWithRoleDropdown type="login" className="text-blue-600 my-20" />
        <div className="max-w-md mx-auto space-y-6">
          <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <Image
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}
          <form
            className="grid grid-cols-1 gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Email */}

            <Input
              label="Email address"
              type="email"
              placeholder="example@example.com"
              className="mt-1"
              {...register("email")}
              errorMessage={errors.email?.message}
              hasError={!!errors.email}
              required={true}
            />

            {/* Password */}
            {!isOtpAuth && (
              <Input
                label="Password"
                type="password"
                className="mt-1"
                {...register("password")}
                errorMessage={errors.password?.message}
                hasError={!!errors.password}
                required={!isOtpAuth}
              />
            )}
            {!isOtpAuth && (
              <div className="flex items-end justify-items-end	justify-end	">
                <Link
                  href="/forgot-password"
                  className="text-sm underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>
            )}

            {/* OTP Component */}
            {isOtpAuth && otpSent && (
              <OtpComponent
                emailCountdown={emailCountdown}
                startCountdown={startCountdown}
                error={errors.otp?.message}
                otpValue={otpValue}
                onOtpChange={(value) => {
                  setOtpValue(value); // Update local state
                  setValue("otp", value); // Update the OTP value in the form state
                }}
                onResendOtp={sendOtp} // Pass the sendOtp function here
              />
            )}

            {/* Submit Button */}
            <ButtonPrimary type="submit" loading={isLoading}>
              {isOtpAuth && !otpSent ? "Send OTP" : "Continue"}
            </ButtonPrimary>
          </form>

          {/* Toggle for OTP */}
          <div className="flex justify-center mt-4">
            {isOtpAuth ? (
              <button
                type="button"
                onClick={() => {
                  setIsOtpAuth(false);
                  setValue("otp", ""); // Clear OTP value when switching back
                }}
                className="underline font-semibold"
              >
                Login with password
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsOtpAuth(true);
                  setValue("password", ""); // Optionally clear password value
                }}
                className="underline font-semibold text-neutral-700 dark:text-neutral-300"
              >
                Secure login with an OTP
              </button>
            )}
          </div>

          {/* Already have an account */}
          <SignupLink />
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
