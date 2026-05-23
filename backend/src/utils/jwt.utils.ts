import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'fallback-secret';
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export const signToken = (userId: string): string => {
  return jwt.sign({ userId }, SECRET, { expiresIn: EXPIRES_IN } as jwt.SignOptions);
};

export const verifyToken = (token: string): { userId: string } | null => {
  try {
    return jwt.verify(token, SECRET) as { userId: string };
  } catch {
    return null;
  }
};

export const extractTokenFromHeader = (authHeader: string | undefined): string | null => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.slice(7).trim();
  return token.length > 0 ? token : null;
};
