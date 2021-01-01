import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootreducer from './reducers/index';
import thunk from 'redux-thunk';

const initState = {};

const middleware = [thunk];
const store = createStore(
  rootreducer,
  initState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
