"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BookingService, { BookingData } from "@/lib/booking-service";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Pagination,
} from "@/components/ui/table";

// Main Component
const HotelBookingsList: React.FC = () => {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all"); // Status filter state
  const limit = 5;
  const offset = (currentPage - 1) * limit;

  const fetchBookings = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await BookingService.getBookingHistory({
        offset,
        limit,
        booking_type: "HOTEL",
        status: statusFilter === "all" ? undefined : statusFilter, // Apply status filter
      });

      if (response.status === "success") {
        setBookings(response.data as BookingData[]);
        setTotalPages(Math.ceil(response.count ? response.count / limit : 0)); // Ensure correct total pages
      } else {
        setBookings([]);
        setErrorMessage("No bookings found.");
      }
    } catch (error) {
      const backendMessage =
        (error as any)?.response?.data?.message || "An error occurred.";
      setErrorMessage(backendMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [currentPage, statusFilter]); // Include statusFilter in dependencies

  const handleSort = (field: keyof BookingData) => {
    const sorted = [...bookings].sort((a, b) => {
      if (a.hotel_booking[field] < b.hotel_booking[field])
        return sortOrder === "asc" ? -1 : 1;
      if (a.hotel_booking[field] > b.hotel_booking[field])
        return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    setBookings(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value);
    setCurrentPage(1); // Reset to the first page when filter changes
  };

  if (isLoading) {
    return (
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              {[
                "ID",
                "User",
                "Status",
                "Property",
                "Check-in",
                "Check-out",
                "Bed Count",
                "Amount",
              ].map((header) => (
                <TableHead key={header}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(limit)].map((_, index) => (
              <TableRow key={index} className="animate-pulse">
                {Array(8)
                  .fill("")
                  .map((_, idx) => (
                    <TableCell
                      key={idx}
                      className="h-4 bg-gray-200"
                    ></TableCell>
                  ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (errorMessage) {
    return <div className="text-red-500">{errorMessage}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <label htmlFor="statusFilter" className="mr-2">
          Filter by Status:
        </label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={handleStatusChange}
          className="p-2 border rounded"
        >
          <option value="all">All</option>
          <option value="confirmed">Confirmed</option>
          <option value="canceled">Canceled</option>
          <option value="pending">Pending</option>
          {/* Add more status options as needed */}
        </select>
      </div>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Property</TableHead>
            <TableHead
              onClick={() => handleSort("checkin_time" as keyof BookingData)}
              className="cursor-pointer"
            >
              Check-in
            </TableHead>
            <TableHead
              onClick={() => handleSort("checkout_time" as keyof BookingData)}
              className="cursor-pointer"
            >
              Check-out
            </TableHead>
            <TableHead>Bed Count</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.id}</TableCell>
                <TableCell>
                  {booking.user.name} ({booking.user.email})
                </TableCell>
                <TableCell>{booking.status}</TableCell>
                <TableCell>{booking.hotel_booking.enquired_property}</TableCell>
                <TableCell>
                  {new Date(
                    booking.hotel_booking.checkin_time,
                  ).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(
                    booking.hotel_booking.checkout_time,
                  ).toLocaleString()}
                </TableCell>
                <TableCell>{booking.hotel_booking.bed_count}</TableCell>
                <TableCell>{booking.final_amount}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-4">
                No bookings to show.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default HotelBookingsList;
