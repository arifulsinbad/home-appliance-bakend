import { z } from 'zod';

const repairingCategorySchema = z.object({
  title: z.string({
    required_error: 'Title is required',
  }),
  rating: z.string().optional(),
  image: z.string({
    required_error: 'Title is required',
  }),
  address: z.string({
    required_error: 'Title is required',
  }),
  details: z.string({
    required_error: 'Title is required',
  }),
  bookingCount: z.number().optional(),
  status: z.boolean().optional(),
});

export const RepairingCategorySchema = {
  repairingCategorySchema,
};
