"use client";
import BookingService from "@/lib/booking-service";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { link } from "fs";
import React, { useEffect, useState } from "react";
import { FaPlane, FaHotel, FaCar, FaRupeeSign } from "react-icons/fa";

interface ReportCardProps {
  icon: React.ReactNode;
  title: string;
  bookings: number;
  spend: number;
  link: string;
}

const ReportCard: React.FC<ReportCardProps> = ({
  icon,
  title,
  bookings,
  spend,
  link,
}) => (
  <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white dark:bg-neutral-800 shadow-md rounded-lg transition-colors">
    <div className="flex items-center space-x-4">
      <div className="text-primary-600 dark:text-primary-400 text-2xl">
        {icon}
      </div>
      <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-100">
        {title}
      </h3>
    </div>
    <div className="flex flex-wrap items-center space-x-4 sm:space-x-8 mt-4 sm:mt-0">
      <div className="text-center">
        <p className="text-sm text-gray-500 dark:text-neutral-400">
          Total Bookings
        </p>
        <p className="text-lg font-bold text-neutral-900 dark:text-white">
          {bookings}
        </p>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-500 dark:text-neutral-400">
          Total Spend
        </p>
        <p className="text-lg font-bold text-neutral-900 dark:text-white">
          ₹{spend.toLocaleString()}
        </p>
      </div>
      <ButtonPrimary
        href={link}
        className="px-4 py-2 bg-primary-600 dark:bg-primary-500 text-white rounded-md hover:bg-primary-700 dark:hover:bg-primary-600 transition"
      >
        View
      </ButtonPrimary>
    </div>
  </div>
);

const ReportSummary: React.FC = () => {
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await BookingService.getTravelReport();
        if (response.status === "success") {
          setReportData(response.data);
        } else {
          setError(response.message || "Failed to load report data.");
        }
      } catch (err) {
        setError("An error occurred while fetching the report.");
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  if (loading) return <p>Loading report...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const renderReportCard = (
    title: string,
    icon: React.ReactNode,
    data: { total_count: number; total_booking_amount: number | null },
    link: string,
  ) => {
    if (!data) return null;

    return (
      <ReportCard
        icon={icon}
        title={title}
        bookings={data.total_count}
        spend={data.total_booking_amount || 0}
        link={link}
      />
    );
  };

  return (
    <div className="container mx-auto space-y-6 py-8 px-4 sm:px-8">
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
        Report Summary
        {/* <span className="text-sm text-gray-500 dark:text-neutral-400">(Last Quarter)</span> */}
      </h2>
      {renderReportCard(
        "Flight",
        <FaPlane />,
        reportData.FLIGHT,
        "/travel-report/flight",
      )}
      {renderReportCard(
        "Hotel",
        <FaHotel />,
        reportData.HOTEL,
        "/travel-report/hotel",
      )}
      {renderReportCard(
        "Vehicle",
        <FaCar />,
        reportData.VEHICLE,
        "/travel-report/vehicle",
      )}
      {renderReportCard(
        "Holiday Package",
        <FaRupeeSign />,
        reportData.HOLIDAYPACK,
        "/travel-report/holiday-package",
      )}
    </div>
  );
};

export default ReportSummary;
