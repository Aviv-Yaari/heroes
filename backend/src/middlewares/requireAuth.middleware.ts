import { RequestHandler } from 'express-serve-static-core';
import { userService } from '../api/user/user.service';
import { logger } from '../services/logger.service';

export const requireAuth: RequestHandler = async (req, res, next) => {
  if (!req.session || !req.session.user) {
    res.status(401).end('Not authenticated');
    return;
  }
  next();
};

export const requireAdmin: RequestHandler = async (req, res, next) => {
  const { user } = req.session;
  if (!user) return res.status(500).end('User not found');
  if (!user.isAdmin) {
    logger.warn('Attempt to perform admin action by username: ' + user.username);
    return res.status(403).end('Unauthorized');
  }
  next();
};
