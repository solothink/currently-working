import React, { FC } from "react";
import { Metadata } from "next";
import CorporateRegisterForm from "@/app/(auth)/_components/CorporateRegisterForm";

export const metadata: Metadata = {
  title:
    "Corporate Travel Registration | Unlock Exclusive Benefits with Idbook hotels™",
  description:
    "Register your business with Idbook hotels™ for corporate travel solutions. Get exclusive discounts, flexible booking options, priority support, and seamless hotel management across top destinations in India, Nepal, Maldives, Europe, and more.",
};

export interface PageCorporateSignUpProps {}

const PageCorporateSignUp: FC<PageCorporateSignUpProps> = () => {
  return <CorporateRegisterForm />;
};

export default PageCorporateSignUp;
