import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  adminId?: string;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No authentication token, access denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'diffin_secret_key_2024_secure') as { adminId: string };
    req.adminId = decoded.adminId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token verification failed, authorization denied' });
  }
};
