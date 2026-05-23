import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';
import { successResponse } from '../utils/response.utils';
import { registerSchema, loginSchema } from '../utils/validation.utils';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = registerSchema.parse(req.body);
    const result = await authService.register(data);
    successResponse(res, result, 201, 'Account created successfully');
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = loginSchema.parse(req.body);
    const result = await authService.login(data);
    successResponse(res, result, 200, 'Login successful');
  } catch (err) {
    next(err);
  }
};

export const getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await authService.getProfile(req.userId!);
    successResponse(res, user);
  } catch (err) {
    next(err);
  }
};

export const logout = (_req: Request, res: Response): void => {
  successResponse(res, null, 200, 'Logged out successfully. Please discard your token client-side.');
};
