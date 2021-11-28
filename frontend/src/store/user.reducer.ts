import { Action } from 'redux';

export interface Hero {
  _id: string;
  name: string;
  ability: 'attacker' | 'defender';
  colors: string[];
  trainingHistory: { [date: string]: number }[];
  currentPower: string | number;
}

export interface User {
  _id: string;
  username: string;
  fullname: string;
  heroes: string[];
  isAdmin: false;
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
      return { user: action.user };
    case 'SET_HEROES':
      return { heroes: action.heroes };
    default:
      return state;
  }
}
