// ده الـ controller بتاع الـ jobs - da el controller bta3 el jobs (CRUD kolaha)
import { Request, Response } from 'express';

export const getJobs = async (req: Request, res: Response): Promise<void> => {
  res.json({ message: 'todo' });
};

export const createJob = async (req: Request, res: Response): Promise<void> => {
  res.json({ message: 'todo' });
};

export const getJobById = async (req: Request, res: Response): Promise<void> => {
  res.json({ message: 'todo' });
};

export const updateJob = async (req: Request, res: Response): Promise<void> => {
  res.json({ message: 'todo' });
};

export const deleteJob = async (req: Request, res: Response): Promise<void> => {
  res.json({ message: 'todo' });
};
