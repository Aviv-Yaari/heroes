import { RequestHandler } from 'express';
import { logger } from '../services/logger.service';

export const loggerMiddleware: RequestHandler = (req, res, next) => {
  logger.info(req.method + ' ' + req.path);
  next();
};
