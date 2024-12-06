import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

// Base Table Component
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

// Table Header
export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={`bg-primary-100 dark:bg-primary-600 text-neutral-800 dark:text-white ${className}`}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

// Table Body
export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={`divide-y divide-neutral-200 dark:divide-neutral-700 ${className}`}
    {...props}
  />
));
TableBody.displayName = "TableBody";

// Table Head Cell with optional sorting icons
type TableHeadProps = {
  sortable?: boolean;
  sorted?: "asc" | "desc" | null;
} & React.ThHTMLAttributes<HTMLTableCellElement>;

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, sortable, sorted, children, ...props }, ref) => (
    <th
      ref={ref}
      onClick={sortable ? () => props.onClick : undefined}
      className={`px-6 py-3 font-semibold tracking-wider text-sm uppercase bg-primary-200 dark:bg-primary-700 text-primary-800 dark:text-white cursor-pointer ${className}`}
      {...props}
    >
      <div className="flex items-center space-x-2">
        <span>{children}</span>
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
  ),
);
TableHead.displayName = "TableHead";

// Table Cell
export const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={`px-6 py-4 text-neutral-700 dark:text-neutral-300 ${className}`}
    {...props}
  />
));
TableCell.displayName = "TableCell";

// Table Row
export const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={`hover:bg-neutral-50 dark:hover:bg-neutral-700 ${className}`}
    {...props}
  />
));
TableRow.displayName = "TableRow";

// Status Pill Component
const StatusPill = ({ status }: { status: string }) => {
  const statusColors: Record<string, string> = {
    Active: "bg-green-500 text-white",
    Paused: "bg-red-500 text-white",
    Vacation: "bg-yellow-500 text-black",
    Completed: "bg-blue-500 text-white",
    Cancelled: "bg-gray-500 text-white",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status] || "bg-gray-300"}`}
    >
      {status}
    </span>
  );
};

// Action Dropdown Component
const ActionDropdown = () => (
  <button className="p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600">
    <BsThreeDotsVertical className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
  </button>
);

// Pagination Component
type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => (
  <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700">
    <div className="flex justify-between w-full sm:w-auto mb-2 sm:mb-0">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 text-sm font-medium bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50"
      >
        Previous
      </button>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="ml-3 px-4 py-2 text-sm font-medium bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50"
      >
        Next
      </button>
    </div>
    <div className="text-sm text-neutral-700 dark:text-neutral-300">
      Page <span className="font-semibold">{currentPage}</span> of{" "}
      <span className="font-semibold">{totalPages}</span>
    </div>
  </div>
);

// Main DataTable Component with filtering, sorting, and pagination
const DataTable = ({
  data,
  columns,
  filters,
  onFilterChange,
  onSort,
  currentPage,
  totalPages,
  onPageChange,
}: {
  data: any[];
  columns: any[];
  filters: any[];
  onFilterChange: (name: string, value: any) => void;
  onSort: (column: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => (
  <div className="w-full overflow-auto">
    <div className="flex justify-between mb-4">
      <div className="flex space-x-2">
        {filters.map((filter) => (
          <div key={filter.name} className="flex items-center space-x-1">
            <label className="text-sm">{filter.label}</label>
            <input
              type={filter.type}
              value={filter.value}
              onChange={(e) => onFilterChange(filter.name, e.target.value)}
              className="form-input"
            />
          </div>
        ))}
      </div>
      <input type="text" placeholder="Search..." className="form-input" />
    </div>
    <Table>
      <TableHeader>
        <tr>
          {columns.map((col) => (
            <TableHead
              key={col.name}
              sortable={col.sortable}
              onClick={() => onSort(col.name)}
            >
              {col.label}
            </TableHead>
          ))}
        </tr>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            {columns.map((col) => (
              <TableCell key={col.name}>{row[col.name]}</TableCell>
            ))}
            <TableCell>
              <ActionDropdown />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
    />
  </div>
);

export default DataTable;

// Exporting all components for easy import
export { StatusPill, ActionDropdown, DataTable };
