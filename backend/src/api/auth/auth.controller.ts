import { Request, RequestHandler, Response } from 'express';
import authService from './auth.service';

export const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await authService.login(username, password);
    // req.session.user = user;
    res.json(user);
  } catch (err) {
    // logger.error('Failed to Login ' + err);
    res.status(401).send({ err: 'Failed to Login' });
  }
};

export const signup: RequestHandler = async (req, res) => {
  try {
    const { username, password, fullname } = req.body;
    const account = await authService.signup(username, password, fullname);
    // logger.debug(`auth.route - new account created: ` + JSON.stringify(account));
    const user = await authService.login(username, password);
    // req.session.user = user;
    res.json(user);
  } catch (err) {
    // logger.error('Failed to signup ' + err);
    res.status(500).send({ err: 'Failed to signup' });
  }
};

export const logout: RequestHandler = async (req, res) => {
  try {
    // req.session.destroy()
    // req.session.user = null;
    res.send({ msg: 'Logged out successfully' });
  } catch (err) {
    res.status(500).send({ err: 'Failed to logout' });
  }
};

module.exports = {
  login,
  signup,
  logout,
};
