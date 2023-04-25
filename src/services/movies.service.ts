import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Movie } from '../entities';
import { TMovie, TMovieRequest, TMoviesList } from '../interfaces';
import * as schemas from '../schemas';

export const createMovieService = async (movieData: TMovieRequest): Promise<TMovie> => {
  const moviesRepo: Repository<Movie> = AppDataSource.getRepository(Movie);

  const dbMovie: Movie = moviesRepo.create(movieData);
  await moviesRepo.save(dbMovie);

  const returnMovie: TMovie = schemas.movie.parse(dbMovie);

  return returnMovie;
};

export const readMoviesService = async (
  pageParams: number = 0,
  perPageParams: number = 0,
  orderParams: 'asc' | 'desc' = 'asc',
  sortParams: 'price' | 'duration' | undefined = undefined
): Promise<TMoviesList> => {
  const moviesRepo: Repository<Movie> = AppDataSource.getRepository(Movie);

  const dbMovies: Array<Movie> = await moviesRepo.find({
    order: sortParams ? { duration: orderParams } : { id: orderParams },
    skip: 0,
    take: perPageParams,
  });

  const movies = schemas.moviesList.parse(dbMovies);

  return movies;
};
