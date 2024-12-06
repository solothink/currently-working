import React, { FC } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export interface CommonLayoutProps {
  children?: React.ReactNode;
}

const CommonLayout: FC<CommonLayoutProps> = async ({ children }) => {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }
  return (
    <>
      {children}
    </>
  );
};

export default CommonLayout;
