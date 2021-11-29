import { Action } from 'redux';
import { Hero } from '../services/hero.service';

export interface User {
  _id: string;
  username: string;
  fullname: string;
  heroes: string[];
  isAdmin: false;
  money: number;
}

interface IAction extends Action {
  user: User;
  heroes: Hero[];
}

const initialState = {
  user: null,
};

export function userReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.user };
    default:
      return state;
  }
}
