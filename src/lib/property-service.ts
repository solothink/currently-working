import axios from "./api-client"; // Assuming api-client is configured for your backend API

// Define interfaces for property-related data
export interface Property {
  id?: number;
  name?: string;
  display_name?: string;
  slug?: string;
  address?: Address; // Assuming a structured Address type
  latitude?: number;
  longitude?: number;
  starting_price?: number;
  rating?: number;
  total_rooms?: number;
  featured_image?: string;
  description?: string;
  amenities?: number[]; // IDs of related amenities
  amenity_details?: Record<string, any>; // JSON field for amenity details
  managed_by?: number; // ID of the user managing the property
  added_by?: number; // ID of the user who added the property
  checkin_time?: string; // Format: "HH:mm:ss"
  checkout_time?: string; // Format: "HH:mm:ss"
  service_category?: string; // Based on SERVICE_CATEGORY_TYPE_CHOICES
  custom_id?: string; // Custom ID for the property
  area_name?: string;
  city_name?: string;
  state?: string;
  country?: string;
  email?: string;
  email_list?: string[]; // List of emails
  phone_no?: string; // Primary phone number
  phone_no_list?: string[]; // List of phone numbers
  website_list?: string[]; // List of website links
  customer_care_no?: string; // Customer care number
  chain_name?: string; // Chain name
  build_year?: number; // Year the property was built
  no_of_restaurant?: number; // Number of restaurants
  currency?: string;
  vcc_currency?: string;
  timezone?: string;
  featured?: boolean; // Whether the property is featured
  franchise?: boolean; // Whether it's a franchise property
  policies?: Record<string, any>; // JSON field for policies
  property_ownership?: string; // Ownership details
  legal_document?: string; // URL or path to legal document file
  current_page?: number; // Pages completed in the frontend
  status?: string; // Property status (e.g., "In-Progress")
  created?: string; // ISO 8601 format datetime
  updated?: string; // ISO 8601 format datetime
  [key: string]: any; // Extendable for additional fields
}

// Address type for structured address representation
export interface Address {
  street?: string;
  area_name?: string;
  city_name?: string;
  state?: string;
  country?: string;
  postal_code?: string;
}


// Response structure
export interface ApiResponse<T = any> {
  status: string;
  message?: string;
  errors?: Array<{ field: string; message: string }>;
  data?: T;
}

const PropertyService = {
  // Fetch properties with optional filters
  fetchProperties: async (params: Record<string, any> = {}): Promise<ApiResponse<Property[]>> => {
    console.log("params", params);
    try {
      const response = await axios.get("/hotels/properties/", { params });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  // Fetch a single property by ID
  fetchPropertyById: async (id: number): Promise<ApiResponse<Property>> => {
    try {
      const response = await axios.get(`/hotels/properties/${id}/`);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  // Create a new property
  createProperty: async (data: Property): Promise<ApiResponse<Property>> => {
    console.log("data", data);
    try {
      const response = await axios.post("/hotels/properties/", data);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  // Update an existing property
  updateProperty: async (id: number, data: Property): Promise<ApiResponse<Property>> => {
    try {
      const response = await axios.put(`/hotels/properties/${id}/`, data);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  // Delete a property by ID
  deleteProperty: async (id: number): Promise<ApiResponse> => {
    try {
      const response = await axios.delete(`/hotels/properties/${id}/`);
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

export default PropertyService;
