import axios from 'axios';

const initialState = {
  sellerListings: [],
  selectedListing: {},
  step: 0,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'FINDSELLERLISTINGS_SUCCESS':
      return { ...state, sellerListings: payload };
    case 'SETDASHBOARDSTEP_SUCCESS':
      return { ...state, step: payload };
    case 'SETSELECTEDLISTING_SUCCESS':
      return { ...state, selectedListing: payload };
    case 'UPDATESPACE_SUCCESS':
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

export const findSellerListings = (input) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': input.token,
    },
  };
  try {
    const res = await axios.get(`/api/listing/${input.seller_id}`, config);
    dispatch({ type: 'FINDSELLERLISTINGS_SUCCESS', payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const setDashboardStep = (step) => async (dispatch) => {
  try {
    dispatch({ type: 'SETDASHBOARDSTEP_SUCCESS', payload: step });
  } catch (err) {
    dispatch({ type: 'SETDASHBOARDSTEP_FAIL' });
  }
};

export const setSelectedListing = (selectedListing) => async (dispatch) => {
  try {
    dispatch({ type: 'SETSELECTEDLISTING_SUCCESS', payload: selectedListing });
  } catch (err) {
    dispatch({ type: 'SETSELECTEDLISTING_FAIL' });
  }
};

export const updateSpace = (data, _id, token) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  };
  const body = data;
  body._id = _id;

  try {
    const res = await axios.post('/api/listing/update', body, config);
    dispatch({ type: 'UPDATESPACE_SUCCESS', payload: res.data });
    return res;
  } catch (err) {
    dispatch({ type: 'UPDATESPACE_FAIL' });
    console.log(err);
  }
};
