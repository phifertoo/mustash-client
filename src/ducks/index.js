import { combineReducers } from 'redux';
import auth from './auth';
import geo from './geo';
import space from './list';
import searchListings from './searchListings';
import updateListings from './updateListings';

export default combineReducers({
  auth,
  geo,
  space,
  searchListings,
  updateListings,
});
