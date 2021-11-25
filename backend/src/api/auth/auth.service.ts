import bcrypt from 'bcrypt';
import userService from '../user/user.service';
// import logger from '../../services/logger.service';

const login = async (username: string, password: string) => {
  //   logger.debug(`auth.service - login with username: ${username}`);

  const user = await userService.getByUsername(username);
  if (!user) throw 'Invalid username or password';
  // TODO: un-comment for real login
  // const match = await bcrypt.compare(password, user.password)
  // if (!match) return Promise.reject('Invalid username or password')
  delete user.password;
  user._id = user._id.toString();
  return user;
};

const signup = async (username: string, password: string, fullname: string) => {
  const saltRounds = 10;
  //   logger.debug(`auth.service - signup with username: ${username}, fullname: ${fullname}`);
  if (!username || !password || !fullname) throw 'fullname, username and password are required!';
  const hash = await bcrypt.hash(password, saltRounds);
  return userService.add({ username, password: hash, fullname });
};

module.exports = {
  signup,
  login,
};
