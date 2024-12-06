import { auth } from "@/auth";
import SignUpComponent from "@/app/(auth)/_components/SignUpComponent";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React, { FC } from "react";

export const metadata: Metadata = {
  title: "Sign Up | Idbook hotels™ - Join for Exclusive Deals & Easy Bookings",
  description:
    "Create an account with Idbook hotels™ for exclusive hotel deals and faster bookings. Access holiday packages, group bookings, partner opportunities, and more. Join today and enjoy seamless hotel bookings worldwide. Connect with us via Facebook, Twitter, Instagram, YouTube & LinkedIn, or download our app for a smooth booking experience.",
};

export interface PageSignUpProps {}

const categoryRoutes: Record<string, string> = {
  "CL-ADMIN": "/corporate-dashboard",
  "CL-CUST": "/corporate-booking",
  "B-ADMIN": "/",
  "B-CUST": "/",
};
const PageLogin: FC<PageSignUpProps> = async () => {
  const session = await auth();

  if (session) {
    const userCategory = session.user?.category;
    const redirectPath = categoryRoutes[userCategory] || "/";
    redirect(redirectPath); // Redirect if the user is logged in
  }
  return (
    <>
      <SignUpComponent />
    </>
  );
};

export default PageLogin;
