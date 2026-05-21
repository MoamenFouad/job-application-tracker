// ده الـ controller بتاع الـ stats - da el controller bta3 el stats (el summary)
import { Request, Response } from 'express';

export const getStats = async (req: Request, res: Response): Promise<void> => {
  res.json({ message: 'todo' });
};
