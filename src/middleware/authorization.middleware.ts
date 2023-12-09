import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { role } = (req as any).user as User;
    if (!roles.includes(role)) return res.status(403).json({ error: 'Forbidden' });
    next();
  };
};
