import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

export const errorHandler = (err: unknown, req: Request, res: Response, _next: NextFunction): void => {
  if (process.env.NODE_ENV === 'development') {
    console.error(err instanceof Error ? err.stack : err);
  }

  if (err instanceof ZodError) {
    const fields = err.errors.map((e) => ({ field: e.path.join('.'), message: e.message }));
    res.status(422).json({ success: false, error: 'Validation failed', fields });
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      res.status(409).json({ success: false, error: 'A record with this value already exists.' });
      return;
    }
    if (err.code === 'P2025') {
      res.status(404).json({ success: false, error: 'Record not found.' });
      return;
    }
  }

  if (err instanceof TokenExpiredError) {
    res.status(401).json({ success: false, error: 'Token has expired.' });
    return;
  }

  if (err instanceof JsonWebTokenError) {
    res.status(401).json({ success: false, error: 'Invalid token.' });
    return;
  }

  const message = err instanceof Error ? err.message : 'Internal Server Error';
  const status = (err as { statusCode?: number }).statusCode || 500;
  res.status(status).json({ success: false, error: message });
};
