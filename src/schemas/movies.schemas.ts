import { z } from 'zod';

export const movie = z.object({
  id: z.number(),
  name: z.string().max(50),
  description: z.string().optional().nullable(),
  duration: z.number(),
  price: z.number(),
});

export const movieRequest = movie.omit({ id: true });
