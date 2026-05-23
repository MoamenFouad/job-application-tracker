import { Request, Response, NextFunction } from 'express';
import { getStats, getTimeline } from '../services/jobs.service';
import { successResponse } from '../utils/response.utils';

export const getDashboardStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const stats = await getStats(req.userId!);
    successResponse(res, stats);
  } catch (err) {
    next(err);
  }
};

export const getApplicationTimeline = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const timeline = await getTimeline(req.userId!);
    successResponse(res, timeline);
  } catch (err) {
    next(err);
  }
};
