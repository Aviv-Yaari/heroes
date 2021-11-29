import { RequestHandler } from 'express';
import authService from './auth.service';
import { userService } from '../user/user.service';

export const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body;
  const user = await authService.login(username, password);
  req.session.user = { _id: user._id, username, isAdmin: user.isAdmin };
  res.send(user);
};

export const signup: RequestHandler = async (req, res) => {
  const { username, fullname, password } = req.body;
  await authService.signup(username, fullname, password);
  const user = await authService.login(username, password);
  req.session.user = { _id: user._id, username, isAdmin: user.isAdmin };
  res.send(user);
};

export const logout: RequestHandler = async (req, res) => {
  req.session.destroy(() => {
    res.send('Logged out');
  });
};

export const getLoggedInUser: RequestHandler = async (req, res) => {
  const { user } = req.session;
  if (!user) return res.send(null);
  const loggedInUser = await userService.query({ _id: user._id });
  if (!loggedInUser) return res.send(null);
  res.send({ ...loggedInUser.toJSON(), password: undefined });
};
