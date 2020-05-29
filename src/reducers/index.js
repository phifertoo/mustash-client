import { combineReducers } from "redux";
import auth from "./auth";
import geo from "./geo";

export default combineReducers({ auth, geo });
