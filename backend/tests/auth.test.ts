import dotenv from 'dotenv';
dotenv.config();

jest.mock('../src/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

import { prisma } from '../src/lib/prisma';
import { register, login, getProfile } from '../src/services/auth.service';

const mockUser = {
  id: 'user-cuid-1',
  email: 'test@example.com',
  name: 'Test User',
  password: '$2a$12$hashedpassword',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockUserSafe = {
  id: mockUser.id,
  email: mockUser.email,
  name: mockUser.name,
  createdAt: mockUser.createdAt,
  updatedAt: mockUser.updatedAt,
};

describe('Auth Service', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('register', () => {
    it('creates a new user and returns token', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (prisma.user.create as jest.Mock).mockResolvedValue(mockUserSafe);

      const result = await register({ email: 'test@example.com', name: 'Test User', password: 'password123' });

      expect(result).toHaveProperty('token');
      expect(result.user.email).toBe('test@example.com');
      expect(prisma.user.create).toHaveBeenCalledTimes(1);
    });

    it('throws 409 when email already exists', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      await expect(
        register({ email: 'test@example.com', name: 'Test User', password: 'password123' })
      ).rejects.toMatchObject({ message: 'Email already in use.', statusCode: 409 });
    });

    it('does not call create when findUnique resolves existing user', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      await expect(
        register({ email: 'test@example.com', name: 'Test User', password: 'password123' })
      ).rejects.toMatchObject({ statusCode: 409 });
      expect(prisma.user.create).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('returns user and token on valid credentials', async () => {
      const bcrypt = await import('bcryptjs');
      const hashed = await bcrypt.hash('password123', 1);
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({ ...mockUser, password: hashed });

      const result = await login({ email: 'test@example.com', password: 'password123' });
      expect(result).toHaveProperty('token');
      expect(result.user).not.toHaveProperty('password');
    });

    it('throws 401 when user not found', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        login({ email: 'nobody@example.com', password: 'password123' })
      ).rejects.toMatchObject({ statusCode: 401 });
    });

    it('throws 401 on wrong password', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      await expect(
        login({ email: 'test@example.com', password: 'wrongpassword' })
      ).rejects.toMatchObject({ statusCode: 401 });
    });
  });

  describe('getProfile', () => {
    it('returns user profile for valid userId', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUserSafe);

      const result = await getProfile('user-cuid-1');
      expect(result.id).toBe('user-cuid-1');
    });

    it('throws 404 when user not found', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(getProfile('nonexistent')).rejects.toMatchObject({ statusCode: 404 });
    });
  });
});
