'use client';

import React, { ReactNode } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CombinedSchema } from './schemas/combinedSchema'; // Merge all schemas here
import { useListingStore } from '@/store/listingStore';

export const StepFormProvider = ({ children }: { children: ReactNode }) => {
  const { listingData, updatePageSpecificData, savePageData } = useListingStore();

  const methods = useForm({
    defaultValues: listingData,
    resolver: zodResolver(CombinedSchema),
  });

  const onSubmit = (data: any) => {
    updatePageSpecificData('stepData', data); // Save step-specific data
    savePageData(); // Merge step data into main listing
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};
