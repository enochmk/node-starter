import { isAxiosError } from 'axios';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';
import { getLogger } from '../libs/logger';

const logger = getLogger('ErrorHandler');
const TECHNICAL_ISSUE_MSG = 'Internal Server Error.';

interface ErrorResponse {
  requestTimestamp: string;
  requestID: string;
  message: string;
}

// eslint-disable-next-line
const errorHandler = (error: Error, req: Request, res: Response, _next: NextFunction) => {
  let statusCode = 500;
  let message = TECHNICAL_ISSUE_MSG;

  if (error instanceof HttpError) {
    statusCode = error.statusCode;
    message = error.message;

    const response: ErrorResponse = {
      requestID: res.locals.requestID,
      requestTimestamp: res.locals.timestamp,
      message: message,
    };

    logger.info(response);
    return res.status(statusCode).json(response);
  }

  if (isAxiosError(error)) {
    if (error.response) {
      const log = {
        name: error.name,
        // message: error.message,
        code: error.code,
        status: error.status,
        request: {
          baseURL: error.config?.baseURL,
          url: error.config?.url,
          method: error.config?.method,
          data: error.config?.data,
        },
        response: {
          status: error.response.status,
          data: error.response.data,
        },
        stack: error.stack,
      };

      message = error.response?.data?.message || message;
      statusCode = error.response?.status || statusCode;
      logger.warn(`${message}`, log);
      return res.status(error.response.status).json(error.response.data);
    }

    if (!error.response) {
      const log = {
        name: error.name,
        message: error.message,
        code: error.code,
        status: error.status,
        request: {
          baseURL: error.config?.baseURL,
          url: error.config?.url,
          method: error.config?.method,
          data: error.config?.data,
        },
        stack: error.stack,
      };

      statusCode = error.status || statusCode;
      logger.error(log);
    }

    const response: ErrorResponse = {
      requestID: res.locals.requestID,
      requestTimestamp: res.locals.timestamp,
      message: message,
    };

    return res.status(statusCode).json(response);
  }

  const errorLog = {
    requestID: res.locals.requestID,
    requestTimestamp: res.locals.timestamp,
    message,
    data: {
      url: req.originalUrl,
      method: req.method,
      body: req.body,
      params: req.params,
      query: req.query,
    },
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
    },
  };

  const response: ErrorResponse = {
    requestID: res.locals.requestID,
    requestTimestamp: res.locals.timestamp,
    message: message,
  };

  logger.error(errorLog);
  return res.status(statusCode).json(response);
};

export default errorHandler;
