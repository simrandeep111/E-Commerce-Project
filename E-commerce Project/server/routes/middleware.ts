import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

interface AuthPayload {
  id: string;
  email: string;
}

export function authenticateToken(req: Request & { user?: AuthPayload }, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access denied' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err || typeof user !== 'object' || !('id' in user)) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    req.user = user as AuthPayload;
    next();
  });
}

