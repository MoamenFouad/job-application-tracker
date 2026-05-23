import { JobStatus } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { CreateJobInput, UpdateJobInput } from '../utils/validation.utils';

interface GetAllJobsFilters {
  status?: JobStatus;
  search?: string;
  page?: number;
  limit?: number;
}

export const getAllJobs = async (userId: string, filters: GetAllJobsFilters = {}) => {
  const { status, search, page = 1, limit = 10 } = filters;
  const skip = (page - 1) * limit;

  const where = {
    userId,
    ...(status && { status }),
    ...(search && {
      OR: [
        { company: { contains: search, mode: 'insensitive' as const } },
        { position: { contains: search, mode: 'insensitive' as const } },
      ],
    }),
  };

  const [jobs, total] = await Promise.all([
    prisma.job.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
    prisma.job.count({ where }),
  ]);

  return { jobs, total, page, totalPages: Math.ceil(total / limit) };
};

export const getJobById = async (jobId: string, userId: string) => {
  const job = await prisma.job.findFirst({ where: { id: jobId, userId } });
  if (!job) {
    throw Object.assign(new Error('Job not found.'), { statusCode: 404 });
  }
  return job;
};

export const createJob = async (userId: string, data: CreateJobInput) => {
  return prisma.job.create({
    data: {
      ...data,
      appliedDate: data.appliedDate ? new Date(data.appliedDate) : undefined,
      userId,
    },
  });
};

export const updateJob = async (jobId: string, userId: string, data: UpdateJobInput) => {
  await getJobById(jobId, userId);
  return prisma.job.update({
    where: { id: jobId },
    data: {
      ...data,
      appliedDate: data.appliedDate ? new Date(data.appliedDate) : undefined,
    },
  });
};

export const deleteJob = async (jobId: string, userId: string) => {
  await getJobById(jobId, userId);
  return prisma.job.delete({ where: { id: jobId } });
};

export const getStats = async (userId: string) => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const [statusCounts, total, recentCount] = await Promise.all([
    prisma.job.groupBy({ by: ['status'], where: { userId }, _count: { _all: true } }),
    prisma.job.count({ where: { userId } }),
    prisma.job.count({ where: { userId, createdAt: { gte: sevenDaysAgo } } }),
  ]);

  const byStatus: Record<string, number> = {
    WISHLIST: 0, APPLIED: 0, INTERVIEW: 0, OFFER: 0, REJECTED: 0,
  };
  statusCounts.forEach(({ status, _count }) => {
    byStatus[status] = _count._all;
  });

  return { total, byStatus, recentApplications: recentCount };
};

export const getTimeline = async (userId: string) => {
  const months: { month: string; count: number }[] = [];
  const now = new Date();

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const start = new Date(d.getFullYear(), d.getMonth(), 1);
    const end = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);

    const count = await prisma.job.count({
      where: { userId, appliedDate: { gte: start, lte: end } },
    });

    months.push({
      month: d.toLocaleString('en-US', { month: 'short', year: 'numeric' }),
      count,
    });
  }

  return months;
};
