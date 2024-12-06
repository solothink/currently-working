import { z } from 'zod';
import { Page1Schema } from './schemas/page1Schema';
import { Page2Schema } from './schemas/page2Schema';

export const getSchemaForStep = (step: number): z.ZodSchema => {
  switch (step) {
    case 1:
      return Page1Schema;
    case 2:
      return Page2Schema;
    default:
      throw new Error(`Schema not defined for step ${step}`);
  }
};
