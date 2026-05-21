// ده الـ error handler el global - bymsk el errors kolaha
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
};
