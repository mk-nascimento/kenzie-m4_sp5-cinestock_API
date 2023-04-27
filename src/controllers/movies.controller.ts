import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createMovieService, readMoviesService } from '../services';
import { TOrder, TSort } from '../interfaces';

export const createMovieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movie = await createMovieService(req.body);

  return res.status(StatusCodes.CREATED).json(movie);
};

export const readMoviesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const page: number | undefined = req.query.page as number | undefined;
  const perPage: number | undefined = req.query.perPage as number | undefined;
  const order: TOrder = req.query.order as TOrder;
  const sort: TSort = req.query.sort as TSort;

  const movies = await readMoviesService(page, perPage, order, sort);

  return res.json(movies);
};
