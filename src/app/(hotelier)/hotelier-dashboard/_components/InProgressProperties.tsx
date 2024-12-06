'use client';

import React from "react";
import PropertyCard from "./PropertyCard";
import { Property } from "@/lib/property-service";

interface InProgressPropertiesProps {
  properties: Property[]
}

const InProgressProperties: React.FC<InProgressPropertiesProps> = ({
  properties,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          name={property.name}
          city={property.city_name}
          state={property.state}
          onClick={() => (window.location.href = "/add-listing")}
        />
      ))}
    </div>
  );
};

export default InProgressProperties;
