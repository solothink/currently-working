import { FaWallet } from "react-icons/fa";

interface WalletBalanceProps {
  balance: number;
  lowBalanceThreshold: number;
  isLoading?: boolean; // Add loading prop
}

const WalletBalance: React.FC<WalletBalanceProps> = ({
  balance,
  lowBalanceThreshold,
  isLoading, // Destructure loading prop
}) => {
  const isLowBalance = balance < lowBalanceThreshold;

  return (
    <div
      className={`p-4 rounded-md shadow-lg ${
        isLowBalance ? "bg-red-100" : "bg-primary-100"
      } dark:bg-neutral-800`}
    >
      <div className="flex items-center space-x-4">
        <FaWallet className="text-2xl text-primary-600" />
        <div>
          <p className="text-lg font-semibold">
            {isLowBalance ? "Low Balance" : "Balance"}
          </p>
          {isLoading ? ( // Check if loading
            <div className="flex items-center space-x-1">
              <div className="dot animate-pulse bg-primary-600 rounded-full h-2 w-2" />
              <div className="dot animate-pulse bg-primary-600 rounded-full h-2 w-2" />
              <div className="dot animate-pulse bg-primary-600 rounded-full h-2 w-2" />
            </div>
          ) : (
            <p className="text-2xl font-bold">₹{balance.toFixed(2)}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletBalance;
