import { Page1Schema } from './page1Schema';
import { Page2Schema } from './page2Schema'; // Define similarly
import { z } from 'zod';

export const CombinedSchema = Page1Schema.merge(Page2Schema);
