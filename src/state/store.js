import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import ENV from '../constants/environment';
import * as reducers from './ducks';

const composeEnhancers =
  (!ENV.IS_PROD &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?.({})) ||
  compose;

const configureStore = preloadedState => {
  const rootReducer = combineReducers(reducers);

  return createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(thunk)),
  );
};

const store = configureStore({});

export default store;
