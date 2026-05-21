// ده الـ middleware bta3 el auth - byet2aaked men el JWT token
import { Request, Response, NextFunction } from 'express';

export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // todo: verify JWT token and attach userId to req
  next();
};
