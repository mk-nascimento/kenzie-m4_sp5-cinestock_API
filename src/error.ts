import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';

class AppError extends Error {
  statusCode: number;

  constructor(message: string, statuscode: number = 400) {
    super(message);
    this.statusCode = statuscode;
  }
}

const handleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  if (err instanceof AppError)
    return res.status(err.statusCode).json({
      message: err.message,
    });

  if (err instanceof ZodError)
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: err.flatten().fieldErrors,
    });

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json(ReasonPhrases.INTERNAL_SERVER_ERROR);
};
