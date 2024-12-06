import { Metadata } from "next";
import BookingHistory from "@/components/BookingHistory/BookingHistory";

export const metadata: Metadata = {
  title: "My Trips | ID Book Hotels",
  description: "View your booking history and upcoming trips",
};

export default function MyTripsPage() {
  return (
    <main className="container relative space-y-24 my-14 md:my-24 lg:space-y-28 lg:mb-28">
      <div>
        <h2 className="text-3xl font-semibold">My Bookings</h2>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <BookingHistory />
    </main>
  );
}
