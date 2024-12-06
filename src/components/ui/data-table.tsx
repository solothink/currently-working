import React, { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

// Reusable Table Component
export const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <table
    ref={ref}
    className={`min-w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-md ${className}`}
    {...props}
  />
));
Table.displayName = "Table";

// Table Header Component with Sorting
export const TableHead = ({
  sortable,
  sorted,
  children,
  onSort,
}: {
  children: React.ReactNode;
  sortable?: boolean;
  sorted?: "asc" | "desc" | null;
  onSort?: () => void;
}) => (
  <th
    onClick={sortable ? onSort : undefined}
    className={`px-6 py-3 font-semibold tracking-wider text-sm uppercase bg-primary-200 dark:bg-primary-700 text-primary-800 dark:text-white cursor-pointer`}
  >
    <div className="flex items-center space-x-2">
      {children}
      {sortable &&
        (sorted === "asc" ? (
          <FaSortUp className="w-4 h-4" />
        ) : sorted === "desc" ? (
          <FaSortDown className="w-4 h-4" />
        ) : (
          <FaSort className="w-4 h-4" />
        ))}
    </div>
  </th>
);

// Table Body
export const TableBody = ({ children }: { children: React.ReactNode }) => (
  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
    {children}
  </tbody>
);

// Table Row and Cell
export const TableRow = ({ children }: { children: React.ReactNode }) => (
  <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-700">{children}</tr>
);
export const TableCell = ({ children }: { children: React.ReactNode }) => (
  <td className="px-6 py-4 text-neutral-700 dark:text-neutral-300">
    {children}
  </td>
);

// Filter and Search Panel
const FilterPanel = ({
  filters,
  onFilterChange,
}: {
  filters: any;
  onFilterChange: (name: string, value: any) => void;
}) => (
  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
    {filters.map((filter: any) => (
      <div key={filter.name} className="flex items-center space-x-1">
        <label className="text-sm">{filter.label}</label>
        {filter.type === "checkbox" && (
          <input
            type="checkbox"
            checked={filter.value}
            onChange={(e) => onFilterChange(filter.name, e.target.checked)}
            className="form-checkbox"
          />
        )}
        {filter.type === "radio" && (
          <input
            type="radio"
            checked={filter.value}
            onChange={(e) => onFilterChange(filter.name, e.target.checked)}
            className="form-radio"
          />
        )}
        {filter.type === "date" && (
          <input
            type="date"
            value={filter.value}
            onChange={(e) => onFilterChange(filter.name, e.target.value)}
            className="form-input"
          />
        )}
      </div>
    ))}
  </div>
);

// Responsive Pagination Component
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
}: {
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
}) => (
  <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3">
    <div className="flex space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn-primary disabled:opacity-50"
      >
        Previous
      </button>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="btn-primary disabled:opacity-50"
      >
        Next
      </button>
    </div>
    <div className="text-sm">
      Page {currentPage} of {totalPages}
    </div>
    <select
      value={rowsPerPage}
      onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
      className="form-select mt-2 sm:mt-0"
    >
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={20}>20</option>
    </select>
  </div>
);

// Main Table Component with Sorting, Filtering, and Pagination
const DataTable = ({
  data,
  columns,
  filters,
  onFilterChange,
  onSort,
  currentPage,
  totalPages,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: {
  data: any[];
  columns: any[];
  filters: any;
  onFilterChange: (name: string, value: any) => void;
  onSort: (column: string) => void;
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
}) => (
  <div className="w-full overflow-auto">
    <div className="flex justify-between mb-4">
      <FilterPanel filters={filters} onFilterChange={onFilterChange} />
      <input type="text" placeholder="Search..." className="form-input" />
    </div>
    <Table>
      <TableHead>
        <tr>
          {columns.map((col) => (
            <TableHead
              key={col.name}
              sortable={col.sortable}
              sorted={col.sorted}
              onSort={() => onSort(col.name)}
            >
              {col.label}
            </TableHead>
          ))}
        </tr>
      </TableHead>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            {columns.map((col) => (
              <TableCell key={col.name}>{row[col.name]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      rowsPerPage={rowsPerPage}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
    />
  </div>
);

export default DataTable;
