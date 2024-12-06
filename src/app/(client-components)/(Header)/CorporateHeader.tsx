import React, { FC } from "react";
import MainNav1 from "./MainNav1";
import MainNav2 from "./MainNav2";
import CorporateNav1 from "./CorporateNav1";

export interface HeaderProps {
  navType?: "MainNav1" | "MainNav2";
  className?: string;
}

const CorporateHeader: FC<HeaderProps> = ({
  navType = "MainNav1",
  className = "",
}) => {
  const renderNav = () => {
    switch (navType) {
      case "MainNav1":
        return <CorporateNav1 />;
      case "MainNav2":
        return <MainNav2 />;
      default:
        return <CorporateNav1 />;
    }
  };

  return (
    <div
      className={`nc-Header sticky top-0 w-full left-0 right-0 z-40 nc-header-bg ${className}`}
    >
      {renderNav()}
    </div>
  );
};

export default CorporateHeader;
