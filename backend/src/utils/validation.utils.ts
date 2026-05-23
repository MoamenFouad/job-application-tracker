import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const createJobSchema = z.object({
  company: z.string().min(1, 'Company is required'),
  position: z.string().min(1, 'Position is required'),
  status: z.enum(['WISHLIST', 'APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED']).default('WISHLIST'),
  appliedDate: z.string().datetime().optional(),
  notes: z.string().optional(),
  salary: z.string().optional(),
  location: z.string().optional(),
  url: z.string().url('Invalid URL').optional().or(z.literal('')),
});

export const updateJobSchema = createJobSchema.partial();

export const createInterviewSchema = z.object({
  jobId: z.string().min(1, 'Job ID is required'),
  scheduledAt: z.string().datetime('Invalid datetime format'),
  type: z.enum(['PHONE', 'VIDEO', 'ONSITE', 'TECHNICAL']),
  notes: z.string().optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateJobInput = z.infer<typeof createJobSchema>;
export type UpdateJobInput = z.infer<typeof updateJobSchema>;
export type CreateInterviewInput = z.infer<typeof createInterviewSchema>;
