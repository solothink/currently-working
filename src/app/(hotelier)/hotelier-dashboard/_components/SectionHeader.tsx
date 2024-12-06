import React from "react";

interface SectionHeaderProps {
  title: string;
  count: number;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, count }) => {
  return (
    <h2 className="text-lg font-semibold text-neutral-700 mb-4">
      {title} ({count})
    </h2>
  );
};

export default SectionHeader;
