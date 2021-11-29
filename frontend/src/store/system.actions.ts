import { Dispatch } from 'redux';
import { AlertModel } from './system.reducer';

export const setAlert = (alertInfo: AlertModel | null) => {
  return (dispatch: Dispatch) =>
    dispatch({
      type: 'SET_ALERT',
      alert: alertInfo,
    });
};
