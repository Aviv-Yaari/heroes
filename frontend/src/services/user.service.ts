import { AxiosError } from 'axios';
import { httpService } from './http.service';

export const login = async (username: string, password: string) => {
  const user = await httpService.post('auth/login', { username, password });
  return user;
};

export const logout = async () => {
  return httpService.post('auth/logout');
};

export const signup = async (username: string, fullname: string, password: string) => {
  try {
    const user = await httpService.post('auth/signup', { username, fullname, password });
    return user;
  } catch (err) {
    const errInfo = (err as AxiosError).response?.data.err;
    if (Array.isArray(errInfo)) throw errInfo.join('<br>');
    throw errInfo;
  }
};

export const getCurrentUser = async () => {
  const user = await httpService.get('auth/current');
  return user;
};

export const userService = { login, signup, logout, getCurrentUser };
