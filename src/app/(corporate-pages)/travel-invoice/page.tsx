"use client";

import React, { useState, useEffect } from "react";
import { FiDownload } from "react-icons/fi";
import { MdOutlineDescription } from "react-icons/md";
import Breadcrumb from "@/components/ui/navigation/Breadcrumb";
import BookingService, { BookingData } from "@/lib/booking-service"; // Assume this is the service with the API logic

interface InvoiceData {
  id: number;
  confirmation_code: string;
  invoice_id: string;
  booking_type: string;
  created: string;
  travel_date: string;
  user: { name: string | null; email: string };
  invoice_url: string;
}

const TravelInvoicePage = () => {
  const breadcrumbItems = [
    { label: "Admin", href: "/admin" },
    { label: "Invoices", icon: <MdOutlineDescription /> },
  ];

  // State variables for filters, pagination, and data
  const [invoices, setInvoices] = useState<BookingData[]>([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [bookingType, setBookingType] = useState("");

  useEffect(() => {
    fetchInvoices();
  }, [offset, limit, status, bookingType, searchTerm]);

  const fetchInvoices = async () => {
    const params = {
      offset,
      limit,
      status,
      booking_type: bookingType,
      search: searchTerm,
      invoice_generated: "True",
    };
    // Remove any params with empty, null, or undefined values
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(
        ([_, value]) => value != null && value !== "",
      ),
    );
    const response = await BookingService.getBookingHistory(filteredParams);
    console.log(response);
    if (response.status === "success" && response.data) {
      setInvoices(response.data as BookingData[]);
      setTotalCount(response.count || 0);
    }
  };

  const handleDownload = (invoiceId: string) => {
    // Assuming invoice URL can be constructed or retrieved
    const url = `https://invoice.idbookhotels.com/invoice/${invoiceId}`;
    window.open(url, "_blank");
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <header className="mb-8">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />
        <h1 className="text-3xl font-bold font-display dark:text-neutral-100">
          Invoices
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Filters Sidebar */}
        <div className="space-y-6">
          <FilterCheckbox
            label="Pending"
            checked={status === "pending"}
            onChange={() => setStatus("pending")}
          />
          <FilterCheckbox
            label="Confirmed"
            checked={status === "confirmed"}
            onChange={() => setStatus("confirmed")}
          />
          <FilterCheckbox
            label="Canceled"
            checked={status === "canceled"}
            onChange={() => setStatus("canceled")}
          />
          <FilterCheckbox
            label="Hotel"
            checked={bookingType === "HOTEL"}
            onChange={() => setBookingType("HOTEL")}
          />
          <FilterCheckbox
            label="Flight"
            checked={bookingType === "FLIGHT"}
            onChange={() => setBookingType("FLIGHT")}
          />
          <FilterCheckbox
            label="Holiday Pack"
            checked={bookingType === "HOLIDAYPACK"}
            onChange={() => setBookingType("HOLIDAYPACK")}
          />
        </div>

        {/* Invoices Table */}
        <div className="col-span-2">
          <input
            type="text"
            placeholder="Search by booking ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 px-3 py-2 border rounded w-full"
          />

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left border-collapse border border-neutral-300 dark:border-neutral-600">
              <thead className="bg-neutral-100 dark:bg-neutral-700">
                <tr>
                  <th className="p-3">Booking ID</th>
                  <th className="p-3">Issuer</th>
                  <th className="p-3">Invoice No</th>
                  <th className="p-3">Booked On</th>
                  <th className="p-3">Travel On</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="border-b border-neutral-300 dark:border-neutral-600"
                  >
                    <td className="p-3">{invoice.confirmation_code}</td>
                    <td className="p-3">{invoice.user.email}</td>
                    <td className="p-3">{invoice.invoice_id}</td>
                    <td className="p-3">
                      {new Date(invoice.created).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      {new Date(invoice.updated).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDownload(invoice.invoice_id)}
                        className="text-primary-600 flex items-center"
                      >
                        <FiDownload className="mr-2" />
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
              disabled={offset === 0}
              onClick={() => setOffset(offset - limit)}
              className="px-4 py-2 bg-primary-500 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {Math.ceil(offset / limit) + 1} of{" "}
              {Math.ceil(totalCount / limit)}
            </span>
            <button
              disabled={offset + limit >= totalCount}
              onClick={() => setOffset(offset + limit)}
              className="px-4 py-2 bg-primary-500 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// FilterCheckbox Component
const FilterCheckbox = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) => (
  <label className="flex items-center space-x-2">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="form-checkbox text-primary-600"
    />
    <span>{label}</span>
  </label>
);

export default TravelInvoicePage;
