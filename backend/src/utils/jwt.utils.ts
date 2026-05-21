// ده الـ JWT utils - byes3edna nعمل sign w verify lel tokens
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'fallback-secret';

export const signToken = (payload: { userId: string }): string => {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string): { userId: string } => {
  return jwt.verify(token, SECRET) as { userId: string };
};
