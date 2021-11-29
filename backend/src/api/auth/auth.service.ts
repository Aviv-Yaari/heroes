import bcrypt from 'bcrypt';
import { ExpressError } from '../../services/error.service';
import { logger } from '../../services/logger.service';
import { userService } from '../user/user.service';

const login = async (username: string, password: string) => {
  const user = await userService.query({ username });
  if (!user) throw new ExpressError('Invalid username or password', 401);
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new ExpressError('Invalid username or password', 401);
  return { ...user.toJSON(), _id: user._id, password: undefined };
};

const signup = async (username: string, fullname: string, password: string) => {
  const saltRounds = 10;
  logger.debug(`Signup with username: ${username}`);
  if (!username || !password || !fullname) throw new ExpressError('fullname, username and password are required', 400);
  const passwordErrors = _checkPassword(password);
  if (passwordErrors.length) throw new ExpressError(JSON.stringify(passwordErrors), 400);
  const existingUser = await userService.query({ username });
  if (existingUser) throw new ExpressError('User already exists', 400);
  const hash = await bcrypt.hash(password, saltRounds);
  await userService.add({ username, password: hash, fullname, isAdmin: false, money: 0 });
  return { username, password: hash, fullname };
};

function _checkPassword(password: string) {
  const errors = [];
  if (password.length < 8) errors.push('Password must be at least 8 characters long');
  if (!/[A-Z]/.test(password)) errors.push('Password must contain a capital letter');
  if (/^[a-zA-Z0-9]*$/.test(password)) errors.push('Password must contain a special character');
  if (!/[0-9]/.test(password)) errors.push('Password must contain a digit');
  return errors;
}

export const authService = { login, signup };
