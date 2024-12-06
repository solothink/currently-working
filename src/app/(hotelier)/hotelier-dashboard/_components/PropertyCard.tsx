'use client';
import React from "react";

interface PropertyCardProps {
  name: string;
  city?: string;
  state?: string;
  rating?: string;
  onClick?: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  name,
  city,
  state,
  rating,
  onClick,
}) => {
  return (
    <div
      className="flex items-center justify-between mb-4 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-neutral-200 rounded-lg flex items-center justify-center">
          <span className="text-xl text-neutral-500">🏨</span>
        </div>
        <div>
          <h3 className="text-md font-medium text-neutral-800">{name}</h3>
          {city && state && (
            <p className="text-sm text-neutral-500">
              {city}, {state}
            </p>
          )}
        </div>
      </div>
      {rating && (
        <div className="text-right">
          <p className="text-sm font-medium text-primary-500">{rating} ★</p>
        </div>
      )}
    </div>
  );
};

export default PropertyCard;
