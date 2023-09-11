import { isAxiosError } from 'axios';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';
import messages from '../utils/messages';
import { getLogger } from '../libs/logger';

const logger = getLogger('ErrorHandler');

interface ErrorResponse {
  requestTimestamp: string;
  requestID: string;
  message: string;
}

// eslint-disable-next-line
const errorHandler = (error: any, req: Request, res: Response, _next: NextFunction) => {
  let statusCode = 500;
  const response: ErrorResponse = {
    requestID: res.locals.requestID,
    requestTimestamp: res.locals.timestamp,
    message: messages.GENERIC_ERROR,
  };

  const errorLog: any = {
    requestID: res.locals.requestID,
    requestTimestamp: res.locals.timestamp,
    endpoint: {
      url: req.originalUrl,
      method: req.method,
      params: req.params,
      query: req.query,
      body: req.body,
    },
    response,
    api: null,
    error: {
      name: error.name,
      code: error.code,
      status: error.status,
      message: error.message,
      stack: null,
    },
  };

  // * Handled Error
  if (error instanceof HttpError) {
    statusCode = error.statusCode;
    response.message = error.message;
    errorLog.response = response;
    logger.warn(response.message, errorLog);
    return res.status(statusCode).json(response);
  }

  // * Axios Error
  if (isAxiosError(error)) {
    // include API request
    errorLog.api.request = {
      baseURL: error.config?.baseURL,
      url: error.config?.url,
      method: error.config?.method,
      data: error.config?.data,
    };

    // API Response
    if (error.response) {
      errorLog.api.response = {
        status: error.response.status,
        data: error.response.data,
      };

      // get error message from API response
      errorLog.error.message = error.response?.data?.message || response.message;
      logger.warn(errorLog.error.message, errorLog);
      return res.status(error.response.status).json(error.response.data);
    }

    // ! Network error
    if (!error.response) {
      errorLog.api.response = null;
      logger.error(response.message, errorLog);
      return res.status(statusCode).json(response);
    }
  }

  // ! Unknown Error. Include stack trace
  errorLog.error.stack = error.stack;
  logger.error(error.message, errorLog);
  return res.status(statusCode).json(response);
};

export default errorHandler;
