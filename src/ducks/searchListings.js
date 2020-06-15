import axios from 'axios';

const initialState = {
  searchResults: [],
  searchAddress: '1710 Tyler Drive, Monterey Park, CA 91755',
  searchRadius: 5,
  center: { lat: 0, lng: 0 },
  nearbyListings: {},
  selectedResult: {},
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
    case 'SELECTRESULTINDEX_SUCCESS':
      return {
        ...state,
        selectedResultIndex: payload,
      };
    case 'SELECTRESULT_SUCCESS':
      return {
        ...state,
        selectedResult: payload,
      };
    case 'NEARBYLISTINGS_SUCCESS':
      return {
        ...state,
        nearbyListings: payload,
      };
    case 'CLEARSELECTEDRESULT_SUCCESS':
      return {
        ...state,
        selectedResult: {},
        nearbyListings: {},
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

export const findNearListings = (searchAddress, searchRadius) => async (
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
    dispatch({ type: 'NEARBYLISTINGS_SUCCESS', payload: res.data });
  } catch (err) {
    console.log(err);
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

export const selectResult = (selectedResult) => async (dispatch) => {
  try {
    dispatch({ type: 'SELECTRESULT_SUCCESS', payload: selectedResult });
  } catch (err) {
    dispatch({ type: 'SELECTRESULTINDEX_FAIL' });
  }
};

export const clearSelectedResult = () => async (dispatch) => {
  try {
    dispatch({ type: 'CLEARSELECTEDRESULT_SUCCESS' });
  } catch (err) {
    dispatch({ type: 'CLEARSELECTEDRESULT_FAIL' });
  }
};
