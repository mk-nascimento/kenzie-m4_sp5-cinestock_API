import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as services from '../services';
import * as types from '../interfaces';

export const createMovieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movie: types.TMovie = await services.createMovieService(req.body);

  return res.status(StatusCodes.CREATED).json(movie);
};

export const readMoviesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const page: number | undefined = req.query.page as number | undefined;
  const perPage: number | undefined = req.query.perPage as number | undefined;
  const order: types.TOrder = req.query.order as types.TOrder;
  const sort: types.TSort = req.query.sort as types.TSort;

  const paginatedMovie: types.TMoviesListPagination = await services.readMoviesService(
    page,
    perPage,
    order,
    sort
  );

  return res.json(paginatedMovie);
};

export const updateMovieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = res.locals.movieId;

  const updateData: types.TMovieUpdate = req.body;
  const updatedMovie: types.TMovie = await services.updateMovieService(+id, updateData);

  return res.json(updatedMovie);
};

export const deleteMovieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = res.locals.movieId;
  await services.deleteMovieServie(id);

  return res.status(StatusCodes.NO_CONTENT).send();
};
