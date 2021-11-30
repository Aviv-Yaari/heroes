import { httpService } from './http.service';

const login = async (username: string, password: string) => {
  const user = await httpService.post('auth/login', { username, password });
  return user;
};

const logout = async () => {
  return httpService.post('auth/logout');
};

const signup = async (username: string, fullname: string, password: string) => {
  const user = await httpService.post('auth/signup', { username, fullname, password });
  return user;
};

const getCurrentUser = async () => {
  const user = await httpService.get('auth/current');
  return user;
};

const checkRegistration = ({ username, fullname, password }: { [key: string]: string }) => {
  const passwordErrors = [];
  const usernameErrors = [];
  const fullnameErrors = [];
  if (password.length < 8) passwordErrors.push('Password must be at least 8 characters long');
  if (!/[A-Z]/.test(password)) passwordErrors.push('Password must contain a capital letter');
  if (/^[a-zA-Z0-9]*$/.test(password)) passwordErrors.push('Password must contain a special character');
  if (!/[0-9]/.test(password)) passwordErrors.push('Password must contain a digit');
  if (!username.length) usernameErrors.push('User name is required');
  if (!fullname.length) fullnameErrors.push('Full name is required');

  return { password: passwordErrors, username: usernameErrors, fullname: fullnameErrors };
};

export const userService = { login, signup, logout, getCurrentUser, checkRegistration };
