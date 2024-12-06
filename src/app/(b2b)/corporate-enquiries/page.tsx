import React, { FC } from "react";
import Link from "next/link";
import { Metadata } from "next";
import Corporates from "@/components/CorporateLanding/Corporates";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title:
    "Corporate Enquiries | Idbook hotels™ - Innovative Solutions for Business Travel",
  description:
    "Partner with Idbook hotels™ for innovative hospitality solutions tailored for corporate travel. Access over 4000+ properties with up to 40% savings, manage all bookings through a single portal, and enjoy hassle-free GST invoicing. Experience transparency, save time, and reduce travel expenses with Idbook's corporate portal. Contact us today to learn more about our offerings and join the Idbook family.",
};

export interface PageCorporateEnquiriesProps {}

const PageCorporateEnquiries: FC<PageCorporateEnquiriesProps> = async () => {
  const session = await auth();

  if (session) {
    const userCategory = session.user?.category;
    if (userCategory === "CL-ADMIN") {
      redirect("/corporate-dashboard"); // Redirect if the user is not logged in
    } else if (userCategory === "CL-CUST") {
      redirect("/corporate-booking"); // Redirect if the user is not logged in
    }
  }
  return <Corporates />;
};

export default PageCorporateEnquiries;
