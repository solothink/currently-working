import LoginComponent from "@/app/(auth)/_components/LoginComponent";
import { Metadata } from "next";
import React, { FC } from "react";
import { redirect } from "next/navigation";
// Your NextAuth config
import { auth } from "@/auth";

const categoryRoutes: Record<string, string> = {
  "CL-ADMIN": "/corporate-dashboard",
  "CL-CUST": "/corporate-booking",
  "B-ADMIN": "/",
  "B-CUST": "/",
};

export const metadata: Metadata = {
  title: "Login | Idbook hotels™ - Secure & Convenient Hotel Booking",
  description:
    "Log in to Idbook hotels™ for secure and convenient hotel bookings. Manage your bookings, explore exclusive deals, and access holiday packages, group bookings, corporate inquiries, and more. Trusted worldwide, connect with us via Facebook, Twitter, Instagram, YouTube & LinkedIn. Download our app for fast access.",
};
export interface PageLoginProps {}

const PageLogin: FC<PageLoginProps> = async () => {
  const session = await auth();

  if (session) {
    const userCategory = session.user?.category;
    const redirectPath = categoryRoutes[userCategory] || "/";
    redirect(redirectPath); // Redirect if the user is logged in
  }
  return (
    <>
      <LoginComponent />
    </>
  );
};

export default PageLogin;
