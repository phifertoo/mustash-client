import axios from "axios";

export const geocode = ({ city, state }) => async (dispatch) => {
  const config = {
    params: {
      city,
      state,
    },
  };
  try {
    const res = await axios.get("/api/geocoding", config);
    dispatch({ type: "GEOCODE_SUCCESS", payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      console.log(errors);
    }
    dispatch({ type: "GEOCODE_FAIL" });
  }
};
