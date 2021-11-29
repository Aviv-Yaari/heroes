import { Action } from 'redux';

export interface AlertModel {
  type: 'error' | 'success';
  message: string;
}

interface IAction extends Action {
  alert: AlertModel;
}

const initialState = {
  alert: null,
};

export function systemReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case 'SET_ALERT':
      return { ...state, alert: action.alert };
    default:
      return state;
  }
}
