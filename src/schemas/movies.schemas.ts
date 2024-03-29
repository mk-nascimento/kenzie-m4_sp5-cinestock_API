import { z } from 'zod';

export const movie = z.object({
  id: z.number(),
  name: z.string().max(50),
  description: z.string().nullish(),
  duration: z.number().positive(),
  price: z.number().int().positive(),
});

export const movieRequest = movie.omit({ id: true });
export const moviesList = movie.array();
export const movieUpdate = movieRequest.partial();
