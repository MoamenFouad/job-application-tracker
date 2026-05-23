import { Response } from 'express';

export const successResponse = (
  res: Response,
  data: unknown,
  statusCode = 200,
  message?: string
): Response => {
  return res.status(statusCode).json({ success: true, data, ...(message && { message }) });
};

export const errorResponse = (
  res: Response,
  message: string,
  statusCode = 400
): Response => {
  return res.status(statusCode).json({ success: false, error: message });
};

export const paginatedResponse = (
  res: Response,
  data: unknown,
  total: number,
  page: number,
  limit: number
): Response => {
  return res.status(200).json({
    success: true,
    data,
    pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
  });
};
