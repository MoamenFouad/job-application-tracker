import { prisma } from '../lib/prisma';
import { hashPassword, comparePassword } from '../utils/password.utils';
import { signToken } from '../utils/jwt.utils';
import { RegisterInput, LoginInput } from '../utils/validation.utils';

export const register = async (data: RegisterInput) => {
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) {
    const err = Object.assign(new Error('Email already in use.'), { statusCode: 409 });
    throw err;
  }

  const hashed = await hashPassword(data.password);
  const user = await prisma.user.create({
    data: { email: data.email, name: data.name, password: hashed },
    select: { id: true, email: true, name: true, createdAt: true, updatedAt: true },
  });

  const token = signToken(user.id);
  return { user, token };
};

export const login = async (data: LoginInput) => {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) {
    const err = Object.assign(new Error('Invalid email or password.'), { statusCode: 401 });
    throw err;
  }

  const valid = await comparePassword(data.password, user.password);
  if (!valid) {
    const err = Object.assign(new Error('Invalid email or password.'), { statusCode: 401 });
    throw err;
  }

  const { password: _pw, ...safeUser } = user;
  const token = signToken(user.id);
  return { user: safeUser, token };
};

export const getProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true, createdAt: true, updatedAt: true },
  });
  if (!user) {
    const err = Object.assign(new Error('User not found.'), { statusCode: 404 });
    throw err;
  }
  return user;
};
