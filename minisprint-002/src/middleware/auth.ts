import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/env';

interface AuthRequest extends Request {
  user?: { id: number; role: string };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(401).json({
      success: false,
      error: { message: 'Token required' }
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret) as any;
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch {
    res.status(403).json({
      success: false,
      error: { message: 'Invalid token' }
    });
  }
};

export const generateTestToken = (): string => {
  return jwt.sign(
    { id: 1, role: 'admin' },
    config.jwt.secret,
    { expiresIn: '24h' }
  );
};
