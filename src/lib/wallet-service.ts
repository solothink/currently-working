import axios from "./api-client"; // Assuming api-client is in the same directory

// Interface for wallet transaction history parameters
export interface TransactionHistoryParams {
  offset?: number;
  limit?: number;
  transaction_type?: string; // Only apply when selected
}

export interface ApiResponse<T = any> {
  status: string;
  message?: string;
  errors?: Array<{ field: string; message: string }>;
  data?: T;
  count?: number;
}

// Wallet Service with CRUD operations
const WalletService = {
  /**
   * Retrieve the wallet balance for the current user.
   */
  getWalletBalance: async (): Promise<ApiResponse> => {
    try {
      const response = await axios.get("/customer/wallet/balance/");
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Retrieve the transaction history for the current user.
   */
  getTransactionHistory: async (
    params: TransactionHistoryParams = {},
  ): Promise<ApiResponse> => {
    try {
      const response = await axios.get("/customer/wallet-transaction/user/", {
        params,
      });
      console.log("response ", response.data);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },
};

// Error handler to extract meaningful error messages
const handleError = (error: any): ApiResponse => {
  if (error.response) {
    return error.response.data;
  }
  return { status: "error", message: "An unexpected error occurred." };
};

export default WalletService;
