import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';
import { getLogger } from '../libs/logger';

const logger = getLogger('ResourceValidator');

const resourceValidator =
  (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    const data = {
      body: req.body,
      query: req.query,
      params: req.params,
    };

    logger.verbose('Validating request...', data);

    try {
      await schema.parseAsync(data);
      logger.info('Validation passed', data);
      return next();
    } catch (error: any) {
      logger.warn('Validation failed', { url: req.originalUrl, data, error: error.errors });
      return res.status(400).json({ message: 'Request validation error', error });
    }
  };

export default resourceValidator;
