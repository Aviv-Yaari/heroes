import { Dispatch } from 'redux';
import { userService } from '../services/user.service';

export const login = (username: string, password: string) => {
  return async (dispatch: Dispatch) => {
    const user = await userService.login(username, password);
    dispatch({
      type: 'SET_USER',
      user,
    });
  };
};

export const logout = () => {
  return async (dispatch: Dispatch) => {
    await userService.logout();
    dispatch({
      type: 'SET_USER',
      user: null,
    });
  };
};

export const signup = (username: string, fullname: string, password: string) => {
  return async (dispatch: Dispatch) => {
    const user = await userService.signup(username, fullname, password);
    dispatch({
      type: 'SET_USER',
      user,
    });
  };
};

export const reloadUser = () => {
  return async (dispatch: Dispatch) => {
    const user = await userService.reloadUser();
    dispatch({
      type: 'SET_USER',
      user,
    });
  };
};
