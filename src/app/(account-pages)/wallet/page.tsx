"use client";

import WalletBalance from "@/components/Wallet/WalletBalance";
import TransactionFilters from "@/components/Wallet/TransactionFilters";
import TransactionsTable from "@/components/Wallet/TransactionsTable";
import { useWalletData } from "@/hooks/useWallet"; // Import the custom hook

const WalletPage: React.FC = () => {
  const { balanceQuery } = useWalletData(); // Use the custom hook

  if (balanceQuery.isError) {
    return <p>Error loading wallet data.</p>;
  }

  const balance = balanceQuery.data?.data.balance || 0;

  return (
    <main className="container relative space-y-24 my-14 md:my-24 lg:space-y-28 lg:mb-28">
      <div>
        <h2 className="text-3xl font-semibold">Wallet </h2>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="flex justify-between items-center">
        <WalletBalance
          balance={balance}
          lowBalanceThreshold={10_000}
          isLoading={balanceQuery.isLoading}
        />
      </div>

      <div className="flex space-x-8">
        <TransactionsTable />
      </div>
    </main>
  );
};

export default WalletPage;
