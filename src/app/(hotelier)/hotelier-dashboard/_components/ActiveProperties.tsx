'use client';

import React from "react";
import PropertyCard from "./PropertyCard";
import { Property } from "@/lib/property-service";

interface ActivePropertiesProps {
  properties: Property[];
}

const ActiveProperties: React.FC<ActivePropertiesProps> = ({ properties }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          name={property.name}
          city={property.city_name}
          state={property.state}
          onClick={() => window.open(property.external_url, "_blank")}
        />
      ))}
    </div>
  );
};

export default ActiveProperties;
