import { User } from "./user";

export interface HotelBooking {
  enquired_property: string;
  booking_slot: string;
  room_type: string;
  checkin_time: string;
  checkout_time: string;
  bed_count: number;
  confirmed_property: Record<string, any>;
  room: Record<string, any>;
}

export interface Booking {
  id: number;
  confirmation_code: string | null;
  invoice_id: string | null;
  booking_type: "HOTEL" | "HOLIDAY" | "VEHICLE" | "FLIGHT";
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
  user: User;
  hotel_booking: HotelBooking | null;
  holiday_package_booking: null;
  vehicle_booking: null;
  flight_booking: null;
  coupon: null;
}
