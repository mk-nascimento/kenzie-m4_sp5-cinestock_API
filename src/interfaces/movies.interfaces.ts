import { z } from 'zod';
import * as schemas from '../schemas';
import * as TORM from 'typeorm';

export type TMovie = z.infer<typeof schemas.movie>;
export type TMovieRequest = z.infer<typeof schemas.movieRequest>;
export type TMoviesList = z.infer<typeof schemas.moviesList>;
export type TMoviesListPagination = {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  data: TMoviesList;
};
export type TMovieUpdate = TORM.DeepPartial<TMovieRequest>;

export type TOrder = 'asc' | 'desc' | undefined;
export type TSort = 'price' | 'duration' | undefined;
