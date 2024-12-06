import React, { FC } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Nav } from "./(components)/Nav";

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
      <div className="nc-CommonLayoutAccount bg-neutral-50 dark:bg-neutral-900">
        <div className="border-b border-neutral-200 dark:border-neutral-700 pt-12 bg-white dark:bg-neutral-800">
          <Nav />
        </div>
        <div className="container pt-14 sm:pt-20 pb-24 lg:pb-32">
          {children}
        </div>
      </div>
    </>
  );
};

export default CommonLayout;
