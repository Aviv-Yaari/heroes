import { RequestHandler } from 'express';
import { logger } from '../../services/logger.service';
import authService from './auth.service';
import { userService } from '../user/user.service';

export const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await authService.login(username, password);
    req.session.user = { _id: user._id, username, isAdmin: user.isAdmin };
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
    const user = await authService.login(username, password);
    req.session.user = { _id: user._id, username, isAdmin: user.isAdmin };
    res.send(user);
  } catch (err) {
    logger.error('Failed to signup: ' + err);
    res.status(500).send({ err });
  }
};

export const getLoggedInUser: RequestHandler = async (req, res) => {
  const { user } = req.session;
  if (!user) return res.send(null);
  const loggedInUser = await userService.query({ _id: user._id });
  if (!loggedInUser) return res.send(null);
  res.send({ ...loggedInUser.toJSON(), password: undefined });
};
