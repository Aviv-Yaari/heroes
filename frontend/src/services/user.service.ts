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
    const parsed = JSON.parse(err as string);
    if (Array.isArray(parsed)) {
      throw parsed.join(', ');
    }
    throw err;
  }
};

export const getCurrentUser = async () => {
  const user = await httpService.get('auth/current');
  return user;
};

export const userService = { login, signup, logout, getCurrentUser };
