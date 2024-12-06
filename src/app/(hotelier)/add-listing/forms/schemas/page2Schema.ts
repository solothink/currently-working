import { z } from 'zod';

export const Page2Schema = z.object({
    name: z.string().min(1, "Name is required"),
    rating: z.number().min(0).max(5, "Rating must be between 0 and 5"),
    build_year: z
      .number()
      .int("Build year must be an integer")
      .min(1900, "Build year must be >= 1900")
      .max(new Date().getFullYear() + 1, `Build year must be <= ${new Date().getFullYear() + 1}`),
    franchise: z.boolean(),
    phone_no: z
      .string()
      .regex(/^\d{10,15}$/, "Phone number must be between 10 and 15 digits"),
    email: z.string().email("Invalid email address"),
    property_type: z.string().min(1, "Property type is required"),
    rental_form: z.string().min(1, "Rental form is required"),
});