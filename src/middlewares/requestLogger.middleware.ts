import dayjs from 'dayjs';
import rtracer from 'cls-rtracer';
import requestIp from 'request-ip';
import { RequestHandler } from 'express';
import { getLogger } from '../libs/logger';

const logger = getLogger('RequestLogger');

const requestLoggerMiddleware: RequestHandler = (req, res, next) => {
  res.locals.requestID = rtracer.id();
  res.locals.timestamp = dayjs().toISOString();
  res.locals.clientIp = requestIp.getClientIp(req);

  const metadata = {
    requestID: res.locals.requestID,
    timestamp: res.locals.timestamp,
    ip: res.locals.clientIp,
    request: {
      url: req.originalUrl,
      headers: req.headers,
      method: req.method,
      body: req.body,
      params: req.params,
      query: req.query,
    },
  };

  logger.info(metadata);
  return next();
};

export default requestLoggerMiddleware;
