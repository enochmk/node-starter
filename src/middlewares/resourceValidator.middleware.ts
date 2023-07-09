import { RequestHandler } from 'express';
import { AnyZodObject } from 'zod';

const resourceValidator =
  (schema: AnyZodObject): RequestHandler =>
  async (req, res, next) => {
    const resource = {
      headers: req.headers,
      body: req.body,
      query: req.query,
      params: req.params,
    };

    try {
      await schema.parseAsync(resource);
      return next();
    } catch (error: any) {
      return res.status(400).json({
        message: 'Invalid resource',
        errors: error.errors,
      });
    }
  };

export default resourceValidator;
