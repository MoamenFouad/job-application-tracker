import { Request, Response, NextFunction } from 'express';
import { extractTokenFromHeader, verifyToken } from '../utils/jwt.utils';
import { errorResponse } from '../utils/response.utils';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = extractTokenFromHeader(req.headers.authorization);

  if (!token) {
    errorResponse(res, 'Access denied. No token provided.', 401);
    return;
  }

  const payload = verifyToken(token);
  if (!payload) {
    errorResponse(res, 'Invalid or expired token.', 401);
    return;
  }

  req.userId = payload.userId;
  next();
};
