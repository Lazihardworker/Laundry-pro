import { Request, Response, NextFunction } from 'express';
import { ZodError, AnyZodObject } from 'zod';

export const validate = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        }));

        return res.status(400).json({
          success: false,
          error: 'Validation error',
          details: errorMessages,
        });
      }

      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  };
};

export const validateBody = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        }));

        return res.status(400).json({
          success: false,
          error: 'Validation error',
          details: errorMessages,
        });
      }

      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  };
};
