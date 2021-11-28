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

export const signup = (username: string, fullname: string, password: string) => {
  return async (dispatch: Dispatch) => {
    const user = await userService.signup(username, fullname, password);
    dispatch({
      type: 'SET_USER',
      user,
    });
  };
};

export const getCurrentUser = () => {
  return async (dispatch: Dispatch) => {
    const user = await userService.getCurrentUser();
    dispatch({
      type: 'SET_USER',
      user,
    });
  };
};
