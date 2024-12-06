import { create } from "zustand";
import BookingService, { BookingRequest } from "@/lib/booking-service";

// Helper function: Initialize query data based on booking type
const getInitialQueryData = (
  type: BookingRequest["booking_type"],
): Partial<BookingRequest> => {
  const today = new Date();
  const todayISO = today.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowISO = tomorrow.toISOString().split("T")[0];

  switch (type) {
    case "HOTEL":
      return {
        booking_type: "HOTEL",
        room_type: "",
        checkin_time: "",
        checkout_time: "",
        bed_count: 1,
        adult_count: 1,
        child_count: 0,
        infant_count: 0,
        enquired_property: "",
        booking_slot: "",
      };
    case "HOLIDAYPACK":
      return {
        booking_type: "HOLIDAYPACK",
        adult_count: 1,
        child_count: 0,
        infant_count: 0,
        enquired_holidaypack: "",
        no_days: 1,
        available_start_date: todayISO, // Default to today's date
      };
    case "VEHICLE":
      return {
        booking_type: "VEHICLE",
        pickup_addr: "",
        dropoff_addr: "",
        pickup_time: todayISO, // Default to today's date
        vehicle_type: "",
        adult_count: 0,
        child_count: 0,
        infant_count: 0,
      };
    case "FLIGHT":
      return {
        booking_type: "FLIGHT",
        flight_trip: "ONE_WAY",
        flight_class: "ECONOMY",
        departure_date: todayISO, // Default to today's date
        return_date: tomorrowISO, // Return date can be empty for one-way trips
        flying_from: "",
        flying_to: "",
        adult_count: 1,
        child_count: 0,
        infant_count: 0,
      };
    default:
      return {};
  }
};

// Define the Zustand store
interface BookingQueryState {
  bookingType: BookingRequest["booking_type"];
  queryData: Partial<BookingRequest>;
  isLoading: boolean;
  error: string | null;
  bookingResponse: any; // Add a field to store booking response
  setBookingType: (type: BookingRequest["booking_type"]) => void;
  updateQueryField: (field: keyof BookingRequest, value: any) => void;
  resetQueryData: () => void;
  submitQuery: () => Promise<void>;
  setBookingResponse: (response: any) => void; // Method to set booking response
  setError: (error: string | null) => void; // Method to set error message
}

const useBookingQueryStore = create<BookingQueryState>((set, get) => ({
  bookingType: "HOTEL",
  queryData: getInitialQueryData("HOTEL"),
  isLoading: false,
  error: null,
  bookingResponse: null, // Initialize booking response state

  // Set booking type and reset form data accordingly
  setBookingType: (type) =>
    set({
      bookingType: type,
      queryData: getInitialQueryData(type),
      error: null, // Clear error when setting new type
      bookingResponse: null, // Reset booking response
    }),

  // Update fields dynamically based on the current query data
  updateQueryField: (field, value) =>
    set((state) => ({
      queryData: { ...state.queryData, [field]: value },
    })),

  // Reset query data based on the current booking type
  resetQueryData: () =>
    set((state) => ({
      queryData: getInitialQueryData(state.bookingType),
      error: null,
      bookingResponse: null,
    })),

  // Submit the query to the backend via BookingService
  submitQuery: async () => {
    const { queryData, bookingType } = get();

    set({ isLoading: true, error: null, bookingResponse: null });

    try {
      console.log("Submitting query:", queryData);
      console.log("Booking type:", bookingType);
      const response = await BookingService.createBooking({
        booking_type: bookingType,
        ...queryData,
      } as BookingRequest);

      console.log("Booking response:", response);
      if (response.status === "success") {
        set({ bookingResponse: response, error: null }); // Set booking response on success
      } else {
        set({
          error:
            response.message ?? "Failed to submit query. Please try again.",
          bookingResponse: null,
        });
      }
    } catch (error) {
      console.log("error ", error);
      set({
        error: "Failed to submit query. Please try again.",
        bookingResponse: null,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  // Method to set booking response directly
  setBookingResponse: (response) => set({ bookingResponse: response }),

  // Method to set error message directly
  setError: (error) => set({ error }),
}));

export default useBookingQueryStore;
