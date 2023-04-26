import dayjs from 'dayjs';
import rtracer from 'cls-rtracer';
import { NextFunction, Request, Response } from 'express';

const requestIdMiddleware = async (_req: Request, res: Response, next: NextFunction) => {
  res.locals.requestID = rtracer.id();
  res.locals.timestamp = dayjs().toISOString();
  next();
};

export default requestIdMiddleware;
