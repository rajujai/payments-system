import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import md5 from "blueimp-md5";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  // const generatedKey = md5(process.env.SECRET_KEY || "", new Date().toISOString().split('T')[0]);
  // console.log(generatedKey);
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
    (req as any).user = decoded as User;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
