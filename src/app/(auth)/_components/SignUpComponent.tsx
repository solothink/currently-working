"use client";
import React, { FC, useEffect, useState } from "react";
import Input from "@/components/ui/forms/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import OtpComponent from "@/components/ui/forms/OtpComponent";
import AuthService from "@/lib/auth-service"; // Your API service
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Apple.svg";
import Image from "next/image";
import googleSvg from "@/images/Google.svg";
import HeadingWithRoleDropdown from "./HeadingWithRoleDropdown";
import LoginLink from "./LoginLink";
import useDefaultRole from "../_hooks/useDefaultRole";
import { signupRoles } from "../constants";
import { getDefaultRedirectPath } from "../utils";
interface ErrorResponse {
  status: "error";
  message: string;
  errorCode: string;
  errors?: { field: string; message: string }[]; // Optional array for validation errors
}
const SignUpComponent: FC = () => {
  // Zod validation schema
  const signupSchema = z
    .object({
      name: z.string().nonempty("Name is required"),
      email: z
        .string()
        .email("Invalid email address")
        .nonempty("Email is required"),
      mobile_number: z
        .string()
        .length(10, "Phone number must be exactly 10 digits")
        .regex(/^\d+$/, "Phone number must contain only digits"),
      password: z.string().optional(), // Password is optional when OTP is selected
      otp: z
        .string()
        .optional()
        .refine(
          (val) => !val || val.length === 4,
          "OTP must be exactly 4 digits"
        ), // OTP field
      group_name: z.string().nonempty("Group name is required"), // field for group name
    })
    .superRefine((data, ctx) => {
      if (isOtpAuth) {
        // Require OTP only if it has been sent
        if (otpSent && !data.otp) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["otp"],
            message: "OTP is required when using OTP authentication.",
          });
        }
      } else {
        // Require password if OTP is not being used
        if (!data.password) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["password"],
            message: "Password is required when not using OTP authentication.",
          });
        }
      }
    });

  type SignupFormData = z.infer<typeof signupSchema>;
  const [isOtpAuth, setIsOtpAuth] = useState(false);
  const router = useRouter();
  const [otpSent, setOtpSent] = useState(false);
  const [emailCountdown, setEmailCountdown] = useState<number | null>(null);
  const [otpValue, setOtpValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginSocials = [
    {
      name: "Continue with Facebook",
      href: "#",
      icon: facebookSvg,
    },
    {
      name: "Continue with Apple",
      href: "#",
      icon: twitterSvg,
    },
    {
      name: "Continue with Google",
      href: "#",
      icon: googleSvg,
    },
  ];

  const defaultRole = useDefaultRole(signupRoles); // Use the custom hook

  // useForm hook with zodResolver
  const {
    register,
    handleSubmit,
    setError,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  // Set group_name based on default role
  useEffect(() => {
    setValue("group_name", defaultRole.value); // Automatically populate group_name
  }, [defaultRole, setValue]);

  const startCountdown = () => {
    let time = 6;
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

  const sendOtp = async () => {
    const email = getValues("email");

    try {
      const result = await AuthService.generateSignupOtp(email);
      if (result.status === "success") {
        toast.success("OTP sent successfully!");
        setOtpSent(true);
        startCountdown();
      } else {
        toast.error(result.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  const onSubmit = async (data: SignupFormData) => {
    try {
      setIsLoading(true);
      if (isOtpAuth && !otpSent) {
        // Send OTP logic
        await sendOtp();
        return;
      }

      let response;
      if (otpSent && data.otp) {
        response = await AuthService.signupWithEmailOTP(data);
      } else {
        response = await AuthService.signupWithPassword(data);
      }

      if (response && response.status === "success") {
        const { user, accessToken, refreshToken, expiresIn } = response.data;
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
          toast.success("SignUp successful!");
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
      console.error("Signup error:", error);
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
          setError(err.field as keyof SignupFormData, { message: err.message });
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
    <div className="nc-AuthPage">
      <div className="container mb-24 lg:mb-32">
        <HeadingWithRoleDropdown
          type="signup"
          className="text-blue-600 my-20"
        />

        <div className="max-w-md mx-auto space-y-8">
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
          {/* Form Section */}
          <form
            className="grid grid-cols-1 gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              label="Name"
              type="text"
              placeholder="Your Name"
              className="mt-1"
              {...register("name")}
              errorMessage={errors.name?.message}
              hasError={!!errors.name}
              required={true}
            />
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
            <Input
              label="Phone number"
              type="text"
              placeholder="10-digit mobile_number number"
              className="mt-1"
              {...register("mobile_number")}
              errorMessage={errors.mobile_number?.message}
              hasError={!!errors.mobile_number}
              required={true}
            />
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
            {isOtpAuth && otpSent && (
              <OtpComponent
                emailCountdown={emailCountdown}
                startCountdown={startCountdown}
                error={errors.otp?.message}
                otpValue={otpValue}
                onOtpChange={(value) => {
                  setOtpValue(value);
                  setValue("otp", value);
                }}
                onResendOtp={sendOtp}
              />
            )}
            <ButtonPrimary type="submit" loading={isLoading}>
              {isOtpAuth && !otpSent ? "Send OTP" : "Continue"}
            </ButtonPrimary>
          </form>
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
                Back to sign up with password
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
                Secure sign up with an OTP
              </button>
            )}
          </div>
          <LoginLink />
        </div>
      </div>
    </div>
  );
};

export default SignUpComponent;
