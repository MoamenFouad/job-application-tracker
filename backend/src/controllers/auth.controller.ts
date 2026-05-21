// ده الـ controller بتاع الـ auth - da el controller bta3 el auth (register w login)
import { Request, Response } from 'express';

export const register = async (req: Request, res: Response): Promise<void> => {
  res.json({ message: 'todo' });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  res.json({ message: 'todo' });
};
