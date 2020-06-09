import axios from "axios";

export const searchListings = (searchAddress, searchRadius) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      searchAddress,
      searchRadius,
    },
  };
  try {
    const res = await axios.get("/api/listing", config);
    dispatch({ type: "SEARCHLISTINGS_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "SEARCHLISTINGS_FAIL" });
  }
};

export const saveSearchQuery = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: "SAVESEARCHQUERY_SUCCESS", payload: searchQuery });
  } catch (err) {
    dispatch({ type: "SAVESEARCHQUERY_FAIL" });
  }
};

export const getImages = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/listing/images/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
