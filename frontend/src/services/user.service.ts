import { User } from '../store/user.reducer';
import { httpService } from './http.service';

const login = async (username: string, password: string) => {
  const user = await httpService.post('auth/login', { username, password });
  _saveToStorage(user);
  return user;
};

const logout = async () => {
  sessionStorage.clear();
  return httpService.post('auth/logout');
};

const signup = async (username: string, fullname: string, password: string) => {
  const user = await httpService.post('auth/signup', { username, fullname, password });
  _saveToStorage(user);
  return user;
};

const reloadUser = async () => {
  const user = await httpService.get('auth/current');
  if (user) _saveToStorage(user);
  else sessionStorage.clear();
  return user;
};

const getCurrentUser = () => {
  try {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (err) {
    return null;
  }
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

function _saveToStorage(user: User) {
  sessionStorage.setItem('user', JSON.stringify(user));
}

export const userService = { login, signup, logout, getCurrentUser, reloadUser, checkRegistration };
