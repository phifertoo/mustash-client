import axios from 'axios';

const initialState = {
  myRentals: [],
  selectedRental: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'SETMYRENTALS_SUCCESS':
      return { ...state, myRentals: payload };
    case 'SETSELECTEDRENTAL_SUCCESS':
      return { ...state, selectedRental: payload };
    case 'ADDCOMMENT_SUCCESS':
    case 'ADDRATING_SUCCESS':
      return {
        ...state,
        selectedRental: payload.result,
        myRentals: payload.myRentals,
      };
    default:
      return state;
  }
}

export const setMyRentals = (token) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  };
  try {
    const res = await axios.get('/api/renter', config);
    dispatch({ type: 'SETMYRENTALS_SUCCESS', payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      console.log(errors);
    }
    dispatch({ type: 'SETMYRENTALS_FAIL' });
  }
};

export const setSelectedRental = (selectedRental) => async (dispatch) => {
  try {
    dispatch({ type: 'SETSELECTEDRENTAL_SUCCESS', payload: selectedRental });
  } catch (err) {
    dispatch({ type: 'SETSELECTEDRENTAL_FAIL' });
  }
};

export const addComment = (input) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': input.token,
    },
  };
  const body = {
    comment: input.comment,
  };
  try {
    const res = await axios.post(
      `/api/comments/${input.listing_id}`,
      body,
      config
    );
    dispatch({ type: 'ADDCOMMENT_SUCCESS', payload: res.data });
  } catch (err) {
    console.log(err);

    dispatch({ type: 'ADDCOMMENT_FAIL' });
  }
};

export const addRating = (input) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': input.token,
    },
  };
  const body = {
    rating: input.rating,
  };
  try {
    const res = await axios.post(
      `/api/ratings/${input.listing_id}`,
      body,
      config
    );
    dispatch({ type: 'ADDRATING_SUCCESS', payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: 'ADDRATING_FAIL' });
  }
};
