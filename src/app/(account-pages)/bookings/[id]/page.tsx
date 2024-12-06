// booking-page.tsx
import { Suspense } from "react";
import { api, ApiResponse } from "@/lib/api/client";
import BookingDetails, { BookingData } from "@/components/BookingDetails";
import { notFound, redirect } from "next/navigation";
import { ApiError } from "@/lib/api/client";
import { Booking } from "@/types/booking";

// Loading component with skeleton UI
function BookingLoading() {
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4" />
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
      </div>
    </div>
  );
}

// Error component
function BookingError({ error }: { error: Error }) {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <h2 className="text-red-700 font-semibold text-lg mb-2">
          Error Loading Booking
        </h2>
        <p className="text-red-600">{error.message}</p>
      </div>
    </div>
  );
}

export default async function BookingPage({
  params,
}: {
  params: { id: string };
}) {
  // Validate the ID parameter
  if (!/^\d+$/.test(params.id)) {
    console.error(`Invalid booking ID format: ${params.id}`);
    notFound();
  }

  try {
    // Log the fetch attempt
    console.log(`Fetching booking with ID: ${params.id}`);

    // Fetch booking with proper type
    const response = await api.get<ApiResponse<BookingData>>(
      `/booking/bookings/${params.id}/`,
    );

    // Log the response for debugging
    console.log("API Response:", JSON.stringify(response, null, 2));

    // Handle different response scenarios
    if (!response.data) {
      console.error("No data received from API");
      notFound();
    }
    const bookingData = response.data.data; // or `response.data.data` if applicable

    // Render the booking details with loading state
    return (
      <Suspense fallback={<BookingLoading />}>
        <div className="max-w-3xl mx-auto p-4">
          <BookingDetails booking={bookingData} />
        </div>
      </Suspense>
    );
  } catch (error) {
    // Log the error
    console.error("Error fetching booking:", error);

    // Handle specific API errors
    if (error instanceof ApiError) {
      switch (error.status) {
        case 401:
          redirect("/unauthorized");
        case 403:
          redirect("/forbidden");
        case 404:
          notFound();
        case 429:
          return (
            <BookingError
              error={new Error("Too many requests. Please try again later.")}
            />
          );
        case 500:
          return (
            <BookingError
              error={new Error("Server error. Please try again later.")}
            />
          );
        default:
          return <BookingError error={error} />;
      }
    }

    // Handle other types of errors
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
      });
      return <BookingError error={error} />;
    }

    // Handle unknown errors
    return <BookingError error={new Error("An unexpected error occurred")} />;
  }
}

// Enable server-side logging in production
export const dynamic = "force-dynamic";

// Add metadata for better SEO
export async function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `Booking #${params.id}`,
    description: `View details for booking #${params.id}`,
  };
}
