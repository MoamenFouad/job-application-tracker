import { Request, Response, NextFunction } from 'express';
import { JobStatus } from '@prisma/client';
import * as jobsService from '../services/jobs.service';
import { successResponse, paginatedResponse } from '../utils/response.utils';
import { createJobSchema, updateJobSchema } from '../utils/validation.utils';

export const getAllJobs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status, search, page, limit } = req.query;
    const result = await jobsService.getAllJobs(req.userId!, {
      status: status as JobStatus | undefined,
      search: search as string | undefined,
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 10,
    });
    paginatedResponse(res, result.jobs, result.total, result.page, result.totalPages);
  } catch (err) {
    next(err);
  }
};

export const getJobById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const job = await jobsService.getJobById(req.params.id, req.userId!);
    successResponse(res, job);
  } catch (err) {
    next(err);
  }
};

export const createJob = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = createJobSchema.parse(req.body);
    const job = await jobsService.createJob(req.userId!, data);
    successResponse(res, job, 201);
  } catch (err) {
    next(err);
  }
};

export const updateJob = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = updateJobSchema.parse(req.body);
    const job = await jobsService.updateJob(req.params.id, req.userId!, data);
    successResponse(res, job);
  } catch (err) {
    next(err);
  }
};

export const deleteJob = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await jobsService.deleteJob(req.params.id, req.userId!);
    successResponse(res, null, 200, 'Job deleted successfully');
  } catch (err) {
    next(err);
  }
};

export const getStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const stats = await jobsService.getStats(req.userId!);
    successResponse(res, stats);
  } catch (err) {
    next(err);
  }
};
