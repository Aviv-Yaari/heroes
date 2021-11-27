import { Request, RequestHandler } from 'express';
import { logger } from '../../services/logger.service';
import { MiniUser, User } from '../user/user.model';
import authService from './auth.service';

export const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = <MiniUser>await authService.login(username, password);
    req.session.user = user;
    res.send(user);
  } catch (err) {
    logger.error('Failed to Login ' + err);
    res.status(401).send({ err: 'Failed to login: ' + err });
  }
};

export const signup: RequestHandler = async (req, res) => {
  try {
    const { username, fullname, password } = req.body;
    await authService.signup(username, fullname, password);
    const user = <MiniUser>await authService.login(username, password);
    req.session.user = user;
    res.send(user);
  } catch (err) {
    logger.error('Failed to signup: ' + err);
    res.status(500).send({ err });
  }
};
