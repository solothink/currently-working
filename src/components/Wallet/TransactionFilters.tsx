"use client";

// components/TransactionFilters.tsx
interface FilterOption {
  label: string;
  value: string;
}

interface TransactionFiltersProps {
  filters: FilterOption[];
  selectedFilters: string[]; // Add selectedFilters prop
  onChange: (selected: string) => void;
}

const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  filters,
  selectedFilters, // Destructure selectedFilters
  onChange,
}) => (
  <div className="space-y-2">
    {filters.map((filter) => (
      <label key={filter.value} className="flex items-center space-x-2">
        <input
          type="checkbox"
          value={filter.value}
          checked={selectedFilters.includes(filter.value)} // Check if the filter is selected
          onChange={(e) => onChange(e.target.value)}
          className="form-checkbox text-primary-600"
        />
        <span>{filter.label}</span>
      </label>
    ))}
  </div>
);

export default TransactionFilters;
