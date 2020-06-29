import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  // token: localStorage.getItem('token'),
  // isAuthenticated: false,
  // user: null,
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXIiOiI1ZWJlNGE1ZjQ0YjBlYzJjZTg0Mjk0YzIifSwiaWF0IjoxNTkzMzY3MzQ1LCJleHAiOjE1OTM0NjczNDV9.8Cn6g5ltLCCtzWMmeuhDEISpdAg_YrTfWUeHvrmFt9s',
  isAuthenticated: true,
  user: '5ebe4a5f44b0ec2ce84294c2',
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      localStorage.setItem('token', payload.token);
      return { ...state, isAuthenticated: true, user: payload.user };
    case 'LOGOUT_SUCCESS':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}

export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  /* random universal id */
  const id = uuidv4();
  /* dispatches the msg, alertType, and id as a payload to the store. The 
    state is also updated according to the data in the payload */
  dispatch({ type: 'SET_ALERT', payload: { msg, alertType, id } });
  /* after 5 seconds the alert will be removed*/
  setTimeout(() => dispatch({ type: 'REMOVE_ALERT', payload: id }), timeout);
};

//Register user
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    /* if the loadUser function is successful, perform a post request to the 
      /api/users path sending the name, email, and password in the body and
      sending a header identifying that the body is json*/
    const res = await axios.post('/api/users', body, config);
    /* dispatch the token received from the POST request (res.data) 
      to the state. */
    dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
    /* loadUser stores the token in local stoage and makes a
      GET request to /api/auth */
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: 'REGISTER_FAIL' });
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('api/auth', body, config);
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: 'LOGIN_FAIL' });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: 'LOGOUT_SUCCESS' });
};

export const isAuthenticated = () => {
  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt'));
  } else {
    return false;
  }
};
