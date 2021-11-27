import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { logger } from "../../services/logger.service";
import { User } from "../user/user.model";
import { userService } from "../user/user.service";
// import logger from '../../services/logger.service';

const login = async (username: string, password: string) => {
  logger.info(`Login attenpt with username: ${username}`);
  const user = await userService.getByUsername(username);
  if (!user) throw "Invalid username or password";
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw "Invalid username or password";
  const token = jwt.sign({ username }, <string>process.env.JWT_SECRET);
  logger.info(`Login with username: ${username}`);
  return token;
};

const signup = async (user: User) => {
  const { username, password, fullname } = user;
  const saltRounds = 10;
  logger.debug(`Signup with username: ${username}`);
  if (!username || !password || !fullname) throw "fullname, username and password are required";
  const passwordErrors = _checkPassword(password);
  if (passwordErrors.length) throw passwordErrors;
  const existingUser = await userService.getByUsername(username);
  if (existingUser) throw "User already exists";
  const hash = await bcrypt.hash(password, saltRounds);
  await userService.add({ username, password: hash, fullname, isAdmin: false });
  return { username, password: hash, fullname };
};

function _checkPassword(password: string) {
  const errors = [];
  if (password.length < 8) errors.push("Password must be at least 8 characters long");
  if (!/[A-Z]/.test(password)) errors.push("Password must contain a capital letter");
  if (/^[a-zA-Z0-9]*$/.test(password)) errors.push("Password must contain a special character");
  if (!/[0-9]/.test(password)) errors.push("Password must contain a digit");
  return errors;
}

export default { login, signup };
