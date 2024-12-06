import LoginComponent from "@/app/(auth)/_components/LoginComponent";
import ResetPasswordForm from "@/app/(auth)/_components/ResetPasswordForm";
import { Metadata } from "next";
import React, { FC } from "react";

export const metadata: Metadata = {
  title: "Forgot Password | Idbook hotels™ - Reset Your Password Easily",
  description:
    "Reset your password quickly and securely with Idbook hotels™. If you've forgotten your password, enter your email to receive a password reset link. Regain access to your account in just a few simple steps. For any assistance, feel free to contact our support team.",
};

export interface PageForgotPasswordProps {}

const PageForgotPassword: FC<PageForgotPasswordProps> = () => {
  return (
    <>
      <ResetPasswordForm />
    </>
  );
};

export default PageForgotPassword;
