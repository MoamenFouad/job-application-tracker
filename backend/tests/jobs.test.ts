import dotenv from 'dotenv';
dotenv.config();

jest.mock('../src/lib/prisma', () => ({
  prisma: {
    job: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
      groupBy: jest.fn(),
    },
  },
}));

import { prisma } from '../src/lib/prisma';
import { getAllJobs, createJob, deleteJob, getJobById } from '../src/services/jobs.service';

const userId = 'user-cuid-1';
const jobId = 'job-cuid-1';

const mockJob = {
  id: jobId,
  company: 'Acme Corp',
  position: 'Senior Engineer',
  status: 'APPLIED' as const,
  appliedDate: new Date(),
  notes: null,
  salary: null,
  location: 'Remote',
  url: null,
  userId,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('Jobs Service', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('getAllJobs', () => {
    it('returns paginated jobs list', async () => {
      (prisma.job.findMany as jest.Mock).mockResolvedValue([mockJob]);
      (prisma.job.count as jest.Mock).mockResolvedValue(1);

      const result = await getAllJobs(userId, { page: 1, limit: 10 });

      expect(result.jobs).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(result.page).toBe(1);
      expect(result.totalPages).toBe(1);
    });

    it('applies status filter', async () => {
      (prisma.job.findMany as jest.Mock).mockResolvedValue([]);
      (prisma.job.count as jest.Mock).mockResolvedValue(0);

      await getAllJobs(userId, { status: 'APPLIED' as any });

      expect(prisma.job.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: expect.objectContaining({ status: 'APPLIED' }) })
      );
    });
  });

  describe('createJob', () => {
    it('creates a job successfully', async () => {
      (prisma.job.create as jest.Mock).mockResolvedValue(mockJob);

      const result = await createJob(userId, {
        company: 'Acme Corp',
        position: 'Senior Engineer',
        status: 'APPLIED',
      });

      expect(result.company).toBe('Acme Corp');
      expect(prisma.job.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteJob', () => {
    it('deletes a job the user owns', async () => {
      (prisma.job.findFirst as jest.Mock).mockResolvedValue(mockJob);
      (prisma.job.delete as jest.Mock).mockResolvedValue(mockJob);

      await deleteJob(jobId, userId);

      expect(prisma.job.delete).toHaveBeenCalledWith({ where: { id: jobId } });
    });

    it('throws 404 when job does not belong to user', async () => {
      (prisma.job.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(deleteJob(jobId, 'other-user')).rejects.toMatchObject({ statusCode: 404 });
      expect(prisma.job.delete).not.toHaveBeenCalled();
    });
  });

  describe('getJobById', () => {
    it('returns job when found', async () => {
      (prisma.job.findFirst as jest.Mock).mockResolvedValue(mockJob);

      const result = await getJobById(jobId, userId);
      expect(result.id).toBe(jobId);
    });

    it('throws 404 when not found', async () => {
      (prisma.job.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(getJobById('nonexistent', userId)).rejects.toMatchObject({ statusCode: 404 });
    });
  });
});
