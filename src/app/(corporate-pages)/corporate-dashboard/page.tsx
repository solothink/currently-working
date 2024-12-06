import React, { FC } from "react";
import { Metadata } from "next";
import AdminPanel from "@/components/Corporate/CorporateDashboard";

export const metadata: Metadata = {
  title: "Company Details | Idbook Hospitality™",
  description:
    "Understand Idbook Hospitality's Refund Policy. Learn about our customer satisfaction guarantee, eligibility for refunds, return conditions, and how to initiate a return. We strive to ensure a smooth process for all your transactions with us.",
};

export interface PageCorporateDashboardProps {}

const PageCorporateDashboard: FC<PageCorporateDashboardProps> = () => {
  return (
    <>
      <AdminPanel />
    </>
  );
};

export default PageCorporateDashboard;
