import { createStore, applyMiddleware } from 'redux';
import rootReducer from './ducks';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const initialState = {};

//need to install for async
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  //need to install for async
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
