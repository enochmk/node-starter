import requestIp from 'request-ip';
import { NextFunction, Request, Response } from 'express';
import { getLogger } from '../libs/logger';

const logger = getLogger('LoggerMiddleware');

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const clientIp = requestIp.getClientIp(req);
  res.locals.clientIp = clientIp;

  const log = {
    requestID: res.locals.requestID,
    timestamp: res.locals.timestamp,
    ip: clientIp,
    method: req.method,
    url: req.originalUrl,
    body: req.body,
    params: req.params,
    query: req.query,
  };

  logger.verbose('request logged', log);
  next();
};

export default loggerMiddleware;
