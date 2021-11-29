import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { Hero } from '../services/hero.service';
import { AlertModel, systemReducer } from './system.reducer';
import { User, userReducer } from './user.reducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const rootReducer = combineReducers({
  userModule: userReducer,
  systemModule: systemReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export interface RootState {
  userModule: {
    user: User;
    heroes: Hero[];
  };
  systemModule: {
    alert: AlertModel;
  };
}
