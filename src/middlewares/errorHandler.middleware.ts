import { HttpError } from 'http-errors';
import { NextFunction, Request, Response } from 'express';

interface ErrorResponse {
  message: string;
  [key: string]: any;
}

// eslint-disable-next-line
const errorHandler = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  // known error
  if (error instanceof HttpError) {
    statusCode = error.statusCode;
    message = error.message;
  }

  const response: ErrorResponse = {
    message: message,
  };

  return res.status(statusCode).json(response);
};

export default errorHandler;
