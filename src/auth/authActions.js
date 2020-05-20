import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  /* random universal id */
  const id = uuidv4();
  /* dispatches the msg, alertType, and id as a payload to the store. The 
    state is also updated according to the data in the payload */
  dispatch({ type: "SET_ALERT", payload: { msg, alertType, id } });
  /* after 5 seconds the alert will be removed*/
  setTimeout(() => dispatch({ type: "REMOVE_ALERT", payload: id }), timeout);
};

//Register user
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    /* if the loadUser function is successful, perform a post request to the 
      /api/users path sending the name, email, and password in the body and
      sending a header identifying that the body is json*/
    const res = axios.post("/api/users", body, config);
    /* dispatch the token received from the POST request (res.data) 
      to the state. */
    dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
    /* loadUser stores the token in local stoage and makes a
      GET request to /api/auth */
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({ type: "REGISTER_FAIL" });
  }
};
