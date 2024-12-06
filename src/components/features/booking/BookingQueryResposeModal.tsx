import React from "react";

interface ResponseModalProps {
  isOpen: boolean;
  onClose: () => void;
  response: {
    data: {
      id: number;
      booking_type: string;
      adult_count: number;
      child_count: number;
    };
  } | null;
  error: string | null;
  isLoading: boolean;
}

const ResponseModal: React.FC<ResponseModalProps> = ({
  isOpen,
  onClose,
  response,
  error,
  isLoading,
}) => {
  console.log("response", response);
  console.log("error", error);
  console.log("isLoading", isLoading);
  console.log("isOpen", isOpen);

  if (!isOpen) return null;

  const message = isLoading
    ? "Submitting your booking... Please wait."
    : error
      ? error
      : "Our IDbook representative will contact you regarding your enquiry.";

  const messageClass = error
    ? "text-red-600"
    : isLoading
      ? "text-blue-600"
      : "text-green-600";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <h2 className="text-xl font-display font-semibold text-neutral-900 dark:text-neutral-50">
          Booking Status
        </h2>
        <p className={`mt-4 ${messageClass}`}>{message}</p>

        {response && !isLoading && (
          <div className="mt-4">
            <h3 className="font-semibold">Booking Details:</h3>
            <p>ID: {response.data.id}</p>
            <p>Booking Type: {response.data.booking_type}</p>
            <p>Adults: {response.data.adult_count}</p>
            <p>Children: {response.data.child_count}</p>
          </div>
        )}

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded mr-2"
          >
            OK
          </button>
          {response && (
            <a
              href={`/bookings/${response.data.id}`}
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded"
            >
              View Booking
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResponseModal;
