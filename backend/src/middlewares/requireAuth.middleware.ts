import { RequestHandler } from 'express-serve-static-core';
import { ExpressError } from '../services/error.service';
import { logger } from '../services/logger.service';

export const requireAuth: RequestHandler = async (req, res, next) => {
  if (!req.session || !req.session.user) {
    next(new ExpressError('Not authenticated', 401));
  }
  next();
};

export const requireAdmin: RequestHandler = async (req, res, next) => {
  const { user } = req.session;
  if (!user?.isAdmin) {
    logger.warn('Attempt to perform admin action. username: ' + user?.username);
    next(new ExpressError('Unauthorized', 403));
  }
  next();
};
