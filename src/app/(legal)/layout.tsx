import React from "react";
import SiteHeader from "../(client-components)/(Header)/SiteHeader";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 mx-8 md:mx-28 rounded-lg">
      {/* <SiteHeader /> */}
      <main>{children}</main>

      {/* Add your footer component here */}
    </div>
  );
};

export default Layout;
