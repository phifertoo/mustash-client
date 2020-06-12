import axios from 'axios';

const initialState = {
  searchResults: [],
  searchAddress: '1710 Tyler Drive, Monterey Park, CA 91755',
  searchRadius: 5,
  center: { lat: 0, lng: 0 },
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'SAVESEARCHQUERY_SUCCESS':
      return {
        ...state,
        searchAddress: payload.address,
        searchRadius: Number(payload.radius),
      };
    case 'SEARCHLISTINGS_SUCCESS':
      return {
        ...state,
        searchResults: payload.locations,
        center: payload.center,
      };
    default:
      return state;
  }
}

export const searchListings = (searchAddress, searchRadius) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      searchAddress,
      searchRadius,
    },
  };
  try {
    const res = await axios.get('/api/listing', config);
    dispatch({ type: 'SEARCHLISTINGS_SUCCESS', payload: res.data });
  } catch (err) {
    dispatch({ type: 'SEARCHLISTINGS_FAIL' });
  }
};

export const saveSearchQuery = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: 'SAVESEARCHQUERY_SUCCESS', payload: searchQuery });
  } catch (err) {
    dispatch({ type: 'SAVESEARCHQUERY_FAIL' });
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
