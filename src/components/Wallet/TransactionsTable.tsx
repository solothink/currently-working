import React, { useState } from "react";
import { useWalletData } from "@/hooks/useWallet";
import { Pagination } from "@/components/ui/table";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import TransactionFilters from "./TransactionFilters";

interface FilterOption {
  label: string;
  value: string;
}

interface Transaction {
  id: string;
  amount: number;
  transaction_type: string;
  transaction_id: string;
  transaction_details: string;
  created: string;
  updated: string;
  user: number;
}

const TransactionsTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([""]); // Default filter
  const limit = 5; // Items per page
  const offset = (currentPage - 1) * limit;

  // Fetch wallet data using the custom hook
  const { transactionsQuery } = useWalletData({
    offset,
    limit,
    transaction_type: selectedFilters.join(","), // Pass selected filters as a comma-separated string
  });

  const { data: transactionsData, isLoading, isError } = transactionsQuery;
  const transactions: Transaction[] = transactionsData?.data ?? []; // Accessing the data from response
  const totalCount = transactionsData?.count ?? 0; // Total count of transactions

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleFilterChange = (filterValue: string) => {
    setSelectedFilters((prev) => {
      if (prev.includes(filterValue)) {
        // If the filter is already selected, remove it
        return prev.filter((val) => val !== filterValue);
      } else {
        // If the filter is not selected, add it
        return [...prev, filterValue];
      }
    });
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const filterOptions: FilterOption[] = [
    { label: "Credit", value: "Credit" },
    { label: "Debit", value: "Debit" },
  ];

  if (isError) return <div>Failed to load transactions.</div>;

  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <TransactionFilters
          filters={filterOptions}
          selectedFilters={selectedFilters} // Pass selected filters
          onChange={handleFilterChange}
        />
      </div>

      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            // Show shimmer effect when loading
            [...Array(limit)].map((_, index) => (
              <TableRow key={index} className="animate-pulse">
                <TableCell className="h-4 bg-gray-200"></TableCell>
                <TableCell className="h-4 bg-gray-200"></TableCell>
                <TableCell className="h-4 bg-gray-200"></TableCell>
                <TableCell className="h-4 bg-gray-200"></TableCell>
                <TableCell className="h-4 bg-gray-200"></TableCell>
                <TableCell className="h-4 bg-gray-200"></TableCell>
              </TableRow>
            ))
          ) : transactions.length > 0 ? (
            transactions.map((txn: Transaction) => (
              <TableRow key={txn.id}>
                <TableCell>{txn.id}</TableCell>
                <TableCell>
                  {new Date(txn.created).toLocaleDateString()}
                </TableCell>
                <TableCell>{txn.transaction_id}</TableCell>
                <TableCell>₹{txn.amount.toLocaleString()}</TableCell>
                <TableCell>{txn.transaction_type}</TableCell>
                <TableCell>{txn.transaction_details}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                No transactions to show.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalCount / limit)} // Calculate total pages dynamically
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default TransactionsTable;
