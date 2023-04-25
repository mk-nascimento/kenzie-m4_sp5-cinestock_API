import { z } from 'zod';
import * as schemas from '../schemas';

export type TMovie = z.infer<typeof schemas.movie>;
export type TMovieRequest = z.infer<typeof schemas.movieRequest>;
export type TMoviesList = z.infer<typeof schemas.moviesList>;
export type TMovieUpdate = z.infer<typeof schemas.movieUpdate>;
