export interface GuestsObject {
  guestAdults?: number;
  guestChildren?: number;
  guestInfants?: number;
  pets?: number;
}

export type hoursOptions = 0 | 4 | 8 | 12;

export type StaySearchFormFields = "location" | "guests" | "dates";

export interface PropertyType {
  name: string;
  description: string;
  checked: boolean;
}

export interface ClassOfProperties extends PropertyType {}

export type DateRage = [Date | null, Date | null];
