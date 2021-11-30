import { User } from '../store/user.reducer';
import { httpService } from './http.service';
import CryptoJS from 'crypto-js';

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
  _saveToStorage(user);
  return user;
};

const getCurrentUser = () => {
  const encryptedUser = sessionStorage.getItem('user');
  if (!encryptedUser) return null;
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedUser, process.env.REACT_APP_USER_HASH || 'SECRET');
    const user = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return user;
  } catch (err) {
    sessionStorage.clear();
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
  const encryptedUser = CryptoJS.AES.encrypt(
    JSON.stringify(user),
    process.env.REACT_APP_USER_HASH || 'SECRET'
  ).toString();
  sessionStorage.setItem('user', encryptedUser);
}

export const userService = { login, signup, logout, getCurrentUser, reloadUser, checkRegistration };
