import axios from "./api-client"; // Assuming api-client is in the same directory

interface BookingHistoryParams {
  offset?: number;
  limit?: number;
  status?: string;
  booking_type?: string;
  user_id?: number;
  search?: string;
  invoice_generated?: boolean | string;
}

export interface ApiResponse<T = any> {
  status: string;
  message?: string;
  errors?: Array<{ field: string; message: string }>;
  data?: T;
  count?: number;
}

// Interfaces for different booking request bodies
export interface HotelBooking {
  booking_type: "HOTEL";
  room_type?: string;
  checkin_time: string;
  checkout_time: string;
  bed_count?: number;
  adult_count: number;
  child_count: number;
  infant_count: number;
  enquired_property: string;
  booking_slot: string;
}

export interface HolidayPackBooking {
  booking_type: "HOLIDAYPACK";
  adult_count: number;
  child_count: number;
  infant_count: number;
  enquired_holidaypack: string;
  no_days: number;
  available_start_date: string;
  available_end_date: string;
}

export interface VehicleBooking {
  booking_type: "VEHICLE";
  pickup_addr: string;
  dropoff_addr: string;
  pickup_time: string;
  vehicle_type?: string;
  adult_count: number;
  child_count: number;
  infant_count: number;
}

export interface FlightBooking {
  booking_type: "FLIGHT";
  flight_trip: "ONE_WAY" | "ROUND";
  flight_class: "ECONOMY" | "BUSINESS";
  departure_date: string;
  return_date?: string;
  flying_from: string;
  flying_to: string;
  adult_count: number;
  child_count: number;
  infant_count: number;
}

export type BookingRequest =
  | HotelBooking
  | HolidayPackBooking
  | VehicleBooking
  | FlightBooking
  | any
  | null;

export type BookingData = {
  id: number;
  confirmation_code: string;
  invoice_id: string;
  booking_type: string;
  adult_count: number;
  child_count: number;
  infant_count: number;
  deal_price: string;
  discount: number;
  final_amount: string;
  total_payment_made: string;
  status: string;
  active: boolean;
  created: string;
  updated: string;
  user: {
    name: string | null;
    email: string;
  };
  hotel_booking: HotelBooking | null | any;
  holiday_package_booking: HolidayPackBooking | null | any;
  vehicle_booking: VehicleBooking | null | any;
  flight_booking: FlightBooking | null | any;
  coupon: string | null;
};

// Booking Service with CRUD operations
const BookingService = {
  /**
   * Create a new booking.
   * Accepts different types of booking requests.
   */
  createBooking: async (data: BookingRequest): Promise<ApiResponse> => {
    try {
      const response = await axios.post("/booking/bookings/", data);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Retrieve the booking history for the current user.
   */
  getBookingHistory: async (
    params: BookingHistoryParams = {},
  ): Promise<ApiResponse<BookingData[]>> => {
    try {
      console.log("params ", params);
      const response = await axios.get("/booking/bookings/", { params });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Retrieve a specific booking by ID.
   */
  getBookingById: async (
    bookingId: string,
  ): Promise<ApiResponse<BookingData>> => {
    try {
      const response = await axios.get(`/booking/bookings/${bookingId}/`);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Retrieve the travel report summary.
   */
  getTravelReport: async (): Promise<ApiResponse> => {
    try {
      const response = await axios.get("/booking/bookings/summary/");
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Cancel a specific booking by ID.
   */
  cancelBooking: async (bookingId: string): Promise<ApiResponse> => {
    try {
      const response = await axios.delete(`/booking/bookings/${bookingId}/`);
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

export default BookingService;
