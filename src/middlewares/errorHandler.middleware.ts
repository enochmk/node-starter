import { isAxiosError } from 'axios';
import { ErrorRequestHandler } from 'express';
import { HttpError } from 'http-errors';
import { getLogger } from '../libs/logger';

const logger = getLogger('ErrorHandler');
const TECHNICAL_ISSUE_MSG = 'Internal Server Error.';

interface ErrorResponse {
  requestTimestamp: string;
  requestID: string;
  message: string;
  [key: string]: any;
}

// eslint-disable-next-line
const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  let statusCode = 500;
  const response: ErrorResponse = {
    requestID: res.locals.requestID,
    requestTimestamp: res.locals.timestamp,
    message: TECHNICAL_ISSUE_MSG,
  };

  // ? handled error
  if (error instanceof HttpError) {
    statusCode = error.statusCode;
    response.message = error.message;
    logger.warn({ statusCode, response });
    return res.status(statusCode).json(response);
  }

  // ? an axios error
  if (isAxiosError(error)) {
    const axiosErrorLog = {
      name: error.name,
      code: error.code,
      request: {
        headers: error.config?.headers,
        baseURL: error.config?.baseURL,
        url: error.config?.url,
        method: error.config?.method,
        data: error.config?.data,
      },
      response: {},
      stack: error.stack,
    };

    // ? axios error with response
    if (error.response) {
      axiosErrorLog.response = {
        status: error.response.status,
        data: error.response.data,
      };
      statusCode = error.response?.status || statusCode;
    }

    // ? axios error without response
    if (!error.response) {
      statusCode = error.status || statusCode;
    }

    logger.warn(axiosErrorLog);
    return res.status(statusCode).json(response);
  }

  // ! unhandled error
  const exceptionLog = {
    message: error.message,
    request: {
      ip: res.locals.clientIp,
      url: req.originalUrl,
      method: req.method,
      body: req.body,
      params: req.params,
      query: req.query,
    },
    response: {
      statusCode,
      ...response,
    },
    error: {
      name: error.name,
      cause: error.cause,
      stack: error.stack,
    },
  };

  logger.error(exceptionLog);
  return res.status(statusCode).json(response);
};

export default errorHandler;
