import 'dotenv/config';
import { FindManyOptions, Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Movie } from '../entities';
import {
  TMovie,
  TMovieRequest,
  TMoviesList,
  TMoviesListPagination,
  TOrder,
  TSort,
} from '../interfaces';
import * as schemas from '../schemas';
import { Url } from './index';

export const createMovieService = async (movieData: TMovieRequest): Promise<TMovie> => {
  const moviesRepo: Repository<Movie> = AppDataSource.getRepository(Movie);

  const dbMovie: Movie = moviesRepo.create(movieData);
  await moviesRepo.save(dbMovie);

  const returnMovie: TMovie = schemas.movie.parse(dbMovie);

  return returnMovie;
};

export const readMoviesService = async (
  page: number = 1,
  perPage: number = 0,
  order: TOrder,
  sort: TSort = undefined
): Promise<TMoviesListPagination> => {
  const validatePerPage: boolean = +perPage > 0 && +perPage < 5 && !isNaN(+perPage);
  const validatePage: boolean = page > 0 && !isNaN(+perPage);
  if (!validatePerPage) perPage = 5;
  if (!validatePage) page = 1;

  const moviesRepo: Repository<Movie> = AppDataSource.getRepository(Movie);

  const moviesCount: number = await moviesRepo.count();
  const pagesCount: number = Math.ceil(moviesCount / perPage);

  const moviesOptions: FindManyOptions<Movie> = { order: {} };
  switch (sort) {
    case 'duration':
      moviesOptions.order = { duration: order ? order : 'asc' };
      break;
    case 'price':
      moviesOptions.order = { price: order ? order : 'asc' };
      break;
    default:
      moviesOptions.order = {};
  }

  moviesOptions.skip = (page - 1) * perPage;
  moviesOptions.take = perPage;

  const dbMovies: Array<Movie> = await moviesRepo.find(moviesOptions);
  const movies: TMoviesList = schemas.moviesList.parse(dbMovies);

  const prev: boolean = page - 1 > 0 && page <= pagesCount + 1;
  const next: boolean = +pagesCount > +page || false;

  return {
    prevPage: prev ? new Url(+page, order, perPage, sort).getUrl('prev') : null,
    nextPage: next ? new Url(+page, order, perPage, sort).getUrl('next') : null,
    count: moviesCount,
    data: movies,
  };
};
