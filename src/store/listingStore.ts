import { create } from "zustand";

interface ListingData {
  [key: string]: any; // For page-specific data
}

interface ListingState {
  activeStep: number;
  totalSteps: number;
  listingData: ListingData; // Complete listing data
  pageSpecificData: Partial<ListingData>; // Only modified data for the current page
  setActiveStep: (step: number) => void;
  updatePageSpecificData: (name: string, value: any) => void; // Update page-specific data with key-value pair
  savePageData: () => void; // Save page-specific data to the main listing data
  resetListing: () => void;
}

export const useListingStore = create<ListingState>((set, get) => ({
  activeStep: 1,
  totalSteps: 10,
  listingData: {},
  pageSpecificData: {},

  setActiveStep: (step) => {
    const { totalSteps } = get();
    if (step > 0 && step <= totalSteps) {
      set({ activeStep: step, pageSpecificData: {} }); // Reset page-specific data on step change
    }
  },

  // Update specific page data with a key-value pair
  updatePageSpecificData: (name, value) => {
    set((state) => ({
      pageSpecificData: { ...state.pageSpecificData, [name]: value },
    }));
  },

  // Save page-specific data to main listing data
  savePageData: () => {
    set((state) => ({
      listingData: { ...state.listingData, ...state.pageSpecificData },
      pageSpecificData: {}, // Clear page-specific data after saving
    }));
  },

  resetListing: () => set({ activeStep: 1, listingData: {}, pageSpecificData: {} }),
}));
