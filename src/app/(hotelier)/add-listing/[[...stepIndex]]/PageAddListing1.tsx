'use client';

import React, { FC, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/shared/Input";
import Select from "@/shared/Select";
import FormItem from "../FormItem";
import PropertyService from "@/lib/property-service";
import { useListingStore } from "@/store/listingStore"; // Assuming you're using Zustand store

// Validation schema using Zod
const propertySchema = z.object({
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

type PropertyFormValues = z.infer<typeof propertySchema>;

export interface PageAddListing1Props {}

const PageAddListing1: FC<PageAddListing1Props> = () => {
  const { savePageData, updatePageSpecificData } = useListingStore(); // Assuming the store has methods to save and update data

  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      franchise: false, // Default value for franchise checkbox
    },
  });

  const onSubmit = async (data: PropertyFormValues) => {
    try {
      const response = await PropertyService.createProperty(data);
      console.log("Property created:", response);
      alert("Property successfully created!");
    } catch (error) {
      console.error("Error creating property:", error);
      alert("Failed to create property.");
    }
  };

  // Save data to store on every field change
  const handleFieldChange = (name: keyof PropertyFormValues, value: any) => {
    setValue(name, value); // Update react-hook-form value
    updatePageSpecificData(name, value); // Save to Zustand store (assuming this method exists)
  };

  const currentYear = new Date().getFullYear(); // Get the current year
  const years = Array.from({ length: currentYear - 1799 }, (_, i) => currentYear - i); // Generate years in reverse order


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <h2 className="text-2xl font-semibold">Add New Property</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

      {/* Property Type */}
      <FormItem
        label="Choose a property type"
        desc="Select the type of property (e.g., Hotel, Villa, etc.)"
      >
        <Select
          {...register("property_type")}
          onChange={(e) => handleFieldChange("property_type", e.target.value)}
        >
          <option value="">Select a type</option>
          <option value="Hotel">Hotel</option>
          <option value="Cottage">Cottage</option>
          <option value="Villa">Villa</option>
          <option value="Cabin">Cabin</option>
          <option value="Farm stay">Farm stay</option>
          <option value="Houseboat">Houseboat</option>
          <option value="Lighthouse">Lighthouse</option>
        </Select>
        {errors.property_type && (
          <p className="text-red-500 text-sm">{errors.property_type.message}</p>
        )}
      </FormItem>

      {/* Name */}
      <FormItem label="Place name" desc="Enter the name of the property">
        <Input
          placeholder="Place name"
          {...register("name")}
          onChange={(e) => handleFieldChange("name", e.target.value)}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </FormItem>

      {/* Rating */}
      <FormItem label="Hotel Star Rating" desc="Rate the property (0 to 5)">
        
        <Select
          {...register("rating")}
          onChange={(e) => handleFieldChange("rating", e.target.value)}
        >
          <option value="">Select rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </Select>
        {errors.rating && <p className="text-red-500 text-sm">{errors.rating.message}</p>}
      </FormItem>

      {/* Build Year */}
      <FormItem label="Build Year" desc="Enter the year the property was built">
        
    <Select
      {...register("build_year")}
      onChange={(e) => handleFieldChange("build_year", e.target.value)}
    >
      <option value="">Select Build Year</option>
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </Select>
        {errors.build_year && (
          <p className="text-red-500 text-sm">{errors.build_year.message}</p>
        )}
      </FormItem>

      {/* Franchise */}
      <FormItem label="Franchise" desc="Is this property part of a franchise?">
        <Controller
          name="franchise"
          control={control}
          render={({ field }) => (
            <input
              type="checkbox"
              className="form-checkbox"
              checked={field.value}
              onChange={(e) => {
                field.onChange(e.target.checked);
                handleFieldChange("franchise", e.target.checked);
              }}
            />
          )}
        />
        {errors.franchise && (
          <p className="text-red-500 text-sm">{errors.franchise.message}</p>
        )}
      </FormItem>

      {/* Phone Number */}
      <FormItem label="Phone Number" desc="Provide a contact number">
        <Input
          type="tel"
          placeholder="Phone Number"
          {...register("phone_no")}
          onChange={(e) => handleFieldChange("phone_no", e.target.value)}
        />
        {errors.phone_no && (
          <p className="text-red-500 text-sm">{errors.phone_no.message}</p>
        )}
      </FormItem>

      {/* Email */}
      <FormItem label="Email Address" desc="Provide a contact email">
        <Input
          type="email"
          placeholder="Email"
          {...register("email")}
          onChange={(e) => handleFieldChange("email", e.target.value)}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </FormItem>

      {/* Rental Form */}
      <FormItem
        label="Rental Form"
        desc="Specify the rental form (e.g., Entire place, Private room)"
      >
        <Select
          {...register("rental_form")}
          onChange={(e) => handleFieldChange("rental_form", e.target.value)}
        >
          <option value="">Select a form</option>
          <option value="Entire place">Entire place</option>
          <option value="Private room">Private room</option>
          <option value="Shared room">Shared room</option>
        </Select>
        {errors.rental_form && (
          <p className="text-red-500 text-sm">{errors.rental_form.message}</p>
        )}
      </FormItem>

    </form>
  );
};

export default PageAddListing1;
