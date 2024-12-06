// src/components/Loading.tsx
import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative w-16 h-16">
        {/* Outer circle */}
        <div className="absolute w-full h-full border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>

        {/* Inner dot */}
        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-primary-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </div>
  );
};

export default Loading;
