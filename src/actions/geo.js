import axios from "axios";

export const geocode = ({ city, state }) => async (dispatch) => {
  const config = {
    params: {
      city,
      state,
    },
  };
  try {
    /* if the loadUser function is successful, perform a post request to the 
          /api/users path sending the name, email, and password in the body and
          sending a header identifying that the body is json*/
    const res = await axios.get("/api/geocoding", config);
    /* dispatch the token received from the POST request (res.data) 
          to the state. */
    dispatch({ type: "GEOCODE_SUCCESS", payload: res.data });
    /* loadUser stores the token in local stoage and makes a
          GET request to /api/auth */
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      console.log(errors);
    }
    dispatch({ type: "GEOCODE_FAIL" });
  }
};
