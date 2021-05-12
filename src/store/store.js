import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import ENV from '../constants/environment';
import rootReducer from './reducers/rootReducer';

const composeEnhancers =
  (!ENV.IS_PROD &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?.({})) ||
  compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

export default store;
