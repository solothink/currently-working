import React from "react";
import NavigationItem from "./NavigationItem";
import { CORPORATE_NAVIGATION } from "@/data/navigation";

function CorporateNavigation() {
  return (
    <ul className="nc-Navigation hidden lg:flex lg:flex-wrap lg:space-x-1 relative">
      {CORPORATE_NAVIGATION.map((item) => (
        <NavigationItem key={item.id} menuItem={item} />
      ))}
    </ul>
  );
}

export default CorporateNavigation;
