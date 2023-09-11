import dayjs from 'dayjs';
import rtracer from 'cls-rtracer';
import requestIp from 'request-ip';
import { RequestHandler } from 'express';
import { getLogger } from '../libs/logger';

const logger = getLogger('RequestLoggerMiddleware');

const requestLoggerMiddleware: RequestHandler = (req, res, next) => {
  res.locals.requestID = rtracer.id();
  res.locals.timestamp = dayjs().toISOString();
  res.locals.clientIp = requestIp.getClientIp(req);

  const metadata = {
    requestID: res.locals.requestID,
    timestamp: res.locals.timestamp,
    ip: res.locals.clientIp,
    protocol: req.protocol,
    url: req.originalUrl,
    method: req.method,
    headers: req.headers,
    data: {
      params: req.params,
      query: req.query,
      body: req.body,
    },
  };

  logger.info('Request logged', metadata);
  return next();
};

export default requestLoggerMiddleware;
