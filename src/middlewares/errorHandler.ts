import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line
const errorHandler = (error: any, req: Request, res: Response, _next: NextFunction) => {
  const response = {
    message: error.message,
  };

  return res.status(error.statusCode || 500).json(response);
};

export default errorHandler;
