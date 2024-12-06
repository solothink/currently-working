import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import WalletService, { TransactionHistoryParams } from "@/lib/wallet-service"; // Import the service

// Custom hook for wallet data
export const useWalletData = ({
  offset = 0, // Default value for offset
  limit = 5, // Default value for limit
  transaction_type, // This remains optional
}: Partial<TransactionHistoryParams> = {}) => {
  // Making the parameters optional
  const { data: session } = useSession();
  const userId = session?.user?.id;

  // Fetch wallet balance
  const balanceQuery = useQuery({
    queryKey: ["walletBalance", userId],
    queryFn: async () => {
      const response = await WalletService.getWalletBalance();
      return response; // Handle response directly from the service
    },
    staleTime: 0, // Disable caching for real-time data
    enabled: !!userId, // Fetch only if userId exists
  });

  // Fetch user transactions with pagination and filtering
  const transactionsQuery = useQuery({
    queryKey: ["walletTransactions", userId, offset, limit, transaction_type],
    queryFn: async () => {
      const params = {
        offset,
        limit,
        ...(transaction_type ? { transaction_type: transaction_type } : {}), // Add filter only if transactionType is provided
      };
      const response = await WalletService.getTransactionHistory(params);
      return response; // Handle response directly from the service
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    enabled: !!userId, // Fetch only if userId exists
  });

  return {
    balanceQuery,
    transactionsQuery,
  };
};
