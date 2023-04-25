import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Movie } from '../entities';
import { AppError } from '../error';
import { TMovieRequest } from '../interfaces';

export const validateName = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { name: reqName }: Pick<TMovieRequest, 'name'> = req.body;

  const moviesRepo: Repository<Movie> = AppDataSource.getRepository(Movie);

  const nameExists: boolean = await moviesRepo.exist({ where: { name: reqName } });

  if (nameExists) throw new AppError('Movie already exists.', StatusCodes.CONFLICT);

  return next();
};

export const validateId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = +req.params.id;

  const moviesRepo: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movieExists: boolean = await moviesRepo.exist({ where: { id: id } });

  if (!movieExists) throw new AppError('Movie not found', StatusCodes.NOT_FOUND);

  res.locals.movieId = id;

  return next();
};
