import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createMovieService, readMoviesService } from '../services';

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
  const movies = await readMoviesService();

  return res.json(movies);
};
